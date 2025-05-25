import { ChevronDown } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { IncidentImpact } from "@/types/incidents";

export const Impact = ({impact, setImpact}: {impact: IncidentImpact, setImpact: (impact: IncidentImpact) => void}) => {
  return (
    <div className="flex items-center gap-2">
    <p className="text-gray-600">Impact</p>
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button variant="outline" className="capitalize">
          {impact} <ChevronDown />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {Object.values(IncidentImpact).map((impact) => (
          <DropdownMenuItem key={impact} className="capitalize" onSelect={() => setImpact(impact)}>{impact}</DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  </div>
   )
}