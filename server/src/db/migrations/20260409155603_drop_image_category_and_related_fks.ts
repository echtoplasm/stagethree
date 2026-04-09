import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.table('image_img', (table) => {
    table.dropForeign('id_imc_img');
    table.dropColumn('id_imc_img');
    table.dropColumn('category_img');
  });
  await knex.schema.dropTableIfExists('image_category_imc');
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.createTable('image_category_imc', (table) => {
    table.increments('id_imc').primary();
    table.string('name_imc', 100).notNullable().unique();
    table.timestamp('created_at_imc', { useTz: true }).defaultTo(knex.fn.now());
  });
  await knex.schema.table('image_img', (table) => {
    table.integer('id_imc_img').references('id_imc').inTable('image_category_imc');
    table.string('category_img', 100);
  });
}
