'use client';

import { useState, useRef, useEffect, useCallback, type KeyboardEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Spade, RotateCcw, Frown, TrendingUp, HelpCircle, Gamepad2, DollarSign, Trophy } from 'lucide-react';
import Link from 'next/link';
import CoachAvatar from './CoachAvatar';
import VoiceInput from './VoiceInput';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface ChatInterfaceProps {
  fullPage?: boolean;
  initialMessage?: string;
  className?: string;
}

const DEFAULT_GREETING =
  "Hey! I'm Andrew, your AI poker coach. What's your game -- cash or tournaments? What stakes are you grinding?";

const quickActions = [
  { label: 'Deal Me In', icon: Spade, href: '/play' },
  { label: 'Review My Last Hand', icon: RotateCcw },
  { label: 'Tell Me a Bad Beat', icon: Frown },
  { label: 'My Progress', icon: TrendingUp },
  { label: 'Poker Trivia', icon: HelpCircle },
  { label: 'Teach Me a Variant', icon: Gamepad2 },
  { label: 'Bankroll Check', icon: DollarSign },
  { label: 'Tournament Prep', icon: Trophy },
] as const;

/**
 * Simple markdown renderer -- supports **bold**, *italic*, and bullet points.
 * Returns an array of React nodes.
 */
function renderMarkdown(text: string): React.ReactNode[] {
  const lines = text.split('\n');
  const elements: React.ReactNode[] = [];

  lines.forEach((line, lineIdx) => {
    // Bullet points
    const bulletMatch = line.match(/^[\s]*[-*]\s+(.*)/);
    if (bulletMatch) {
      elements.push(
        <div key={lineIdx} className="flex items-start gap-2 ml-2 my-0.5">
          <span className="text-gold mt-1 text-xs">&#9679;</span>
          <span>{renderInline(bulletMatch[1])}</span>
        </div>,
      );
    } else if (line.trim() === '') {
      elements.push(<div key={lineIdx} className="h-2" />);
    } else {
      elements.push(
        <p key={lineIdx} className="my-0.5">
          {renderInline(line)}
        </p>,
      );
    }
  });

  return elements;
}

/** Render inline markdown: **bold** and *italic* */
function renderInline(text: string): React.ReactNode[] {
  const parts: React.ReactNode[] = [];
  // Match **bold** or *italic*
  const regex = /(\*\*(.+?)\*\*|\*(.+?)\*)/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(text)) !== null) {
    // Text before this match
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }

    if (match[2]) {
      // **bold**
      parts.push(
        <strong key={match.index} className="font-semibold text-white">
          {match[2]}
        </strong>,
      );
    } else if (match[3]) {
      // *italic*
      parts.push(
        <em key={match.index} className="italic text-gray-200">
          {match[3]}
        </em>,
      );
    }

    lastIndex = match.index + match[0].length;
  }

  // Remaining text
  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts;
}

