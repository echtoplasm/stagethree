import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('stage_plot', (table) => {
    table.increments('stage_plot_id').primary();
    table.integer('project_id').notNullable();
    table.integer('stage_id');
    table.string('name', 255).notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
    
    table.foreign('project_id')
         .references('project_id')
         .inTable('project')
         .onDelete('CASCADE');
    
    table.foreign('stage_id')
         .references('stage_id')
         .inTable('stage')
         .onDelete('SET NULL');
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists('stage_plot');
}
