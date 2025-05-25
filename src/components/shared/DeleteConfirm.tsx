import { ReactNode } from "react";
import { Button } from "../ui/button"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog"
import { Loader2 } from "lucide-react";

export const DeleteConfirm = ({
  title,
  description,
  onDelete,
  isLoading = false,
  deleteTrigger
}: {
  title: ReactNode;
  description: ReactNode;
  onDelete: () => void;
  isLoading?: boolean;
  deleteTrigger?: ReactNode;
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {deleteTrigger || <Button variant="destructive" disabled={isLoading}> {isLoading ? <Loader2 className="animate-spin" /> : 'Delete'}</Button>}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          <p>{description}</p>
        </DialogDescription>
        <DialogClose className="flex items-center justify-end gap-2">
          <Button variant="outline">Cancel</Button>
          <Button variant="destructive" onClick={onDelete}>Delete</Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  )
}