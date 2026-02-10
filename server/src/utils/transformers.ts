export enum PermissionsEnum {
  REGULAR = 'regular',
  ADMIN = 'admin',
  SUPERUSER = 'superuser',
}

// ============================================
// USERS
// ============================================
export interface UserDB {
  id_usr: number;
  email_usr: string;
  password_hash_usr: string;
  first_name_usr: string;
  last_name_usr: string;
  is_active_usr: boolean;
  created_at_usr: Date | string;
  updated_at_usr?: Date | string;
}

export interface UserAPI {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  isActive: boolean;
  createdAt: string;
  updatedAt?: string;
}

/**
 * Converts User data from database naming conventions to API/JavaScript naming conventions
 *
 * @param dbUser - The User object retrieved from the database
 * @returns The same User object converted to JavaScript naming conventions
 */
export const dbUserToApi = (dbUser: UserDB): UserAPI => ({
  id: dbUser.id_usr,
  email: dbUser.email_usr,
  firstName: dbUser.first_name_usr,
  lastName: dbUser.last_name_usr,
  isActive: dbUser.is_active_usr,
  createdAt:
    typeof dbUser.created_at_usr === 'string'
      ? dbUser.created_at_usr
      : dbUser.created_at_usr.toISOString(),
  updatedAt: dbUser.updated_at_usr
    ? typeof dbUser.updated_at_usr === 'string'
      ? dbUser.updated_at_usr
      : dbUser.updated_at_usr.toISOString()
    : undefined,
});

/**
 * Converts User data from API/JavaScript naming conventions to database naming conventions
 *
 * @param apiUser - Partial User object with API naming to be stored in database
 * @returns Partial User object converted to database column naming
 */
export const apiUserToDb = (apiUser: Partial<UserAPI>): Partial<UserDB> => ({
  ...(apiUser.email && { email_usr: apiUser.email }),
  ...(apiUser.firstName && { first_name_usr: apiUser.firstName }),
  ...(apiUser.lastName && { last_name_usr: apiUser.lastName }),
  ...(apiUser.isActive !== undefined && { is_active_usr: apiUser.isActive }),
});

// ============================================
// PROJECTS
// ============================================
export interface ProjectDB {
  id_prj: number;
  id_usr_prj: number;
  name_prj: string;
  description_prj: string | null;
  created_at_prj: Date | string;
  updated_at_prj: Date | string;
}

