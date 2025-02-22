import { QueueDetails, ParkingDetails, BedDetails } from "@/types/hospital";

const API_BASE_URL =
  import.meta.env.VITE_HOSPITAL_API_URL || "http://localhost:3000/api";

export const fetchQueueDetails = async (
  departmentId: string,
): Promise<QueueDetails> => {
  const response = await fetch(`${API_BASE_URL}/queue/${departmentId}`);
  if (!response.ok) throw new Error("Failed to fetch queue details");
  return response.json();
};

export const fetchParkingStatus = async (): Promise<ParkingDetails[]> => {
  const response = await fetch(`${API_BASE_URL}/parking/status`);
  if (!response.ok) throw new Error("Failed to fetch parking status");
  return response.json();
};

export const fetchBedAvailability = async (): Promise<BedDetails[]> => {
  const response = await fetch(`${API_BASE_URL}/beds/availability`);
  if (!response.ok) throw new Error("Failed to fetch bed availability");
  return response.json();
};
