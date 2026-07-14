import { FormEvent, KeyboardEvent, useEffect, useRef, useState } from "react";
import {
  ArrowUp,
  ChevronRight,
  ExternalLink,
  MessageCircle,
  Mic,
  RotateCcw,
  Square,
  Volume2,
  VolumeX,
  X,
} from "lucide-react";
import { Link } from "react-router-dom";

import profileImage from "@/assets/jesse-profile.jpg";
import { cn } from "@/lib/utils";

import { answerJesseQuestion, STARTER_QUESTIONS } from "./knowledge";
import JesseAvatarStage, { type JesseAvatarActivity } from "./JesseAvatarStage";
import { useBrowserVoice, type VoiceLocale } from "./useBrowserVoice";

type ChatMessage = {
  id: number;
  role: "assistant" | "user";
  text: string;
  topic?: string;
  followUps?: string[];
};

const INITIAL_MESSAGE: ChatMessage = {
  id: 0,
  role: "assistant",
  text: "Hi — I'm Jesse AI, an AI guide built from Jesse's reviewed public information. Ask me about his work, projects, ideas, or how to collaborate. 你好，我也可以用中文交流。",
  topic: "AI disclosure",
};

const languageFor = (text: string): VoiceLocale => (/[㐀-鿿]/.test(text) ? "zh-CN" : "en-US");

