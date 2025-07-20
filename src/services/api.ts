import axios, { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { Product, Order, CreateOrderRequest, HealthResponse, ApiResponse } from '@/types/api';

class ApiService {
  private api: AxiosInstance;
  private apiKey: string | null = null;

  constructor() {
    this.api = axios.create({
      baseURL: 'https://o-sushi-back-end.onrender.com',
      timeout: 20000,
    });

    // Interceptor para adicionar API key quando disponível
    this.api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
      if (this.apiKey) {
        config.headers['x-api-key'] = this.apiKey;
      }
      return config;
    });

    // Interceptor para tratamento de erros
    this.api.interceptors.response.use(
      (response: AxiosResponse) => response,
      (error: AxiosError) => {
        console.error('API Error:', error.response?.data || error.message);
        return Promise.reject(error);
      }
    );
  }

  setApiKey(apiKey: string) {
    this.apiKey = apiKey;
  }

  clearApiKey() {
    this.apiKey = null;
  }

  // Health check
  async checkHealth(): Promise<HealthResponse> {
    const response = await this.api.get<HealthResponse>('/health');
    return response.data;
  }

  // Produtos
  async getProducts(category?: string): Promise<Product[]> {
    const params = category ? { category } : {};
    const response = await this.api.get<Product[]>('/products', { params });
    return response.data;
  }

  async getAvailableProducts(): Promise<Product[]> {
    const response = await this.api.get<Product[]>('/products/available');
    return response.data;
  }

  // Pedidos
  async createOrder(orderData: CreateOrderRequest): Promise<Order> {
    const response = await this.api.post<Order>('/orders', orderData);
    return response.data;
  }
}

// Instância singleton
export const apiService = new ApiService(); 