const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export interface Stage {
  stage_id: number,
  name: string,
  width: number,
  depth: number,
  height: number
}

export const fetchAllStages = async (): Promise<Stage[]>  => {
  const response = await fetch(`${API_URL}/api/stages`);
  console.log('fetching all stages');
  if(!response.ok){
    console.error('unable to fetch all stages');
  }

  return response.json();
}


