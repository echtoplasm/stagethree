import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('project_prj', (table) => {
    table.increments('id_prj').primary();
    table.integer('id_usr_prj').notNullable();
    table.string('name_prj', 255).notNullable();
    table.text('description_prj');
    table.timestamp('created_at_prj').defaultTo(knex.fn.now());
    table.timestamp('updated_at_prj').defaultTo(knex.fn.now());
    
    table.foreign('id_usr_prj')
         .references('id_usr')
         .inTable('user_usr')
         .onDelete('CASCADE');
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists('project_prj');
}
