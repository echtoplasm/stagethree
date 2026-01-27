import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('image_img', (table) => {
    table.increments('id_img').primary();
    table.string('name_img', 255).notNullable();
    table.string('file_path_img', 500).notNullable();
    table.string('file_type_img', 50);
    table.string('category_img', 100);
    table.timestamp('created_at_img').defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists('image_img');
}
