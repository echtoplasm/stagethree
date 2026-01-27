import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('element_placement_elp', (table) => {
    table.increments('id_elp').primary();
    table.integer('id_stp_elp').notNullable();
    table.integer('id_elt_elp').notNullable();
    table.decimal('position_x_elp', 10, 2).notNullable().defaultTo(0);
    table.decimal('position_y_elp', 10, 2).notNullable().defaultTo(0);
    table.decimal('position_z_elp', 10, 2).notNullable().defaultTo(0);
    table.decimal('rotation_x_elp', 10, 2).defaultTo(0);
    table.decimal('rotation_y_elp', 10, 2).defaultTo(0);
    table.decimal('rotation_z_elp', 10, 2).defaultTo(0);
    table.decimal('scale_x_elp', 10, 2).defaultTo(1);
    table.decimal('scale_y_elp', 10, 2).defaultTo(1);
    table.decimal('scale_z_elp', 10, 2).defaultTo(1);
    table.timestamp('created_at_elp').defaultTo(knex.fn.now());
    
    table.foreign('id_stp_elp')
         .references('id_stp')
         .inTable('stage_plot_stp')
         .onDelete('CASCADE');
    
    table.foreign('id_elt_elp')
         .references('id_elt')
         .inTable('element_type_elt')
         .onDelete('CASCADE');
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists('element_placement_elp');
}
