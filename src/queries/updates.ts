import { createIncidentUpdate, fetchIncidentUpdates } from "@/api/incident-updates";
import { IncidentUpdateCreate } from "@/types/incident-updates";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useIncidentUpdates = (incidentId: number) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["incidentUpdates", incidentId],
    queryFn: () => fetchIncidentUpdates(incidentId).then(res => res.data),
  });

  return { data, isLoading, error };
};

export const useCreateIncidentUpdate = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createIncidentUpdate,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["incidentUpdates"] }),
  });
};