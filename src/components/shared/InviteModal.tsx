import { useInviteMember } from "@/queries/organizations";
import { Button } from "../ui/button"
import { Dialog, DialogClose, DialogContent,  DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog"
import { Input } from "../ui/input";
import { Loader2 } from "lucide-react";
import { useState } from "react";

export const InviteModal = () => {
  const [email, setEmail] = useState('');
  const { mutate: inviteMember, isPending: isInviting } = useInviteMember();

  const handleInvite = () => {
    inviteMember({ email_id: email });
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          + Invite members
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Invite members to your organization</DialogTitle>
        </DialogHeader>
        <Input placeholder="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <DialogClose className="flex items-center justify-end gap-2">
          <Button variant="outline">Cancel</Button>
          <Button onClick={handleInvite} disabled={isInviting}>{isInviting ? <Loader2 className="animate-spin" /> : 'Invite'}</Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  )}