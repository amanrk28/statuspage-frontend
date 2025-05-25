import { fetchPublicStatus } from "@/api/public-status";
import { useQuery } from "@tanstack/react-query";

export const usePublicStatus = (orgSlug: string) =>
  useQuery({
    queryKey: ["publicStatus", orgSlug],
    queryFn: () => fetchPublicStatus(orgSlug).then(res => res.data),
  });
