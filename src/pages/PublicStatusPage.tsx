import { useParams } from "react-router-dom";
import { usePublicStatus } from "@/queries/public-status";
import { ServiceCard } from "@/components/public-status/ServiceCard";
import { PublicServiceIncidentList } from "@/components/public-status/PublicStatusIncidentList";
import { useWebSocket } from "@/hooks/useWebsocket";
import { ServiceStatus } from "@/types/services";

export const PublicStatusPage = () => {
  const { orgSlug } = useParams();
  const { data, isLoading, refetch } = usePublicStatus(orgSlug!);

  useWebSocket(() => {
    refetch();
  });

  if (isLoading) return <div className="text-center p-10">Loading status...</div>;
  if (!data) return <div className="text-center p-10">Status not found.</div>;

  const allOperational = data.public_services.every(s => s.current_status.toLowerCase() === ServiceStatus.OPERATIONAL);

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">{data.organization.name} Status</h1>
      {data.public_services.length === 0 ? (
        <div className="bg-yellow-100 text-yellow-800 p-4 rounded-xl">
          ⚠️ No services found
        </div>
      ) : (
        <div className="mb-6">
          {allOperational ? (
            <div className="bg-green-100 text-green-800 p-4 rounded-xl">
              ✅ All systems operational
            </div>
          ) : (
            <div className="bg-yellow-100 text-yellow-800 p-4 rounded-xl">
              ⚠️ Some services are experiencing issues
            </div>
          )}
        </div>)}

      {data.public_services.map(service => (
        <ServiceCard key={service.service_id} service={service} />
      ))}
      <hr className="my-6 border-gray-300" />
      <PublicServiceIncidentList incidents={data.incidents} />
    </div>
  );
}
