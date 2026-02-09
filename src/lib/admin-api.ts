/**
 * Client-side API helper for admin panel operations.
 */

interface PaginationParams {
  page?: number;
  limit?: number;
  sort?: string;
  search?: string;
  [key: string]: string | number | boolean | undefined;
}

async function adminFetch<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const res = await fetch(`/api/admin${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    credentials: 'include',
  });

  const contentType = res.headers.get('content-type');
  if (!contentType?.includes('application/json')) {
    throw new Error('Server returned an unexpected response');
  }

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || 'Something went wrong');
  }

  return data;
}

function buildQuery(params: PaginationParams): string {
  const query = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      query.set(key, String(value));
    }
  });
  const str = query.toString();
  return str ? `?${str}` : '';
}

// ---- Stats ----
export const statsApi = {
  get: () => adminFetch<any>('/stats'),
};

// ---- Users ----
export const adminUsersApi = {
  list: (params: PaginationParams = {}) =>
    adminFetch<any>(`/users${buildQuery(params)}`),
  get: (id: string) => adminFetch<any>(`/users/${id}`),
  create: (data: any) =>
    adminFetch<any>('/users', { method: 'POST', body: JSON.stringify(data) }),
  update: (id: string, data: any) =>
    adminFetch<any>(`/users/${id}`, { method: 'PATCH', body: JSON.stringify(data) }),
  delete: (id: string) =>
    adminFetch<any>(`/users/${id}`, { method: 'DELETE' }),
};

// ---- Admins ----
export const adminAdminsApi = {
  list: (params: PaginationParams = {}) =>
    adminFetch<any>(`/admins${buildQuery(params)}`),
  get: (id: string) => adminFetch<any>(`/admins/${id}`),
  create: (data: any) =>
    adminFetch<any>('/admins', { method: 'POST', body: JSON.stringify(data) }),
  update: (id: string, data: any) =>
    adminFetch<any>(`/admins/${id}`, { method: 'PATCH', body: JSON.stringify(data) }),
  delete: (id: string) =>
    adminFetch<any>(`/admins/${id}`, { method: 'DELETE' }),
};

// ---- Events ----
export const adminEventsApi = {
  list: (params: PaginationParams = {}) =>
    adminFetch<any>(`/events${buildQuery(params)}`),
  get: (id: string) => adminFetch<any>(`/events/${id}`),
  create: (data: any) =>
    adminFetch<any>('/events', { method: 'POST', body: JSON.stringify(data) }),
  update: (id: string, data: any) =>
    adminFetch<any>(`/events/${id}`, { method: 'PATCH', body: JSON.stringify(data) }),
  delete: (id: string) =>
    adminFetch<any>(`/events/${id}`, { method: 'DELETE' }),
};

// ---- Departments ----
export const adminDepartmentsApi = {
  list: (params: PaginationParams = {}) =>
    adminFetch<any>(`/departments${buildQuery(params)}`),
  get: (id: string) => adminFetch<any>(`/departments/${id}`),
  create: (data: any) =>
    adminFetch<any>('/departments', { method: 'POST', body: JSON.stringify(data) }),
  update: (id: string, data: any) =>
    adminFetch<any>(`/departments/${id}`, { method: 'PATCH', body: JSON.stringify(data) }),
  delete: (id: string) =>
    adminFetch<any>(`/departments/${id}`, { method: 'DELETE' }),
};

// ---- Categories ----
export const adminCategoriesApi = {
  list: (params: PaginationParams = {}) =>
    adminFetch<any>(`/categories${buildQuery(params)}`),
  get: (id: string) => adminFetch<any>(`/categories/${id}`),
  create: (data: any) =>
    adminFetch<any>('/categories', { method: 'POST', body: JSON.stringify(data) }),
  update: (id: string, data: any) =>
    adminFetch<any>(`/categories/${id}`, { method: 'PATCH', body: JSON.stringify(data) }),
  delete: (id: string) =>
    adminFetch<any>(`/categories/${id}`, { method: 'DELETE' }),
};

// ---- Registrations ----
export const adminRegistrationsApi = {
  list: (params: PaginationParams = {}) =>
    adminFetch<any>(`/registrations${buildQuery(params)}`),
  get: (id: string) => adminFetch<any>(`/registrations/${id}`),
  create: (data: any) =>
    adminFetch<any>('/registrations', { method: 'POST', body: JSON.stringify(data) }),
  update: (id: string, data: any) =>
    adminFetch<any>(`/registrations/${id}`, { method: 'PATCH', body: JSON.stringify(data) }),
  delete: (id: string) =>
    adminFetch<any>(`/registrations/${id}`, { method: 'DELETE' }),
};

// ---- Payments ----
export const adminPaymentsApi = {
  list: (params: PaginationParams = {}) =>
    adminFetch<any>(`/payments${buildQuery(params)}`),
  get: (id: string) => adminFetch<any>(`/payments/${id}`),
  update: (id: string, data: any) =>
    adminFetch<any>(`/payments/${id}`, { method: 'PATCH', body: JSON.stringify(data) }),
};

// ---- Orders ----
export const adminOrdersApi = {
  list: (params: PaginationParams = {}) =>
    adminFetch<any>(`/orders${buildQuery(params)}`),
  get: (id: string) => adminFetch<any>(`/orders/${id}`),
  update: (id: string, data: any) =>
    adminFetch<any>(`/orders/${id}`, { method: 'PATCH', body: JSON.stringify(data) }),
};

// ---- Announcements ----
export const adminAnnouncementsApi = {
  list: (params: PaginationParams = {}) =>
    adminFetch<any>(`/announcements${buildQuery(params)}`),
  get: (id: string) => adminFetch<any>(`/announcements/${id}`),
  create: (data: any) =>
    adminFetch<any>('/announcements', { method: 'POST', body: JSON.stringify(data) }),
  update: (id: string, data: any) =>
    adminFetch<any>(`/announcements/${id}`, { method: 'PATCH', body: JSON.stringify(data) }),
  delete: (id: string) =>
    adminFetch<any>(`/announcements/${id}`, { method: 'DELETE' }),
};
