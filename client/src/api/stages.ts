const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export interface Stage {
  id_stg: number,
  name_stg: string,
  width_stg: number,
  depth_stg: number,
  height_stg: number
}

export const fetchAllStages = async (): Promise<Stage[]>  => {
  const response = await fetch(`${API_URL}/api/stages`);
  console.log('fetching all stages');
  if(!response.ok){
    console.error('unable to fetch all stages');
  }

  return response.json();
}


