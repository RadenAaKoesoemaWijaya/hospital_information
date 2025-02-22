import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Clock, Users, Car, Bed } from "lucide-react";

type StatusType = "queue" | "parking" | "beds";

interface StatusCardProps {
  type?: StatusType;
  title?: string;
  value?: string | number;
  status?: "success" | "warning" | "error";
  subtitle?: string;
  lastUpdated?: string;
  onClick?: () => void;
  details?: any;
}

const getStatusColor = (status: StatusCardProps["status"]) => {
  switch (status) {
    case "success":
      return "bg-green-100 text-green-800";
    case "warning":
      return "bg-yellow-100 text-yellow-800";
    case "error":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const getStatusIcon = (type: StatusType) => {
  switch (type) {
    case "queue":
      return <Users className="h-6 w-6" />;
    case "parking":
      return <Car className="h-6 w-6" />;
    case "beds":
      return <Bed className="h-6 w-6" />;
    default:
      return <Clock className="h-6 w-6" />;
  }
};

const StatusCard = ({
  type = "queue",
  title = "Status Antrian",
  value = "--",
  status = "success",
  subtitle = "Posisi saat ini",
  lastUpdated = "1 menit yang lalu",
  onClick,
  details,
}: StatusCardProps) => {
  return (
    <Card
      className="w-full bg-white shadow-lg hover:shadow-xl transition-shadow duration-200 cursor-pointer"
      onClick={onClick}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
          {getStatusIcon(type)}
          {title}
        </CardTitle>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Badge
                variant="secondary"
                className={`${getStatusColor(status)} text-xs px-2 py-1`}
              >
                {status}
              </Badge>
            </TooltipTrigger>
            <TooltipContent>
              <p>Last updated: {lastUpdated}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>
      </CardContent>
    </Card>
  );
};

export default StatusCard;
