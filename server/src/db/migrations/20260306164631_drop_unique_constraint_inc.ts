import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable('input_channel_inc', function(table) {
    table.dropUnique(['id_stp_inc', 'channel_number_inc']);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable('input_channel_inc', function(table) {
    table.unique(['id_stp_inc', 'channel_number_inc']);
  });
}
