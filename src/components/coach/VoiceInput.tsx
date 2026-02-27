'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Mic, MicOff } from 'lucide-react';

/* eslint-disable @typescript-eslint/no-explicit-any */
interface IWindow extends Window {
  SpeechRecognition?: any;
  webkitSpeechRecognition?: any;
}
/* eslint-enable @typescript-eslint/no-explicit-any */

interface VoiceInputProps {
  onTranscript: (text: string) => void;
  disabled?: boolean;
}

export default function VoiceInput({ onTranscript, disabled = false }: VoiceInputProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [supported, setSupported] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const w = window as IWindow;
      const SpeechRecognitionCtor = w.SpeechRecognition || w.webkitSpeechRecognition;
      if (SpeechRecognitionCtor) {
        setSupported(true);
        const recognition = new SpeechRecognitionCtor();
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = 'en-US';

        recognition.onresult = (event: { results: { [key: number]: { [key: number]: { transcript: string } } } }) => {
          const transcript = event.results[0][0].transcript;
          if (transcript.trim()) {
            onTranscript(transcript.trim());
          }
          setIsRecording(false);
        };

        recognition.onerror = () => {
          setIsRecording(false);
        };

        recognition.onend = () => {
          setIsRecording(false);
        };

        recognitionRef.current = recognition;
      }
    }
  }, [onTranscript]);

  const toggleRecording = useCallback(() => {
    if (!recognitionRef.current || disabled) return;

    if (isRecording) {
      recognitionRef.current.stop();
      setIsRecording(false);
    } else {
      try {
        recognitionRef.current.start();
        setIsRecording(true);
      } catch {
        setIsRecording(false);
      }
    }
  }, [isRecording, disabled]);

  if (!supported) return null;

  return (
    <motion.button
      type="button"
      onClick={toggleRecording}
      disabled={disabled}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`relative p-2.5 rounded-full transition-all ${
        isRecording
          ? 'bg-red-500/20 text-red-400 border border-red-500/30'
          : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 border border-white/10'
      } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
      title={isRecording ? 'Stop recording' : 'Voice input'}
    >
      {/* Recording pulse indicator */}
      {isRecording && (
        <motion.div
          className="absolute inset-0 rounded-full bg-red-500/20"
          animate={{
            scale: [1, 1.4, 1],
            opacity: [0.3, 0, 0.3],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      )}

      {isRecording ? (
        <MicOff className="w-5 h-5 relative z-10" />
      ) : (
        <Mic className="w-5 h-5 relative z-10" />
      )}
    </motion.button>
  );
}
