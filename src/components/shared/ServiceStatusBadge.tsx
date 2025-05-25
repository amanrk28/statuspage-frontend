import { Badge } from "@/components/ui/badge";
import clsx from "clsx";

export const ServiceStatusBadge = ({ status }: { status: string }) => {
  const color = {
    operational: "bg-green-600",
    degraded: "bg-yellow-500",
    down: "bg-red-500",
  }[status.toLowerCase()] ?? "bg-gray-500";

  return (
    <Badge className={clsx("capitalize", color)}>
      {status.replace("_", " ")}
    </Badge>
  );
};
