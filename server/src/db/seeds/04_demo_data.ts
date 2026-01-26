import { Knex } from "knex";
import bcrypt from 'bcrypt';

export async function seed(knex: Knex): Promise<void> {
  // Clear existing demo data (in reverse order due to foreign keys)
  await knex("input_channel").del();
  await knex("element_placement").del();
  await knex("equipment_placement").del();
  await knex("stage_plot").del();
  await knex("project").del();
  await knex("stage").del();
  await knex("admin").del();
  await knex("user").where("email", "demo@stagethree.com").del();

  // Create demo user
  const passwordHash = await bcrypt.hash("demo123", 10);
  const [userId] = await knex("user").insert({
    email: "demo@stagethree.com",
    password_hash: passwordHash,
    first_name: "Demo",
    last_name: "User"
  }).returning("user_id");

  // Create a demo stage
  const [stageId] = await knex("stage").insert({
    name: "Red Rocks Amphitheatre",
    width: 60,
    depth: 40,
    height: 3
  }).returning("stage_id");

  // Create a demo project
  const [projectId] = await knex("project").insert({
    user_id: userId.user_id,
    name: "Summer Rock Concert 2026",
    description: "Main stage setup for outdoor rock festival"
  }).returning("project_id");

  // Create a stage plot
  const [stagePlotId] = await knex("stage_plot").insert({
    project_id: projectId.project_id,
    stage_id: stageId.stage_id,
    name: "Main Stage Layout"
  }).returning("stage_plot_id");

  // Add some element placements
  const drumRiserType = await knex("element_type").where("name", "Drum Riser").first();
  await knex("element_placement").insert({
    stage_plot_id: stagePlotId.stage_plot_id,
    element_type_id: drumRiserType.element_type_id,
    position_x: 0,
    position_y: 0,
    position_z: 0.5,
    scale_x: 2,
    scale_y: 1.5,
    scale_z: 0.5
  });

  // Add some input channels
  await knex("input_channel").insert([
    {
      stage_plot_id: stagePlotId.stage_plot_id,
      channel_number: 1,
      instrument_name: "Kick Drum",
      mic_type: "Beta 52A"
    },
    {
      stage_plot_id: stagePlotId.stage_plot_id,
      channel_number: 2,
      instrument_name: "Snare Top",
      mic_type: "SM57"
    },
    {
      stage_plot_id: stagePlotId.stage_plot_id,
      channel_number: 3,
      instrument_name: "Lead Vocal",
      mic_type: "Beta 58A"
    }
  ]);
}