const JesseAIExperience = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState<"text" | "voice">("text");
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([INITIAL_MESSAGE]);
  const [isThinking, setIsThinking] = useState(false);
  const [autoSpeak, setAutoSpeak] = useState(true);
  const [voiceLanguage, setVoiceLanguage] = useState<VoiceLocale>("en-US");
  const messageId = useRef(1);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const responseTimerRef = useRef<number>();
  const voice = useBrowserVoice();
  const stopAll = voice.stopAll;

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView?.({ behavior: "smooth" });
  }, [messages, isThinking]);

  useEffect(
    () => () => {
      if (responseTimerRef.current) window.clearTimeout(responseTimerRef.current);
      stopAll();
    },
    [stopAll],
  );

  const cancelPendingAnswer = () => {
    if (responseTimerRef.current) {
      window.clearTimeout(responseTimerRef.current);
      responseTimerRef.current = undefined;
    }
    setIsThinking(false);
  };

  const close = () => {
    cancelPendingAnswer();
    voice.stopAll();
    setIsOpen(false);
  };

  const ask = (rawQuestion: string) => {
    const question = rawQuestion.trim();
    if (!question || isThinking) return;

    voice.stopSpeaking();
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
      if (mode === "voice" && autoSpeak) voice.speak(result.answer, languageFor(question));
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

  const toggleListening = () => {
    if (voice.isListening) {
      voice.stopListening();
      return;
    }
    voice.startListening(voiceLanguage, ask);
  };

  const reset = () => {
    cancelPendingAnswer();
    voice.stopAll();
    setMessages([INITIAL_MESSAGE]);
    setInput("");
  };

  const activity: JesseAvatarActivity = voice.isListening
    ? "listening"
    : voice.isSpeaking
      ? "speaking"
      : isThinking
        ? "thinking"
        : "idle";

  return (
    <div className="fixed bottom-0 right-0 z-[80] pointer-events-none">
      {!isOpen && (
        <button
          type="button"
          aria-label="Talk to Jesse AI"
          onClick={() => setIsOpen(true)}
          className="group pointer-events-auto fixed bottom-5 right-4 flex items-center gap-3 rounded-full border border-white/20 bg-neutral-950 py-2 pl-2 pr-4 text-white shadow-2xl shadow-orange-500/20 transition hover:-translate-y-1 hover:border-primary/60 sm:bottom-7 sm:right-7"
        >
          <span className="relative block h-12 w-12 overflow-hidden rounded-full ring-2 ring-primary/60">
            <img src={profileImage} alt="" className="h-full w-full object-cover" />
            <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-neutral-950 bg-emerald-400" />
          </span>
          <span className="text-left">
            <span className="block text-[10px] font-semibold uppercase tracking-[0.18em] text-primary">Interactive AI</span>
            <span className="flex items-center gap-1 text-sm font-semibold">
              Talk to Jesse AI <ChevronRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" />
            </span>
          </span>
        </button>
      )}

      {isOpen && (
        <section
          role="dialog"
          aria-modal="true"
          aria-label="Jesse AI conversation"
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
              <button type="button" onClick={reset} aria-label="Reset conversation" className="rounded-full p-2 text-white/60 transition hover:bg-white/10 hover:text-white">
                <RotateCcw className="h-4 w-4" />
              </button>
              <button type="button" onClick={close} aria-label="Close Jesse AI" className="rounded-full p-2 text-white/60 transition hover:bg-white/10 hover:text-white">
                <X className="h-5 w-5" />
              </button>
            </div>
          </header>

          <JesseAvatarStage activity={activity} />

          <div className="flex shrink-0 items-center justify-between border-b bg-muted/35 px-3 py-2">
            <div className="flex rounded-full bg-background p-1 shadow-sm ring-1 ring-border">
              <button
                type="button"
                onClick={() => setMode("text")}
                className={cn("flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition", mode === "text" ? "bg-neutral-950 text-white" : "text-muted-foreground hover:text-foreground")}
              >
                <MessageCircle className="h-3.5 w-3.5" /> Text
              </button>
              <button
                type="button"
                onClick={() => setMode("voice")}
                className={cn("flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition", mode === "voice" ? "bg-neutral-950 text-white" : "text-muted-foreground hover:text-foreground")}
              >
                <Mic className="h-3.5 w-3.5" /> Voice
              </button>
            </div>
            <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
              {mode === "voice" ? "Browser voice preview" : "Grounded preview"}
            </p>
          </div>

          {mode === "voice" && (
            <div className="flex shrink-0 items-center gap-2 border-b border-orange-200/60 bg-orange-50 px-4 py-2 text-[11px] text-orange-950">
              <span className="min-w-0 flex-1">Local template voice. Mic starts only when tapped.</span>
              <div className="flex shrink-0 rounded-full bg-white/80 p-0.5 ring-1 ring-orange-200">
                <button
                  type="button"
                  aria-label="Use English voice input"
                  aria-pressed={voiceLanguage === "en-US"}
                  onClick={() => setVoiceLanguage("en-US")}
                  className={cn("rounded-full px-2 py-1 text-[10px] font-semibold", voiceLanguage === "en-US" && "bg-orange-500 text-white")}
                >
                  EN
                </button>
                <button
                  type="button"
                  aria-label="Use Chinese voice input"
                  aria-pressed={voiceLanguage === "zh-CN"}
                  onClick={() => setVoiceLanguage("zh-CN")}
                  className={cn("rounded-full px-2 py-1 text-[10px] font-semibold", voiceLanguage === "zh-CN" && "bg-orange-500 text-white")}
                >
                  中文
                </button>
              </div>
              <button
                type="button"
                onClick={() => {
                  setAutoSpeak((value) => !value);
                  if (autoSpeak) voice.stopSpeaking();
                }}
                aria-label={autoSpeak ? "Mute spoken replies" : "Enable spoken replies"}
                className="shrink-0 rounded-full p-1.5 hover:bg-orange-100"
              >
                {autoSpeak ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
              </button>
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
                            className="rounded-full border border-primary/20 bg-orange-50 px-2.5 py-1 text-left text-[11px] font-medium text-orange-950 transition hover:border-primary/50"
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
                    <button key={question} type="button" onClick={() => ask(question)} className="group flex items-center justify-between rounded-xl border bg-card px-3 py-2.5 text-left text-xs font-medium transition hover:border-primary/50 hover:bg-orange-50">
                      {question}
                      <ArrowUp className="h-3.5 w-3.5 rotate-45 text-muted-foreground transition group-hover:text-primary" />
                    </button>
                  ))}
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </div>

          {voice.error && <p className="mx-4 mb-2 rounded-lg bg-destructive/10 px-3 py-2 text-xs text-destructive">{voice.error}</p>}

          <div className="shrink-0 border-t bg-background p-3">
            {mode === "voice" && (
              <button
                type="button"
                onClick={toggleListening}
                aria-label={voice.isListening ? "Stop listening" : "Start listening"}
                className={cn("mb-2 flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm font-semibold transition", voice.isListening ? "bg-red-500 text-white" : "bg-neutral-950 text-white hover:bg-neutral-800")}
              >
                {voice.isListening ? <><Square className="h-4 w-4 fill-current" /> Stop listening</> : <><Mic className="h-4 w-4" /> Start listening</>}
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
                className="max-h-24 min-h-9 flex-1 resize-none bg-transparent px-2 py-2 text-sm outline-none placeholder:text-muted-foreground/70"
              />
              <button
                type="submit"
                aria-label="Send message"
                disabled={!input.trim() || isThinking}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground transition hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-35"
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

export default JesseAIExperience;
