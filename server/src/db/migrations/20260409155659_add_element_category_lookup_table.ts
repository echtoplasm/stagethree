import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('element_category_emc', (table) => {
    table.increments('id_emc').primary();
    table.string('name_emc', 100).notNullable().unique();
    table.timestamp('created_at_emc', { useTz: true }).defaultTo(knex.fn.now());
  });
  await knex.schema.table('element_type_elt', (table) => {
    table.integer('id_emc_elt').references('id_emc').inTable('element_category_emc').onDelete('SET NULL');
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.table('element_type_elt', (table) => {
    table.dropForeign('id_emc_elt');
    table.dropColumn('id_emc_elt');
  });
  await knex.schema.dropTableIfExists('element_category_emc');
}
