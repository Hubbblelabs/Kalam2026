export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: 'user' | 'admin';
}

export interface Event {
  id: string;
  title: string;
  description: string;
  category: string;
  date: string;
  venue: string;
  maxParticipants: number;
  currentParticipants: number;
  registrationFee: number;
  rules: string[];
  isActive: boolean;
}

export interface Registration {
  id: string;
  user: User;
  event: Event;
  status: 'pending' | 'confirmed' | 'cancelled';
  teamName?: string;
  teamMembers?: string[];
  createdAt: string;
}

export interface Payment {
  transactionId: string;
  merchantTransactionId: string;
  amount: number;
  status: 'pending' | 'success' | 'failed' | 'refunded';
}

export interface CartItem {
  event: Event;
  addedAt: string;
}

export interface Cart {
  id: string;
  user: string;
  items: CartItem[];
  createdAt: string;
  updatedAt: string;
}

export interface OrderItem {
  event: Event;
  eventTitle: string;
  eventDate: string;
  price: number;
}

export interface Order {
  id: string;
  user: string;
  orderNumber: string;
  items: OrderItem[];
  totalAmount: number;
  payment?: Payment;
  status: 'pending' | 'confirmed' | 'cancelled' | 'refunded';
  createdAt: string;
  updatedAt: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    message: string;
  };
}
