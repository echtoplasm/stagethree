import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  // Delete existing entries
  await knex('stage_stg').del();

  // Insert seed data
  await knex('stage_stg').insert([
    {
      name_stg: 'Proscenium',
      width_stg: 25,
      depth_stg: 25,
      height_stg: 10,
    },
    {
      name_stg: 'Thrust',
      width_stg: 35,
      depth_stg: 25,
      height_stg: 10,
    },
    {
      name_stg: 'Arena',
      width_stg: 45,
      depth_stg: 30,
      height_stg: 20,
    },
    {
      name_stg: 'Black Box',
      width_stg: 35,
      depth_stg: 30,
      height_stg: 10,
    },
    {
      name_stg: 'Outdoor Festival',
      width_stg: 25,
      depth_stg: 40,
      height_stg: 10,
    },
  ]);
}
