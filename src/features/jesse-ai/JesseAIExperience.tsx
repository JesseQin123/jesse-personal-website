import { ConversationProvider, useConversation } from "@elevenlabs/react";
import { FormEvent, KeyboardEvent, useCallback, useEffect, useRef, useState } from "react";
import {
  ArrowUp,
  ChevronRight,
  ExternalLink,
  MessageCircle,
  Mic,
  PhoneOff,
  RotateCcw,
  X,
} from "lucide-react";
import { Link } from "react-router-dom";

import profileImage from "@/assets/jesse-profile.jpg";
import { cn } from "@/lib/utils";

import { answerJesseQuestion, STARTER_QUESTIONS } from "./knowledge";
import JesseAvatarStage, { type JesseAvatarActivity } from "./JesseAvatarStage";

type ChatMessage = {
  id: number;
  role: "assistant" | "user";
  text: string;
  topic?: string;
  followUps?: string[];
};

type VoiceLanguage = "en" | "zh";

const INITIAL_MESSAGE: ChatMessage = {
  id: 0,
  role: "assistant",
  text: "Hi — I'm Jesse AI, an AI guide built from Jesse's reviewed public information. Ask me about his work, projects, ideas, or how to collaborate. 你好，我也可以用中文交流。",
  topic: "AI disclosure",
};

