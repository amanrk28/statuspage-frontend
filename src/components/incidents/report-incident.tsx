import { useCreateIncident } from "@/queries/incidents";
import { Button } from "../ui/button";
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { IncidentForm } from "./IncidentsForm";
import { IncidentStatus } from "@/types/incidents";
import { useState } from "react";

export const ReportIncident = () => {
  const [open, setOpen] = useState(false);
  const { mutate: createIncident } = useCreateIncident();

  const onSubmit = (data) => {
    const payload = {
      title: data.title,
      description: data.description ?? '',
      status: IncidentStatus.INVESTIGATING,
      impact: data.impact,
      affected_service_ids: data.affected_services,
    }
    createIncident(payload);
    setOpen(false);
  }

  return (
    <>
      <Dialog open={open} onOpenChange={(open) => {
        if (!open) {
          setOpen(false);
        }
      }}>
        <DialogTrigger asChild>
          <Button variant="default" onClick={() => setOpen(true)}>
            Report incident
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Report incident</DialogTitle>
          </DialogHeader>
          <DialogClose asChild>
          <IncidentForm onSubmit={onSubmit} />
          </DialogClose>
        </DialogContent>
      </Dialog>
    </>
  )
};