
export enum ServiceStatus {
  OPERATIONAL = "operational",
  DEGRADED = "degraded",
  PARTIAL_OUTAGE = "partial_outage",
  MAJOR_OUTAGE = "major_outage",
  MAINTENANCE = "maintenance",
}

export interface ServiceResponse {
  service_id: number;
  name: string;
  description?: string;
  current_status: ServiceStatus;
  created_at: string;
  updated_at?: string;
}

export interface StatusHistoryResponse {
  status_history_id: number;
  status: ServiceStatus;
  created_at: string;
  created_by_name: string;
}

export interface ServiceWithHistoryResponse extends ServiceResponse {
  status_history: StatusHistoryResponse[];
  uptime_percentage?: number;
}

export interface ServiceListResponse {
  services: ServiceResponse[];
  total: number;
  page: number;
  size: number;
}

export interface ServiceCreate {
  name: string;
  description?: string;
  current_status: ServiceStatus;
}

export interface ServiceUpdate {
  service_id: number;
  name?: string;
  description?: string;
  current_status?: ServiceStatus;
}

export interface ServiceStatusUpdate {
  status: ServiceStatus;
  message?: string;
}
