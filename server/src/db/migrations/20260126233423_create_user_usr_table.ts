import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('user_usr', (table) => {
    table.increments('id_usr').primary();
    table.string('email_usr', 255).notNullable().unique();
    table.string('password_hash_usr', 255).notNullable();
    table.string('first_name_usr', 255).notNullable();
    table.string('last_name_usr', 255).notNullable();
    table.boolean('is_active_usr').notNullable().defaultTo(true);
    table.timestamp('created_at_usr').defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists('user_usr');
}
