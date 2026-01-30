export enum PermissionsEnum {
  REGULAR = 'regular',
  ADMIN = 'admin',
  SUPERUSER = 'superuser'
}

export interface UserRecord {
  id_usr: number;
  //username_usr: string;
  email_usr: string;
  password_hash_usr: string;
  first_name_usr: string;
  last_name_usr: string;
  //permissions_usr: PermissionsEnum;
  is_active_usr: boolean;
  created_at_usr: Date;
}

export interface StateRecord {
  id_sta: number;
  name_sta: string;
  abbreviation_sta: string;
}

export interface ProjectRecord {
  id_prj: number;
  id_usr_prj: number;
  name_prj: string;
  description_prj: string | null;
  created_at_prj: Date;
  updated_at_prj: Date;
}

export interface VenueRecord {
  id_ven: number;
  name_ven: string;
  address_ven: string | null;
  city_ven: string | null;
  id_sta_ven: number | null;
  country_ven: string | null;
  capacity_ven: number | null;
  created_at_ven: Date;
}

export interface StageRecord {
  id_stg: number;
  id_ven_stg: number | null;
  name_stg: string;
  width_stg: number; 
  depth_stg: number;
  height_stg: number | null;
  created_at_stg: Date;
}

export interface ImageRecord {
  id_img: number;
  name_img: string;
  file_path_img: string;
  file_type_img: string | null;
  category_img: string | null;
  created_at_img: Date;
}

export interface StagePlotRecord {
  id_stp: number;
  id_prj_stp: number;
  id_stg_stp: number | null;
  name_stp: string;
  created_at_stp: Date;
}

export interface EquipmentTypeRecord {
  id_eqt: number;
  name_eqt: string;
  description_eqt: string | null;
  id_img_eqt: number | null;
  default_color_eqt: string | null;
}

export interface EquipmentPlacementRecord {
  id_eqp: number;
  id_stp_eqp: number;
  id_eqt_eqp: number;
  position_x_eqp: number;
  position_y_eqp: number;
  position_z_eqp: number;
  rotation_x_eqp: number;
  rotation_y_eqp: number;
  rotation_z_eqp: number;
  scale_x_eqp: number;
  scale_y_eqp: number;
  scale_z_eqp: number;
  created_at_eqp: Date;
}

export interface ElementTypeRecord {
  id_elt: number;
  name_elt: string;
  description_elt: string | null;
  id_img_elt: number | null;
  default_color_elt: string | null;
}

export interface ElementPlacementRecord {
  id_elp: number;
  id_stp_elp: number;
  id_elt_elp: number;
  position_x_elp: number;
  position_y_elp: number;
  position_z_elp: number;
  rotation_x_elp: number;
  rotation_y_elp: number;
  rotation_z_elp: number;
  scale_x_elp: number;
  scale_y_elp: number;
  scale_z_elp: number;
  created_at_elp: Date;
}

export interface InputChannelRecord {
  id_inc: number;
  id_stp_inc: number;
  channel_number_inc: number;
  instrument_name_inc: string;
  mic_type_inc: string | null;
  notes_inc: string | null;
  created_at_inc: Date;
}
