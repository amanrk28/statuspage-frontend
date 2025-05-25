import { PublicServiceHistoryResponse } from '@/types/public-status';
import { ServiceStatus } from '@/types/services';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';
import { formatDateString, formatDuration } from '@/utils/date-utils';

const getColor = (status: ServiceStatus) => {
  switch (status) {
    case ServiceStatus.OPERATIONAL:
      return 'bg-green-500';
    case ServiceStatus.DEGRADED:
      return 'bg-yellow-400';
    case ServiceStatus.PARTIAL_OUTAGE:
      return 'bg-orange-400';
    case ServiceStatus.MAJOR_OUTAGE:
      return 'bg-red-500';
    case ServiceStatus.MAINTENANCE:
      return 'bg-blue-400';
    default:
      return 'bg-gray-300';
  }
};

export function UptimeBar({ history }: { history: PublicServiceHistoryResponse[] }) {
  return (
    <div className="flex items-end gap-[2px] h-8">
      <TooltipProvider>
        {history.map((entry) => {
          const dateLabel = formatDateString(entry.date, "dd MMM yyyy");
          const tooltipMessage = `${formatDuration(entry.downtime_seconds)}`;

          return (
            <Tooltip key={entry.date}>
              <TooltipTrigger asChild>
                <div
                  className={`w-[5px] h-full ${getColor(entry.status)} cursor-pointer`}
                />
              </TooltipTrigger>
              <TooltipContent>
                <div className='p-4'>
                  <p className="font-medium">{dateLabel}</p>
                  {entry.downtime_seconds === 0 ? "No downtime recorded on this day." : (

                    <div className='bg-gray-100 p-2 mt-4 w-[200px]'>
                      <p className="text-sm text-gray-600 capitalize flex items-center justify-between">
                        <span>{entry.status.replace("_", " ")} </span>
                        <span>{tooltipMessage}</span>
                      </p>
                    </div>
                  )}
                </div>
              </TooltipContent>
            </Tooltip>
          );
        })}
      </TooltipProvider>
    </div>
  );
}
