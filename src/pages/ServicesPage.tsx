import { useState } from "react";
import { Loader2 } from "lucide-react";
import { ServiceForm } from "@/components/services/ServiceForm";
import { useCreateService, useServices, useUpdateService } from "@/queries/services";
import { ServiceResponse } from "@/types/services";
import { ServiceStatusBadge } from "@/components/shared/ServiceStatusBadge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useWebSocket } from "@/hooks/useWebsocket";
import { useNavigate } from "react-router-dom";
import { ActionCell } from "@/components/services/ActionCell";

export const ServicesPage = () => {
  const [editingService, setEditingService] = useState<ServiceResponse | null>(null);
  const navigate = useNavigate();
  const { data, isLoading, refetch } = useServices();
  const { mutate: createService, isPending: isCreating } = useCreateService();
  const { mutate: updateService, isPending: isUpdating } = useUpdateService();

  useWebSocket(() => {
    refetch();
  });

  const handleSubmit = (data: ServiceResponse) => {
    if (editingService) {
      updateService({ ...data, service_id: editingService.service_id });
    } else {
      createService(data);
    }
    setEditingService(null);
  };

  const handleServiceClick = (serviceId: number) => {
    navigate(`/services/${serviceId}`);
  }


  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader2 className="animate-spin" />
      </div>
    )
  }

  return (
    <div className="flex flex-col">
      <h1 className="text-2xl font-bold mb-4">Services</h1>
      <ServiceForm
        onSubmit={handleSubmit}
        initialData={editingService}
        isLoading={isCreating || isUpdating}
      />
      <div className="flex flex-col h-[81vh] overflow-y-auto">
        <Table className="w-full">
          <TableHeader className="w-full">
            <TableRow className="w-full">
              <TableHead className="w-[40%]">Service Name</TableHead>
              <TableHead className="text-left w-[20%]">Status</TableHead>
              <TableHead className="text-right w-[40%] px-4">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="w-full h-[40vh] max-h-[40vh] overflow-y-auto">
            {data?.map((service) => (
              <TableRow key={service.service_id}>
                <TableCell className="text-left" onClick={() => handleServiceClick(service.service_id)}>
                  <h2 className="text-lg font-semibold text-gray-800 underline-offset-4 hover:underline cursor-pointer">{service.name}</h2>
                  <p>{service.uptime_percentage}% uptime in the past 90 days</p>
                </TableCell>
                <TableCell className="text-left">
                  <ServiceStatusBadge status={service.current_status} />
                </TableCell>
                <TableCell className="text-right w-full h-full flex justify-end items-center gap-2 px-4">
                  <ActionCell editingService={editingService} service={service} setEditingService={setEditingService} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
