import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('admin_adm', (table) => {
    table.increments('id_adm').primary();
    table.integer('id_usr_adm').notNullable().unique();
    table.timestamp('assigned_date_adm').notNullable();
    
    table.foreign('id_usr_adm')
         .references('id_usr')
         .inTable('user_usr')
         .onDelete('CASCADE');
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists('admin_adm');
}

