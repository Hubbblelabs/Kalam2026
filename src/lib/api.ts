import type { ApiResponse, Cart, Order, User } from '@/types';

async function fetchApi<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const response = await fetch(`/api${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    credentials: 'include', // Important for session cookies
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error?.message || data.error || 'Something went wrong');
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

  logout: () =>
    fetchApi('/auth/logout', {
      method: 'POST',
    }),

  getSession: () =>
    fetchApi('/auth/session'),
};

// Events API
export const eventsApi = {
  getAll: () => fetchApi('/events'),

  getById: (id: string) => fetchApi(`/events/${id}`),

  register: (eventId: string) =>
    fetchApi(`/events/${eventId}/register`, {
      method: 'POST',
    }),
};

// Payments API
export const paymentsApi = {
  initiate: (data: { eventId: string; amount: number }) =>
    fetchApi('/payments/initiate', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  checkStatus: (transactionId: string) =>
    fetchApi(`/payments/status/${transactionId}`),
};

// User API
export const userApi = {
  getProfile: () => fetchApi<ApiResponse<User>>('/users/me'),

  updateProfile: (data: Partial<{ name: string; phone: string }>) =>
    fetchApi('/users/me', {
      method: 'PATCH',
      body: JSON.stringify(data),
    }),

  getRegistrations: () => fetchApi('/users/me/registrations'),
};

// Cart API
export const cartApi = {
  getCart: () => fetchApi<ApiResponse<Cart>>('/cart'),

  addToCart: (eventId: string) =>
    fetchApi('/cart', {
      method: 'POST',
      body: JSON.stringify({ eventId }),
    }),

  removeFromCart: (eventId: string) =>
    fetchApi(`/cart/${eventId}`, {
      method: 'DELETE',
    }),

  clearCart: () =>
    fetchApi('/cart', {
      method: 'DELETE',
    }),
};

// Order API
export const orderApi = {
  createOrder: () =>
    fetchApi<ApiResponse<Order>>('/orders', {
      method: 'POST',
    }),

  getUserOrders: () => fetchApi<ApiResponse<Order[]>>('/orders'),

  getOrder: (orderId: string) => fetchApi<ApiResponse<Order>>(`/orders/${orderId}`),

  cancelOrder: (orderId: string) =>
    fetchApi<ApiResponse<Order>>(`/orders/${orderId}/cancel`, {
      method: 'PATCH',
    }),

  confirmOrder: (orderId: string, paymentId: string) =>
    fetchApi<ApiResponse<Order>>('/orders/confirm', {
      method: 'POST',
      body: JSON.stringify({ orderId, paymentId }),
    }),
};
