import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Bell, Menu } from "lucide-react";

interface DashboardHeaderProps {
  hospitalName?: string;
  logoUrl?: string;
  notifications?: number;
  onMenuClick?: () => void;
  onNotificationsClick?: () => void;
}

const DashboardHeader = ({
  hospitalName = "City General Hospital",
  logoUrl = "https://api.dicebear.com/7.x/initials/svg?seed=CGH",
  notifications = 3,
  onMenuClick = () => {},
  onNotificationsClick = () => {},
}: DashboardHeaderProps) => {
  return (
    <header className="w-full h-20 bg-white border-b border-gray-200 px-4 flex items-center justify-between fixed top-0 left-0 z-50">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
          onClick={onMenuClick}
        >
          <Menu className="h-6 w-6" />
        </Button>

        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src={logoUrl} alt={hospitalName} />
            <AvatarFallback>CGH</AvatarFallback>
          </Avatar>
          <h1 className="text-xl font-semibold text-gray-900 hidden sm:block">
            {hospitalName}
          </h1>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          className="relative"
          onClick={onNotificationsClick}
        >
          <Bell className="h-5 w-5" />
          {notifications > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {notifications}
            </span>
          )}
        </Button>
      </div>
    </header>
  );
};

export default DashboardHeader;
