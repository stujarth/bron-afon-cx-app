'use client';

import { useState, useRef, useEffect } from 'react';
import { useParams } from 'next/navigation';
import {
  Send,
  Bot,
  User,
  Sparkles,
  X,
  MessageCircle,
  Minimize2,
  Maximize2,
} from 'lucide-react';

interface Message {
  id: string;
  role: 'assistant' | 'user';
  content: string;
  timestamp: Date;
  quickReplies?: string[];
}

const RESPONSES_EN: Record<string, { reply: string; quickReplies?: string[] }> = {
  default: {
    reply: "I'm not sure I understood. Try asking about repairs, rent, or account updates. Or type 'speak to someone' to talk to our team.",
    quickReplies: ['Report a repair', 'Rent question', 'Speak to someone'],
  },
  greeting: {
    reply: "Hi there! 👋 I'm your Hafan AI assistant. How can I help you today?",
    quickReplies: ['Report a repair', 'Check my rent', 'Update my details'],
  },
  repair: {
    reply: "I can help with repairs! What would you like to do?\n\n🔧 Report a new repair\n📍 Track an existing repair\n📸 Diagnose an issue with a photo",
    quickReplies: ['Report new repair', 'Track my repair', 'Diagnose issue'],
  },
  rent: {
    reply: "💰 Your rent account:\n\n**Balance:** £125.50 in credit\n**Weekly:** £98.75\n**Next payment:** 18 April\n\n✅ All good — you're in credit!",
    quickReplies: ['Make payment', 'Payment history', 'Back to menu'],
  },
  track: {
    reply: "🔧 **REP-2026-0412** — Leaking tap\n📊 Status: Engineer on the way\n📅 ETA: Today, 2:00 PM\n\nStep 4 of 5 — your engineer Dai Evans is heading over now.",
    quickReplies: ['Open full tracker', 'Call engineer', 'Back to menu'],
  },
  speak: {
    reply: "I'll connect you to our team:\n\n📞 **0800 123 4567** (Mon-Fri 8am-6pm)\n💬 Live chat — available now\n📧 support@bronafon.org.uk",
    quickReplies: ['Call now', 'Start live chat', 'Back to menu'],
  },
  back: {
    reply: "What can I help with?",
    quickReplies: ['Report a repair', 'Check rent', 'Update details', 'Speak to someone'],
  },
};

const RESPONSES_CY: Record<string, { reply: string; quickReplies?: string[] }> = {
  default: {
    reply: "Nid wyf yn siŵr i mi ddeall. Gallwch ofyn am atgyweiriadau, rhent, neu ddiweddaru cyfrif. Neu deipiwch 'siarad â rhywun' i siarad â'n tîm.",
    quickReplies: ['Adrodd atgyweiriad', 'Cwestiwn rhent', 'Siarad â rhywun'],
  },
  greeting: {
    reply: "Helo! 👋 Fi yw eich cynorthwyydd AI Hafan. Sut alla i helpu heddiw?",
    quickReplies: ['Adrodd atgyweiriad', 'Gwirio fy rhent', 'Diweddaru manylion'],
  },
  repair: {
    reply: "Galla i helpu gydag atgyweiriadau! Beth hoffech ei wneud?\n\n🔧 Adrodd atgyweiriad newydd\n📍 Tracio atgyweiriad cyfredol\n📸 Diagnosio problem gyda llun",
    quickReplies: ['Atgyweiriad newydd', 'Tracio atgyweiriad', 'Diagnosio'],
  },
  rent: {
    reply: "💰 Eich cyfrif rhent:\n\n**Balans:** £125.50 mewn credyd\n**Wythnosol:** £98.75\n**Taliad nesaf:** 18 Ebrill\n\n✅ Popeth yn iawn — rydych chi mewn credyd!",
    quickReplies: ['Gwneud taliad', 'Hanes taliadau', 'Dewislen'],
  },
  track: {
    reply: "🔧 **REP-2026-0412** — Tap yn gollwng\n📊 Statws: Peiriannydd ar y ffordd\n📅 Cyrraedd: Heddiw, 2:00 PM\n\nCam 4 o 5 — mae eich peiriannydd Dai Evans yn dod nawr.",
    quickReplies: ['Agor tracio llawn', 'Ffonio peiriannydd', 'Dewislen'],
  },
  speak: {
    reply: "Fe'ch cysylltaf â'n tîm:\n\n📞 **0800 123 4567** (Llun-Gwe 8am-6pm)\n💬 Sgwrs fyw — ar gael nawr\n📧 support@bronafon.org.uk",
    quickReplies: ['Ffonio nawr', 'Dechrau sgwrs fyw', 'Dewislen'],
  },
  back: {
    reply: "Sut alla i helpu?",
    quickReplies: ['Adrodd atgyweiriad', 'Gwirio rhent', 'Diweddaru manylion', 'Siarad â rhywun'],
  },
};

