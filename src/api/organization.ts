import { API } from "./index";
import { OrganizationCreate, OrganizationCreateResponse, OrganizationInviteMember } from "@/types/organizations";

export const createOrganization = (data: OrganizationCreate) =>
  API.post<OrganizationCreateResponse>("/organizations", data);

export const inviteMember = (data: OrganizationInviteMember) =>
  API.post("/organizations/invite", data);
