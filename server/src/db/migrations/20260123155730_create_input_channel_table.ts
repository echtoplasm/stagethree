import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('input_channel', (table) => {
    table.increments('input_channel_id').primary();
    table.integer('stage_plot_id').notNullable();
    table.integer('channel_number').notNullable();
    table.string('instrument_name', 255).notNullable();
    table.string('mic_type', 100);
    table.text('notes');
    table.timestamp('created_at').defaultTo(knex.fn.now());
    
    table.foreign('stage_plot_id')
         .references('stage_plot_id')
         .inTable('stage_plot')
         .onDelete('CASCADE');
    
    table.unique(['stage_plot_id', 'channel_number']);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists('input_channel');
}
