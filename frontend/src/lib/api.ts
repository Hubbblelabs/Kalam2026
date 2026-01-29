const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';

interface FetchOptions extends RequestInit {
  token?: string;
}

async function fetchApi<T>(endpoint: string, options: FetchOptions = {}): Promise<T> {
  const { token, headers: customHeaders, ...fetchOptions } = options;

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...customHeaders,
  };

  if (token) {
    (headers as Record<string, string>)['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...fetchOptions,
    headers,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error?.message || 'Something went wrong');
  }

  return data;
}

// Auth API
export const authApi = {
  register: (data: { name: string; email: string; password: string; phone?: string }) =>
    fetchApi('/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  login: (data: { email: string; password: string }) =>
    fetchApi('/auth/login', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  refreshToken: (refreshToken: string) =>
    fetchApi('/auth/refresh', {
      method: 'POST',
      body: JSON.stringify({ refreshToken }),
    }),
};

// Events API
export const eventsApi = {
  getAll: () => fetchApi('/events'),

  getById: (id: string) => fetchApi(`/events/${id}`),

  register: (eventId: string, token: string) =>
    fetchApi(`/events/${eventId}/register`, {
      method: 'POST',
      token,
    }),
};

// Payments API
export const paymentsApi = {
  initiate: (data: { eventId: string; amount: number }, token: string) =>
    fetchApi('/payments/initiate', {
      method: 'POST',
      body: JSON.stringify(data),
      token,
    }),

  checkStatus: (transactionId: string, token: string) =>
    fetchApi(`/payments/status/${transactionId}`, { token }),
};

// User API
export const userApi = {
  getProfile: (token: string) => fetchApi('/users/me', { token }),

  updateProfile: (data: Partial<{ name: string; phone: string }>, token: string) =>
    fetchApi('/users/me', {
      method: 'PATCH',
      body: JSON.stringify(data),
      token,
    }),

  getRegistrations: (token: string) => fetchApi('/users/me/registrations', { token }),
};
