import { InviteModal } from "@/components/shared/InviteModal";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { getRandomColor } from "@/utils/random-color";
import { useAuth0 } from "@auth0/auth0-react";
import { Link, Outlet, useLocation } from "react-router-dom";

const navItems = [
  { name: "Services", path: "/services" },
  { name: "Incidents", path: "/incidents" },
]

export const DashboardLayout = () => {
  const location = useLocation();
  const { user, logout } = useAuth0();
  console.log(user)
  return (
    <div className="flex h-screen overflow-hidden">
      <aside className="w-64 py-12 px-4 bg-white shadow-md h-screen max-h-screen left-0 z-10 flex flex-col justify-between">
        <h1 className="text-2xl font-bold mb-12">Statuspage</h1>
        <nav className="flex flex-col justify-between h-full">
          <div className="flex flex-col gap-2">
            {navItems.map((item) => {
              const isActive = location.pathname.includes(item.path)
              return (
                <Link to={item.path} key={item.path} className={cn(
                  "block px-3 py-2 rounded-md text-sm font-medium transition-colors",
                  isActive
                    ? "bg-gray-100 text-blue-600"
                    : "text-muted-foreground hover:bg-muted"
                )}>
                  {item.name}
                </Link>
              )
            })}
          </div>
          <div className="flex-1 flex items-end w-full">
            <div className="flex flex-col gap-2 w-full">
              <div className="flex items-center gap-2">
                <Avatar className={`bg-${getRandomColor(user?.email || user?.name || '')}-500`}>
                  <AvatarImage src={user?.picture} alt={user?.name || user?.email} />
                  <AvatarFallback>
                    {user?.email?.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <span className="text-gray-600 text-sm">{user?.name || user?.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <InviteModal />
                <Button variant="outline" onClick={() => logout()}>
                  Logout
                </Button>
              </div>
            </div>
          </div>
        </nav>
      </aside>
      <main className="flex-1 py-12 px-20 h-screen overflow-hidden">
        <Outlet />
      </main>
    </div>
  );
}
