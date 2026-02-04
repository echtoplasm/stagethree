// migrations/XXX_add_lookup_foreign_keys.ts
import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable('user_usr', (table) => {
    table.integer('id_rol_usr').unsigned();
  });

  await knex('user_usr').update({ id_rol_usr: 1 });

  await knex.schema.alterTable('user_usr', (table) => {
    table.integer('id_rol_usr').unsigned().notNullable().defaultTo(1).alter();
    table.foreign('id_rol_usr').references('role_rol.id_rol');
  });

  await knex.schema.alterTable('venue_ven', (table) => {
    table.integer('id_cty_ven').unsigned();
    table.foreign('id_cty_ven').references('country_cty.id_cty');
  });

  await knex.schema.alterTable('image_img', (table) => {
    table.integer('id_imc_img').unsigned();
    table.foreign('id_imc_img').references('image_category_imc.id_imc');
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable('user_usr', (table) => {
    table.dropForeign('id_rol_usr');
    table.dropColumn('id_rol_usr');
  });

  await knex.schema.alterTable('venue_ven', (table) => {
    table.dropForeign('id_cty_ven');
    table.dropColumn('id_cty_ven');
  });

  await knex.schema.alterTable('image_img', (table) => {
    table.dropForeign('id_imc_img');
    table.dropColumn('id_imc_img');
  });
}
