import { pgEnum, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';
import { organizations } from './tenants';

export const userRoleEnum = pgEnum('user_role', ['tenant', 'staff', 'admin']);

export const users = pgTable('users', {
  id: uuid('id').defaultRandom().primaryKey(),
  organizationId: uuid('organization_id')
    .references(() => organizations.id)
    .notNull(),
  email: text('email').notNull().unique(),
  name: text('name').notNull(),
  phone: text('phone'),
  role: userRoleEnum('role').default('tenant').notNull(),
  preferredLanguage: text('preferred_language').default('en').notNull(),
  avatarUrl: text('avatar_url'),
  microsoftId: text('microsoft_id'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});
