import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  await knex("element_type").del();

  await knex("element_type").insert([
    { 
      name: "Drum Riser", 
      description: "Elevated platform for drum kit",
      default_color: "#8B4513"
    },
    { 
      name: "Piano", 
      description: "Grand or upright piano",
      default_color: "#000000"
    },
    { 
      name: "Guitar Amp", 
      description: "Guitar amplifier cabinet",
      default_color: "#1C1C1C"
    },
    { 
      name: "Bass Amp", 
      description: "Bass amplifier cabinet",
      default_color: "#2C2C2C"
    },
    { 
      name: "Keyboard Stand", 
      description: "Stand for synthesizers or keyboards",
      default_color: "#4A4A4A"
    },
    { 
      name: "Mic Stand", 
      description: "Microphone stand",
      default_color: "#C0C0C0"
    },
    { 
      name: "Monitor Wedge", 
      description: "Floor monitor speaker",
      default_color: "#3C3C3C"
    },
    { 
      name: "Backdrop", 
      description: "Stage backdrop or scrim",
      default_color: "#1A1A2E"
    }
  ]);
}
