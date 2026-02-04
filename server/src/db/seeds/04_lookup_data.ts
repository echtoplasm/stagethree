import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('role_rol').del();
  await knex('country_cty').del();
  await knex('image_category_imc').del();

  // Inserts seed entries
  await knex('role_rol').insert([
    { name_rol: 'regular', description_rol: 'standard user permissions' },
    { name_rol: 'admin', description_rol: 'Adminstrative privileges' },
    { name_rol: 'superuser', description_rol: 'Full system access' },
  ]);

  await knex('country_cty').insert([
    { code_cty: 'US', name_cty: 'United States' },
    { code_cty: 'CA', name_cty: 'Canada' },
    { code_cty: 'MX', name_cty: 'Mexico' },
    { code_cty: 'GB', name_cty: 'United Kingdom' },
  ]);

  await knex('image_category_imc').insert([
    {name_imc: 'Equipment'},
    {name_imc: 'Stage Element'},
    {name_imc: 'Venue'},
    {name_imc: 'Other'},
  ])
}
