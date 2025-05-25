import { API } from "./index";
import {
  IncidentRead,
  IncidentCreate,
  IncidentUpdateSchema,
  IncidentResponse,
} from "@/types/incidents"; // Adjust import paths as needed

// Incidents

export const fetchIncident = (id: number) =>
  API.get<IncidentResponse>(`/incidents/${id}`);

export const fetchIncidents = ({ resolved } = { resolved: 'none' }) =>
  API.get<IncidentRead[]>(`/incidents?resolved=${resolved}`);

export const createIncident = (data: IncidentCreate) =>
  API.post<IncidentRead>("/incidents", data);

export const updateIncident = (id: number, updates: IncidentUpdateSchema) =>
  API.put<IncidentRead>(`/incidents/${id}`, updates);

export const deleteIncident = (id: number) =>
  API.delete(`/incidents/${id}`);
