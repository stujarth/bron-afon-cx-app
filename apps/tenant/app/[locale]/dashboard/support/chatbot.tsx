'use client';

import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles, Phone, Wrench, PoundSterling, HelpCircle, X } from 'lucide-react';

interface Message {
  id: string;
  role: 'assistant' | 'user';
  content: string;
  timestamp: Date;
  quickReplies?: string[];
}

const RESPONSES: Record<string, { reply: string; quickReplies?: string[] }> = {
  default: {
    reply: "I'm not sure I understood that. Could you try rephrasing? I can help with repairs, rent, account queries, and general housing questions. Or I can connect you to our team.",
    quickReplies: ['Report a repair', 'Rent question', 'Speak to someone'],
  },
  greeting: {
    reply: "Helo! 👋 Croeso — welcome to Bron Afon support. I'm your Hafan AI assistant. How can I help you today?",
    quickReplies: ['Report a repair', 'Check my rent', 'Update my details', 'Something else'],
  },
  repair: {
    reply: "I can help with repairs! Here's what I can do:\n\n🔧 **Report a new repair** — I'll guide you through it step by step\n📍 **Track an existing repair** — check the status of REP-2026-0412\n📸 **Diagnose an issue** — upload a photo and I'll try to identify the problem\n\nWhat would you like to do?",
    quickReplies: ['Report new repair', 'Track my repair', 'Diagnose an issue'],
  },
  'report new repair': {
    reply: "Let's get your repair reported! First, which room is the issue in?\n\n• Kitchen\n• Bathroom\n• Bedroom\n• Living room\n• Hallway\n• External / Garden",
    quickReplies: ['Kitchen', 'Bathroom', 'Bedroom', 'External'],
  },
  kitchen: {
    reply: "Got it — a kitchen issue. What type of problem are you experiencing?\n\n💧 **Plumbing** — leaks, drips, blocked drains\n⚡ **Electrical** — sockets, lights, appliances\n🪟 **Windows/Doors** — handles, locks, draughts\n🔥 **Heating** — boiler, radiators, hot water",
    quickReplies: ['Plumbing', 'Electrical', 'Heating'],
  },
  plumbing: {
    reply: "I've started a repair request for a **plumbing issue in the kitchen**.\n\n📋 **Reference:** REP-2026-0413\n📅 **Next step:** An assessor will review within 24 hours\n\nWould you like to add photos to help our team? You can do this from the repair tracker.\n\n✅ Your request has been logged! You'll receive updates via your preferred notification method.",
    quickReplies: ['Track this repair', 'Report another', 'Back to menu'],
  },
  rent: {
    reply: "Here's your rent account summary:\n\n💰 **Balance:** £125.50 in credit\n📅 **Weekly rent:** £98.75\n📅 **Next payment:** 18 April 2026 (Direct Debit)\n\n✅ Your account is in good standing. Your last 4 payments were all on time — that's earned you **20 bonus points!**",
    quickReplies: ['Make a payment', 'Payment history', 'Back to menu'],
  },
  'check my rent': {
    reply: "Here's your rent account summary:\n\n💰 **Balance:** £125.50 in credit\n📅 **Weekly rent:** £98.75\n📅 **Next payment:** 18 April 2026 (Direct Debit)\n\n✅ Your account is in good standing!",
    quickReplies: ['Make a payment', 'Payment history', 'Back to menu'],
  },
  'track my repair': {
    reply: "I found your active repair:\n\n🔧 **REP-2026-0412** — Leaking tap in kitchen\n📊 **Status:** Engineer on the way\n👷 **Engineer:** Dai Evans (Plumbing)\n📅 **ETA:** 15 April 2026, 2:00 PM\n\nYour repair is at step 4 of 5. Would you like to see the full tracker?",
    quickReplies: ['Open repair tracker', 'Call engineer', 'Back to menu'],
  },
  'speak to someone': {
    reply: "I'll connect you to our contact centre. Here are your options:\n\n📞 **Call us:** 0800 123 4567 (Mon-Fri, 8am-6pm)\n💬 **Live chat:** Available now — average wait 2 minutes\n📧 **Email:** support@bronafon.org.uk\n\nWould you like me to transfer you to a live agent?",
    quickReplies: ['Transfer to agent', 'Call instead', 'Back to menu'],
  },
  'update my details': {
    reply: "I can help you update your details. What would you like to change?\n\n📱 Phone number\n📧 Email address\n🏠 Report a change of circumstances\n🌐 Language preference (English/Cymraeg)\n🔔 Notification preferences",
    quickReplies: ['Phone number', 'Email', 'Language', 'Notifications'],
  },
  'diagnose an issue': {
    reply: "Great idea! Our diagnostic tool can help identify the problem before we send someone out.\n\n📸 **Upload a photo** of the issue and I'll analyse it using AI to:\n• Identify the likely problem\n• Suggest any quick fixes you could try\n• Recommend the right trade for the repair\n\nHead to the **Diagnostics** section to upload a photo, or describe what you're seeing.",
    quickReplies: ['Go to diagnostics', 'Describe the issue', 'Back to menu'],
  },
  'back to menu': {
    reply: "No problem! What else can I help with?",
    quickReplies: ['Report a repair', 'Check my rent', 'Update my details', 'Speak to someone'],
  },
};

