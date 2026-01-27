import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  await knex("element_type_elt").del();

  await knex("element_type_elt").insert([
    { 
      name_elt: "Drum Riser", 
      description_elt: "Elevated platform for drum kit",
      default_color_elt: "#8B4513"
    },
    { 
      name_elt: "Piano", 
      description_elt: "Grand or upright piano",
      default_color_elt: "#000000"
    },
    { 
      name_elt: "Guitar Amp", 
      description_elt: "Guitar amplifier cabinet",
      default_color_elt: "#1C1C1C"
    },
    { 
      name_elt: "Bass Amp", 
      description_elt: "Bass amplifier cabinet",
      default_color_elt: "#2C2C2C"
    },
    { 
      name_elt: "Keyboard Stand", 
      description_elt: "Stand for synthesizers or keyboards",
      default_color_elt: "#4A4A4A"
    },
    { 
      name_elt: "Mic Stand", 
      description_elt: "Microphone stand",
      default_color_elt: "#C0C0C0"
    },
    { 
      name_elt: "Monitor Wedge", 
      description_elt: "Floor monitor speaker",
      default_color_elt: "#3C3C3C"
    },
    { 
      name_elt: "Backdrop", 
      description_elt: "Stage backdrop or scrim",
      default_color_elt: "#1A1A2E"
    }
  ]);
}
