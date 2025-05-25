import { IncidentRead } from '@/types/incidents';
import { format, isSameDay, subDays } from 'date-fns';
import { IncidentStatusBadge } from '../shared/IncidentStatusBadge';

const past14Days = Array.from({ length: 14 }, (_, i) => subDays(new Date(), i));

export function PublicServiceIncidentList({ incidents }: { incidents: IncidentRead[] }) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Past Incidents</h2>
      {past14Days.map((date) => {
        const dayIncidents = incidents.filter((incident) =>
          isSameDay(new Date(incident.created_at.split('T')[0]), date)
        ).sort((a, b) => b.created_at.localeCompare(a.created_at));

        return (
          <div key={date.toISOString()} className='mb-6'>
            <h3 className="text-lg font-semibold">{format(date, "dd MMM yyyy")}</h3>
            <hr className="my-2 border-gray-300" />

            {dayIncidents.length > 0 ? (
              <ul className="list-disc list-inside space-y-1">
                {dayIncidents.map((incident) => (
                  <li key={incident.incident_id}>
                    <span className="font-medium">{incident.title}</span>{" "}
                    <IncidentStatusBadge status={incident.status} />
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-gray-500">No incident reported.</p>
            )}
          </div>
        );
      })}
    </div>
  );
}
