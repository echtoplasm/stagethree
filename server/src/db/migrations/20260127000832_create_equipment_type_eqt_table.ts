import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('equipment_type_eqt', (table) => {
    table.increments('id_eqt').primary();
    table.string('name_eqt', 255).notNullable();
    table.text('description_eqt');
    table.integer('id_img_eqt');
    table.string('default_color_eqt', 7);
    
    table.foreign('id_img_eqt')
         .references('id_img')
         .inTable('image_img')
         .onDelete('SET NULL');
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists('equipment_type_eqt');
}

