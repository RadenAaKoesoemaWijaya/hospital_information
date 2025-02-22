export interface QueueDetails {
  id: string;
  position: number;
  department: string;
  doctorName: string;
  estimatedTime: string;
  currentToken: string;
  waitingCount: number;
  averageWaitTime: number;
}

export interface ParkingDetails {
  floorNumber: number;
  totalSpaces: number;
  availableSpaces: number;
  occupiedSpaces: number;
  disabledSpaces: {
    total: number;
    available: number;
  };
  status: "open" | "full" | "maintenance";
}

export interface BedDetails {
  wardName: string;
  totalBeds: number;
  occupiedBeds: number;
  availableBeds: number;
  wardType: string;
  floorNumber: number;
  status: "available" | "limited" | "full";
}
