import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { BedDetails } from "@/types/hospital";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Bed, Building } from "lucide-react";

interface BedDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  details: BedDetails[];
}

export function BedDetailsModal({
  isOpen,
  onClose,
  details,
}: BedDetailsModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Ketersediaan Tempat Tidur</DialogTitle>
        </DialogHeader>
        <ScrollArea className="max-h-[60vh] p-4">
          <div className="space-y-4">
            {details.map((ward) => (
              <div
                key={ward.wardName}
                className="p-4 bg-white border rounded-lg shadow-sm"
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium">{ward.wardName}</h3>
                  <span
                    className={`px-2 py-1 rounded text-sm ${ward.status === "available" ? "bg-green-100 text-green-800" : ward.status === "full" ? "bg-red-100 text-red-800" : "bg-yellow-100 text-yellow-800"}`}
                  >
                    {ward.status === "available"
                      ? "Tersedia"
                      : ward.status === "full"
                        ? "Penuh"
                        : "Terbatas"}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <Bed className="h-5 w-5 text-blue-600" />
                    <div>
                      <p className="text-sm font-medium">
                        Tempat Tidur Tersedia
                      </p>
                      <p className="text-lg">
                        {ward.availableBeds}/{ward.totalBeds}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Building className="h-5 w-5 text-purple-600" />
                    <div>
                      <p className="text-sm font-medium">Lantai</p>
                      <p className="text-lg">{ward.floorNumber}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-2 text-sm text-gray-600">
                  Tipe Bangsal: {ward.wardType}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
