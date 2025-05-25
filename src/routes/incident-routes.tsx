import { IncidentDetailsPage } from "@/pages/IncidentDetailsPage"
import { IncidentsPage } from "@/pages/IncidentsPage"
import { Route, Routes } from "react-router-dom"

export const IncidentRoutes = () => {
  return (
    <Routes>
      <Route path=":incidentId/*" element={<IncidentDetailsPage />} />
      <Route path="/" element={<IncidentsPage />} />
    </Routes>
  )
}