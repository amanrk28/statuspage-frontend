import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  fetchServices,
  fetchService,
  createService,
  updateService,
  updateServiceStatus,
  deleteService,
} from '../api/services';
import {
  ServiceUpdate,
  ServiceStatusUpdate,
} from '../types/services';

export const SERVICE_QUERY_KEY = ['services'];

export const useServices = () =>
  useQuery({
    queryKey: SERVICE_QUERY_KEY,
    queryFn: () => fetchServices().then(res => res.data),
  });

export const useService = (id: number) =>
  useQuery({
    queryKey: [...SERVICE_QUERY_KEY, id],
    queryFn: () => fetchService(id).then(res => res.data),
  });

export const useCreateService = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createService,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: SERVICE_QUERY_KEY });
    },
  });
};

export const useUpdateService = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: ServiceUpdate) => updateService(data.service_id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: SERVICE_QUERY_KEY });
    },
  });
};

export const useUpdateServiceStatus = (id: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: ServiceStatusUpdate) => updateServiceStatus(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: SERVICE_QUERY_KEY });
    },
  });
};

export const useDeleteService = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteService,
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: SERVICE_QUERY_KEY });
    },
  });
};