function findResponse(input: string, locale: string): { reply: string; quickReplies?: string[] } {
  const lower = input.toLowerCase().trim();
  const responses = locale === 'cy' ? RESPONSES_CY : RESPONSES_EN;

  // Welsh patterns
  if (locale === 'cy') {
    if (/^(helo|shwmae|bore da|prynhawn da|noswaith)/.test(lower)) return responses.greeting;
    if (/atgyweir|trwsio|difrod|gollwng|torri/.test(lower)) return responses.repair;
    if (/rhent|tâl|taliad|balans|arian/.test(lower)) return responses.rent;
    if (/tracio|ble|pryd|statws/.test(lower)) return responses.track;
    if (/siarad|person|dyn|ffonio/.test(lower)) return responses.speak;
    if (/dewislen|n[ôo]l|yn [ôo]l/.test(lower)) return responses.back;
  }

  // English patterns
  if (/^(hi|hello|hey)/.test(lower)) return responses.greeting;
  if (/repair|fix|broken|leak|drip|damage/.test(lower)) return responses.repair;
  if (/rent|payment|balance|pay|money|credit/.test(lower)) return responses.rent;
  if (/track|status|progress|where|when/.test(lower)) return responses.track;
  if (/speak|talk|call|human|agent|person/.test(lower)) return responses.speak;
  if (/back|menu|home/.test(lower)) return responses.back;

  return responses.default;
}

function TypingIndicator() {
  return (
    <div className="flex gap-2">
      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary-100">
        <Bot className="h-3 w-3 text-primary-700" />
      </div>
      <div className="rounded-2xl rounded-tl-none bg-muted px-3 py-2">
        <div className="flex gap-1">
          <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground/40 animate-bounce" style={{ animationDelay: '0ms' }} />
          <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground/40 animate-bounce" style={{ animationDelay: '150ms' }} />
          <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground/40 animate-bounce" style={{ animationDelay: '300ms' }} />
        </div>
      </div>
    </div>
  );
}

function MessageBubble({ message }: { message: Message }) {
  const isUser = message.role === 'user';
  return (
    <div className={`flex gap-2 ${isUser ? 'flex-row-reverse' : ''}`}>
      <div className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${
        isUser ? 'bg-primary-600' : 'bg-primary-100'
      }`}>
        {isUser ? <User className="h-3 w-3 text-white" /> : <Bot className="h-3 w-3 text-primary-700" />}
      </div>
      <div className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm ${
        isUser ? 'rounded-tr-none bg-primary-600 text-white' : 'rounded-tl-none bg-muted text-foreground'
      }`}>
        <div className="whitespace-pre-wrap leading-relaxed" dangerouslySetInnerHTML={{
          __html: message.content
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\n/g, '<br/>')
        }} />
      </div>
    </div>
  );
}

