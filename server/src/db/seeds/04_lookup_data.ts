import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('role_rol').del();
  await knex('country_cty').del();
  await knex('image_category_imc').del();
  await knex('state_sta').del();

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

  await knex('state_sta').insert([
    { name_sta: 'Alabama', abbreviation_sta: 'AL' },
    { name_sta: 'Alaska', abbreviation_sta: 'AK' },
    { name_sta: 'Arizona', abbreviation_sta: 'AZ' },
    { name_sta: 'Arkansas', abbreviation_sta: 'AR' },
    { name_sta: 'California', abbreviation_sta: 'CA' },
    { name_sta: 'Colorado', abbreviation_sta: 'CO' },
    { name_sta: 'Connecticut', abbreviation_sta: 'CT' },
    { name_sta: 'Delaware', abbreviation_sta: 'DE' },
    { name_sta: 'Florida', abbreviation_sta: 'FL' },
    { name_sta: 'Georgia', abbreviation_sta: 'GA' },
    { name_sta: 'Hawaii', abbreviation_sta: 'HI' },
    { name_sta: 'Idaho', abbreviation_sta: 'ID' },
    { name_sta: 'Illinois', abbreviation_sta: 'IL' },
    { name_sta: 'Indiana', abbreviation_sta: 'IN' },
    { name_sta: 'Iowa', abbreviation_sta: 'IA' },
    { name_sta: 'Kansas', abbreviation_sta: 'KS' },
    { name_sta: 'Kentucky', abbreviation_sta: 'KY' },
    { name_sta: 'Louisiana', abbreviation_sta: 'LA' },
    { name_sta: 'Maine', abbreviation_sta: 'ME' },
    { name_sta: 'Maryland', abbreviation_sta: 'MD' },
    { name_sta: 'Massachusetts', abbreviation_sta: 'MA' },
    { name_sta: 'Michigan', abbreviation_sta: 'MI' },
    { name_sta: 'Minnesota', abbreviation_sta: 'MN' },
    { name_sta: 'Mississippi', abbreviation_sta: 'MS' },
    { name_sta: 'Missouri', abbreviation_sta: 'MO' },
    { name_sta: 'Montana', abbreviation_sta: 'MT' },
    { name_sta: 'Nebraska', abbreviation_sta: 'NE' },
    { name_sta: 'Nevada', abbreviation_sta: 'NV' },
    { name_sta: 'New Hampshire', abbreviation_sta: 'NH' },
    { name_sta: 'New Jersey', abbreviation_sta: 'NJ' },
    { name_sta: 'New Mexico', abbreviation_sta: 'NM' },
    { name_sta: 'New York', abbreviation_sta: 'NY' },
    { name_sta: 'North Carolina', abbreviation_sta: 'NC' },
    { name_sta: 'North Dakota', abbreviation_sta: 'ND' },
    { name_sta: 'Ohio', abbreviation_sta: 'OH' },
    { name_sta: 'Oklahoma', abbreviation_sta: 'OK' },
    { name_sta: 'Oregon', abbreviation_sta: 'OR' },
    { name_sta: 'Pennsylvania', abbreviation_sta: 'PA' },
    { name_sta: 'Rhode Island', abbreviation_sta: 'RI' },
    { name_sta: 'South Carolina', abbreviation_sta: 'SC' },
    { name_sta: 'South Dakota', abbreviation_sta: 'SD' },
    { name_sta: 'Tennessee', abbreviation_sta: 'TN' },
    { name_sta: 'Texas', abbreviation_sta: 'TX' },
    { name_sta: 'Utah', abbreviation_sta: 'UT' },
    { name_sta: 'Vermont', abbreviation_sta: 'VT' },
    { name_sta: 'Virginia', abbreviation_sta: 'VA' },
    { name_sta: 'Washington', abbreviation_sta: 'WA' },
    { name_sta: 'West Virginia', abbreviation_sta: 'WV' },
    { name_sta: 'Wisconsin', abbreviation_sta: 'WI' },
    { name_sta: 'Wyoming', abbreviation_sta: 'WY' },
  ]);

  await knex('image_category_imc').insert([
    { name_imc: 'Equipment' },
    { name_imc: 'Stage Element' },
    { name_imc: 'Venue' },
    { name_imc: 'Other' },
  ]);
}
