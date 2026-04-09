import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('equipment_placement_eqp');
  await knex.schema.dropTableIfExists('equipment_type_eqt');
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.createTable('equipment_type_eqt', (table) => {
    table.increments('id_eqt').primary();
    table.string('name_eqt', 255).notNullable();
    table.text('description_eqt');
    table.integer('id_img_eqt').references('id_img').inTable('image_img').onDelete('SET NULL');
    table.string('default_color_eqt', 7);
  });
  await knex.schema.createTable('equipment_placement_eqp', (table) => {
    table.increments('id_eqp').primary();
    table.integer('id_stp_eqp').notNullable().references('id_stp').inTable('stage_plot_stp').onDelete('CASCADE');
    table.integer('id_eqt_eqp').notNullable().references('id_eqt').inTable('equipment_type_eqt').onDelete('CASCADE');
    table.decimal('position_x_eqp', 10, 2).notNullable().defaultTo(0);
    table.decimal('position_y_eqp', 10, 2).notNullable().defaultTo(0);
    table.decimal('position_z_eqp', 10, 2).notNullable().defaultTo(0);
    table.decimal('rotation_x_eqp', 10, 2).defaultTo(0);
    table.decimal('rotation_y_eqp', 10, 2).defaultTo(0);
    table.decimal('rotation_z_eqp', 10, 2).defaultTo(0);
    table.decimal('scale_x_eqp', 10, 2).defaultTo(1);
    table.decimal('scale_y_eqp', 10, 2).defaultTo(1);
    table.decimal('scale_z_eqp', 10, 2).defaultTo(1);
    table.timestamp('created_at_eqp', { useTz: true }).defaultTo(knex.fn.now());
  });
}
