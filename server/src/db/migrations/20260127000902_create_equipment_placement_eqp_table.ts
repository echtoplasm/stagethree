import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('equipment_placement_eqp', (table) => {
    table.increments('id_eqp').primary();
    table.integer('id_stp_eqp').notNullable();
    table.integer('id_eqt_eqp').notNullable();
    table.decimal('position_x_eqp', 10, 2).notNullable().defaultTo(0);
    table.decimal('position_y_eqp', 10, 2).notNullable().defaultTo(0);
    table.decimal('position_z_eqp', 10, 2).notNullable().defaultTo(0);
    table.decimal('rotation_x_eqp', 10, 2).defaultTo(0);
    table.decimal('rotation_y_eqp', 10, 2).defaultTo(0);
    table.decimal('rotation_z_eqp', 10, 2).defaultTo(0);
    table.decimal('scale_x_eqp', 10, 2).defaultTo(1);
    table.decimal('scale_y_eqp', 10, 2).defaultTo(1);
    table.decimal('scale_z_eqp', 10, 2).defaultTo(1);
    table.timestamp('created_at_eqp').defaultTo(knex.fn.now());
    
    table.foreign('id_stp_eqp')
         .references('id_stp')
         .inTable('stage_plot_stp')
         .onDelete('CASCADE');
    
    table.foreign('id_eqt_eqp')
         .references('id_eqt')
         .inTable('equipment_type_eqt')
         .onDelete('CASCADE');
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists('equipment_placement_eqp');
}
