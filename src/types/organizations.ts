export interface OrganizationCreate {
  org_name: string;
  email_id: string;
  password: string;
}

export interface OrganizationCreateResponse {
  auth0_org_id: number;
  name: string;
}

export interface OrganizationInviteMember {
  email_id: string;
}


export interface OrganizationRead {
  name: string;
}