import { PublicService } from '@/types/public-status';
import { UptimeBar } from './UptimeBar';
import { IncidentStatusBadge } from '../shared/IncidentStatusBadge';

export function ServiceCard({ service }: { service: PublicService }) {
  const statusColor = {
    operational: 'text-green-600',
    degraded: 'text-yellow-600',
    partial_outage: 'text-orange-500',
    major_outage: 'text-red-600',
    maintenance: 'text-blue-500',
  }[service.current_status];

  return (
    <div className="mb-6 border rounded-lg p-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">{service.name}</h3>
          <p className="text-sm text-gray-500">{service.description}</p>
        </div>
        <div className={`flex items-center gap-2 font-medium ${statusColor}`}>
          <span className="h-2 w-2 rounded-full bg-current" />
          <span className="capitalize">{service.current_status.replace("_", " ")}</span>
        </div>
      </div>
      <div className="mt-4">
        <UptimeBar history={service.uptime_history} />
        <p className="text-xs text-gray-400 mt-1">Uptime over the past 90 days</p>
        {service.latest_incident_status && (
          <div className="mt-2 flex gap-4">
            <IncidentStatusBadge status={service.latest_incident_status} />
            <p className="text-sm text-gray-500">{service.latest_incident_message}</p>
          </div>
        )}
      </div>
    </div>
  );
}