function findResponse(input: string): { reply: string; quickReplies?: string[] } {
  const lower = input.toLowerCase().trim();

  if (/^(hi|hello|hey|helo|bore da|shwmae|prynhawn da)/.test(lower)) {
    return RESPONSES.greeting;
  }
  if (/repair|fix|broken|leak|drip|damage/.test(lower)) {
    return RESPONSES.repair;
  }
  if (/rent|payment|balance|pay|money|arrears|credit/.test(lower)) {
    return RESPONSES.rent;
  }
  if (/speak|talk|call|human|agent|person|phone/.test(lower)) {
    return RESPONSES['speak to someone'];
  }
  if (/track|status|progress|where|when/.test(lower)) {
    return RESPONSES['track my repair'];
  }
  if (/detail|update|change|address|phone|email/.test(lower)) {
    return RESPONSES['update my details'];
  }
  if (/diagnos|photo|picture|image|identify/.test(lower)) {
    return RESPONSES['diagnose an issue'];
  }

  const exactMatch = RESPONSES[lower];
  if (exactMatch) return exactMatch;

  for (const [key, value] of Object.entries(RESPONSES)) {
    if (lower.includes(key)) return value;
  }

  return RESPONSES.default;
}

function TypingIndicator() {
  return (
    <div className="flex gap-3">
      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary-100">
        <Bot className="h-3.5 w-3.5 text-primary-700" />
      </div>
      <div className="rounded-2xl rounded-tl-none bg-muted px-4 py-3">
        <div className="flex gap-1">
          <span className="h-2 w-2 rounded-full bg-muted-foreground/40 animate-bounce" style={{ animationDelay: '0ms' }} />
          <span className="h-2 w-2 rounded-full bg-muted-foreground/40 animate-bounce" style={{ animationDelay: '150ms' }} />
          <span className="h-2 w-2 rounded-full bg-muted-foreground/40 animate-bounce" style={{ animationDelay: '300ms' }} />
        </div>
      </div>
    </div>
  );
}

function MessageBubble({ message }: { message: Message }) {
  const isUser = message.role === 'user';

  return (
    <div className={`flex gap-3 ${isUser ? 'flex-row-reverse' : ''}`}>
      <div className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${
        isUser ? 'bg-primary-600' : 'bg-primary-100'
      }`}>
        {isUser ? (
          <User className="h-3.5 w-3.5 text-white" />
        ) : (
          <Bot className="h-3.5 w-3.5 text-primary-700" />
        )}
      </div>
      <div
        className={`max-w-[80%] rounded-2xl px-4 py-2.5 ${
          isUser
            ? 'rounded-tr-none bg-primary-600 text-white'
            : 'rounded-tl-none bg-muted text-foreground'
        }`}
      >
        <div className="whitespace-pre-wrap text-sm leading-relaxed" dangerouslySetInnerHTML={{
          __html: message.content
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\n/g, '<br/>')
        }} />
        <p className={`mt-1 text-[10px] ${isUser ? 'text-primary-200' : 'text-muted-foreground'}`}>
          {message.timestamp.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}
        </p>
      </div>
    </div>
  );
}

export default function Chatbot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: "Helo! 👋 Croeso i Bron Afon. I'm your Hafan AI assistant. I can help with repairs, rent queries, account updates, and more. How can I help you today?",
      timestamp: new Date(),
      quickReplies: ['Report a repair', 'Check my rent', 'Update my details', 'Speak to someone'],
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: text,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    await new Promise((resolve) => setTimeout(resolve, 800 + Math.random() * 1200));

    const response = findResponse(text);

    const botMsg: Message = {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: response.reply,
      timestamp: new Date(),
      quickReplies: response.quickReplies,
    };

    setIsTyping(false);
    setMessages((prev) => [...prev, botMsg]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  const lastMessage = messages[messages.length - 1];
  const quickReplies = lastMessage?.quickReplies;

  return (
    <div className="flex h-[600px] flex-col rounded-xl border border-border bg-card shadow-sm">
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-border p-4">
        <div className="relative">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-100">
            <Bot className="h-5 w-5 text-primary-700" />
          </div>
          <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-card bg-green-500" />
        </div>
        <div className="flex-1">
          <p className="text-sm font-semibold text-card-foreground">Hafan AI Assistant</p>
          <div className="flex items-center gap-1">
            <Sparkles className="h-3 w-3 text-primary-500" />
            <p className="text-xs text-green-600">Online — powered by AI</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 space-y-4 overflow-y-auto p-4">
        {messages.map((msg) => (
          <MessageBubble key={msg.id} message={msg} />
        ))}
        {isTyping && <TypingIndicator />}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick replies */}
      {quickReplies && !isTyping && (
        <div className="flex flex-wrap gap-2 border-t border-border px-4 py-3">
          {quickReplies.map((reply) => (
            <button
              key={reply}
              onClick={() => sendMessage(reply)}
              className="rounded-full border border-primary-200 bg-primary-50 px-3 py-1.5 text-xs font-medium text-primary-700 transition-colors hover:bg-primary-100"
            >
              {reply}
            </button>
          ))}
        </div>
      )}

      {/* Input */}
      <form onSubmit={handleSubmit} className="border-t border-border p-3">
        <div className="flex items-center gap-2">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 rounded-full border border-input bg-background px-4 py-2.5 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            aria-label="Chat message"
            disabled={isTyping}
          />
          <button
            type="submit"
            disabled={!input.trim() || isTyping}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-600 text-white transition-colors hover:bg-primary-700 disabled:opacity-50"
            aria-label="Send message"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
      </form>
    </div>
  );
}
