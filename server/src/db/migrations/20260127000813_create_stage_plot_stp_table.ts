import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('stage_plot_stp', (table) => {
    table.increments('id_stp').primary();
    table.integer('id_prj_stp').notNullable();
    table.integer('id_stg_stp');
    table.string('name_stp', 255).notNullable();
    table.timestamp('created_at_stp').defaultTo(knex.fn.now());
    
    table.foreign('id_prj_stp')
         .references('id_prj')
         .inTable('project_prj')
         .onDelete('CASCADE');
    
    table.foreign('id_stg_stp')
         .references('id_stg')
         .inTable('stage_stg')
         .onDelete('SET NULL');
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists('stage_plot_stp');
}
