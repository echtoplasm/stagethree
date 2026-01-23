import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('stage', (table) => {
    table.increments('stage_id').primary();
    table.string('name', 255).notNullable();
    table.decimal('width', 10, 2).notNullable();
    table.decimal('depth', 10, 2).notNullable();
    table.decimal('height', 10, 2);
    table.timestamp('created_at').defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists('stage');
}

