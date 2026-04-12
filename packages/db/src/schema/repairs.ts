import { integer, pgEnum, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';
import { properties } from './properties';
import { users } from './users';

export const repairStatusEnum = pgEnum('repair_status', [
  'reported',
  'triaging',
  'scheduled',
  'in_progress',
  'completed',
  'cancelled',
]);

export const repairPriorityEnum = pgEnum('repair_priority', [
  'emergency',
  'urgent',
  'routine',
]);

export const repairs = pgTable('repairs', {
  id: uuid('id').defaultRandom().primaryKey(),
  propertyId: uuid('property_id')
    .references(() => properties.id)
    .notNull(),
  reportedBy: uuid('reported_by')
    .references(() => users.id)
    .notNull(),
  assignedTo: uuid('assigned_to').references(() => users.id),
  title: text('title').notNull(),
  description: text('description').notNull(),
  category: text('category'),
  status: repairStatusEnum('status').default('reported').notNull(),
  priority: repairPriorityEnum('priority').default('routine').notNull(),
  diagnosticNotes: text('diagnostic_notes'),
  estimatedCompletionDate: timestamp('estimated_completion_date'),
  completedAt: timestamp('completed_at'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const repairImages = pgTable('repair_images', {
  id: uuid('id').defaultRandom().primaryKey(),
  repairId: uuid('repair_id')
    .references(() => repairs.id)
    .notNull(),
  url: text('url').notNull(),
  description: text('description'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const repairUpdates = pgTable('repair_updates', {
  id: uuid('id').defaultRandom().primaryKey(),
  repairId: uuid('repair_id')
    .references(() => repairs.id)
    .notNull(),
  status: repairStatusEnum('status').notNull(),
  message: text('message').notNull(),
  updatedBy: uuid('updated_by').references(() => users.id),
  stepNumber: integer('step_number'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});
