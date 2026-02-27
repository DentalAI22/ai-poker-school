'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Send,
  PanelLeftClose,
  PanelLeftOpen,
  BookOpen,
  Target,
  Trophy,
  DollarSign,
  History,
  HeartPulse,
  Loader2,
  Sparkles,
  Bot,
} from 'lucide-react';
import CoachAvatar from '@/components/coach/CoachAvatar';

/* ─────────────────────────────────────────────────────────────
   TYPES & DATA
   ───────────────────────────────────────────────────────────── */

interface Message {
  id: string;
  role: 'user' | 'coach';
  content: string;
  timestamp: Date;
}

const QUICK_TOPICS = [
  {
    label: 'Hand Review',
    icon: <BookOpen className="w-4 h-4" />,
    message: "Andrew, I'd like to review a hand I just played. Can you walk me through the key decision points?",
  },
  {
    label: 'GTO Strategy',
    icon: <Target className="w-4 h-4" />,
    message: 'Can you explain the fundamentals of GTO poker strategy and when to deviate from it?',
  },
  {
    label: 'Tournament Prep',
    icon: <Trophy className="w-4 h-4" />,
    message: "I have a tournament coming up. What's your best advice for tournament preparation and strategy adjustments?",
  },
  {
    label: 'Bankroll Management',
    icon: <DollarSign className="w-4 h-4" />,
    message: "Can you help me set up a proper bankroll management plan? I'm not sure how many buy-ins I should have.",
  },
  {
    label: 'Poker History',
    icon: <History className="w-4 h-4" />,
    message: 'Tell me about the most interesting moments in poker history. Who are the legends I should study?',
  },
  {
    label: 'Bad Beat Therapy',
    icon: <HeartPulse className="w-4 h-4" />,
    message: "I just took a terrible bad beat and I'm tilting. Help me process it and get back to playing my best.",
  },
];

const ANDREW_GREETING = `Hey there! I'm Coach Andrew, your AI poker coach. I'm here to help you improve your game 24/7.

Whether you want to review hands, study GTO strategy, prep for a tournament, or just talk through a tough session, I've got you covered.

What would you like to work on today?`;

/* ─────────────────────────────────────────────────────────────
   PLACEHOLDER CHAT (used when ChatInterface is not available)
   ───────────────────────────────────────────────────────────── */

