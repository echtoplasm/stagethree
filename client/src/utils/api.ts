const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

interface ApiFetchOptions extends RequestInit {
  body?: any;
  skipAuthRedirect?: boolean;
}

export const apiFetch = async <T = any>(
  endpoint: string,
  options: ApiFetchOptions = {}
): Promise<T> => {
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
  if (response.status === 401) {
    if (!options.skipAuthRedirect) {
      await fetch(`${API_URL}/api/auth/signout`, { method: 'POST', credentials: 'include' });
      window.location.href = '/';
    }
    throw new Error('Unauthorized');
  }
  if (!response.ok) {
    const errorBody = await response.json().catch(() => null);
    throw new Error(errorBody?.message ?? `API Error: ${response.status} ${response.statusText}`);
  }

  return response.json() as Promise<T>;
};
