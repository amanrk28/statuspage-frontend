import { API } from "./index";
import {
  IncidentUpdate,
  IncidentUpdateCreate,
} from "@/types/incident-updates"; // Adjust import paths as needed

// Incident Updates

export const fetchIncidentUpdates = (id: number) =>
  API.get<IncidentUpdate[]>(`/incidents/${id}/updates`);


export const createIncidentUpdate = (data: IncidentUpdateCreate) =>
  API.post<IncidentUpdate>("/incidents/updates", data);
