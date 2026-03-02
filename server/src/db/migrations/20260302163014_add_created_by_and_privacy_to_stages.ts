import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  return knex.schema.table('stage_stg', (table) => {
    table.integer('created_by_stg').references('id_usr').inTable('user_usr').nullable();
    table.boolean('is_public_stg').defaultTo(false);
  })
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.table('stage_stg', (table) => {
    table.dropColumn('created_by_stg');
    table.dropColumn('is_public_stg')
  })
}

