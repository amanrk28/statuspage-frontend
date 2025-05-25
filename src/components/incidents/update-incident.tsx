import { Loader2, Check, Binoculars, SearchCheck } from "lucide-react";
import { IncidentRead, IncidentStatus } from "@/types/incidents";
import { Button } from "../ui/button";
import { useUpdateIncident } from "@/queries/incidents";
import { useNavigate } from "react-router-dom";

const updateActions = {
  [IncidentStatus.RESOLVED]: {
    label: "Write postmortem",
    icon: null,
    action: null,
  },
  [IncidentStatus.INVESTIGATING]: {
    label: "Mark identified",
    icon: <SearchCheck />,
    action: IncidentStatus.IDENTIFIED,
  },
  [IncidentStatus.IDENTIFIED]: {
    label: "Mark monitoring",
    icon: <Binoculars />,
    action: IncidentStatus.MONITORING,
  },
  [IncidentStatus.MONITORING]: {
    label: "Mark resolved",
    icon: <Check />,
    action: IncidentStatus.RESOLVED,
  }
};

interface UpdateIncidentProps {
  incident: IncidentRead;
}

export const UpdateIncident = ({ incident }: UpdateIncidentProps) => {
  const navigate = useNavigate();
  const { mutate: updateMutate, isPending } = useUpdateIncident();

  const handleIncidentClick = (incidentId: number) => {
    navigate(`${incidentId}`, { replace: true });
  }

  const handleIncidentStatusUpdate = (incidentId: number, status?: IncidentStatus) => {
    if (incident.status === IncidentStatus.RESOLVED) {
      handleIncidentClick(incident.incident_id);
    }
    if (!status) {
      return;
    }
    updateMutate({
      incident_id: incidentId,
      status,
    });
  }


  return (
    <Button variant="outline" onClick={() => handleIncidentStatusUpdate(
      incident.incident_id,
      updateActions[incident.status].action ?? undefined,
    )}>
      {isPending ? (
        <Loader2 className="animate-spin" />
      ) : updateActions[incident.status].icon}
      {updateActions[incident.status].label}
    </Button>
  );
};