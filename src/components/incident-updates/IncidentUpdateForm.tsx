import { Button } from "@/components/ui/button";
import { useCreateIncidentUpdate } from "@/queries/updates";
import { Input } from "../ui/input";
import { useState } from "react";

interface IncidentUpdateFormProps {
  incidentId: number;
}

export const IncidentUpdateForm = ({ incidentId }: IncidentUpdateFormProps) => {
  const [message, setMessage] = useState("");
  const { mutate: createIncidentUpdate } = useCreateIncidentUpdate();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createIncidentUpdate({ message, incident_id: incidentId });
    setMessage("");
  };

  return (
    <form
      onSubmit={onSubmit}
      className="flex gap-2 my-4"
    >
      <Input placeholder="Create incident update" value={message} onChange={(e) => setMessage(e.target.value)} />
      <Button type="submit">Create</Button>
    </form>
  );
}
