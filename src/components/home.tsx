import React from "react";
import DashboardHeader from "./dashboard/DashboardHeader";
import StatusGrid from "./dashboard/StatusGrid";
import ServiceFlow from "./dashboard/ServiceFlow";
import FeedbackSection from "./dashboard/FeedbackSection";

interface HomeProps {
  hospitalData?: {
    name: string;
    logoUrl: string;
    notifications: number;
  };
  queueData?: {
    position: number;
    waitTime: string;
    status: "success" | "warning" | "error";
  };
  parkingData?: {
    available: number;
    total: number;
    status: "success" | "warning" | "error";
  };
  bedData?: {
    available: number;
    total: number;
    status: "success" | "warning" | "error";
  };
}

const Home = ({
  hospitalData = {
    name: "City General Hospital",
    logoUrl: "https://api.dicebear.com/7.x/initials/svg?seed=CGH",
    notifications: 3,
  },
  queueData = {
    position: 5,
    waitTime: "15 mins",
    status: "success",
  },
  parkingData = {
    available: 45,
    total: 100,
    status: "warning",
  },
  bedData = {
    available: 12,
    total: 50,
    status: "success",
  },
}: HomeProps) => {
  const [isSideMenuOpen, setIsSideMenuOpen] = React.useState(false);

  const handleMenuClick = () => {
    setIsSideMenuOpen(!isSideMenuOpen);
  };

  const handleNotificationsClick = () => {
    console.log("Notifications clicked");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader
        hospitalName={hospitalData.name}
        logoUrl={hospitalData.logoUrl}
        notifications={hospitalData.notifications}
        onMenuClick={handleMenuClick}
        onNotificationsClick={handleNotificationsClick}
      />

      <main className="pt-20 px-4 md:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="space-y-6 py-6">
          <StatusGrid
            queueData={queueData}
            parkingData={parkingData}
            bedData={bedData}
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ServiceFlow />
            <FeedbackSection />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
