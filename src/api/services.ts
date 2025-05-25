import {
  ServiceCreate,
  ServiceResponse,
  ServiceUpdate,
  ServiceWithHistoryResponse,
  ServiceStatusUpdate,
  StatusHistoryResponse,
} from '../types/services';
import { API } from './index';

export const fetchServices = () => API.get<ServiceWithHistoryResponse[]>(`/services`);

export const fetchService = (id: number) =>
  API.get<ServiceWithHistoryResponse>(`/services/${id}`);

export const createService = (data: ServiceCreate) =>
  API.post<ServiceResponse>('/services', data);

export const updateService = (id: number, data: ServiceUpdate) =>
  API.put<ServiceResponse>(`/services/${id}`, data);

export const updateServiceStatus = (id: number, data: ServiceStatusUpdate) =>
  API.put<ServiceResponse>(`/services/${id}/status`, data);

export const deleteService = (id: number) =>
  API.delete<void>(`/services/${id}`);

export const fetchStatusHistory = (id: number) =>
  API.get<StatusHistoryResponse[]>(`/services/${id}/status-history`);

export const fetchUptime = (id: number, days = 30) =>
  API.get<{ uptime_percentage: number }>(`/services/${id}/uptime?days=${days}`);
