import { boolean, pgEnum, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';
import { users } from './users';

export const messageChannelEnum = pgEnum('message_channel', [
  'email',
  'sms',
  'push',
  'in_app',
]);

export const communications = pgTable('communications', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id')
    .references(() => users.id)
    .notNull(),
  channel: messageChannelEnum('channel').notNull(),
  subject: text('subject'),
  body: text('body').notNull(),
  read: boolean('read').default(false).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const contactPreferences = pgTable('contact_preferences', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id')
    .references(() => users.id)
    .notNull()
    .unique(),
  emailEnabled: boolean('email_enabled').default(true).notNull(),
  smsEnabled: boolean('sms_enabled').default(true).notNull(),
  pushEnabled: boolean('push_enabled').default(true).notNull(),
  preferredLanguage: text('preferred_language').default('en').notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});
