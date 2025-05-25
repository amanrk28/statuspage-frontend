import { ServiceDetailsPage } from "@/pages/ServiceDetailsPage"
import { ServicesPage } from "@/pages/ServicesPage"
import { Route, Routes } from "react-router-dom"

export const ServiceRoutes = () => {
  return (
    <Routes>
      <Route path=":serviceId/*" element={<ServiceDetailsPage />} />
      <Route path="/" element={<ServicesPage />} />
    </Routes>
  )
}