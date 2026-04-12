import { useTranslations } from 'next-intl';
import { MessageSquare, Phone, HelpCircle, Send, Bot } from 'lucide-react';

export default function SupportPage() {
  const t = useTranslations('support');

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <h1 className="text-2xl font-bold text-foreground">{t('title')}</h1>

      {/* Support options */}
      <div className="grid gap-4 sm:grid-cols-2">
        {/* AI Chatbot */}
        <div className="rounded-xl border border-border bg-card p-6 transition-all hover:border-primary-300 hover:shadow-md">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-100">
            <Bot className="h-6 w-6 text-primary-700" aria-hidden="true" />
          </div>
          <h2 className="mt-4 font-semibold text-card-foreground">{t('chatbot')}</h2>
          <p className="mt-1 text-sm text-muted-foreground">{t('chatbotDesc')}</p>
          <button className="mt-4 inline-flex items-center gap-2 rounded-lg bg-primary-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-primary-700">
            <MessageSquare className="h-4 w-4" aria-hidden="true" />
            Start chat
          </button>
        </div>

        {/* Call us */}
        <div className="rounded-xl border border-border bg-card p-6 transition-all hover:border-primary-300 hover:shadow-md">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-100">
            <Phone className="h-6 w-6 text-green-700" aria-hidden="true" />
          </div>
          <h2 className="mt-4 font-semibold text-card-foreground">{t('callUs')}</h2>
          <p className="mt-1 text-sm text-muted-foreground">{t('callUsDesc')}</p>
          <a
            href="tel:08001234567"
            className="mt-4 inline-flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-green-700"
          >
            <Phone className="h-4 w-4" aria-hidden="true" />
            {t('callNumber')}
          </a>
        </div>
      </div>

      {/* Chat preview */}
      <section className="rounded-xl border border-border bg-card">
        <div className="flex items-center gap-3 border-b border-border p-4">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-100">
            <Bot className="h-4 w-4 text-primary-700" aria-hidden="true" />
          </div>
          <div>
            <p className="text-sm font-semibold text-card-foreground">Hafan AI Assistant</p>
            <p className="text-xs text-green-600">Online</p>
          </div>
        </div>

        <div className="space-y-4 p-4">
          <div className="flex gap-3">
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary-100">
              <Bot className="h-3.5 w-3.5 text-primary-700" aria-hidden="true" />
            </div>
            <div className="rounded-2xl rounded-tl-none bg-muted px-4 py-2.5">
              <p className="text-sm text-foreground">
                Helo! Croeso i Bron Afon. 👋 How can I help you today? I can assist
                with repairs, rent queries, and more.
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-border p-3">
          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Type your message..."
              className="flex-1 rounded-full border border-input bg-background px-4 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              aria-label="Chat message input"
            />
            <button
              className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-600 text-white transition-colors hover:bg-primary-700"
              aria-label="Send message"
            >
              <Send className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section>
        <h2 className="mb-4 text-lg font-semibold text-foreground">{t('faq')}</h2>
        <div className="space-y-2">
          {[
            'How do I report a repair?',
            'How do I pay my rent online?',
            'How do I change my contact details?',
            'What counts as an emergency repair?',
            'How do I earn reward points?',
          ].map((question) => (
            <button
              key={question}
              className="flex w-full items-center gap-3 rounded-lg border border-border bg-card p-4 text-left text-sm transition-colors hover:border-primary-300 hover:bg-primary-50"
            >
              <HelpCircle className="h-4 w-4 shrink-0 text-primary-600" aria-hidden="true" />
              <span className="text-card-foreground">{question}</span>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}
