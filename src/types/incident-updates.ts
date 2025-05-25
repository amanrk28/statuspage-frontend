import { IncidentStatus } from "./incidents";

export interface IncidentUpdate {
  incident_update_id: number;
  incident_id: number;
  message: string;
  status: IncidentStatus;
  created_at: string;
  created_by_id: number;
}

export interface IncidentUpdateCreate {
  incident_id: number;
  message: string;
}
