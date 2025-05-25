import { formatDistanceToNow, formatDate, intervalToDuration } from "date-fns";


export const timeAgo = (dateString: string) =>
  formatDistanceToNow(new Date(dateString), { addSuffix: true });

export const formatDateString = (dateString?: string | null, formatString: string = "dd MMM yyyy (HH:mm)"): string => {
  if (dateString == null) {
    return "";
  }
  const date = new Date(dateString);
  return formatDate(date, formatString);
}

export function formatDuration(seconds: number): string {
  const totalMilliseconds = Math.floor(seconds * 1000);

  const duration = intervalToDuration({
    start: 0,
    end: totalMilliseconds,
  });

  const parts: string[] = [];

  if (duration.hours) parts.push(`${duration.hours}h`);
  if (duration.minutes) parts.push(`${duration.minutes}m`);
  if (!duration.hours && !duration.minutes) parts.push("<1m");

  return parts.join(" ");
}
