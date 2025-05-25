import { useMutation } from "@tanstack/react-query";
import { createOrganization, inviteMember } from "@/api/organization";

export const useCreateOrganization = () => {
  return useMutation({
    mutationFn: createOrganization,
  });
};

export const useInviteMember = () => {
  return useMutation({
    mutationFn: inviteMember,
  });
};
