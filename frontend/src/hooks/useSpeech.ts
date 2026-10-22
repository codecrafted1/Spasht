import { useState, useCallback, useEffect } from "react";

export function useSpeech() {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(false);
  const [recognitionSupported, setRecognitionSupported] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setSpeechSupported("speechSynthesis" in window);
      setRecognitionSupported("webkitSpeechRecognition" in window || "SpeechRecognition" in window);
    }
  }, []);

  // Text to speech
  const speakText = useCallback((text: string, language: string = "en") => {
    if (!("speechSynthesis" in window)) {
      console.warn("Speech synthesis is not supported on this browser.");
      return;
    }

    window.speechSynthesis.cancel();

    if (!text.trim()) return;

    // Clean citation references like [1], [2] from speech output
    const cleanText = text.replace(/\[\d+\]/g, "");

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = language === "hi" ? "hi-IN" : "en-IN";
    utterance.rate = 0.95;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  }, []);

  const stopSpeaking = useCallback(() => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  }, []);

  // Voice to text (Web Speech API)
  const startListening = useCallback(
    (onResult: (transcript: string) => void, language: string = "en") => {
      const SpeechRecognition =
        (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

      if (!SpeechRecognition) {
        alert("Voice recognition is not supported in this browser. Please use text input.");
        return;
      }

      try {
        const recognition = new SpeechRecognition();
        recognition.lang = language === "hi" ? "hi-IN" : "en-US";
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;

        recognition.onstart = () => setIsListening(true);
        recognition.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript;
          onResult(transcript);
        };
        recognition.onerror = () => setIsListening(false);
        recognition.onend = () => setIsListening(false);

        recognition.start();
      } catch (err) {
        console.error("Speech recognition error:", err);
        setIsListening(false);
      }
    },
    []
  );

  return {
    speakText,
    stopSpeaking,
    isSpeaking,
    startListening,
    isListening,
    speechSupported,
    recognitionSupported
  };
}
