import { Button } from "@/components/ui/button";
import { useDeleteService } from "@/queries/services";
import { DeleteConfirm } from "@/components/shared/DeleteConfirm";
import { toast } from "sonner";

export const ActionCell = ({ editingService, service, setEditingService }) => {
  const { mutate: deleteService, isPending: isDeleting } = useDeleteService();


  const handleDeleteService = (serviceId: number) => {
    deleteService(serviceId, {
      onSuccess: () => {
        toast.success('Service deleted successfully');
      },
      onError: () => {
        toast.error('Failed to delete service');
      }
    });
  }

  return (
    <>
      <Button variant="outline" onClick={() => editingService?.service_id === service.service_id ? setEditingService(null) : setEditingService(service)}>
        {editingService?.service_id === service.service_id ? "Cancel" : "Edit"}
      </Button>
      <DeleteConfirm title="Delete service" description={<p>Are you sure you want to delete service - <span className="font-bold">{service.name}</span>?</p>} onDelete={() => handleDeleteService(service.service_id)} isLoading={isDeleting} />
    </>
  )
}