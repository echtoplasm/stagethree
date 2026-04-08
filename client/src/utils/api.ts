const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';


interface ApiFetchOptions extends RequestInit {
  body?: any;
  skipAuthRedirect?: boolean;
}

/**
 * Base fetch wrapper for all API requests.
 * Automatically includes credentials, sets JSON content type, and serializes non-string bodies.
 * On a 401 response, signs the user out and redirects to the home page unless skipAuthRedirect is set.
 * Throws with the API error message on any non-OK response.
 *
 * @param endpoint - The API endpoint path to append to the base URL (e.g. '/api/users').
 * @param options - Fetch options extended with an optional body and skipAuthRedirect flag.
 * @returns A promise resolving to the parsed JSON response body typed as T.
 * @throws If the response is not OK or if a 401 is received.
 */
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