export default function FloatingChat() {
  const params = useParams();
  const locale = (params?.locale as string) || 'en';
  const isWelsh = locale === 'cy';

  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [unreadCount, setUnreadCount] = useState(1);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialise greeting message based on locale
  useEffect(() => {
    const greeting = isWelsh
      ? {
          id: '1',
          role: 'assistant' as const,
          content: "Helo! 👋 Croeso i Bron Afon. Fi yw'ch cynorthwyydd AI. Sut alla i helpu heddiw?",
          timestamp: new Date(),
          quickReplies: ['Adrodd atgyweiriad', 'Gwirio rhent', 'Siarad â rhywun'],
        }
      : {
          id: '1',
          role: 'assistant' as const,
          content: "Helo! 👋 I'm your Hafan AI assistant. Ask me about repairs, rent, or anything else — I'm here to help.",
          timestamp: new Date(),
          quickReplies: ['Report a repair', 'Check my rent', 'Speak to someone'],
        };
    setMessages([greeting]);
  }, [isWelsh]);

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

    await new Promise((r) => setTimeout(r, 800 + Math.random() * 800));

    const response = findResponse(text, locale);
    setMessages((prev) => [...prev, {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: response.reply,
      timestamp: new Date(),
      quickReplies: response.quickReplies,
    }]);
    setIsTyping(false);
  };

  const handleOpen = () => {
    setIsOpen(true);
    setIsMinimized(false);
    setUnreadCount(0);
  };

  const lastMessage = messages[messages.length - 1];
  const quickReplies = lastMessage?.quickReplies;

  return (
    <>
      {/* Floating button — visible when closed */}
      {!isOpen && (
        <button
          onClick={handleOpen}
          className="group fixed bottom-24 right-4 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-primary-600 to-primary-800 text-white shadow-lg transition-all hover:scale-110 hover:shadow-xl lg:bottom-6 lg:right-6 lg:h-16 lg:w-16"
          aria-label={isWelsh ? 'Agor cynorthwyydd AI' : 'Open AI assistant'}
        >
          <MessageCircle className="h-6 w-6 lg:h-7 lg:w-7" />
          {unreadCount > 0 && (
            <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-secondary-500 text-[10px] font-bold text-white ring-2 ring-background">
              {unreadCount}
            </span>
          )}
          <span className="pointer-events-none absolute right-full mr-3 whitespace-nowrap rounded-lg bg-foreground px-3 py-1.5 text-xs text-background opacity-0 shadow-md transition-opacity group-hover:opacity-100">
            {isWelsh ? 'Gofyn i Hafan AI' : 'Ask Hafan AI'}
          </span>
        </button>
      )}

      {/* Chat panel */}
      {isOpen && (
        <div
          className={`fixed z-50 flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-2xl transition-all ${
            isMinimized
              ? 'bottom-24 right-4 h-14 w-72 lg:bottom-6 lg:right-6'
              : 'inset-x-4 bottom-24 top-24 lg:bottom-6 lg:right-6 lg:left-auto lg:top-auto lg:h-[600px] lg:w-[400px]'
          }`}
        >
          {/* Header */}
          <div
            className="flex cursor-pointer items-center gap-3 border-b border-border bg-gradient-to-r from-primary-700 to-primary-900 p-3 text-white"
            onClick={() => isMinimized && setIsMinimized(false)}
          >
            <div className="relative">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
                <Bot className="h-4 w-4" />
              </div>
              <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-primary-900 bg-green-400" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold">Hafan AI</p>
              {!isMinimized && (
                <p className="flex items-center gap-1 text-[10px] text-white/80">
                  <Sparkles className="h-2.5 w-2.5" />
                  {isWelsh ? 'Ar-lein' : 'Online'}
                </p>
              )}
            </div>
            <button
              onClick={(e) => { e.stopPropagation(); setIsMinimized(!isMinimized); }}
              className="rounded-full p-1.5 text-white/80 transition-colors hover:bg-white/10 hover:text-white"
              aria-label={isMinimized ? 'Expand chat' : 'Minimise chat'}
            >
              {isMinimized ? <Maximize2 className="h-3.5 w-3.5" /> : <Minimize2 className="h-3.5 w-3.5" />}
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); setIsOpen(false); }}
              className="rounded-full p-1.5 text-white/80 transition-colors hover:bg-white/10 hover:text-white"
              aria-label={isWelsh ? 'Cau' : 'Close'}
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>

          {!isMinimized && (
            <>
              {/* Messages */}
              <div className="flex-1 space-y-3 overflow-y-auto bg-background p-3">
                {messages.map((msg) => <MessageBubble key={msg.id} message={msg} />)}
                {isTyping && <TypingIndicator />}
                <div ref={messagesEndRef} />
              </div>

              {/* Quick replies */}
              {quickReplies && !isTyping && (
                <div className="flex flex-wrap gap-1.5 border-t border-border bg-background px-3 py-2">
                  {quickReplies.map((reply) => (
                    <button
                      key={reply}
                      onClick={() => sendMessage(reply)}
                      className="rounded-full border border-primary-200 bg-primary-50 px-2.5 py-1 text-[11px] font-medium text-primary-700 transition-colors hover:bg-primary-100"
                    >
                      {reply}
                    </button>
                  ))}
                </div>
              )}

              {/* Input */}
              <form
                onSubmit={(e) => { e.preventDefault(); sendMessage(input); }}
                className="border-t border-border bg-background p-2"
              >
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder={isWelsh ? 'Teipiwch eich neges...' : 'Type your message...'}
                    className="flex-1 rounded-full border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
                    aria-label="Message"
                    disabled={isTyping}
                  />
                  <button
                    type="submit"
                    disabled={!input.trim() || isTyping}
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-600 text-white transition-colors hover:bg-primary-700 disabled:opacity-50"
                    aria-label="Send"
                  >
                    <Send className="h-3.5 w-3.5" />
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      )}
    </>
  );
}
