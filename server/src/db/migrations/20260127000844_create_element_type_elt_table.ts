import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('element_type_elt', (table) => {
    table.increments('id_elt').primary();
    table.string('name_elt', 100).notNullable().unique();
    table.text('description_elt');
    table.integer('id_img_elt');
    table.string('default_color_elt', 7);
    
    table.foreign('id_img_elt')
         .references('id_img')
         .inTable('image_img')
         .onDelete('SET NULL');
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists('element_type_elt');
}
