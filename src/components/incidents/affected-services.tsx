import { ChevronDown, Trash } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { useServices } from "@/queries/services";

export const AffectedServices = ({ selectedServices, setSelectedServices }: { selectedServices: number[], setSelectedServices: (services: number[]) => void }) => {
  const { data: services } = useServices();

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button variant="outline" className="capitalize">
              Affected Services <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {services?.filter((service) => !selectedServices.includes(service.service_id)).map((service) => (
              <DropdownMenuItem key={service.service_id} className="capitalize" onSelect={() => setSelectedServices([...selectedServices, service.service_id])}>{service.name}</DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      {selectedServices.length > 0 && (
        <div className="max-h-[150px] overflow-y-auto flex flex-col gap-2 border border-gray-200 rounded-md p-2">
          {selectedServices.map((service) => {
            const serviceName = services?.find((s) => s.service_id === service)?.name;
            return (
              <div key={service} className="flex items-center justify-between w-full">
                <p className="text-gray-600">{serviceName}</p>
                <Button variant="destructive" className="capitalize" onClick={() => setSelectedServices(selectedServices.filter((s) => s !== service))}><Trash /></Button>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}