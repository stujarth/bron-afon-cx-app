'use client';

import { useState } from 'react';
import {
  ArrowLeft,
  Send,
  Paperclip,
  Check,
  CheckCheck,
  Clock,
  Wrench,
  PoundSterling,
  MessageSquare,
  Image,
  User,
  Shield,
} from 'lucide-react';

interface Message {
  id: string;
  sender: 'tenant' | 'staff';
  staffName?: string;
  staffRole?: string;
  content: string;
  timestamp: string;
  read: boolean;
  attachment?: { type: 'image' | 'document'; name: string };
}

interface Conversation {
  id: string;
  subject: string;
  category: 'repair' | 'rent' | 'general';
  lastMessage: string;
  lastMessageTime: string;
  unread: number;
  staffName: string;
  staffRole: string;
  messages: Message[];
}

const DEMO_CONVERSATIONS: Conversation[] = [
  {
    id: 'conv-1',
    subject: 'Repair: Leaking tap — REP-2026-0412',
    category: 'repair',
    lastMessage: 'Dai is on his way now, should be with you by 2pm.',
    lastMessageTime: '11:42 AM',
    unread: 1,
    staffName: 'Sara Watkins',
    staffRole: 'Repairs Coordinator',
    messages: [
      { id: 'm1', sender: 'tenant', content: 'Hi, just wanted to check if someone is coming about the leaking tap today?', timestamp: '9:15 AM', read: true },
      { id: 'm2', sender: 'staff', staffName: 'Sara Watkins', staffRole: 'Repairs Coordinator', content: "Hi Siân! Yes, our engineer Dai Evans is scheduled for today. He's finishing a job in Pontypool and will head to you next.", timestamp: '9:32 AM', read: true },
      { id: 'm3', sender: 'tenant', content: "Great, thanks. Should I turn off the water under the sink before he arrives?", timestamp: '9:45 AM', read: true },
      { id: 'm4', sender: 'staff', staffName: 'Sara Watkins', staffRole: 'Repairs Coordinator', content: "That's a great idea — it'll help Dai get started faster. Just the isolation valve under the sink is fine, no need to turn off the mains.", timestamp: '10:02 AM', read: true },
      { id: 'm5', sender: 'tenant', content: 'Done! Also, I uploaded a photo of the tap to the diagnostic tool. It said it looks like a worn washer.', timestamp: '10:15 AM', read: true, attachment: { type: 'image', name: 'kitchen-tap.jpg' } },
      { id: 'm6', sender: 'staff', staffName: 'Sara Watkins', staffRole: 'Repairs Coordinator', content: "Thanks for that Siân — the AI diagnosis matches what we expected. Dai has the parts ready. He's on his way now, should be with you by 2pm.", timestamp: '11:42 AM', read: false },
    ],
  },
  {
    id: 'conv-2',
    subject: 'Rent account query',
    category: 'rent',
    lastMessage: "Your account is in credit. The overpayment from January has been applied.",
    lastMessageTime: 'Yesterday',
    unread: 0,
    staffName: 'Rhian Thomas',
    staffRole: 'Income Officer',
    messages: [
      { id: 'r1', sender: 'tenant', content: "Hi, I think I overpaid my rent in January. Can you check my account please?", timestamp: 'Mon 10:30 AM', read: true },
      { id: 'r2', sender: 'staff', staffName: 'Rhian Thomas', staffRole: 'Income Officer', content: "Hi Siân, I've had a look at your account. You're right — there was an overpayment of £47.25 in January. This has been applied as credit to your account.", timestamp: 'Mon 2:15 PM', read: true },
      { id: 'r3', sender: 'tenant', content: "That's great, thank you. Will it just come off my next payment?", timestamp: 'Mon 3:00 PM', read: true },
      { id: 'r4', sender: 'staff', staffName: 'Rhian Thomas', staffRole: 'Income Officer', content: "Your account is in credit. The overpayment from January has been applied. Your balance shows £125.50 in credit, so your next direct debit on 18 April will still go through as normal, and you'll remain in credit afterwards. No action needed!", timestamp: 'Yesterday', read: true },
    ],
  },
  {
    id: 'conv-3',
    subject: 'Community event — Spring clean',
    category: 'general',
    lastMessage: "We'd love to have you! There'll be refreshments and a bouncy castle for the kids.",
    lastMessageTime: 'Last week',
    unread: 0,
    staffName: 'Gareth Bowen',
    staffRole: 'Community Officer',
    messages: [
      { id: 'g1', sender: 'staff', staffName: 'Gareth Bowen', staffRole: 'Community Officer', content: "Hi Siân! We're organising a community spring clean on Saturday 26 April at 10am in Heol y Castell. Would you like to join? You'll earn 25 points!", timestamp: 'Last week', read: true },
      { id: 'g2', sender: 'tenant', content: "That sounds lovely! Count me in. Can I bring my neighbour too?", timestamp: 'Last week', read: true },
      { id: 'g3', sender: 'staff', staffName: 'Gareth Bowen', staffRole: 'Community Officer', content: "We'd love to have you! There'll be refreshments and a bouncy castle for the kids. Absolutely bring your neighbour — the more the merrier. If they sign up to the app they'll get points too!", timestamp: 'Last week', read: true },
    ],
  },
];

