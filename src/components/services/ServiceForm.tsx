import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";

export const ServiceForm = ({ onSubmit, initialData, isLoading }) => {
  const [name, setName] = useState("");

  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
    } else {
      setName("");
    }
  }, [initialData]);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit({ name });
        setName("");
      }}
      className="flex gap-2 mb-4"
    >
      <Input autoFocus value={name} onChange={(e) => setName(e.target.value)} placeholder="Service Name" disabled={isLoading} />
      <Button type="submit" disabled={isLoading}>{isLoading ? <Loader2 className="animate-spin" /> : initialData ? "Update" : "Add"}</Button>
    </form>
  );
}
