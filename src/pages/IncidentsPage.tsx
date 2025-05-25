
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { IncidentsList } from "@/components/incidents/IncidentsList";
import { ReportIncident } from "@/components/incidents/report-incident";

const incidentTabs = [
  { name: "Open", value: "open" },
  { name: "Resolved", value: "resolved" },
  { name: "All", value: "all" },
]

export const IncidentsPage = () => {
  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between mb-4 sticky top-0 z-10">
        <h1 className="text-2xl font-bold mb-4">Incidents</h1>
        <ReportIncident />
      </div>
      <Tabs defaultValue="open">
        <TabsList>
          {incidentTabs.map((tab) => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
            >
              {tab.name}
            </TabsTrigger>
          ))}
        </TabsList>
        <TabsContent value="all" className="h-full overflow-y-auto">
          <IncidentsList />
        </TabsContent>
        <TabsContent value="open" className="h-full overflow-y-scroll flex-1">
          <IncidentsList resolved={'false'} />
        </TabsContent>
        <TabsContent value="resolved" className="h-full overflow-y-scroll flex-1">
          <IncidentsList resolved={'true'} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
