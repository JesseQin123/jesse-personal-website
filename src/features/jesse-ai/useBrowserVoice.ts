import { useCallback, useRef, useState } from "react";

type RecognitionEvent = {
  results: ArrayLike<{ 0: { transcript: string } }>;
};

type RecognitionInstance = {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  onresult: ((event: RecognitionEvent) => void) | null;
  onerror: (() => void) | null;
  onend: (() => void) | null;
  start(): void;
  stop(): void;
};

type RecognitionConstructor = new () => RecognitionInstance;

function getRecognitionConstructor(): RecognitionConstructor | undefined {
  if (typeof window === "undefined") return undefined;
  const voiceWindow = window as unknown as {
    SpeechRecognition?: RecognitionConstructor;
    webkitSpeechRecognition?: RecognitionConstructor;
  };
  return voiceWindow.SpeechRecognition ?? voiceWindow.webkitSpeechRecognition;
}

function chooseTemplateVoice(voices: SpeechSynthesisVoice[], language: string) {
  const languagePrefix = language.startsWith("zh") ? "zh" : "en";
  const matching = voices.filter((voice) => voice.lang.toLowerCase().startsWith(languagePrefix));
  const preferredNames = ["Samantha", "Ava", "Aria", "Google", "Daniel"];
  return (
    matching.find((voice) => preferredNames.some((name) => voice.name.includes(name))) ?? matching[0]
  );
}

export function useBrowserVoice() {
  const recognitionRef = useRef<RecognitionInstance | null>(null);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const canListen = Boolean(getRecognitionConstructor());
  const canSpeak = typeof window !== "undefined" && "speechSynthesis" in window;

  const stopListening = useCallback(() => {
    recognitionRef.current?.stop();
    recognitionRef.current = null;
    setIsListening(false);
  }, []);

  const startListening = useCallback(
    (language: string, onResult: (transcript: string) => void) => {
      const Recognition = getRecognitionConstructor();
      if (!Recognition) {
        setError("Voice input is not supported in this browser. Chrome and Safari work best.");
        return;
      }

      stopListening();
      setError(null);
      const recognition = new Recognition();
      recognition.lang = language;
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.onresult = (event) => {
        const transcript = event.results[0]?.[0]?.transcript?.trim();
        if (transcript) onResult(transcript);
      };
      recognition.onerror = () => {
        setError("I couldn't hear that clearly. Please try again or type your question.");
        setIsListening(false);
      };
      recognition.onend = () => {
        recognitionRef.current = null;
        setIsListening(false);
      };
      recognitionRef.current = recognition;
      recognition.start();
      setIsListening(true);
    },
    [stopListening],
  );

  const stopSpeaking = useCallback(() => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  }, []);

  const speak = useCallback(
    (text: string, language: string) => {
      if (!canSpeak) {
        setError("Spoken replies are not supported in this browser.");
        return;
      }

      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = language;
      utterance.rate = language.startsWith("zh") ? 1 : 1.02;
      utterance.pitch = 0.96;
      const voice = chooseTemplateVoice(window.speechSynthesis.getVoices(), language);
      if (voice) utterance.voice = voice;
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
    },
    [canSpeak],
  );

  return {
    canListen,
    canSpeak,
    error,
    isListening,
    isSpeaking,
    speak,
    startListening,
    stopListening,
    stopSpeaking,
  };
}
