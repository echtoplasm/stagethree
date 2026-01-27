import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  await knex("equipment_type_eqt").del();

  await knex("equipment_type_eqt").insert([
    { 
      name_eqt: "SM57", 
      description_eqt: "Shure SM57 Dynamic Microphone",
      default_color_eqt: "#2C2C2C"
    },
    { 
      name_eqt: "SM58", 
      description_eqt: "Shure SM58 Vocal Microphone",
      default_color_eqt: "#1C1C1C"
    },
    { 
      name_eqt: "Beta 58A", 
      description_eqt: "Shure Beta 58A Supercardioid Vocal Mic",
      default_color_eqt: "#3A3A3A"
    },
    { 
      name_eqt: "KSM32", 
      description_eqt: "Shure KSM32 Condenser Microphone",
      default_color_eqt: "#C0C0C0"
    },
    { 
      name_eqt: "DI Box", 
      description_eqt: "Direct injection box for instruments",
      default_color_eqt: "#4A4A4A"
    },
    { 
      name_eqt: "Line Array Speaker", 
      description_eqt: "Main PA line array speaker",
      default_color_eqt: "#000000"
    },
    { 
      name_eqt: "Subwoofer", 
      description_eqt: "Low frequency speaker cabinet",
      default_color_eqt: "#1A1A1A"
    },
    { 
      name_eqt: "Stage Monitor", 
      description_eqt: "Active stage monitor wedge",
      default_color_eqt: "#2A2A2A"
    }
  ]);
}
