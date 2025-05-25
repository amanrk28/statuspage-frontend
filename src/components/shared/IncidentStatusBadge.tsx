import { Badge } from "@/components/ui/badge";
import { IncidentStatus } from "@/types/incidents";
import clsx from "clsx";

export const IncidentStatusBadge = ({ status }: { status: IncidentStatus }) => {
  const color = {
    investigating: "bg-orange-600",
    identified: "bg-red-600",
    monitoring: "bg-amber-500",
    resolved: "bg-gray-400"
  }[status.toLowerCase()] ?? "bg-gray-400";

  return (
    <Badge className={clsx("capitalize", color)}>
      {status.replace("_", " ")}
    </Badge>
  );
};
