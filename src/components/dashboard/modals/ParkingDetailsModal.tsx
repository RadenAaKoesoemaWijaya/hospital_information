import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ParkingDetails } from "@/types/hospital";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Car, ArrowUp, ArrowDown } from "lucide-react";

interface ParkingDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  details: ParkingDetails[];
}

export function ParkingDetailsModal({
  isOpen,
  onClose,
  details,
}: ParkingDetailsModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Ketersediaan Parkir</DialogTitle>
        </DialogHeader>
        <ScrollArea className="max-h-[60vh] p-4">
          <div className="space-y-4">
            {details.map((floor) => (
              <div
                key={floor.floorNumber}
                className="p-4 bg-white border rounded-lg shadow-sm"
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium">Lantai {floor.floorNumber}</h3>
                  <span
                    className={`px-2 py-1 rounded text-sm ${floor.status === "open" ? "bg-green-100 text-green-800" : floor.status === "full" ? "bg-red-100 text-red-800" : "bg-yellow-100 text-yellow-800"}`}
                  >
                    {floor.status === "open"
                      ? "Tersedia"
                      : floor.status === "full"
                        ? "Penuh"
                        : "Perbaikan"}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <Car className="h-5 w-5 text-blue-600" />
                    <div>
                      <p className="text-sm font-medium">Tersedia</p>
                      <p className="text-lg">
                        {floor.availableSpaces}/{floor.totalSpaces}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="flex flex-col">
                      <ArrowUp className="h-4 w-4 text-green-600" />
                      <ArrowDown className="h-4 w-4 text-red-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Tempat Disabilitas</p>
                      <p className="text-lg">
                        {floor.disabledSpaces.available}/
                        {floor.disabledSpaces.total}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