function getCategoryIcon(category: string) {
  switch (category) {
    case 'repair': return Wrench;
    case 'rent': return PoundSterling;
    default: return MessageSquare;
  }
}

function getCategoryColor(category: string) {
  switch (category) {
    case 'repair': return 'bg-blue-100 text-blue-700';
    case 'rent': return 'bg-green-100 text-green-700';
    default: return 'bg-purple-100 text-purple-700';
  }
}

function ConversationList({
  conversations,
  selectedId,
  onSelect,
}: {
  conversations: Conversation[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}) {
  return (
    <ul className="divide-y divide-border" role="list">
      {conversations.map((conv) => {
        const Icon = getCategoryIcon(conv.category);
        const isSelected = selectedId === conv.id;
        return (
          <li key={conv.id}>
            <button
              onClick={() => onSelect(conv.id)}
              className={`flex w-full items-start gap-3 p-4 text-left transition-colors hover:bg-muted/50 ${
                isSelected ? 'bg-primary-50 border-l-2 border-l-primary-600' : ''
              }`}
            >
              <div className={`mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${getCategoryColor(conv.category)}`}>
                <Icon className="h-4 w-4" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className={`truncate text-sm ${conv.unread > 0 ? 'font-bold text-foreground' : 'font-medium text-card-foreground'}`}>
                    {conv.subject}
                  </p>
                  {conv.unread > 0 && (
                    <span className="ml-2 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary-600 text-[10px] font-bold text-white">
                      {conv.unread}
                    </span>
                  )}
                </div>
                <p className="mt-0.5 text-xs text-muted-foreground">{conv.staffName} · {conv.staffRole}</p>
                <p className={`mt-1 truncate text-xs ${conv.unread > 0 ? 'font-medium text-foreground' : 'text-muted-foreground'}`}>
                  {conv.lastMessage}
                </p>
              </div>
              <span className="shrink-0 text-[10px] text-muted-foreground">{conv.lastMessageTime}</span>
            </button>
          </li>
        );
      })}
    </ul>
  );
}

function MessageThread({ conversation, onBack }: { conversation: Conversation; onBack: () => void }) {
  const [reply, setReply] = useState('');
  const [messages, setMessages] = useState(conversation.messages);

  const sendReply = () => {
    if (!reply.trim()) return;
    setMessages([...messages, {
      id: Date.now().toString(),
      sender: 'tenant',
      content: reply,
      timestamp: 'Just now',
      read: false,
    }]);
    setReply('');
  };

  return (
    <div className="flex h-full flex-col">
      {/* Thread header */}
      <div className="flex items-center gap-3 border-b border-border p-4">
        <button
          onClick={onBack}
          className="rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-muted lg:hidden"
          aria-label="Back to inbox"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${getCategoryColor(conversation.category)}`}>
          {(() => { const Icon = getCategoryIcon(conversation.category); return <Icon className="h-4 w-4" />; })()}
        </div>
        <div className="flex-1 min-w-0">
          <p className="truncate text-sm font-semibold text-card-foreground">{conversation.subject}</p>
          <p className="text-xs text-muted-foreground">{conversation.staffName}</p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 space-y-4 overflow-y-auto p-4">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex gap-2.5 ${msg.sender === 'tenant' ? 'flex-row-reverse' : ''}`}>
            <div className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${
              msg.sender === 'tenant' ? 'bg-primary-600' : 'bg-muted'
            }`}>
              {msg.sender === 'tenant'
                ? <User className="h-3.5 w-3.5 text-white" />
                : <Shield className="h-3.5 w-3.5 text-muted-foreground" />
              }
            </div>
            <div className={`max-w-[80%] ${msg.sender === 'tenant' ? 'text-right' : ''}`}>
              {msg.sender === 'staff' && (
                <p className="mb-1 text-[10px] font-medium text-muted-foreground">
                  {msg.staffName} · {msg.staffRole}
                </p>
              )}
              <div className={`inline-block rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                msg.sender === 'tenant'
                  ? 'rounded-tr-none bg-primary-600 text-white'
                  : 'rounded-tl-none bg-muted text-foreground'
              }`}>
                {msg.content}
                {msg.attachment && (
                  <div className={`mt-2 flex items-center gap-1.5 rounded-lg p-2 text-xs ${
                    msg.sender === 'tenant' ? 'bg-primary-700' : 'bg-background'
                  }`}>
                    <Image className="h-3.5 w-3.5" />
                    {msg.attachment.name}
                  </div>
                )}
              </div>
              <div className={`mt-1 flex items-center gap-1 text-[10px] text-muted-foreground ${
                msg.sender === 'tenant' ? 'justify-end' : ''
              }`}>
                <span>{msg.timestamp}</span>
                {msg.sender === 'tenant' && (
                  msg.read
                    ? <CheckCheck className="h-3 w-3 text-primary-500" />
                    : <Check className="h-3 w-3" />
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Reply input */}
      <div className="border-t border-border p-3">
        <form onSubmit={(e) => { e.preventDefault(); sendReply(); }} className="flex items-center gap-2">
          <button type="button" className="rounded-full p-2 text-muted-foreground transition-colors hover:bg-muted" aria-label="Attach file">
            <Paperclip className="h-4 w-4" />
          </button>
          <input
            type="text"
            value={reply}
            onChange={(e) => setReply(e.target.value)}
            placeholder="Type a reply..."
            className="flex-1 rounded-full border border-input bg-background px-4 py-2.5 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
          />
          <button
            type="submit"
            disabled={!reply.trim()}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-600 text-white transition-colors hover:bg-primary-700 disabled:opacity-50"
            aria-label="Send reply"
          >
            <Send className="h-4 w-4" />
          </button>
        </form>
      </div>
    </div>
  );
}

export default function InboxPage() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selectedConv = DEMO_CONVERSATIONS.find((c) => c.id === selectedId);
  const totalUnread = DEMO_CONVERSATIONS.reduce((sum, c) => sum + c.unread, 0);

  return (
    <div className="mx-auto max-w-5xl">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Inbox</h1>
          <p className="mt-0.5 text-sm text-muted-foreground">
            {totalUnread > 0 ? `${totalUnread} unread message${totalUnread > 1 ? 's' : ''}` : 'All caught up'}
          </p>
        </div>
      </div>

      <div className="overflow-hidden rounded-xl border border-border bg-card shadow-sm">
        <div className="flex" style={{ minHeight: '600px' }}>
          {/* Conversation list */}
          <div className={`w-full border-r border-border lg:w-80 ${selectedConv ? 'hidden lg:block' : ''}`}>
            <div className="border-b border-border p-3">
              <input
                type="search"
                placeholder="Search messages..."
                className="h-9 w-full rounded-lg border border-input bg-background px-3 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
                aria-label="Search messages"
              />
            </div>
            <ConversationList
              conversations={DEMO_CONVERSATIONS}
              selectedId={selectedId}
              onSelect={setSelectedId}
            />
          </div>

          {/* Thread view */}
          <div className={`flex-1 ${!selectedConv ? 'hidden lg:flex' : 'flex'}`}>
            {selectedConv ? (
              <MessageThread
                key={selectedConv.id}
                conversation={selectedConv}
                onBack={() => setSelectedId(null)}
              />
            ) : (
              <div className="flex flex-1 flex-col items-center justify-center text-center p-8">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                  <MessageSquare className="h-8 w-8 text-muted-foreground" />
                </div>
                <p className="mt-4 text-sm font-semibold text-foreground">Select a conversation</p>
                <p className="mt-1 text-xs text-muted-foreground">Choose a message thread from the left to view it here</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