export interface ProjectAPI {
  id: number;
  userId: number;
  name: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * Converts Project data from database naming conventions to API/JavaScript naming conventions
 *
 * @param dbProject - The Project object retrieved from the database
 * @returns The same Project object converted to JavaScript naming conventions
 */
export const dbProjectToApi = (db: ProjectDB): ProjectAPI => ({
  id: db.id_prj,
  userId: db.id_usr_prj,
  name: db.name_prj,
  description: db.description_prj || undefined,
  createdAt:
    typeof db.created_at_prj === 'string' ? db.created_at_prj : db.created_at_prj.toISOString(),
  updatedAt:
    typeof db.updated_at_prj === 'string' ? db.updated_at_prj : db.updated_at_prj.toISOString(),
});

/**
 * Converts Project data from API/JavaScript naming conventions to database naming conventions
 *
 * @param apiProject - Partial Project object with API naming to be stored in database
 * @returns Partial Project object converted to database column naming
 */
export const apiProjectToDb = (api: Partial<ProjectAPI>): Partial<ProjectDB> => ({
  ...(api.userId && { id_usr_prj: api.userId }),
  ...(api.name && { name_prj: api.name }),
  ...(api.description && { description_prj: api.description }),
});

// ============================================
// VENUES
// ============================================
interface VenueDB {
  id_ven: number;
  name_ven: string;
  address_ven?: string;
  city_ven?: string;
  id_sta_ven?: number;
  id_cty_ven?: number;
  capacity_ven?: number;
  created_at_ven: Date | string;
}

export interface VenueAPI {
  id: number;
  name: string;
  address?: string;
  city?: string;
  stateId?: number;
  countryId?: number;
  capacity?: number;
  createdAt: string;
}

/**
 * Converts Venue data from database naming conventions to API/JavaScript naming conventions
 *
 * @param dbVenue - The Venue object retrieved from the database
 * @returns The same Venue object converted to JavaScript naming conventions
 */
export const dbVenueToApi = (dbVenue: VenueDB): VenueAPI => ({
  id: dbVenue.id_ven,
  name: dbVenue.name_ven,
  address: dbVenue.address_ven || undefined,
  city: dbVenue.city_ven || undefined,
  stateId: dbVenue.id_sta_ven || undefined,
  countryId: dbVenue.id_cty_ven || undefined,
  capacity: dbVenue.capacity_ven || undefined,
  createdAt:
    typeof dbVenue.created_at_ven === 'string'
      ? dbVenue.created_at_ven
      : dbVenue.created_at_ven.toISOString(),
});

/**
 * Converts Venue data from API/JavaScript naming conventions to database naming conventions
 *
 * @param apiVenue - Partial Venue object with API naming to be stored in database
 * @returns Partial Venue object converted to database column naming
 */
export const apiVenueToDb = (apiVenue: Partial<VenueAPI>): Partial<VenueDB> => ({
  ...(apiVenue.name && { name_ven: apiVenue.name }),
  ...(apiVenue.address && { address_ven: apiVenue.address }),
  ...(apiVenue.city && { city_ven: apiVenue.city }),
  ...(apiVenue.stateId && { id_sta_ven: apiVenue.stateId }),
  ...(apiVenue.countryId && { country_ven: apiVenue.countryId }),
  ...(apiVenue.capacity && { capacity_ven: apiVenue.capacity }),
});

// ============================================
// STAGES
// ============================================
export interface StageDB {
  id_stg: number;
  id_ven_stg: number | null;
  name_stg: string;
  width_stg: number;
  depth_stg: number;
  height_stg: number | null;
  created_at_stg: Date | string;
}

export interface StageAPI {
  id: number;
  venueId?: number;
  name: string;
  width: number;
  depth: number;
  height?: number;
  createdAt: string;
}

/**
 * Converts Stage data from database naming conventions to API/JavaScript naming conventions
 *
 * @param dbStage - The Stage object retrieved from the database
 * @returns The same Stage object converted to JavaScript naming conventions
 */
export const dbStageToApi = (dbStage: StageDB): StageAPI => ({
  id: dbStage.id_stg,
  venueId: dbStage.id_ven_stg || undefined,
  name: dbStage.name_stg,
  width: dbStage.width_stg,
  depth: dbStage.depth_stg,
  height: dbStage.height_stg || undefined,
  createdAt:
    typeof dbStage.created_at_stg === 'string'
      ? dbStage.created_at_stg
      : dbStage.created_at_stg.toISOString(),
});

/**
 * Converts Stage data from API/JavaScript naming conventions to database naming conventions
 *
 * @param apiStage - Partial Stage object with API naming to be stored in database
 * @returns Partial Stage object converted to database column naming
 */
export const apiStageToDb = (apiStage: Partial<StageAPI>): Partial<StageDB> => ({
  ...(apiStage.venueId && { id_ven_stg: apiStage.venueId }),
  ...(apiStage.name && { name_stg: apiStage.name }),
  ...(apiStage.width && { width_stg: apiStage.width }),
  ...(apiStage.depth && { depth_stg: apiStage.depth }),
  ...(apiStage.height && { height_stg: apiStage.height }),
});

// ============================================
// STAGE PLOTS
// ============================================
export interface StagePlotDB {
  id_stp: number;
  id_prj_stp: number;
  id_stg_stp: number | null;
  name_stp: string;
  created_at_stp: Date | string;
}

export interface StagePlotAPI {
  id: number;
  projectId: number;
  stageId?: number;
  name: string;
  createdAt: string;
}

/**
 * Converts StagePlot data from database naming conventions to API/JavaScript naming conventions
 *
 * @param dbStagePlot - The StagePlot object retrieved from the database
 * @returns The same StagePlot object converted to JavaScript naming conventions
 */
export const dbStagePlotToApi = (dbStagePlot: StagePlotDB): StagePlotAPI => ({
  id: dbStagePlot.id_stp,
  projectId: dbStagePlot.id_prj_stp,
  stageId: dbStagePlot.id_stg_stp || undefined,
  name: dbStagePlot.name_stp,
  createdAt:
    typeof dbStagePlot.created_at_stp === 'string'
      ? dbStagePlot.created_at_stp
      : dbStagePlot.created_at_stp.toISOString(),
});

/**
 * Converts StagePlot data from API/JavaScript naming conventions to database naming conventions
 *
 * @param apiStagePlot - Partial StagePlot object with API naming to be stored in database
 * @returns Partial StagePlot object converted to database column naming
 */
export const apiStagePlotToDb = (apiStagePlot: Partial<StagePlotAPI>): Partial<StagePlotDB> => ({
  ...(apiStagePlot.projectId && { id_prj_stp: apiStagePlot.projectId }),
  ...(apiStagePlot.stageId && { id_stg_stp: apiStagePlot.stageId }),
  ...(apiStagePlot.name && { name_stp: apiStagePlot.name }),
});

// ============================================
// EQUIPMENT PLACEMENT
// ============================================
export interface EquipmentPlacementDB {
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
  created_at_eqp: Date | string;
}

export interface EquipmentPlacementAPI {
  id: number;
  stagePlotId: number;
  equipmentTypeId: number;
  positionX: number;
  positionY: number;
  positionZ: number;
  rotationX: number;
  rotationY: number;
  rotationZ: number;
  scaleX: number;
  scaleY: number;
  scaleZ: number;
  createdAt: string;
}

/**
 * Converts EquipmentPlacement data from database naming conventions to API/JavaScript naming conventions
 *
 * @param dbEquipmentPlacement - The EquipmentPlacement object retrieved from the database
 * @returns The same EquipmentPlacement object converted to JavaScript naming conventions
 */
export const dbEquipmentPlacementToApi = (
  dbEquipmentPlacement: EquipmentPlacementDB
): EquipmentPlacementAPI => ({
  id: dbEquipmentPlacement.id_eqp,
  stagePlotId: dbEquipmentPlacement.id_stp_eqp,
  equipmentTypeId: dbEquipmentPlacement.id_eqt_eqp,
  positionX: dbEquipmentPlacement.position_x_eqp,
  positionY: dbEquipmentPlacement.position_y_eqp,
  positionZ: dbEquipmentPlacement.position_z_eqp,
  rotationX: dbEquipmentPlacement.rotation_x_eqp,
  rotationY: dbEquipmentPlacement.rotation_y_eqp,
  rotationZ: dbEquipmentPlacement.rotation_z_eqp,
  scaleX: dbEquipmentPlacement.scale_x_eqp,
  scaleY: dbEquipmentPlacement.scale_y_eqp,
  scaleZ: dbEquipmentPlacement.scale_z_eqp,
  createdAt:
    typeof dbEquipmentPlacement.created_at_eqp === 'string'
      ? dbEquipmentPlacement.created_at_eqp
      : dbEquipmentPlacement.created_at_eqp.toISOString(),
});

/**
 * Converts EquipmentPlacement data from API/JavaScript naming conventions to database naming conventions
 *
 * @param apiEquipmentPlacement - Partial EquipmentPlacement object with API naming to be stored in database
 * @returns Partial EquipmentPlacement object converted to database column naming
 */
export const apiEquipmentPlacementToDb = (
  apiEquipmentPlacement: Partial<EquipmentPlacementAPI>
): Partial<EquipmentPlacementDB> => ({
  ...(apiEquipmentPlacement.stagePlotId && { id_stp_eqp: apiEquipmentPlacement.stagePlotId }),
  ...(apiEquipmentPlacement.equipmentTypeId && {
    id_eqt_eqp: apiEquipmentPlacement.equipmentTypeId,
  }),
  ...(apiEquipmentPlacement.positionX !== undefined && {
    position_x_eqp: apiEquipmentPlacement.positionX,
  }),
  ...(apiEquipmentPlacement.positionY !== undefined && {
    position_y_eqp: apiEquipmentPlacement.positionY,
  }),
  ...(apiEquipmentPlacement.positionZ !== undefined && {
    position_z_eqp: apiEquipmentPlacement.positionZ,
  }),
  ...(apiEquipmentPlacement.rotationX !== undefined && {
    rotation_x_eqp: apiEquipmentPlacement.rotationX,
  }),
  ...(apiEquipmentPlacement.rotationY !== undefined && {
    rotation_y_eqp: apiEquipmentPlacement.rotationY,
  }),
  ...(apiEquipmentPlacement.rotationZ !== undefined && {
    rotation_z_eqp: apiEquipmentPlacement.rotationZ,
  }),
  ...(apiEquipmentPlacement.scaleX !== undefined && { scale_x_eqp: apiEquipmentPlacement.scaleX }),
  ...(apiEquipmentPlacement.scaleY !== undefined && { scale_y_eqp: apiEquipmentPlacement.scaleY }),
  ...(apiEquipmentPlacement.scaleZ !== undefined && { scale_z_eqp: apiEquipmentPlacement.scaleZ }),
});

// ============================================
// STATES
// ============================================
export interface StateDB {
  id_sta: number;
  name_sta: string;
  abbreviation_sta: string;
}

export interface StateAPI {
  id: number;
  name: string;
  abbreviation: string;
}

/**
 * Converts State data from database naming conventions to API/JavaScript naming conventions
 *
 * @param dbState - The State object retrieved from the database
 * @returns The same State object converted to JavaScript naming conventions
 */
export const dbStateToApi = (dbState: StateDB): StateAPI => ({
  id: dbState.id_sta,
  name: dbState.name_sta,
  abbreviation: dbState.abbreviation_sta,
});

/**
 * Converts State data from API/JavaScript naming conventions to database naming conventions
 * 
 * @param apiState - Partial State object with API naming to be stored in database
 * @returns Partial State object converted to database column naming
 */
export const apiStateToDb = (apiState: Partial<StateAPI>): Partial<StateDB> => ({
  ...(apiState.name && { name_sta: apiState.name }),
  ...(apiState.abbreviation && { abbreviation_sta: apiState.abbreviation }),
});
// ============================================
// COUNTRIES
// ============================================
export interface CountryDB {
  id_cty: number;
  code_cty: string;
  name_cty: string;
}

export interface CountryAPI {
  id: number;
  code: string;
  name: string;
}

/**
 * Converts Country data from database naming conventions to API/JavaScript naming conventions
 *
 * @param dbCountry - The Country object retrieved from the database
 * @returns The same Country object converted to JavaScript naming conventions
 */
export const dbCountryToApi = (dbCountry: CountryDB): CountryAPI => ({
  id: dbCountry.id_cty,
  code: dbCountry.code_cty,
  name: dbCountry.name_cty,
});

/**
 * Converts Country data from API/JavaScript naming conventions to database naming conventions
 * 
 * @param apiCountry - Partial Country object with API naming to be stored in database
 * @returns Partial Country object converted to database column naming
 */
export const apiCountryToDb = (apiCountry: Partial<CountryAPI>): Partial<CountryDB> => ({
  ...(apiCountry.name && { name_cty: apiCountry.name }),
  ...(apiCountry.code && { code_cty: apiCountry.code }),
});


// ============================================
// IMAGES
// ============================================
export interface ImageDB {
  id_img: number;
  name_img: string;
  file_path_img: string;
  file_type_img: string | null;
  category_img: string | null;
  created_at_img: Date | string;
}

export interface ImageAPI {
  id: number;
  name: string;
  filePath: string;
  fileType?: string;
  category?: string;
  createdAt: string;
}

/**
 * Converts Image data from database naming conventions to API/JavaScript naming conventions
 * 
 * @param dbImage - The Image object retrieved from the database
 * @returns The same Image object converted to JavaScript naming conventions
 */
export const dbImageToApi = (dbImage: ImageDB): ImageAPI => ({
  id: dbImage.id_img,
  name: dbImage.name_img,
  filePath: dbImage.file_path_img,
  fileType: dbImage.file_type_img || undefined,
  category: dbImage.category_img || undefined,
  createdAt:
    typeof dbImage.created_at_img === 'string'
      ? dbImage.created_at_img
      : dbImage.created_at_img.toISOString(),
});

/**
 * Converts Image data from API/JavaScript naming conventions to database naming conventions
 * 
 * @param apiImage - Partial Image object with API naming to be stored in database
 * @returns Partial Image object converted to database column naming
 */
export const apiImageToDb = (apiImage: Partial<ImageAPI>): Partial<ImageDB> => ({
  ...(apiImage.name && { name_img: apiImage.name }),
  ...(apiImage.filePath && { file_path_img: apiImage.filePath }),
  ...(apiImage.fileType && { file_type_img: apiImage.fileType }),
  ...(apiImage.category && { category_img: apiImage.category }),
});

// ============================================
// EQUIPMENT TYPE
// ============================================
export interface EquipmentTypeDB {
  id_eqt: number;
  name_eqt: string;
  description_eqt: string | null;
  id_img_eqt: number | null;
  default_color_eqt: string | null;
}

export interface EquipmentTypeAPI {
  id: number;
  name: string;
  description?: string;
  imageId?: number;
  defaultColor?: string;
}

/**
 * Converts EquipmentType data from database naming conventions to API/JavaScript naming conventions
 * 
 * @param dbEquipmentType - The EquipmentType object retrieved from the database
 * @returns The same EquipmentType object converted to JavaScript naming conventions
 */
export const dbEquipmentTypeToApi = (dbEquipmentType: EquipmentTypeDB): EquipmentTypeAPI => ({
  id: dbEquipmentType.id_eqt,
  name: dbEquipmentType.name_eqt,
  description: dbEquipmentType.description_eqt || undefined,
  imageId: dbEquipmentType.id_img_eqt || undefined,
  defaultColor: dbEquipmentType.default_color_eqt || undefined,
});

/**
 * Converts EquipmentType data from API/JavaScript naming conventions to database naming conventions
 * 
 * @param apiEquipmentType - Partial EquipmentType object with API naming to be stored in database
 * @returns Partial EquipmentType object converted to database column naming
 */
export const apiEquipmentTypeToDb = (
  apiEquipmentType: Partial<EquipmentTypeAPI>
): Partial<EquipmentTypeDB> => ({
  ...(apiEquipmentType.name && { name_eqt: apiEquipmentType.name }),
  ...(apiEquipmentType.description && { description_eqt: apiEquipmentType.description }),
  ...(apiEquipmentType.imageId && { id_img_eqt: apiEquipmentType.imageId }),
  ...(apiEquipmentType.defaultColor && { default_color_eqt: apiEquipmentType.defaultColor }),
});

// ============================================
// ELEMENT TYPE
// ============================================
export interface ElementTypeDB {
  id_elt: number;
  name_elt: string;
  description_elt: string | null;
  id_img_elt: number | null;
  default_color_elt: string | null;
}

export interface ElementTypeAPI {
  id: number;
  name: string;
  description?: string;
  imageId?: number;
  defaultColor?: string;
}

/**
 * Converts ElementType data from database naming conventions to API/JavaScript naming conventions
 * 
 * @param dbElementType - The ElementType object retrieved from the database
 * @returns The same ElementType object converted to JavaScript naming conventions
 */
export const dbElementTypeToApi = (dbElementType: ElementTypeDB): ElementTypeAPI => ({
  id: dbElementType.id_elt,
  name: dbElementType.name_elt,
  description: dbElementType.description_elt || undefined,
  imageId: dbElementType.id_img_elt || undefined,
  defaultColor: dbElementType.default_color_elt || undefined,
});

/**
 * Converts ElementType data from API/JavaScript naming conventions to database naming conventions
 * 
 * @param apiElementType - Partial ElementType object with API naming to be stored in database
 * @returns Partial ElementType object converted to database column naming
 */
export const apiElementTypeToDb = (
  apiElementType: Partial<ElementTypeAPI>
): Partial<ElementTypeDB> => ({
  ...(apiElementType.name && { name_elt: apiElementType.name }),
  ...(apiElementType.description && { description_elt: apiElementType.description }),
  ...(apiElementType.imageId && { id_img_elt: apiElementType.imageId }),
  ...(apiElementType.defaultColor && { default_color_elt: apiElementType.defaultColor }),
});

// ============================================
// ELEMENT PLACEMENT
// ============================================
export interface ElementPlacementDB {
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
  created_at_elp: Date | string;
}

export interface ElementPlacementAPI {
  id: number;
  stagePlotId: number;
  elementTypeId: number;
  positionX: number;
  positionY: number;
  positionZ: number;
  rotationX: number;
  rotationY: number;
  rotationZ: number;
  scaleX: number;
  scaleY: number;
  scaleZ: number;
  createdAt: string;
}

/**
 * Converts ElementPlacement data from database naming conventions to API/JavaScript naming conventions
 * 
 * @param dbElementPlacement - The ElementPlacement object retrieved from the database
 * @returns The same ElementPlacement object converted to JavaScript naming conventions
 */

export const dbElementPlacementToApi = (
  dbElementPlacement: ElementPlacementDB
): ElementPlacementAPI => ({
  id: dbElementPlacement.id_elp,
  stagePlotId: dbElementPlacement.id_stp_elp,
  elementTypeId: dbElementPlacement.id_elt_elp,
  positionX: dbElementPlacement.position_x_elp,
  positionY: dbElementPlacement.position_y_elp,
  positionZ: dbElementPlacement.position_z_elp,
  rotationX: dbElementPlacement.rotation_x_elp,
  rotationY: dbElementPlacement.rotation_y_elp,
  rotationZ: dbElementPlacement.rotation_z_elp,
  scaleX: dbElementPlacement.scale_x_elp,
  scaleY: dbElementPlacement.scale_y_elp,
  scaleZ: dbElementPlacement.scale_z_elp,
  createdAt:
    typeof dbElementPlacement.created_at_elp === 'string'
      ? dbElementPlacement.created_at_elp
      : dbElementPlacement.created_at_elp.toISOString(),
});

/**
 * Converts ElementPlacement data from API/JavaScript naming conventions to database naming conventions
 * 
 * @param apiElementPlacement - Partial ElementPlacement object with API naming to be stored in database
 * @returns Partial ElementPlacement object converted to database column naming
 */
export const apiElementPlacementToDb = (
  apiElementPlacement: Partial<ElementPlacementAPI>
): Partial<ElementPlacementDB> => ({
  ...(apiElementPlacement.stagePlotId && { id_stp_elp: apiElementPlacement.stagePlotId }),
  ...(apiElementPlacement.elementTypeId && { id_elt_elp: apiElementPlacement.elementTypeId }),
  ...(apiElementPlacement.positionX !== undefined && {
    position_x_elp: apiElementPlacement.positionX,
  }),
  ...(apiElementPlacement.positionY !== undefined && {
    position_y_elp: apiElementPlacement.positionY,
  }),
  ...(apiElementPlacement.positionZ !== undefined && {
    position_z_elp: apiElementPlacement.positionZ,
  }),
  ...(apiElementPlacement.rotationX !== undefined && {
    rotation_x_elp: apiElementPlacement.rotationX,
  }),
  ...(apiElementPlacement.rotationY !== undefined && {
    rotation_y_elp: apiElementPlacement.rotationY,
  }),
  ...(apiElementPlacement.rotationZ !== undefined && {
    rotation_z_elp: apiElementPlacement.rotationZ,
  }),
  ...(apiElementPlacement.scaleX !== undefined && { scale_x_elp: apiElementPlacement.scaleX }),
  ...(apiElementPlacement.scaleY !== undefined && { scale_y_elp: apiElementPlacement.scaleY }),
  ...(apiElementPlacement.scaleZ !== undefined && { scale_z_elp: apiElementPlacement.scaleZ }),
});

// ============================================
// INPUT CHANNELS
// ============================================
export interface InputChannelDB {
  id_inc: number;
  id_stp_inc: number;
  channel_number_inc: number;
  instrument_name_inc: string;
  mic_type_inc: string | null;
  notes_inc: string | null;
  created_at_inc: Date | string;
}

export interface InputChannelAPI {
  id: number;
  stagePlotId: number;
  channelNumber: number;
  instrumentName: string;
  micType?: string;
  notes?: string;
  createdAt: string;
}

/**
 * Converts InputChannel data from database naming conventions to API/JavaScript naming conventions
 * 
 * @param dbInputChannel - The InputChannel object retrieved from the database
 * @returns The same InputChannel object converted to JavaScript naming conventions
 */
export const dbInputChannelToApi = (dbInputChannel: InputChannelDB): InputChannelAPI => ({
  id: dbInputChannel.id_inc,
  stagePlotId: dbInputChannel.id_stp_inc,
  channelNumber: dbInputChannel.channel_number_inc,
  instrumentName: dbInputChannel.instrument_name_inc,
  micType: dbInputChannel.mic_type_inc || undefined,
  notes: dbInputChannel.notes_inc || undefined,
  createdAt:
    typeof dbInputChannel.created_at_inc === 'string'
      ? dbInputChannel.created_at_inc
      : dbInputChannel.created_at_inc.toISOString(),
});

/**
 * Converts InputChannel data from API/JavaScript naming conventions to database naming conventions
 * 
 * @param apiInputChannel - Partial InputChannel object with API naming to be stored in database
 * @returns Partial InputChannel object converted to database column naming
 */
export const apiInputChannelToDb = (
  apiInputChannel: Partial<InputChannelAPI>
): Partial<InputChannelDB> => ({
  ...(apiInputChannel.stagePlotId && { id_stp_inc: apiInputChannel.stagePlotId }),
  ...(apiInputChannel.channelNumber !== undefined && {
    channel_number_inc: apiInputChannel.channelNumber,
  }),
  ...(apiInputChannel.instrumentName && { instrument_name_inc: apiInputChannel.instrumentName }),
  ...(apiInputChannel.micType && { mic_type_inc: apiInputChannel.micType }),
  ...(apiInputChannel.notes && { notes_inc: apiInputChannel.notes }),
});
