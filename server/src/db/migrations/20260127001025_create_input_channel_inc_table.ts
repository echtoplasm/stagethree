import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('input_channel_inc', (table) => {
    table.increments('id_inc').primary();
    table.integer('id_stp_inc').notNullable();
    table.integer('channel_number_inc').notNullable();
    table.string('instrument_name_inc', 255).notNullable();
    table.string('mic_type_inc', 100);
    table.text('notes_inc');
    table.timestamp('created_at_inc').defaultTo(knex.fn.now());
    
    table.foreign('id_stp_inc')
         .references('id_stp')
         .inTable('stage_plot_stp')
         .onDelete('CASCADE');
    
    table.unique(['id_stp_inc', 'channel_number_inc']);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists('input_channel_inc');
}
