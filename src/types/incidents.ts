// src/types/incidents.ts

import { ServiceResponse } from "./services";

export enum IncidentStatus {
  INVESTIGATING = "investigating",
  IDENTIFIED = "identified",
  MONITORING = "monitoring",
  RESOLVED = "resolved",
}

export enum IncidentImpact {
  MINOR = "minor",
  MAJOR = "major",
  CRITICAL = "critical",
}

export interface IncidentBase {
  title: string;
  description?: string | null;
  status: IncidentStatus;
  impact: IncidentImpact;
}

export interface IncidentCreate extends IncidentBase {
  affected_service_ids?: number[];
}

export interface IncidentUpdateSchema {
  incident_id: number;
  title?: string;
  description?: string;
  status?: IncidentStatus;
  impact?: IncidentImpact;
  resolved_at?: string; // ISO datetime string
  service_ids?: number[];
}

export interface IncidentRead extends IncidentBase {
  incident_id: number;
  created_at: string;    // ISO datetime string
  resolved_at?: string | null;
  updated_at?: string | null;
}

export interface IncidentResponse extends IncidentRead {
  affected_services: ServiceResponse[];
}