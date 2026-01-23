import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('equipment_placement', (table) => {
    table.increments('equipment_placement_id').primary();
    table.integer('stage_plot_id').notNullable();
    table.integer('equipment_type_id').notNullable();
    table.decimal('position_x', 10, 2).notNullable().defaultTo(0);
    table.decimal('position_y', 10, 2).notNullable().defaultTo(0);
    table.decimal('position_z', 10, 2).notNullable().defaultTo(0);
    table.decimal('rotation_x', 10, 2).defaultTo(0);
    table.decimal('rotation_y', 10, 2).defaultTo(0);
    table.decimal('rotation_z', 10, 2).defaultTo(0);
    table.decimal('scale_x', 10, 2).defaultTo(1);
    table.decimal('scale_y', 10, 2).defaultTo(1);
    table.decimal('scale_z', 10, 2).defaultTo(1);
    table.timestamp('created_at').defaultTo(knex.fn.now());
    
    table.foreign('stage_plot_id')
         .references('stage_plot_id')
         .inTable('stage_plot')
         .onDelete('CASCADE');
    
    table.foreign('equipment_type_id')
         .references('equipment_type_id')
         .inTable('equipment_type')
         .onDelete('CASCADE');
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists('equipment_placement');
}

