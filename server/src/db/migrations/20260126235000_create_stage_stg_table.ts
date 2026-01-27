import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('stage_stg', (table) => {
    table.increments('id_stg').primary();
    table.integer('id_ven_stg');
    table.string('name_stg', 255).notNullable();
    table.decimal('width_stg', 10, 2).notNullable();
    table.decimal('depth_stg', 10, 2).notNullable();
    table.decimal('height_stg', 10, 2);
    table.timestamp('created_at_stg').defaultTo(knex.fn.now());
    
    table.foreign('id_ven_stg')
         .references('id_ven')
         .inTable('venue_ven')
         .onDelete('SET NULL');
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists('stage_stg');
}