function FallbackChat({ initialMessage }: { initialMessage?: string }) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'greeting',
      role: 'coach',
      content: ANDREW_GREETING,
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const processedInitial = useRef(false);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  const sendMessage = useCallback(
    (text: string) => {
      if (!text.trim() || isTyping) return;

      const userMsg: Message = {
        id: `user-${Date.now()}`,
        role: 'user',
        content: text.trim(),
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, userMsg]);
      setInput('');
      setIsTyping(true);

      // Simulate Andrew's response
      setTimeout(() => {
        const responses = [
          "Great question! Let me break this down for you. In poker, every decision is about maximizing expected value. The key is to think about your opponent's range, not just their specific hand. What specific situation are you dealing with?",
          "That's a really common spot that a lot of players struggle with. The math says one thing, but the psychology of the table often tells a different story. Let me walk you through the GTO approach first, then we'll talk about exploitative adjustments.",
          "I love that you're thinking about this! Most players never dig this deep into their game. Here's what the solvers tell us, and more importantly, here's how to actually apply it at the table...",
          "Absolutely, let's dive into this. This is one of those topics where understanding the 'why' behind the strategy is just as important as knowing the right play. Let me explain the reasoning step by step.",
          "You're on the right track already by asking about this. A lot of players just auto-pilot through these spots. Let me give you a framework you can use to make better decisions consistently.",
        ];

        const coachMsg: Message = {
          id: `coach-${Date.now()}`,
          role: 'coach',
          content: responses[Math.floor(Math.random() * responses.length)],
          timestamp: new Date(),
        };

        setMessages((prev) => [...prev, coachMsg]);
        setIsTyping(false);
      }, 1500 + Math.random() * 1500);
    },
    [isTyping]
  );

  // Handle initial message from topic selection
  useEffect(() => {
    if (initialMessage && !processedInitial.current) {
      processedInitial.current = true;
      sendMessage(initialMessage);
    }
  }, [initialMessage, sendMessage]);

  return (
    <div className="flex flex-col h-full">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
        {messages.map((msg) => (
          <motion.div
            key={msg.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
          >
            {/* Avatar */}
            {msg.role === 'coach' ? (
              <CoachAvatar size="sm" className="mt-1" />
            ) : (
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gold to-gold-dark flex items-center justify-center text-dark-bg text-sm font-bold mt-1 shrink-0">
                U
              </div>
            )}

            {/* Bubble */}
            <div
              className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                msg.role === 'user'
                  ? 'bg-gold/15 text-white border border-gold/20'
                  : 'bg-white/5 text-white/80 border border-white/5'
              }`}
            >
              {msg.content.split('\n').map((line, i) => (
                <p key={i} className={i > 0 ? 'mt-2' : ''}>
                  {line}
                </p>
              ))}
            </div>
          </motion.div>
        ))}

        {/* Typing indicator */}
        {isTyping && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex gap-3"
          >
            <CoachAvatar size="sm" speaking className="mt-1" />
            <div className="bg-white/5 border border-white/5 rounded-2xl px-4 py-3 flex items-center gap-2">
              <Loader2 className="w-4 h-4 text-gold animate-spin" />
              <span className="text-white/40 text-sm">Andrew is thinking...</span>
            </div>
          </motion.div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input area */}
      <div className="border-t border-white/5 px-4 py-3 bg-card-bg/50">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            sendMessage(input);
          }}
          className="flex items-center gap-3 max-w-3xl mx-auto"
        >
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask Andrew anything about poker..."
            className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-gold/40 focus:bg-white/[0.07] transition-all"
            disabled={isTyping}
          />
          <button
            type="submit"
            disabled={!input.trim() || isTyping}
            className="p-3 rounded-xl bg-gold/15 text-gold hover:bg-gold/25 transition-all disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
          >
            <Send className="w-5 h-5" />
          </button>
        </form>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   MAIN PAGE
   ───────────────────────────────────────────────────────────── */

export default function CoachPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [pendingTopic, setPendingTopic] = useState<string | undefined>(undefined);
  const [chatKey, setChatKey] = useState(0);

  /* Attempt to import ChatInterface */
  let ChatInterface: React.ComponentType<{ fullPage: boolean; initialMessage?: string }> | null = null;
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    ChatInterface = require('@/components/coach/ChatInterface').default;
  } catch {
    ChatInterface = null;
  }

  const handleTopicClick = (message: string) => {
    setPendingTopic(message);
    setChatKey((k) => k + 1);
    // Auto-close sidebar on mobile
    if (typeof window !== 'undefined' && window.innerWidth < 768) {
      setSidebarOpen(false);
    }
  };

  return (
    <div className="flex h-[calc(100vh-4rem)] overflow-hidden">
      {/* ── Sidebar ── */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.aside
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 300, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="hidden md:flex flex-col border-r border-white/5 bg-card-bg/50 overflow-hidden shrink-0"
          >
            <div className="p-6 space-y-6 w-[300px]">
              {/* Andrew's profile */}
              <div className="text-center">
                <div className="mx-auto mb-3">
                  <CoachAvatar size="lg" className="mx-auto" />
                </div>
                <h2 className="text-lg font-bold text-white">Coach Andrew</h2>
                <p className="text-sm text-gold/70">Your AI Poker Coach</p>
                <div className="flex items-center justify-center gap-1.5 mt-2">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-xs text-white/40">Online 24/7</span>
                </div>
              </div>

              <div className="h-px bg-white/5" />

              {/* Quick Topics */}
              <div>
                <h3 className="text-xs font-semibold text-white/30 uppercase tracking-wider mb-3 flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5" />
                  Quick Topics
                </h3>
                <div className="space-y-2">
                  {QUICK_TOPICS.map((topic) => (
                    <button
                      key={topic.label}
                      onClick={() => handleTopicClick(topic.message)}
                      className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-white/60 hover:text-white hover:bg-white/5 transition-all cursor-pointer group text-left"
                    >
                      <span className="text-gold/50 group-hover:text-gold transition-colors">
                        {topic.icon}
                      </span>
                      {topic.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="h-px bg-white/5" />

              {/* Pro tip */}
              <div className="rounded-xl border border-gold/10 bg-gold/5 p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Bot className="w-4 h-4 text-gold" />
                  <span className="text-xs font-semibold text-gold">Pro Tip</span>
                </div>
                <p className="text-xs text-white/40 leading-relaxed">
                  Paste your hand history directly into the chat and Andrew will analyze it move by move.
                </p>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* ── Main Chat Area ── */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Chat header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-white/5 bg-card-bg/30 shrink-0">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="hidden md:flex p-2 rounded-lg text-white/40 hover:text-white hover:bg-white/5 transition-all cursor-pointer"
              title={sidebarOpen ? 'Close sidebar' : 'Open sidebar'}
            >
              {sidebarOpen ? (
                <PanelLeftClose className="w-5 h-5" />
              ) : (
                <PanelLeftOpen className="w-5 h-5" />
              )}
            </button>
            <div>
              <h1 className="text-lg font-bold text-white">
                Chat with <span className="text-gold-gradient">Coach Andrew</span>
              </h1>
              <p className="text-xs text-white/30">
                Ask anything about poker strategy, hand review, or game theory
              </p>
            </div>
          </div>
        </div>

        {/* Mobile quick topics (horizontal scroll) */}
        <div className="md:hidden flex gap-2 px-4 py-2 overflow-x-auto border-b border-white/5 bg-card-bg/20 shrink-0">
          {QUICK_TOPICS.map((topic) => (
            <button
              key={topic.label}
              onClick={() => handleTopicClick(topic.message)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium text-white/50 bg-white/5 border border-white/5 hover:text-gold hover:border-gold/20 transition-all whitespace-nowrap cursor-pointer shrink-0"
            >
              {topic.icon}
              {topic.label}
            </button>
          ))}
        </div>

        {/* Chat interface */}
        <div className="flex-1 min-h-0">
          {ChatInterface ? (
            <ChatInterface
              key={chatKey}
              fullPage={true}
              initialMessage={pendingTopic}
            />
          ) : (
            <FallbackChat key={chatKey} initialMessage={pendingTopic} />
          )}
        </div>
      </div>
    </div>
  );
}
