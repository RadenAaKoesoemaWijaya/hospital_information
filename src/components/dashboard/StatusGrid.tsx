import React, { useState, useEffect } from "react";
import StatusCard from "./StatusCard";
import { QueueDetailsModal } from "./modals/QueueDetailsModal";
import { ParkingDetailsModal } from "./modals/ParkingDetailsModal";
import { BedDetailsModal } from "./modals/BedDetailsModal";
import {
  fetchQueueDetails,
  fetchParkingStatus,
  fetchBedAvailability,
} from "@/lib/api";
import { QueueDetails, ParkingDetails, BedDetails } from "@/types/hospital";

interface StatusGridProps {
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

const StatusGrid = () => {
  const [queueDetails, setQueueDetails] = useState<QueueDetails | null>(null);
  const [parkingDetails, setParkingDetails] = useState<ParkingDetails[] | null>(
    null,
  );
  const [bedDetails, setBedDetails] = useState<BedDetails[] | null>(null);

  const [showQueueModal, setShowQueueModal] = useState(false);
  const [showParkingModal, setShowParkingModal] = useState(false);
  const [showBedModal, setShowBedModal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [queue, parking, beds] = await Promise.all([
          fetchQueueDetails("general"),
          fetchParkingStatus(),
          fetchBedAvailability(),
        ]);

        setQueueDetails(queue);
        setParkingDetails(parking);
        setBedDetails(beds);
      } catch (error) {
        console.error("Error fetching status data:", error);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 30000); // Refresh every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const getQueueStatus = () => ({
    position: 5,
    waitTime: "15 menit",
    status: "warning",
  });

  const getParkingStatus = () => ({
    available: 7,
    total: 30,
    status: "warning",
  });

  const getBedStatus = () => ({
    available: 6,
    total: 200,
    status: "warning",
  });

  return (
    <div className="w-full bg-gray-50 p-6">
      {queueDetails && (
        <QueueDetailsModal
          isOpen={showQueueModal}
          onClose={() => setShowQueueModal(false)}
          details={queueDetails}
        />
      )}

      {parkingDetails && (
        <ParkingDetailsModal
          isOpen={showParkingModal}
          onClose={() => setShowParkingModal(false)}
          details={parkingDetails}
        />
      )}

      {bedDetails && (
        <BedDetailsModal
          isOpen={showBedModal}
          onClose={() => setShowBedModal(false)}
          details={bedDetails}
        />
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatusCard
          type="queue"
          title="Status Antrian"
          value={getQueueStatus().position}
          status={getQueueStatus().status}
          subtitle={`Estimasi waktu tunggu: ${getQueueStatus().waitTime}`}
          onClick={() => setShowQueueModal(true)}
          details={queueDetails}
        />
        <StatusCard
          type="parking"
          title="Ketersediaan Parkir"
          value={`${getParkingStatus().available}/${getParkingStatus().total}`}
          status={getParkingStatus().status}
          subtitle={`${getParkingStatus().available} tempat tersedia`}
          onClick={() => setShowParkingModal(true)}
          details={parkingDetails}
        />
        <StatusCard
          type="beds"
          title="Ketersediaan Tempat Tidur"
          value={`${getBedStatus().available}/${getBedStatus().total}`}
          status={getBedStatus().status}
          subtitle={`${getBedStatus().available} tempat tidur tersedia`}
          onClick={() => setShowBedModal(true)}
          details={bedDetails}
        />
      </div>
    </div>
  );
};

export default StatusGrid;
