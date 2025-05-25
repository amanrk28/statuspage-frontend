import { API } from './index'
import { PublicStatus } from '@/types/public-status'

export const fetchPublicStatus = (orgSlug: string) =>
  API.get<PublicStatus>(`/public/${orgSlug}`);