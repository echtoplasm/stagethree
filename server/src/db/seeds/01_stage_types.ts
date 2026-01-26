import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  // Delete existing entries
  await knex('stage').del();

  // Insert seed data
  await knex('stage').insert([
    {
      name: 'Proscenium',
      width: 25,
      depth: 25,
      height: 10,
    },
    {
      name: 'Thrust',
      width: 35,
      depth: 25,
      height: 10,
    },
    {
      name: 'Arena',
      width: 45,
      depth: 30,
      height: 20,
    },
    {
      name: 'Black Box',
      width: 35,
      depth: 30,
      height: 10,
    },
    {
      name: 'Outdoor Festival',
      width: 25,
      depth: 40,
      height: 10,
    },
  ]);
}
