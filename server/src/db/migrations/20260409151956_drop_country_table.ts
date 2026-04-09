import type { Knex } from 'knex';


export async function up(knex: Knex): Promise<void> {
  await knex.schema.table('venue_ven', (table) => {
    table.dropForeign('id_cty_ven');
    table.dropColumn('id_cty_ven');
  });
  await knex.schema.dropTableIfExists('country_cty');
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.createTable('country_cty', (table) => {
    table.increments('id_cty').primary();
    table.string('code_cty', 2).notNullable().unique();
    table.string('name_cty', 100).notNullable().unique();
    table.timestamp('created_at_cty', { useTz: true }).defaultTo(knex.fn.now());
  });
  await knex.schema.table('venue_ven', (table) => {
    table.integer('id_cty_ven').references('id_cty').inTable('country_cty');
  });
}
