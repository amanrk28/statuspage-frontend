import { useDeleteIncident, useIncidents } from "@/queries/incidents";
import { Loader2, Trash } from "lucide-react";
import { IncidentStatusBadge } from "../shared/IncidentStatusBadge";
import { formatDateString } from "@/utils/date-utils";
import { useNavigate } from "react-router-dom";
import { UpdateIncident } from "./update-incident";
import { DeleteConfirm } from "../shared/DeleteConfirm";
import { Button } from "../ui/button";

export const IncidentsList = ({
  resolved = 'none'
}: {
  resolved?: 'true' | 'false' | 'none';
}) => {
  const navigate = useNavigate();
  const { data, isLoading } = useIncidents({ resolved });
  const { mutate: deleteIncident } = useDeleteIncident();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader2 className="animate-spin" />
      </div>
    )
  }

  const handleIncidentClick = (incidentId: number) => {
    navigate(`${incidentId}`, { replace: true });
  }

  const handleDeleteIncident = (incidentId: number) => {
    deleteIncident(incidentId);
  }

  return (
    <ul className="h-[81vh]">
      {data?.length === 0 && (
        <div className="flex items-center justify-center h-full">
          <p className="text-gray-500">No incidents found</p>
        </div>
      )}
      {data?.map((incident) => (
        <li key={incident.incident_id} className="flex items-center justify-between p-4 border-b">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-md font-semibold text-gray-800 underline-offset-4 hover:underline cursor-pointer" onClick={() => handleIncidentClick(incident.incident_id)}>{incident.title}
              </h2>
              <IncidentStatusBadge status={incident.status} />
            </div>
            {incident.resolved_at ? (
              <p className="text-sm text-gray-500">Resolved {formatDateString(incident.resolved_at)}</p>
            ) : null}
          </div>
          <div className="flex items-center gap-2">
            <UpdateIncident incident={incident} />
            <DeleteConfirm deleteTrigger={<Button variant={"destructive"}><Trash /></Button>} title={<p>Delete incident</p>} description={<p>Are you sure you want to delete this incident?</p>} onDelete={() => {
              handleDeleteIncident(incident.incident_id)
            }} />
          </div>
        </li>
      ))
      }
    </ul >
  )
}