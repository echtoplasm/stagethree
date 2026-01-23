import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('admin', (table) => {
    table.increments('admin_id').primary();
    table.integer('user_id').notNullable().unique();
    table.timestamp('assigned_date').notNullable();
    
    table.foreign('user_id')
         .references('user_id')
         .inTable('user')
         .onDelete('CASCADE');
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists('admin');
}
