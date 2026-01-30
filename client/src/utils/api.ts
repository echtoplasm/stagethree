const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

interface ApiFetchOptions extends RequestInit {
  body?: any;
}

export const apiFetch = async (endpoint: string, options: ApiFetchOptions = {}) => {
  const { body, ...restOptions } = options;

  const config: RequestInit = {
    ...restOptions,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...restOptions.headers,
    },
  };


  if (body && typeof body !== 'string') {
    config.body = JSON.stringify(body);
  } else if (body) {
    config.body = body;
  }

  const response = await fetch(`${API_URL}${endpoint}`, config);
  
  if (!response.ok) {
    throw new Error(`API Error: ${response.status} ${response.statusText}`);
  }

  return response.json();
};
