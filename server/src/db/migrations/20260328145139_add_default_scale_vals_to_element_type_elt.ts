import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.table('element_type_elt', function (table) {
    table.float('default_scale_x_elt').defaultTo(0.25);
    table.float('default_scale_y_elt').defaultTo(0.25);
    table.float('default_scale_z_elt').defaultTo(0.25);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.table('element_type_elt', function (table) {
    table.dropColumn('default_scale_x_elt');
    table.dropColumn('default_scale_y_elt');
    table.dropColumn('default_scale_z_elt');
  });
}
