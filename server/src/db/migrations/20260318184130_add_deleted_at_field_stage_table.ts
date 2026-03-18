import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable('stage_stg', (table) => {
    table.timestamp('deleted_at_stg').nullable().defaultTo(null);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable('stage_stg', (table) => {
    table.dropColumn('deleted_at_stg');
  });
}
