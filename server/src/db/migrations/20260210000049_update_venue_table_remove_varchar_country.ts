import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable('venue_ven', (table) => {
    table.dropColumn('country_ven');
  })
}


export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable('venue_ven', (table) => {
    table.string('country_ven', 50);
  })
}

