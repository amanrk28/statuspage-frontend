import { IncidentRead, IncidentStatus } from "./incidents";
import { OrganizationRead } from "./organizations";
import { ServiceResponse, ServiceStatus } from "./services";

// Service uptime history per day
export interface PublicServiceHistoryResponse {
  date: string;                // ISO Date string, e.g. '2025-05-22'
  downtime_seconds: number;
  status: ServiceStatus;
}

// A single service with its current status and historical data
export interface PublicService extends Pick<ServiceResponse, 'name' | 'description' | 'service_id' | 'current_status'> {
  latest_incident_message: string;
  latest_incident_status: IncidentStatus;
  uptime_history: PublicServiceHistoryResponse[];
}

// Top-level public status object
export interface PublicStatus {
  organization: OrganizationRead;
  public_services: PublicService[];
  incidents: IncidentRead[];
}
