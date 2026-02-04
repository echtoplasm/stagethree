import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('role_rol', (table) => {
    table.increments('id_rol').primary();
    table.string('name_rol', 50).unique().notNullable();
    table.string('description_rol', 255);
    table.timestamp('created_at_rol').defaultTo(knex.fn.now());
  });

  await knex.schema.createTable('country_cty', (table) => {
    table.increments('id_cty').primary();
    table.specificType('code_cty', 'char(2)').unique().notNullable();
    table.string('name_cty', 100).unique().notNullable();
    table.timestamp('created_at_cty').defaultTo(knex.fn.now());
  });

  await knex.schema.createTable('image_category_imc', (table) => {
    table.increments('id_imc').primary();
    table.string('name_imc', 100).unique().notNullable();
    table.timestamp('created_at_imc').defaultTo(knex.fn.now());
  })
}


export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('image_category_imc');
  await knex.schema.dropTableIfExists('country_cty');
  await knex.schema.dropTableIfExists('role_rol');
}

