import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';
import { organizations } from './tenants';
import { users } from './users';

export const properties = pgTable('properties', {
  id: uuid('id').defaultRandom().primaryKey(),
  organizationId: uuid('organization_id')
    .references(() => organizations.id)
    .notNull(),
  tenantId: uuid('tenant_id').references(() => users.id),
  addressLine1: text('address_line_1').notNull(),
  addressLine2: text('address_line_2'),
  city: text('city').notNull(),
  postcode: text('postcode').notNull(),
  propertyType: text('property_type'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});
