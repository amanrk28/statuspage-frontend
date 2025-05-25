import { Loader2 } from "lucide-react";
import { useIncidentUpdates } from "@/queries/updates";
import { IncidentUpdate } from "@/types/incident-updates";
import { IncidentStatus } from "@/types/incidents";
import { IncidentUpdateForm } from "./IncidentUpdateForm";
import { useMemo } from "react";
import { IncidentStatusBadge } from "../shared/IncidentStatusBadge";
import { timeAgo } from "@/utils/date-utils";

export const IncidentUpdateList = ({ incidentId, incidentStatus }) => {
  const { data: updates, isLoading: isLoadingUpdates } = useIncidentUpdates(Number(incidentId));

  const incidentUpdateGroupedByStatus = useMemo(() => {
    const groupedUpdates = (updates ?? []).reduce((acc, update) => {
      if (acc[update.status] == null) {
        acc[update.status] = [];
      }
      acc[update.status].push(update);
      return acc;
    }, {} as Record<IncidentStatus, IncidentUpdate[]>);


    return groupedUpdates;
  }, [updates]);

  if (isLoadingUpdates) {
    return (
      <div className="flex items-center justify-center">
        <Loader2 className="animate-spin" />
      </div>
    );
  }

  return (
    <div>
      <h3 className="text-lg font-semibold mt-6 mb-4">Incident Updates</h3>
      {incidentUpdateGroupedByStatus?.[incidentStatus] == null && incidentStatus !== IncidentStatus.RESOLVED ? (
        <>
          <IncidentStatusBadge status={incidentStatus} />
          <IncidentUpdateForm
            incidentId={incidentId}
          />
        </>
      ) : null}
      {Object.entries(incidentUpdateGroupedByStatus || {}).map(([status, updates]) => (
        <div key={status} className="mb-4">
          <IncidentStatusBadge status={status as IncidentStatus} />
          {status === incidentStatus && (
            <IncidentUpdateForm
              incidentId={incidentId}
            />
          )}
          <div className="border-l pl-4 my-4 ml-3">
            {updates?.map(update => (
              <div key={update.incident_update_id} className="flex justify-start py-2">
                <p className="text-sm text-gray-500 min-w-48">{timeAgo(update.created_at)}</p>
                <p>{update.message}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};