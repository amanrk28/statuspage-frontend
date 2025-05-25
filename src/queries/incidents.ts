import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  fetchIncident,
  fetchIncidents,
  createIncident,
  updateIncident,
  deleteIncident,
} from '@/api/incidents';

import type {
  IncidentRead,
  IncidentCreate,
  IncidentUpdateSchema,
  IncidentResponse,
} from '@/types/incidents';

// Query Keys
export const INCIDENTS_QUERY_KEY = ['incidents'];
export const INCIDENT_QUERY_KEY = (id: number) => ['incidents', id];
export const INCIDENT_UPDATES_QUERY_KEY = (incidentId: number) => ['incidents', incidentId, 'updates'];

// Incidents

export const useIncidents = ({
  resolved
}) =>
  useQuery<IncidentRead[]>({
    queryKey: [...INCIDENTS_QUERY_KEY, { resolved }],
    queryFn: () => fetchIncidents({ resolved }).then(res => res.data),
  });

export const useIncident = (id: number) =>
  useQuery<IncidentResponse>({
    queryKey: INCIDENT_QUERY_KEY(id),
    queryFn: () => fetchIncident(id).then(res => res.data),
    enabled: !!id,
  });

export const useCreateIncident = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: IncidentCreate) => createIncident(data).then(res => res.data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: INCIDENTS_QUERY_KEY }),
  });
};

export const useUpdateIncident = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (updates: IncidentUpdateSchema) => updateIncident(updates.incident_id, updates).then(res => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: INCIDENTS_QUERY_KEY });
    },
  });
};

export const useDeleteIncident = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (incidentId: number) => deleteIncident(incidentId),
    onSuccess: () => queryClient.removeQueries({ queryKey: INCIDENTS_QUERY_KEY }),
  });
};
