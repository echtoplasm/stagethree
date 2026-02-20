import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  // ============================================
  // CLEAR ALL DATA
  // ============================================
  await knex.raw(`
    TRUNCATE TABLE
      input_channel_inc,
      element_placement_elp,
      equipment_placement_eqp,
      stage_plot_stp,
      project_prj,
      stage_stg,
      venue_ven,
      user_usr,
      equipment_type_eqt,
      element_type_elt,
      image_category_imc,
      role_rol,
      country_cty,
      state_sta
   RESTART IDENTITY CASCADE
  `);

  // ============================================
  // ROLES
  // ============================================
  await knex('role_rol').insert([
    { name_rol: 'regular',   description_rol: 'Standard user permissions' },
    { name_rol: 'admin',     description_rol: 'Administrative privileges' },
    { name_rol: 'superuser', description_rol: 'Full system access' },
  ]);

  // ============================================
  // COUNTRIES
  // ============================================
  await knex('country_cty').insert([
    { code_cty: 'US', name_cty: 'United States' },
    { code_cty: 'CA', name_cty: 'Canada' },
    { code_cty: 'MX', name_cty: 'Mexico' },
    { code_cty: 'GB', name_cty: 'United Kingdom' },
  ]);

  // ============================================
  // STATES
  // ============================================
  await knex('state_sta').insert([
    { name_sta: 'Alabama',        abbreviation_sta: 'AL' },
    { name_sta: 'Alaska',         abbreviation_sta: 'AK' },
    { name_sta: 'Arizona',        abbreviation_sta: 'AZ' },
    { name_sta: 'Arkansas',       abbreviation_sta: 'AR' },
    { name_sta: 'California',     abbreviation_sta: 'CA' },
    { name_sta: 'Colorado',       abbreviation_sta: 'CO' },
    { name_sta: 'Connecticut',    abbreviation_sta: 'CT' },
    { name_sta: 'Delaware',       abbreviation_sta: 'DE' },
    { name_sta: 'Florida',        abbreviation_sta: 'FL' },
    { name_sta: 'Georgia',        abbreviation_sta: 'GA' },
    { name_sta: 'Hawaii',         abbreviation_sta: 'HI' },
    { name_sta: 'Idaho',          abbreviation_sta: 'ID' },
    { name_sta: 'Illinois',       abbreviation_sta: 'IL' },
    { name_sta: 'Indiana',        abbreviation_sta: 'IN' },
    { name_sta: 'Iowa',           abbreviation_sta: 'IA' },
    { name_sta: 'Kansas',         abbreviation_sta: 'KS' },
    { name_sta: 'Kentucky',       abbreviation_sta: 'KY' },
    { name_sta: 'Louisiana',      abbreviation_sta: 'LA' },
    { name_sta: 'Maine',          abbreviation_sta: 'ME' },
    { name_sta: 'Maryland',       abbreviation_sta: 'MD' },
    { name_sta: 'Massachusetts',  abbreviation_sta: 'MA' },
    { name_sta: 'Michigan',       abbreviation_sta: 'MI' },
    { name_sta: 'Minnesota',      abbreviation_sta: 'MN' },
    { name_sta: 'Mississippi',    abbreviation_sta: 'MS' },
    { name_sta: 'Missouri',       abbreviation_sta: 'MO' },
    { name_sta: 'Montana',        abbreviation_sta: 'MT' },
    { name_sta: 'Nebraska',       abbreviation_sta: 'NE' },
    { name_sta: 'Nevada',         abbreviation_sta: 'NV' },
    { name_sta: 'New Hampshire',  abbreviation_sta: 'NH' },
    { name_sta: 'New Jersey',     abbreviation_sta: 'NJ' },
    { name_sta: 'New Mexico',     abbreviation_sta: 'NM' },
    { name_sta: 'New York',       abbreviation_sta: 'NY' },
    { name_sta: 'North Carolina', abbreviation_sta: 'NC' },
    { name_sta: 'North Dakota',   abbreviation_sta: 'ND' },
    { name_sta: 'Ohio',           abbreviation_sta: 'OH' },
    { name_sta: 'Oklahoma',       abbreviation_sta: 'OK' },
    { name_sta: 'Oregon',         abbreviation_sta: 'OR' },
    { name_sta: 'Pennsylvania',   abbreviation_sta: 'PA' },
    { name_sta: 'Rhode Island',   abbreviation_sta: 'RI' },
    { name_sta: 'South Carolina', abbreviation_sta: 'SC' },
    { name_sta: 'South Dakota',   abbreviation_sta: 'SD' },
    { name_sta: 'Tennessee',      abbreviation_sta: 'TN' },
    { name_sta: 'Texas',          abbreviation_sta: 'TX' },
    { name_sta: 'Utah',           abbreviation_sta: 'UT' },
    { name_sta: 'Vermont',        abbreviation_sta: 'VT' },
    { name_sta: 'Virginia',       abbreviation_sta: 'VA' },
    { name_sta: 'Washington',     abbreviation_sta: 'WA' },
    { name_sta: 'West Virginia',  abbreviation_sta: 'WV' },
    { name_sta: 'Wisconsin',      abbreviation_sta: 'WI' },
    { name_sta: 'Wyoming',        abbreviation_sta: 'WY' },
  ]);

  // ============================================
  // IMAGE CATEGORIES
  // ============================================
  await knex('image_category_imc').insert([
    { name_imc: 'Equipment' },
    { name_imc: 'Stage Element' },
    { name_imc: 'Venue' },
    { name_imc: 'Other' },
  ]);

  // ============================================
  // EQUIPMENT TYPES
  // ============================================
  await knex('equipment_type_eqt').insert([
    { name_eqt: 'SM57',               description_eqt: 'Shure SM57 Dynamic Microphone',          default_color_eqt: '#2C2C2C' },
    { name_eqt: 'SM58',               description_eqt: 'Shure SM58 Vocal Microphone',             default_color_eqt: '#1C1C1C' },
    { name_eqt: 'Beta 58A',           description_eqt: 'Shure Beta 58A Supercardioid Vocal Mic',  default_color_eqt: '#3A3A3A' },
    { name_eqt: 'KSM32',              description_eqt: 'Shure KSM32 Condenser Microphone',        default_color_eqt: '#C0C0C0' },
    { name_eqt: 'DI Box',             description_eqt: 'Direct injection box for instruments',    default_color_eqt: '#4A4A4A' },
    { name_eqt: 'Line Array Speaker', description_eqt: 'Main PA line array speaker',              default_color_eqt: '#000000' },
    { name_eqt: 'Subwoofer',          description_eqt: 'Low frequency speaker cabinet',           default_color_eqt: '#1A1A1A' },
    { name_eqt: 'Stage Monitor',      description_eqt: 'Active stage monitor wedge',              default_color_eqt: '#2A2A2A' },
    { name_eqt: 'Speaker Stack',      description_eqt: 'Full range speaker stack',                default_color_eqt: '#000000' },
    { name_eqt: 'Mixer',              description_eqt: 'Front of house mixing console',           default_color_eqt: '#3C3C3C' },
  ]);

  // ============================================
  // ELEMENT TYPES
  // ============================================
  await knex('element_type_elt').insert([
    { name_elt: 'Drum Riser',     description_elt: 'Elevated platform for drum kit',      default_color_elt: '#8B4513' },
    { name_elt: 'Piano',          description_elt: 'Grand or upright piano',               default_color_elt: '#000000' },
    { name_elt: 'Guitar Amp',     description_elt: 'Guitar amplifier cabinet',             default_color_elt: '#1C1C1C' },
    { name_elt: 'Bass Amp',       description_elt: 'Bass amplifier cabinet',               default_color_elt: '#2C2C2C' },
    { name_elt: 'Keyboard Stand', description_elt: 'Stand for synthesizers or keyboards', default_color_elt: '#4A4A4A' },
    { name_elt: 'Mic Stand',      description_elt: 'Microphone stand',                    default_color_elt: '#C0C0C0' },
    { name_elt: 'Monitor Wedge',  description_elt: 'Floor monitor speaker',               default_color_elt: '#3C3C3C' },
    { name_elt: 'Backdrop',       description_elt: 'Stage backdrop or scrim',             default_color_elt: '#1A1A2E' },
    { name_elt: 'Lighting Truss', description_elt: 'Overhead lighting truss',             default_color_elt: '#808080' },
  ]);

  // ============================================
  // STAGE TEMPLATES
  // ============================================
  await knex('stage_stg').insert([
    { name_stg: 'Proscenium',       width_stg: 25, depth_stg: 25, height_stg: 10 },
    { name_stg: 'Thrust',           width_stg: 35, depth_stg: 25, height_stg: 10 },
    { name_stg: 'Arena',            width_stg: 45, depth_stg: 30, height_stg: 20 },
    { name_stg: 'Black Box',        width_stg: 35, depth_stg: 30, height_stg: 10 },
    { name_stg: 'Outdoor Festival', width_stg: 25, depth_stg: 40, height_stg: 10 },
  ]);

  console.log(' Reference data seeded successfully!');
}
