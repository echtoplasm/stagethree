import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('equipment_type', (table) => {
    table.increments('equipment_type_id').primary();
    table.string('name', 255).notNullable();
    table.text('description');
    table.string('default_model_path', 255);
    table.string('default_color', 7);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists('equipment_type');
}