const JesseAIExperienceContent = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState<"text" | "voice">("text");
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([INITIAL_MESSAGE]);
  const [isThinking, setIsThinking] = useState(false);
  const [hasLeftHero, setHasLeftHero] = useState(false);
  const [isCompactTrigger, setIsCompactTrigger] = useState(true);
  const [voiceLanguage, setVoiceLanguage] = useState<VoiceLanguage>("en");
  const [voiceError, setVoiceError] = useState<string | null>(null);
  const messageId = useRef(1);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const responseTimerRef = useRef<number>();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const openerRef = useRef<HTMLElement | null>(null);
  const dialogRef = useRef<HTMLElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const conversation = useConversation({
    onConnect: () => setVoiceError(null),
    onDisconnect: (details) => {
      if (details.reason === "error") {
        setVoiceError(details.message || details.closeReason || "The voice session ended unexpectedly.");
      }
    },
    onError: (message) => setVoiceError(message || "Unable to connect to Jesse AI voice."),
    onMessage: ({ message, role }) => {
      const text = message.trim();
      if (!text) return;
      setMessages((current) => [
        ...current,
        {
          id: messageId.current++,
          role: role === "agent" ? "assistant" : "user",
          text,
          topic: role === "agent" ? "Live ElevenLabs agent" : undefined,
        },
      ]);
    },
  });
  const endVoiceSession = conversation.endSession;

  const open = useCallback((opener?: HTMLElement | null) => {
    openerRef.current = opener
      ?? (document.activeElement instanceof HTMLElement ? document.activeElement : null)
      ?? triggerRef.current;
    setIsOpen(true);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView?.({ behavior: "smooth" });
  }, [messages, isThinking]);

  useEffect(() => {
    const openFromPage = (event: Event) => open((event as CustomEvent<{ opener?: HTMLElement }>).detail?.opener);
    window.addEventListener("open-jesse-ai", openFromPage);
    return () => window.removeEventListener("open-jesse-ai", openFromPage);
  }, [open]);

  useEffect(() => {
    const updateTriggerVisibility = () => {
      const isCompact = typeof window.matchMedia === "function"
        && window.matchMedia("(max-width: 1023px), (max-height: 600px)").matches;
      const hero = document.querySelector<HTMLElement>("[data-jesse-hero]");
      setIsCompactTrigger(isCompact);
      setHasLeftHero(!isCompact || !hero || hero.getBoundingClientRect().bottom <= window.innerHeight - 80);
    };

    updateTriggerVisibility();
    window.addEventListener("scroll", updateTriggerVisibility, { passive: true });
    window.addEventListener("resize", updateTriggerVisibility);
    return () => {
      window.removeEventListener("scroll", updateTriggerVisibility);
      window.removeEventListener("resize", updateTriggerVisibility);
    };
  }, []);

  useEffect(
    () => () => {
      if (responseTimerRef.current) window.clearTimeout(responseTimerRef.current);
      endVoiceSession();
    },
    [endVoiceSession],
  );

  const cancelPendingAnswer = useCallback(() => {
    if (responseTimerRef.current) {
      window.clearTimeout(responseTimerRef.current);
      responseTimerRef.current = undefined;
    }
    setIsThinking(false);
  }, []);

  const close = useCallback(() => {
    cancelPendingAnswer();
    endVoiceSession();
    setIsOpen(false);
    const restoreFocus = () => (openerRef.current ?? triggerRef.current)?.focus();
    if (typeof window.requestAnimationFrame === "function") window.requestAnimationFrame(restoreFocus);
    else restoreFocus();
  }, [cancelPendingAnswer, endVoiceSession]);

  useEffect(() => {
    if (!isOpen) return;

    const focusCloseButton = () => closeButtonRef.current?.focus();
    if (typeof window.requestAnimationFrame === "function") window.requestAnimationFrame(focusCloseButton);
    else focusCloseButton();

    const manageDialogKeyboard = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        close();
        return;
      }

      if (event.key !== "Tab" || !dialogRef.current) return;
      const focusable = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      ).filter((element) => !element.hasAttribute("hidden"));
      if (!focusable.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", manageDialogKeyboard);
    return () => window.removeEventListener("keydown", manageDialogKeyboard);
  }, [close, isOpen]);

  const ask = (rawQuestion: string) => {
    const question = rawQuestion.trim();
    if (!question || isThinking) return;

    if (mode === "voice" && conversation.status === "connected") {
      conversation.sendUserMessage(question);
      setInput("");
      return;
    }

    setMessages((current) => [
      ...current,
      { id: messageId.current++, role: "user", text: question },
    ]);
    setInput("");
    setIsThinking(true);

    responseTimerRef.current = window.setTimeout(() => {
      responseTimerRef.current = undefined;
      const result = answerJesseQuestion(question);
      setMessages((current) => [
        ...current,
        {
          id: messageId.current++,
          role: "assistant",
          text: result.answer,
          topic: result.topic,
          followUps: result.followUps,
        },
      ]);
      setIsThinking(false);
    }, 420);
  };

  const submit = (event: FormEvent) => {
    event.preventDefault();
    ask(input);
  };

  const handleComposerKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      ask(input);
    }
  };

  const startVoiceConversation = async () => {
    setVoiceError(null);
    try {
      if (!navigator.mediaDevices?.getUserMedia) {
        throw new Error("This browser cannot access a microphone.");
      }

      const permissionStream = await navigator.mediaDevices.getUserMedia({ audio: true });
      permissionStream.getTracks?.().forEach((track) => track.stop());

      const response = await fetch("/api/elevenlabs-token", { method: "POST" });
      const payload = (await response.json()) as { error?: string; token?: string };
      if (!response.ok || !payload.token) {
        throw new Error(payload.error || "Unable to start an ElevenLabs conversation.");
      }

      conversation.startSession({
        connectionType: "webrtc",
        conversationToken: payload.token,
        overrides: {
          agent: {
            language: voiceLanguage,
          },
        },
      });
    } catch (error) {
      setVoiceError(error instanceof Error ? error.message : "Unable to start voice conversation.");
    }
  };

  const toggleVoiceConversation = () => {
    if (conversation.status === "connected" || conversation.status === "connecting") {
      conversation.endSession();
      return;
    }
    void startVoiceConversation();
  };

  const selectMode = (nextMode: "text" | "voice") => {
    if (nextMode === "text") conversation.endSession();
    setVoiceError(null);
    setMode(nextMode);
  };

  const reset = () => {
    cancelPendingAnswer();
    conversation.endSession();
    setMessages([INITIAL_MESSAGE]);
    setInput("");
    setVoiceError(null);
  };

  const activity: JesseAvatarActivity = mode === "voice" && conversation.isListening
    ? "listening"
    : mode === "voice" && conversation.isSpeaking
      ? "speaking"
      : isThinking
        ? "thinking"
        : "idle";

  const voiceStatus =
    conversation.status === "connected"
      ? conversation.isSpeaking
        ? "Jesse AI is speaking"
        : "Live · listening"
      : conversation.status === "connecting"
        ? "Connecting securely…"
        : "ElevenLabs live agent";

  return (
    <div className="fixed bottom-0 right-0 z-[80] pointer-events-none">
      {!isOpen && (
        <button
          type="button"
          ref={triggerRef}
          aria-label="Talk to Jesse AI"
          aria-haspopup="dialog"
          onClick={() => {
            openerRef.current = null;
            setIsOpen(true);
          }}
          className={cn(
            "group pointer-events-auto fixed bottom-[max(16px,env(safe-area-inset-bottom))] right-4 h-[52px] w-[52px] items-center justify-center rounded-full border border-white/20 bg-neutral-950 p-1.5 text-white shadow-2xl shadow-orange-500/20 transition hover:-translate-y-1 hover:border-primary/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-300 focus-visible:ring-offset-2 motion-reduce:transform-none motion-reduce:transition-none",
            hasLeftHero ? "flex" : "hidden",
            !isCompactTrigger && "bottom-7 right-7 h-auto w-auto justify-start gap-3 py-2 pl-2 pr-4",
          )}
        >
          <span className={cn("relative block h-10 w-10 shrink-0 overflow-hidden rounded-full ring-2 ring-primary/60", !isCompactTrigger && "h-12 w-12")}>
            <img src={profileImage} alt="" className="h-full w-full object-cover" />
            <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-neutral-950 bg-emerald-400" />
          </span>
          <span className={cn("hidden text-left", !isCompactTrigger && "block")}>
            <span className="block text-[10px] font-semibold uppercase tracking-[0.18em] text-primary">Interactive AI</span>
            <span className="flex items-center gap-1 text-sm font-semibold">
              Talk to Jesse AI <ChevronRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" />
            </span>
          </span>
        </button>
      )}

      {isOpen && (
        <section
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label="Jesse AI conversation"
          tabIndex={-1}
          className="pointer-events-auto fixed inset-0 flex flex-col overflow-hidden bg-background shadow-2xl sm:inset-auto sm:bottom-5 sm:right-5 sm:h-[min(780px,calc(100vh-2.5rem))] sm:w-[460px] sm:rounded-[28px] sm:border sm:border-border/80"
        >
          <header className="flex items-center justify-between border-b border-white/10 bg-neutral-950 px-4 py-3 text-white">
            <div className="flex items-center gap-3">
              <div className="relative h-9 w-9 overflow-hidden rounded-full ring-1 ring-primary/70">
                <img src={profileImage} alt="Jesse Qin" className="h-full w-full object-cover" />
                <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-neutral-950 bg-emerald-400" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-sm font-semibold">Jesse AI</h2>
                  <span className="rounded-full bg-primary/15 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-orange-300">Preview</span>
                </div>
                <p className="text-[11px] text-white/55">AI-generated · public information only</p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button type="button" onClick={reset} aria-label="Reset conversation" className="flex h-11 w-11 items-center justify-center rounded-full text-white/60 transition hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-300">
                <RotateCcw className="h-4 w-4" />
              </button>
              <button ref={closeButtonRef} type="button" onClick={close} aria-label="Close Jesse AI" className="flex h-11 w-11 items-center justify-center rounded-full text-white/60 transition hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-300">
                <X className="h-5 w-5" />
              </button>
            </div>
          </header>

          <JesseAvatarStage activity={activity} />

          <div className="flex shrink-0 items-center justify-between border-b bg-muted/35 px-3 py-2">
            <div className="flex rounded-full bg-background p-1 shadow-sm ring-1 ring-border">
              <button
                type="button"
                onClick={() => selectMode("text")}
                className={cn("flex min-h-11 items-center gap-1.5 rounded-full px-3 py-2 text-xs font-semibold transition", mode === "text" ? "bg-neutral-950 text-white" : "text-muted-foreground hover:text-foreground")}
              >
                <MessageCircle className="h-3.5 w-3.5" /> Text
              </button>
              <button
                type="button"
                onClick={() => selectMode("voice")}
                className={cn("flex min-h-11 items-center gap-1.5 rounded-full px-3 py-2 text-xs font-semibold transition", mode === "voice" ? "bg-neutral-950 text-white" : "text-muted-foreground hover:text-foreground")}
              >
                <Mic className="h-3.5 w-3.5" /> Voice
              </button>
            </div>
            <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
              {mode === "voice" ? voiceStatus : "Grounded preview"}
            </p>
          </div>

          {mode === "voice" && (
            <div className="flex shrink-0 items-center gap-3 border-b border-orange-200/60 bg-orange-50 px-4 py-2 text-[11px] text-orange-950">
              <span className="min-w-0 flex-1">
                Choose a voice language before starting. Your microphone starts only after you tap the button.
              </span>
              <div className="flex shrink-0 rounded-full bg-white/80 p-0.5 ring-1 ring-orange-200" aria-label="Voice language">
                <button
                  type="button"
                  aria-label="Use English voice"
                  aria-pressed={voiceLanguage === "en"}
                  disabled={conversation.status !== "disconnected"}
                  onClick={() => setVoiceLanguage("en")}
                  className={cn(
                    "min-h-11 rounded-full px-2 py-2 font-semibold transition disabled:cursor-not-allowed disabled:opacity-60",
                    voiceLanguage === "en" ? "bg-neutral-950 text-white" : "text-orange-950 hover:bg-orange-100",
                  )}
                >
                  EN
                </button>
                <button
                  type="button"
                  aria-label="Use Chinese voice"
                  aria-pressed={voiceLanguage === "zh"}
                  disabled={conversation.status !== "disconnected"}
                  onClick={() => setVoiceLanguage("zh")}
                  className={cn(
                    "min-h-11 rounded-full px-2 py-2 font-semibold transition disabled:cursor-not-allowed disabled:opacity-60",
                    voiceLanguage === "zh" ? "bg-neutral-950 text-white" : "text-orange-950 hover:bg-orange-100",
                  )}
                >
                  中文
                </button>
              </div>
            </div>
          )}

          <div className="flex-1 overflow-y-auto px-4 py-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div key={message.id} className={cn("flex", message.role === "user" ? "justify-end" : "justify-start")}>
                  <div className={cn("max-w-[86%]", message.role === "user" ? "rounded-2xl rounded-br-md bg-neutral-950 px-3.5 py-2.5 text-sm leading-relaxed text-white" : "text-sm leading-relaxed text-foreground")}>
                    {message.role === "assistant" && message.topic && (
                      <p className="mb-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-primary">{message.topic}</p>
                    )}
                    <p>{message.text}</p>
                    {message.followUps && (
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {message.followUps.map((followUp) => (
                          <button
                            key={followUp}
                            type="button"
                            onClick={() => ask(followUp)}
                            className="min-h-11 rounded-full border border-primary/20 bg-orange-50 px-3 py-2 text-left text-[11px] font-medium text-orange-950 transition hover:border-primary/50"
                          >
                            {followUp}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {isThinking && (
                <div className="flex items-center gap-1.5 text-muted-foreground" aria-label="Jesse AI is thinking">
                  {[0, 1, 2].map((dot) => <span key={dot} className="h-1.5 w-1.5 animate-bounce rounded-full bg-primary" style={{ animationDelay: `${dot * 120}ms` }} />)}
                </div>
              )}

              {messages.length === 1 && (
                <div className="grid gap-2 pt-1">
                  {STARTER_QUESTIONS.map((question) => (
                    <button key={question} type="button" onClick={() => ask(question)} className="group flex min-h-11 items-center justify-between rounded-xl border bg-card px-3 py-2.5 text-left text-xs font-medium transition hover:border-primary/50 hover:bg-orange-50">
                      {question}
                      <ArrowUp className="h-3.5 w-3.5 rotate-45 text-muted-foreground transition group-hover:text-primary" />
                    </button>
                  ))}
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </div>

          {voiceError && <p className="mx-4 mb-2 rounded-lg bg-destructive/10 px-3 py-2 text-xs text-destructive">{voiceError}</p>}

          <div className="shrink-0 border-t bg-background p-3">
            {mode === "voice" && (
              <button
                type="button"
                onClick={toggleVoiceConversation}
                aria-label={conversation.status === "connected" ? "End voice conversation" : "Start voice conversation"}
                className={cn("mb-2 flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm font-semibold transition", conversation.status === "connected" ? "bg-red-500 text-white" : "bg-neutral-950 text-white hover:bg-neutral-800")}
              >
                {conversation.status === "connected" ? (
                  <><PhoneOff className="h-4 w-4" /> End voice conversation</>
                ) : conversation.status === "connecting" ? (
                  <>Connecting securely…</>
                ) : (
                  <><Mic className="h-4 w-4" /> Start voice conversation</>
                )}
              </button>
            )}

            <form onSubmit={submit} className="flex items-end gap-2 rounded-2xl border bg-muted/30 p-2 focus-within:border-primary/60 focus-within:ring-2 focus-within:ring-primary/10">
              <textarea
                aria-label="Message Jesse AI"
                value={input}
                onChange={(event) => setInput(event.target.value)}
                onKeyDown={handleComposerKeyDown}
                placeholder={mode === "voice" ? "Or type your question…" : "Ask Jesse AI anything…"}
                rows={1}
                className="max-h-24 min-h-11 flex-1 resize-none bg-transparent px-2 py-2 text-base outline-none placeholder:text-muted-foreground/70"
              />
              <button
                type="submit"
                aria-label="Send message"
                disabled={!input.trim() || isThinking}
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground transition hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-35"
              >
                <ArrowUp className="h-4 w-4" />
              </button>
            </form>
            <div className="mt-2 flex items-center justify-between px-1 text-[10px] text-muted-foreground">
              <span>AI preview — verify important details</span>
              <Link to="/book-call" onClick={close} className="flex items-center gap-1 font-semibold text-primary hover:underline">
                Talk to Jesse <ExternalLink className="h-2.5 w-2.5" />
              </Link>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

const JesseAIExperience = () => (
  <ConversationProvider>
    <JesseAIExperienceContent />
  </ConversationProvider>
);

export default JesseAIExperience;
