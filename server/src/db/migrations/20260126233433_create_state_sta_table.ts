import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('state_sta', (table) => {
    table.increments('id_sta').primary();
    table.string('name_sta', 100).notNullable().unique();
    table.string('abbreviation_sta', 2).notNullable().unique();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists('state_sta');
}
