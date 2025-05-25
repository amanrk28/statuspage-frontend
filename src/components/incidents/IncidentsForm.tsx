import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { IncidentImpact } from "@/types/incidents";
import { useState } from "react";
import { Impact } from "./impact";
import { AffectedServices } from "./affected-services";

interface IncidentFormData {
  title: string;
  description: string;
  affected_services: number[];
  impact: IncidentImpact;
}

interface IncidentFormProps {
  onSubmit: (data: IncidentFormData) => void;
}

export const IncidentForm = ({ onSubmit }: IncidentFormProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [impact, setImpact] = useState(IncidentImpact.MINOR);
  const [selectedServices, setSelectedServices] = useState<number[]>([]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!title || !selectedServices.length) {
      return;
    }
    onSubmit({ title, description, affected_services: selectedServices, impact });
    setTitle("");
    setDescription("");
    setImpact(IncidentImpact.MINOR);
    setSelectedServices([]);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4"
    >
      <Input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
      <Textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
      <Impact impact={impact} setImpact={setImpact} />
      <AffectedServices selectedServices={selectedServices} setSelectedServices={setSelectedServices} />
      <Button type="submit">Report Incident</Button>
    </form>
  );
}