export default function ChatInterface({
  fullPage = false,
  initialMessage,
  className = '',
}: ChatInterfaceProps) {
  const greeting = initialMessage ?? DEFAULT_GREETING;
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: greeting },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  }, [input]);

  const sendMessage = useCallback(
    async (userMessage: string) => {
      if (!userMessage.trim() || loading) return;

      const newMessages: Message[] = [
        ...messages,
        { role: 'user', content: userMessage.trim() },
      ];
      setMessages(newMessages);
      setInput('');
      setLoading(true);

      try {
        const res = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ messages: newMessages }),
        });
        const data = await res.json();
        setMessages([
          ...newMessages,
          { role: 'assistant', content: data.response },
        ]);
      } catch {
        setMessages([
          ...newMessages,
          {
            role: 'assistant',
            content: "Hmm, I lost my train of thought. Ask me again!",
          },
        ]);
      }

      setLoading(false);
    },
    [messages, loading],
  );

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  const handleQuickAction = (label: string) => {
    sendMessage(label);
  };

  const handleVoiceTranscript = useCallback(
    (text: string) => {
      sendMessage(text);
    },
    [sendMessage],
  );

  return (
    <div
      className={`flex flex-col ${
        fullPage ? 'h-[calc(100vh-4rem)]' : 'h-[600px]'
      } bg-dark-bg rounded-2xl border border-card-border overflow-hidden ${className}`}
    >
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3 border-b border-white/5 bg-card-bg/50">
        <CoachAvatar size="sm" speaking={loading} />
        <div>
          <h3 className="text-sm font-semibold text-white">Coach Andrew</h3>
          <p className="text-xs text-gray-500">
            {loading ? 'Thinking...' : 'Online'}
          </p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 scrollbar-thin">
        <AnimatePresence initial={false}>
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className={`flex items-start gap-3 ${
                msg.role === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              {/* Andrew avatar */}
              {msg.role === 'assistant' && <CoachAvatar size="sm" />}

              {/* Message bubble */}
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                  msg.role === 'user'
                    ? 'bg-white/10 text-white rounded-br-sm'
                    : 'bg-felt-dark/30 border border-felt/20 text-gray-200 rounded-bl-sm'
                }`}
              >
                {msg.role === 'assistant'
                  ? renderMarkdown(msg.content)
                  : msg.content}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Typing indicator */}
        {loading && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-start gap-3"
          >
            <CoachAvatar size="sm" speaking />
            <div className="bg-felt-dark/30 border border-felt/20 rounded-2xl rounded-bl-sm px-4 py-3">
              <div className="flex items-center gap-1.5">
                {[0, 1, 2].map((dot) => (
                  <motion.div
                    key={dot}
                    className="w-2 h-2 rounded-full bg-gold/60"
                    animate={{
                      y: [0, -4, 0],
                      opacity: [0.4, 1, 0.4],
                    }}
                    transition={{
                      duration: 0.8,
                      repeat: Infinity,
                      delay: dot * 0.15,
                      ease: 'easeInOut',
                    }}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick actions */}
      <div className="px-4 py-2 border-t border-white/5 overflow-x-auto">
        <div className="flex gap-2 min-w-max">
          {quickActions.map((action) => {
            if ('href' in action && action.href) {
              return (
                <Link
                  key={action.label}
                  href={action.href}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium
                    bg-white/5 text-gray-400 hover:bg-gold/10 hover:text-gold border border-white/5
                    hover:border-gold/20 transition-all whitespace-nowrap"
                >
                  <action.icon className="w-3.5 h-3.5" />
                  {action.label}
                </Link>
              );
            }

            return (
              <button
                key={action.label}
                type="button"
                onClick={() => handleQuickAction(action.label)}
                disabled={loading}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium
                  bg-white/5 text-gray-400 hover:bg-gold/10 hover:text-gold border border-white/5
                  hover:border-gold/20 transition-all whitespace-nowrap disabled:opacity-50
                  disabled:cursor-not-allowed cursor-pointer"
              >
                <action.icon className="w-3.5 h-3.5" />
                {action.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Input area */}
      <div className="px-4 py-3 border-t border-white/5 bg-card-bg/30">
        <div className="flex items-end gap-2">
          <VoiceInput onTranscript={handleVoiceTranscript} disabled={loading} />

          <textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask Andrew anything about poker..."
            rows={1}
            disabled={loading}
            className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm
              text-white placeholder-gray-500 resize-none focus:outline-none focus:ring-1
              focus:ring-gold/50 focus:border-gold/30 disabled:opacity-50 transition-all"
          />

          <motion.button
            type="button"
            onClick={() => sendMessage(input)}
            disabled={!input.trim() || loading}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-2.5 rounded-xl bg-gradient-to-r from-gold to-gold-dark text-dark-bg
              disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer"
          >
            <Send className="w-5 h-5" />
          </motion.button>
        </div>

        <p className="text-[10px] text-gray-600 mt-2 text-center">
          Andrew is AI-powered. Always verify strategy advice at the table.
        </p>
      </div>
    </div>
  );
}
