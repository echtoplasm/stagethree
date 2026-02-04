import { Knex } from "knex";
import bcrypt from 'bcrypt';

export async function seed(knex: Knex): Promise<void> {
  // ============================================
  // CLEAR ALL DATA (reverse order for FK constraints)
  // ============================================
  await knex("input_channel_inc").del();
  await knex("element_placement_elp").del();
  await knex("equipment_placement_eqp").del();
  await knex("stage_plot_stp").del();
  await knex("project_prj").del();
  await knex("stage_stg").del();
  await knex("venue_ven").del();
  await knex("user_usr").del();

  // ============================================
  // CREATE USERS
  // ============================================
  const regularRole = await knex("role_rol").where("name_rol", "regular").first();
  const adminRole = await knex("role_rol").where("name_rol", "admin").first();

  const demoPassword = await bcrypt.hash("demo123", 10);
  const adminPassword = await bcrypt.hash("admin123", 10);

  const [demoUser] = await knex("user_usr").insert({
    email_usr: "demo@stagethree.com",
    password_hash_usr: demoPassword,
    first_name_usr: "Demo",
    last_name_usr: "User",
    id_rol_usr: regularRole.id_rol
  }).returning("*");

  const [adminUser] = await knex("user_usr").insert({
    email_usr: "admin@stagethree.com",
    password_hash_usr: adminPassword,
    first_name_usr: "Admin",
    last_name_usr: "User",
    id_rol_usr: adminRole.id_rol
  }).returning("*");

  const [regularUser] = await knex("user_usr").insert({
    email_usr: "user@stagethree.com",
    password_hash_usr: await bcrypt.hash("user123", 10),
    first_name_usr: "Regular",
    last_name_usr: "User",
    id_rol_usr: regularRole.id_rol
  }).returning("*");

  // ============================================
  // CREATE VENUES
  // ============================================
  const usCountry = await knex("country_cty").where("code_cty", "US").first();
  const caCountry = await knex("country_cty").where("code_cty", "CA").first();

  const [redRocksVenue] = await knex("venue_ven").insert({
    name_ven: "Red Rocks Amphitheatre",
    address_ven: "18300 W Alameda Pkwy",
    city_ven: "Morrison",
    id_cty_ven: usCountry.id_cty,
    capacity_ven: 9525
  }).returning("*");

  const [madisonSquareVenue] = await knex("venue_ven").insert({
    name_ven: "Madison Square Garden",
    address_ven: "4 Pennsylvania Plaza",
    city_ven: "New York",
    id_cty_ven: usCountry.id_cty,
    capacity_ven: 20789
  }).returning("*");

  const [rogersArenaVenue] = await knex("venue_ven").insert({
    name_ven: "Rogers Arena",
    address_ven: "800 Griffiths Way",
    city_ven: "Vancouver",
    id_cty_ven: caCountry.id_cty,
    capacity_ven: 18910
  }).returning("*");

  // ============================================
  // CREATE STAGES
  // ============================================
  const [redRocksStage] = await knex("stage_stg").insert({
    id_ven_stg: redRocksVenue.id_ven,
    name_stg: "Red Rocks Main Stage",
    width_stg: 60,
    depth_stg: 40,
    height_stg: 3
  }).returning("*");

  const [msgStage] = await knex("stage_stg").insert({
    id_ven_stg: madisonSquareVenue.id_ven,
    name_stg: "MSG Center Stage",
    width_stg: 50,
    depth_stg: 35,
    height_stg: 2.5
  }).returning("*");

  const [rogersStage] = await knex("stage_stg").insert({
    id_ven_stg: rogersArenaVenue.id_ven,
    name_stg: "Rogers Main Stage",
    width_stg: 55,
    depth_stg: 38,
    height_stg: 2.8
  }).returning("*");

  // Generic stage template (no venue)
  const [genericStage] = await knex("stage_stg").insert({
    name_stg: "Standard 40x30 Stage",
    width_stg: 40,
    depth_stg: 30,
    height_stg: 2
  }).returning("*");

  // ============================================
  // CREATE PROJECTS
  // ============================================
  const [project1] = await knex("project_prj").insert({
    id_usr_prj: demoUser.id_usr,
    name_prj: "Summer Rock Concert 2026",
    description_prj: "Main stage setup for outdoor rock festival at Red Rocks"
  }).returning("*");

  const [project2] = await knex("project_prj").insert({
    id_usr_prj: demoUser.id_usr,
    name_prj: "Corporate Event Q3",
    description_prj: "Indoor corporate presentation setup"
  }).returning("*");

  const [project3] = await knex("project_prj").insert({
    id_usr_prj: regularUser.id_usr,
    name_prj: "Jazz Festival Setup",
    description_prj: "Small ensemble stage configuration"
  }).returning("*");

  const [project4] = await knex("project_prj").insert({
    id_usr_prj: adminUser.id_usr,
    name_prj: "Arena Tour - Vancouver Stop",
    description_prj: "Full arena production setup"
  }).returning("*");

  // ============================================
  // CREATE STAGE PLOTS
  // ============================================
  const [stagePlot1] = await knex("stage_plot_stp").insert({
    id_prj_stp: project1.id_prj,
    id_stg_stp: redRocksStage.id_stg,
    name_stp: "Main Stage Layout - Rock Show"
  }).returning("*");

  const [stagePlot2] = await knex("stage_plot_stp").insert({
    id_prj_stp: project2.id_prj,
    id_stg_stp: genericStage.id_stg,
    name_stp: "Corporate Presentation Setup"
  }).returning("*");

  const [stagePlot3] = await knex("stage_plot_stp").insert({
    id_prj_stp: project3.id_prj,
    id_stg_stp: genericStage.id_stg,
    name_stp: "Jazz Quartet Configuration"
  }).returning("*");

  const [stagePlot4] = await knex("stage_plot_stp").insert({
    id_prj_stp: project4.id_prj,
    id_stg_stp: rogersStage.id_stg,
    name_stp: "Arena Main Stage"
  }).returning("*");

  // ============================================
  // ADD EQUIPMENT PLACEMENTS (if equipment types exist)
  // ============================================
  const speakerStack = await knex("equipment_type_eqt").where("name_eqt", "Speaker Stack").first();
  const mixer = await knex("equipment_type_eqt").where("name_eqt", "Mixer").first();

  if (speakerStack) {
    // Left speaker stack
    await knex("equipment_placement_eqp").insert({
      id_stp_eqp: stagePlot1.id_stp,
      id_eqt_eqp: speakerStack.id_eqt,
      position_x_eqp: -25,
      position_y_eqp: 0,
      position_z_eqp: 0,
      scale_x_eqp: 1,
      scale_y_eqp: 3,
      scale_z_eqp: 1
    });

    // Right speaker stack
    await knex("equipment_placement_eqp").insert({
      id_stp_eqp: stagePlot1.id_stp,
      id_eqt_eqp: speakerStack.id_eqt,
      position_x_eqp: 25,
      position_y_eqp: 0,
      position_z_eqp: 0,
      scale_x_eqp: 1,
      scale_y_eqp: 3,
      scale_z_eqp: 1
    });
  }

  if (mixer) {
    await knex("equipment_placement_eqp").insert({
      id_stp_eqp: stagePlot1.id_stp,
      id_eqt_eqp: mixer.id_eqt,
      position_x_eqp: 0,
      position_y_eqp: -15,
      position_z_eqp: 0
    });
  }

  // ============================================
  // ADD ELEMENT PLACEMENTS (if element types exist)
  // ============================================
  const drumRiser = await knex("element_type_elt").where("name_elt", "Drum Riser").first();
  const lighting = await knex("element_type_elt").where("name_elt", "Lighting Truss").first();

  if (drumRiser) {
    await knex("element_placement_elp").insert({
      id_stp_elp: stagePlot1.id_stp,
      id_elt_elp: drumRiser.id_elt,
      position_x_elp: 0,
      position_y_elp: 0,
      position_z_elp: 0.5,
      scale_x_elp: 2,
      scale_y_elp: 1.5,
      scale_z_elp: 0.5
    });
  }

  if (lighting) {
    await knex("element_placement_elp").insert({
      id_stp_elp: stagePlot1.id_stp,
      id_elt_elp: lighting.id_elt,
      position_x_elp: 0,
      position_y_elp: 0,
      position_z_elp: 5,
      scale_x_elp: 8,
      scale_y_elp: 1,
      scale_z_elp: 1
    });
  }

  // ============================================
  // ADD INPUT CHANNELS
  // ============================================
  await knex("input_channel_inc").insert([
    {
      id_stp_inc: stagePlot1.id_stp,
      channel_number_inc: 1,
      instrument_name_inc: "Kick Drum",
      mic_type_inc: "Beta 52A",
      notes_inc: "Gate at -20dB"
    },
    {
      id_stp_inc: stagePlot1.id_stp,
      channel_number_inc: 2,
      instrument_name_inc: "Snare Top",
      mic_type_inc: "SM57"
    },
    {
      id_stp_inc: stagePlot1.id_stp,
      channel_number_inc: 3,
      instrument_name_inc: "Snare Bottom",
      mic_type_inc: "SM57"
    },
    {
      id_stp_inc: stagePlot1.id_stp,
      channel_number_inc: 4,
      instrument_name_inc: "Hi-Hat",
      mic_type_inc: "SM81"
    },
    {
      id_stp_inc: stagePlot1.id_stp,
      channel_number_inc: 5,
      instrument_name_inc: "Rack Tom 1",
      mic_type_inc: "Sennheiser MD421"
    },
    {
      id_stp_inc: stagePlot1.id_stp,
      channel_number_inc: 6,
      instrument_name_inc: "Rack Tom 2",
      mic_type_inc: "Sennheiser MD421"
    },
    {
      id_stp_inc: stagePlot1.id_stp,
      channel_number_inc: 7,
      instrument_name_inc: "Floor Tom",
      mic_type_inc: "Sennheiser MD421"
    },
    {
      id_stp_inc: stagePlot1.id_stp,
      channel_number_inc: 8,
      instrument_name_inc: "Overhead L",
      mic_type_inc: "AKG C414"
    },
    {
      id_stp_inc: stagePlot1.id_stp,
      channel_number_inc: 9,
      instrument_name_inc: "Overhead R",
      mic_type_inc: "AKG C414"
    },
    {
      id_stp_inc: stagePlot1.id_stp,
      channel_number_inc: 10,
      instrument_name_inc: "Bass DI",
      mic_type_inc: "Countryman Type 85"
    },
    {
      id_stp_inc: stagePlot1.id_stp,
      channel_number_inc: 11,
      instrument_name_inc: "Bass Amp",
      mic_type_inc: "Sennheiser e906"
    },
    {
      id_stp_inc: stagePlot1.id_stp,
      channel_number_inc: 12,
      instrument_name_inc: "Guitar 1",
      mic_type_inc: "SM57"
    },
    {
      id_stp_inc: stagePlot1.id_stp,
      channel_number_inc: 13,
      instrument_name_inc: "Guitar 2",
      mic_type_inc: "SM57"
    },
    {
      id_stp_inc: stagePlot1.id_stp,
      channel_number_inc: 14,
      instrument_name_inc: "Keyboard L",
      mic_type_inc: "Direct"
    },
    {
      id_stp_inc: stagePlot1.id_stp,
      channel_number_inc: 15,
      instrument_name_inc: "Keyboard R",
      mic_type_inc: "Direct"
    },
    {
      id_stp_inc: stagePlot1.id_stp,
      channel_number_inc: 16,
      instrument_name_inc: "Lead Vocal",
      mic_type_inc: "Beta 58A",
      notes_inc: "Compression 4:1, reverb"
    },
    {
      id_stp_inc: stagePlot1.id_stp,
      channel_number_inc: 17,
      instrument_name_inc: "BG Vocal 1",
      mic_type_inc: "SM58"
    },
    {
      id_stp_inc: stagePlot1.id_stp,
      channel_number_inc: 18,
      instrument_name_inc: "BG Vocal 2",
      mic_type_inc: "SM58"
    }
  ]);

  console.log("✅ Database seeded successfully!");
  console.log("Demo user: demo@stagethree.com / demo123");
  console.log("Admin user: admin@stagethree.com / admin123");
  console.log("Regular user: user@stagethree.com / user123");
}
