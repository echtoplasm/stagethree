import { Knex } from 'knex';
import crypto from 'crypto';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable('stage_plot_stp', table => {
    table.uuid('uuid_stp').unique();
  });

  // seed existing rows
  const plots = await knex('stage_plot_stp').select('id_stp');
  for (const plot of plots) {
    await knex('stage_plot_stp')
      .where('id_stp', plot.id_stp)
      .update({ uuid_stp: crypto.randomUUID() });
  }

  // now make it not nullable
  await knex.schema.alterTable('stage_plot_stp', table => {
    table.uuid('uuid_stp').notNullable().alter();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable('stage_plot_stp', table => {
    table.dropColumn('uuid_stp');
  });
}
