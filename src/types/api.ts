// Tipos baseados na API do O Sushi

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'Sushi' | 'Temaki' | 'Sashimi' | 'Hot Roll';
  imageUrl?: string;
  isAvailable: boolean;
  ingredients?: string[];
  preparationTime?: number;
  createdAt: string;
  updatedAt: string;
}

export interface OrderItem {
  productId: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export interface Order {
  id: string;
  status: 'PENDING' | 'CONFIRMED' | 'PREPARING' | 'READY' | 'DELIVERED' | 'CANCELLED';
  items: OrderItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  customerName: string;
  customerPhone: string;
  deliveryAddress: string;
  notes?: string;
  paymentMethod: 'CASH' | 'CREDIT_CARD' | 'DEBIT_CARD' | 'PIX';
  createdAt: string;
  updatedAt: string;
  estimatedDeliveryTime: number;
}

export interface CreateOrderRequest {
  items: {
    productId: string;
    quantity: number;
  }[];
  customerName: string;
  customerPhone: string;
  deliveryAddress: string;
  notes?: string;
  paymentMethod: 'CASH' | 'CREDIT_CARD' | 'DEBIT_CARD' | 'PIX';
}

export interface ApiResponse<T> {
  data?: T;
  error?: {
    errorCode: string;
    statusCode: number;
    errorMessage: string;
    data: any;
  };
}

export interface HealthResponse {
  status: string;
  startTime: string;
} 