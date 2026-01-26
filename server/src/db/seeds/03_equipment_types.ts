import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  await knex("equipment_type").del();

  await knex("equipment_type").insert([
    { 
      name: "SM57", 
      description: "Shure SM57 Dynamic Microphone",
      default_color: "#2C2C2C"
    },
    { 
      name: "SM58", 
      description: "Shure SM58 Vocal Microphone",
      default_color: "#1C1C1C"
    },
    { 
      name: "Beta 58A", 
      description: "Shure Beta 58A Supercardioid Vocal Mic",
      default_color: "#3A3A3A"
    },
    { 
      name: "KSM32", 
      description: "Shure KSM32 Condenser Microphone",
      default_color: "#C0C0C0"
    },
    { 
      name: "DI Box", 
      description: "Direct injection box for instruments",
      default_color: "#4A4A4A"
    },
    { 
      name: "Line Array Speaker", 
      description: "Main PA line array speaker",
      default_color: "#000000"
    },
    { 
      name: "Subwoofer", 
      description: "Low frequency speaker cabinet",
      default_color: "#1A1A1A"
    },
    { 
      name: "Stage Monitor", 
      description: "Active stage monitor wedge",
      default_color: "#2A2A2A"
    }
  ]);
}
