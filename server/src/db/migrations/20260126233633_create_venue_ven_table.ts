import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('venue_ven', (table) => {
    table.increments('id_ven').primary();
    table.string('name_ven', 255).notNullable();
    table.string('address_ven', 255);
    table.string('city_ven', 100);
    table.integer('id_sta_ven');
    table.string('country_ven', 50);
    table.integer('capacity_ven');
    table.timestamp('created_at_ven').defaultTo(knex.fn.now());
    
    table.foreign('id_sta_ven')
         .references('id_sta')
         .inTable('state_sta')
         .onDelete('SET NULL');
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists('venue_ven');
}
