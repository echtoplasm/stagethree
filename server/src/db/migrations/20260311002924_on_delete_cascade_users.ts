import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable('stage_stg', (table) => {
    table.dropForeign(['created_by_stg']);
    table.foreign('created_by_stg').references('id_usr').inTable('user_usr').onDelete('CASCADE');
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable('stage_stg', (table) => {
    table.dropForeign(['created_by_stg']);
    table.foreign('created_by_stg').references('id_usr').inTable('user_usr');
  });
}
