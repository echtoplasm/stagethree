import { Knex } from "knex";
import bcrypt from 'bcrypt';

export async function seed(knex: Knex): Promise<void> {
  // Clear existing demo data (in reverse order due to foreign keys)
  await knex("input_channel_inc").del();
  await knex("element_placement_elp").del();
  await knex("equipment_placement_eqp").del();
  await knex("stage_plot_stp").del();
  await knex("project_prj").del();
  await knex("stage_stg").del();
  await knex("admin_adm").del();
  await knex("user_usr").where("email_usr", "demo@stagethree.com").del();

  // Create demo user
  const passwordHash = await bcrypt.hash("demo123", 10);
  const [userId] = await knex("user_usr").insert({
    email_usr: "demo@stagethree.com",
    password_hash_usr: passwordHash,
    first_name_usr: "Demo",
    last_name_usr: "User"
  }).returning("id_usr");

  // Create a demo stage
  const [stageId] = await knex("stage_stg").insert({
    name_stg: "Red Rocks Amphitheatre",
    width_stg: 60,
    depth_stg: 40,
    height_stg: 3
  }).returning("id_stg");

  // Create a demo project
  const [projectId] = await knex("project_prj").insert({
    id_usr_prj: userId.id_usr,
    name_prj: "Summer Rock Concert 2026",
    description_prj: "Main stage setup for outdoor rock festival"
  }).returning("id_prj");

  // Create a stage plot
  const [stagePlotId] = await knex("stage_plot_stp").insert({
    id_prj_stp: projectId.id_prj,
    id_stg_stp: stageId.id_stg,
    name_stp: "Main Stage Layout"
  }).returning("id_stp");

  // Add some element placements
  const drumRiserType = await knex("element_type_elt").where("name_elt", "Drum Riser").first();
  
  if (drumRiserType) {
    await knex("element_placement_elp").insert({
      id_stp_elp: stagePlotId.id_stp,
      id_elt_elp: drumRiserType.id_elt,
      position_x_elp: 0,
      position_y_elp: 0,
      position_z_elp: 0.5, 
      scale_x_elp: 2,
      scale_y_elp: 1.5,
      scale_z_elp: 0.5 
    });
  }

  // Add some input channels
  await knex("input_channel_inc").insert([
    {
      id_stp_inc: stagePlotId.id_stp,
      channel_number_inc: 1,
      instrument_name_inc: "Kick Drum",
      mic_type_inc: "Beta 52A"                
    },
    {
      id_stp_inc: stagePlotId.id_stp,
      channel_number_inc: 2,
      instrument_name_inc: "Snare Top",
      mic_type_inc: "SM57"
    },
    {
      id_stp_inc: stagePlotId.id_stp,
      channel_number_inc: 3,
      instrument_name_inc: "Lead Vocal",
      mic_type_inc: "Beta 58A"
    }
  ]);
}
