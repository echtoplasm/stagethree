import { Knex } from 'knex';

const r2 = 'https://pub-69909cf75f764e599dc141922a0696eb.r2.dev';

export async function seed(knex: Knex): Promise<void> {
  // ============================================
  // CLEAR ALL DATA
  // ============================================
  await knex.raw(`
  TRUNCATE TABLE
    input_channel_inc,
    element_placement_elp,
    stage_plot_stp,
    project_prj,
    stage_stg,
    venue_ven,
    user_usr,
    element_type_elt,
    element_category_emc,
    role_rol,
    state_sta,
    image_img
  RESTART IDENTITY CASCADE
`);

  // ============================================
  // ROLES
  // ============================================
  await knex('role_rol').insert([
    { name_rol: 'regular', description_rol: 'Standard user permissions' },
    { name_rol: 'admin', description_rol: 'Administrative privileges' },
    { name_rol: 'superuser', description_rol: 'Full system access' },
  ]);

  // ============================================
  // STATES
  // ============================================
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

  // ============================================
  // IMAGE FILES
  // ============================================

  const imageRows = await knex('image_img')
    .insert([
      {
        name_img: 'Drum Set',
        file_path_img: `${r2}/drum-set.glb`,
        file_type_img: 'glb',
      },
      {
        name_img: 'Grand Piano',
        file_path_img: `${r2}/grand-piano.glb`,
        file_type_img: 'glb',
      },
      {
        name_img: 'Mic Stand',
        file_path_img: `${r2}/micstand.glb`,
        file_type_img: 'glb',
      },
      {
        name_img: 'Speaker',
        file_path_img: `${r2}/speaker.glb`,
        file_type_img: 'glb',
      },
      {
        name_img: 'Drums On Riser',
        file_path_img: `${r2}/1774650260751-drum-on-riser.glb`,
        file_type_img: 'model/gltf-binary',
      },
      {
        name_img: 'Music Stand',
        file_path_img: `${r2}/1774649950797-music_stand.glb`,
        file_type_img: 'model/gltf-binary',
      },
      {
        name_img: 'Electric Guitar',
        file_path_img: `${r2}/1774650403668-electric_guitar.glb`,
        file_type_img: 'model/gltf-binary',
      },
      {
        name_img: 'Lighting Rig Center Stage',
        file_path_img: `${r2}/1774650343674-lighting_rigg_8_meter_center.glb`,
        file_type_img: 'model/gltf-binary',
      },
      {
        name_img: 'Wedge Monitor',
        file_path_img: `${r2}/1774654353521-new-active-wedge-monitor-speakers-v1-4.glb`,
        file_type_img: 'model/gltf-binary',
      },
      {
        name_img: 'Bass Guitar',
        file_path_img: `${r2}/1776869505328-custom-made_bass_guitar.glb`,
        file_type_img: 'model/gltf-binary',
      },
      {
        name_img: 'Acoustic Guitar',
        file_path_img: `${r2}/1776874382022-acoustic_guitar.glb`,
        file_type_img: 'model/gltf-binary',
      },
    ])
    .returning('id_img');

  const [
    drumSetId,
    grandPianoId,
    micStandId,
    speakerId,
    drumsOnRiserId,
    musicStandId,
    electricGuitarId,
    lightingRigId,
    wedgeMonitorId,
    bassGuitarId,
    acousticGuitarId,
  ] = imageRows.map((row: { id_img: number }) => row.id_img);

  // ============================================
  // ELEMENT CATEGORIES
  // ============================================

  const categoryRows = await knex('element_category_emc')
    .insert([
      { name_emc: 'Percussion' },
      { name_emc: 'Keys' },
      { name_emc: 'Strings' },
      { name_emc: 'Microphones' },
      { name_emc: 'Monitors' },
      { name_emc: 'Lighting' },
      { name_emc: 'Other' },
    ])
    .returning('id_emc');

  const [percussionId, keysId, stringsId, microphonesId, monitorsId, lightingId, otherId] =
    categoryRows.map((row: { id_emc: number }) => row.id_emc);

  // ============================================
  // ELEMENT TYPES
  // ============================================
  await knex('element_type_elt').insert([
    {
      name_elt: 'Drum Set',
      description_elt: 'An unelevated drumset',
      default_color_elt: '#8B4513',
      id_img_elt: drumSetId,
      id_emc_elt: percussionId,
      default_scale_x_elt: 5,
      default_scale_y_elt: 5,
      default_scale_z_elt: 5,
    },
    {
      name_elt: 'Grand Piano',
      description_elt: 'Grand or upright piano',
      default_color_elt: '#000000',
      id_img_elt: grandPianoId,
      id_emc_elt: keysId,
      default_scale_x_elt: .35,
      default_scale_y_elt: .35,
      default_scale_z_elt: .35,
    },
    {
      name_elt: 'Mic Stand',
      description_elt: 'Microphone stand',
      default_color_elt: '#C0C0C0',
      id_img_elt: micStandId,
      id_emc_elt: microphonesId,
      default_scale_x_elt: 3,
      default_scale_y_elt: 3,
      default_scale_z_elt: 3,
    },
    {
      name_elt: 'Speaker',
      description_elt: 'Floor monitor speaker',
      default_color_elt: '#3C3C3C',
      id_img_elt: speakerId,
      id_emc_elt: monitorsId,
      default_scale_x_elt: 1.25,
      default_scale_y_elt: 1.25,
      default_scale_z_elt: 1.25,
    },
    {
      name_elt: 'Drums On Riser',
      description_elt: 'Drums on an elevated riser',
      default_color_elt: '#000000',
      id_img_elt: drumsOnRiserId,
      id_emc_elt: percussionId,
      default_scale_x_elt: 0.03,
      default_scale_y_elt: 0.03,
      default_scale_z_elt: 0.03,
    },
    {
      name_elt: 'Music Stand',
      description_elt: 'Music stand',
      default_color_elt: '#000000',
      id_img_elt: musicStandId,
      id_emc_elt: otherId,
      default_scale_x_elt: 3,
      default_scale_y_elt: 3,
      default_scale_z_elt: 3,
    },
    {
      name_elt: 'Electric Guitar',
      description_elt: 'Electric guitar',
      default_color_elt: '#000000',
      id_img_elt: electricGuitarId,
      id_emc_elt: stringsId,
      default_scale_x_elt: 2.75,
      default_scale_y_elt: 2.75,
      default_scale_z_elt: 2.75,
    },
    {
      name_elt: 'Lighting Rig Center Stage',
      description_elt: 'Lighting rig for center stage',
      default_color_elt: '#000000',
      id_img_elt: lightingRigId,
      id_emc_elt: lightingId,
      default_scale_x_elt: 2,
      default_scale_y_elt: 2,
      default_scale_z_elt: 2,
    },
    {
      name_elt: 'Wedge Monitor',
      description_elt: 'Wedge monitor speaker',
      default_color_elt: '#000000',
      id_img_elt: wedgeMonitorId,
      id_emc_elt: monitorsId,
      default_scale_x_elt: 2, 
      default_scale_y_elt: 2,
      default_scale_z_elt: 2,
    },
    {
      name_elt: 'Bass Guitar',
      description_elt: 'A Bass Guitar',
      default_color_elt: '#000000',
      id_img_elt: bassGuitarId,
      id_emc_elt: stringsId,
      default_scale_x_elt: 3.5,
      default_scale_y_elt: 3.5,
      default_scale_z_elt: 3.5,
    },
    {
      name_elt: 'Acoustic Guitar',
      description_elt: 'An Acoustic Guitar',
      default_color_elt: '#000000',
      id_img_elt: acousticGuitarId,
      id_emc_elt: stringsId,
      default_scale_x_elt: 3.2,
      default_scale_y_elt: 3.2,
      default_scale_z_elt: 3.2,
    }
  ]);

  // ============================================
  // STAGE TEMPLATES
  // ============================================
  await knex('stage_stg').insert([
    { name_stg: 'Proscenium', width_stg: 25, depth_stg: 25, height_stg: 10 },
    { name_stg: 'Thrust', width_stg: 35, depth_stg: 25, height_stg: 10 },
    { name_stg: 'Arena', width_stg: 45, depth_stg: 30, height_stg: 20 },
    { name_stg: 'Black Box', width_stg: 35, depth_stg: 30, height_stg: 10 },
    { name_stg: 'Outdoor Festival', width_stg: 25, depth_stg: 40, height_stg: 10 },
  ]);
}
