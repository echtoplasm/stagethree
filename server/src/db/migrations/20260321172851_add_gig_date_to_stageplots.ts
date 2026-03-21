import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable('stage_plot_stp', (table) => {
    table.date('gig_date_stp').nullable
  })
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable('stage_plot_stp', (table) => {
    table.dropColumn('gig_date_stp');
  });
}
