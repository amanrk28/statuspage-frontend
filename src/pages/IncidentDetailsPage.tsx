import { Loader2, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDeleteIncident, useIncident, useUpdateIncident } from "@/queries/incidents";
import { useNavigate, useParams } from "react-router-dom"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { IncidentImpact, IncidentStatus } from "@/types/incidents";
import { IncidentStatusBadge } from "@/components/shared/IncidentStatusBadge";
import { formatDateString } from "@/utils/date-utils";
import { Textarea } from "@/components/ui/textarea";
import { IncidentUpdateList } from "@/components/incident-updates/IncidentUpdateList";
import { UpdateIncident } from "@/components/incidents/update-incident";
import { ServiceStatusBadge } from "@/components/shared/ServiceStatusBadge";
import { Label } from "@/components/ui/label";
import { DeleteConfirm } from "@/components/shared/DeleteConfirm";

export const IncidentDetailsPage = () => {
  const { incidentId } = useParams<{ incidentId: string }>();
  const navigate = useNavigate();

  const { data, isLoading } = useIncident(Number(incidentId));
  const { mutate: updateIncident } = useUpdateIncident();
  const { mutate: deleteIncident, isPending: isDeleting } = useDeleteIncident();

  const handleBackClick = () => {
    navigate('/incidents');
  }

  if (isLoading || !data) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader2 className="animate-spin" />
      </div>
    )
  }

  const onBlur = (e: React.FocusEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    if (value !== data.description) {
      updateIncident({
        incident_id: data.incident_id,
        description: value,
      });
    }
  }

  const handleImpactChange = (event: Event) => {
    const target = event.target as HTMLButtonElement;
    const impact = target.innerText as IncidentImpact;
    if (!impact) {
      return;
    }

    updateIncident({
      incident_id: data.incident_id,
      impact: impact.toLowerCase() as IncidentImpact,
    });
  }

  const handleDeleteIncident = () => {
    deleteIncident(data.incident_id);
    navigate('/incidents');
  }


  return (
    <div className="h-full overflow-y-auto">
      <Button variant={'link'} className="p-0" onClick={handleBackClick}>Back</Button>
      <div className="flex items-center justify-between my-4">
        <div className="flex flex-col items-start gap-2 mb-4">
          <h1 className="text-2xl font-bold">{data?.title}</h1>
          <IncidentStatusBadge status={data?.status} />
          {data?.status !== IncidentStatus.RESOLVED && (
            <UpdateIncident incident={data} />
          )}
        </div>
        <div className="flex items-center gap-2">
          <p className="text-gray-600">Impact</p>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Button variant="outline" className="capitalize">
                {data?.impact} <ChevronDown />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {Object.values(IncidentImpact).map((impact) => (
                <DropdownMenuItem key={impact} className="capitalize" onSelect={handleImpactChange}>{impact}</DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <DeleteConfirm title={<p>Delete incident</p>} description={<p>Are you sure you want to delete this incident?</p>} onDelete={handleDeleteIncident} isLoading={isDeleting} />
        </div>
      </div>
      <div>
        <p className="my-2">
          <span className="text-gray-600 text-sm">Reported on </span>{formatDateString(data?.created_at)}
        </p>
        <div className="mb-4">
          <h3 className="text-lg font-semibold mt-6 mb-4">Affected Services</h3>
          <ul>
            {data?.affected_services.map((service) => (
              <li key={service.service_id} className="flex items-center gap-4">
                <p className="text-gray-600 text-lg">{service.name}</p>
                <ServiceStatusBadge status={service.current_status} />
              </li>
            ))}
          </ul>
        </div>
        {data?.resolved_at && (
          <div>
            <p className="mb-2">
              <span className="text-gray-600 text-sm">Resolved on </span>{formatDateString(data?.resolved_at)}
            </p>
            <Label className="text-lg font-semibold mt-6 mb-4">Postmortem</Label>
            <Textarea defaultValue={data?.description ?? ''} className="w-full h-32 mb-4" rows={12} onBlur={onBlur} />
          </div>
        )}
        <IncidentUpdateList incidentId={data.incident_id} incidentStatus={data.status} />
      </div>
    </div>
  )

}