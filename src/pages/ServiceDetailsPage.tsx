import { Loader2, ChevronDown, SquarePen } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useDeleteService, useService, useUpdateService, useUpdateServiceStatus } from "@/queries/services";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { ServiceStatus } from "@/types/services";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { formatDateString } from "@/utils/date-utils";
import { ServiceStatusBadge } from "@/components/shared/ServiceStatusBadge";
import { DeleteConfirm } from "@/components/shared/DeleteConfirm";
import { toast } from "sonner";
import { useState } from "react";
import { Input } from "@/components/ui/input";

export const ServiceDetailsPage = () => {
  const { serviceId } = useParams<{ serviceId: string }>();
  const [serviceName, setServiceName] = useState<string | null>(null);
  const navigate = useNavigate();
  const { data, isLoading } = useService(Number(serviceId));
  const { mutate: updateService } = useUpdateService();
  const { mutate: updateServiceStatus } = useUpdateServiceStatus(Number(serviceId));
  const { mutate: deleteService } = useDeleteService();

  const handleBackClick = () => {
    navigate('/services');
  }

  if (isLoading || !data) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader2 className="animate-spin" />
      </div>
    )
  }

  const handleStatusChange = (event: Event) => {
    const target = event.target as HTMLButtonElement;
    const status = target.innerText as ServiceStatus;
    if (!status) {
      return;
    }
    updateServiceStatus({
      status: status.toLowerCase() as ServiceStatus,
    });
  }

  const handleServiceNameChange = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && serviceName) {
      updateService({
        service_id: data.service_id,
        name: serviceName,
      });
      setServiceName(null);
    }
  }

  const onBlur = (e: React.FocusEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    if (value !== data?.description) {
      updateService({
        service_id: data.service_id,
        description: value,
      });
    }
  }

  const handleDeleteService = () => {
    if (!data?.service_id) {
      return;
    }
    deleteService(data?.service_id, {
      onSuccess: () => {
        handleBackClick();
        toast.success('Service deleted successfully');
      },
      onError: () => {
        toast.error('Failed to delete service');
      }
    });
  }

  return (
    <div className="h-full overflow-y-auto">
      <Button variant={'link'} className="p-0" onClick={handleBackClick}>Back</Button>
      <div className="flex items-center justify-between my-4">
        <h1 className="text-2xl font-bold" onClick={() => setServiceName(data.name)}>
          {serviceName ? (
            <Input autoFocus className="w-56" value={serviceName} onChange={(e) => setServiceName(e.target.value)} onKeyDown={handleServiceNameChange} onBlur={() => setServiceName(null)} />
          ) : (
            <span className="flex items-center cursor-pointer">
              {data.name}
              <SquarePen size={12} className="ml-2" />
            </span>
          )}
        </h1>
        <div className="flex items-center justify-end gap-2">
          <DeleteConfirm title="Delete service" description={<p>Are you sure you want to delete service - <span className="font-bold">{data.name}</span>?</p>} onDelete={handleDeleteService} />
        </div>
      </div>

      <div className="flex items-center gap-2 mb-4">
        <h3 className="text-lg">Status</h3>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button variant="outline" className="capitalize">
              {data?.current_status} <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {Object.values(ServiceStatus).map((status) => (
              <DropdownMenuItem key={status} className="capitalize" onSelect={handleStatusChange}>{status.replace('_', ' ')}</DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="mb-4">
        <Label className="mb-2">Description (optional)</Label>
        <Textarea defaultValue={data?.description ?? ''} className="w-full h-32 mb-4" rows={12} onBlur={onBlur} />
      </div>
      <div className="mb-4">
        <Label>Start date</Label>
        <p>{formatDateString(data?.created_at, 'dd MMM yyyy')}</p>
      </div>
      <div className="mb-4">
        <h3 className="text-lg font-bold">Status history</h3>
        <div className="border-l pl-4 my-4 ml-3">
        {data?.status_history.map((status) => (
          <div key={status.status_history_id} className="flex flex-col gap-1 py-2">
            <p className="text-sm text-gray-600">{formatDateString(status.created_at)}</p>
            <ServiceStatusBadge status={status.status} />
          </div>
        ))}
        </div>
      </div>
    </div>
  );
}