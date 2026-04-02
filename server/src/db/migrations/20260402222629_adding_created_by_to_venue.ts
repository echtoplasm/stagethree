import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable('venue_ven', (table) => {
    table.integer('created_by_ven').unsigned().references('id_usr').inTable('user_usr').onDelete('SET NULL');
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable('venue_ven', (table) => {
    table.dropColumn('created_by_ven');
  });
}
