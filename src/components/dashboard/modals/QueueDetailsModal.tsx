import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { QueueDetails } from "@/types/hospital";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Users, Clock, User } from "lucide-react";

interface QueueDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  details: QueueDetails;
}

export function QueueDetailsModal({
  isOpen,
  onClose,
  details,
}: QueueDetailsModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Detail Antrian - {details.department}</DialogTitle>
        </DialogHeader>
        <ScrollArea className="max-h-[60vh] p-4">
          <div className="space-y-4">
            <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg">
              <Users className="h-5 w-5 text-blue-600" />
              <div>
                <p className="font-medium">Posisi Saat Ini</p>
                <p className="text-sm text-gray-600">
                  #{details.position} dari {details.waitingCount}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 p-3 bg-green-50 rounded-lg">
              <Clock className="h-5 w-5 text-green-600" />
              <div>
                <p className="font-medium">Estimasi Waktu Tunggu</p>
                <p className="text-sm text-gray-600">{details.estimatedTime}</p>
              </div>
            </div>

            <div className="flex items-center gap-2 p-3 bg-purple-50 rounded-lg">
              <User className="h-5 w-5 text-purple-600" />
              <div>
                <p className="font-medium">Dokter Saat Ini</p>
                <p className="text-sm text-gray-600">{details.doctorName}</p>
              </div>
            </div>

            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">
                Rata-rata waktu tunggu: {details.averageWaitTime} menit
                <br />
                Nomor antrian saat ini: {details.currentToken}
              </p>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
