import React from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { ChevronRight, CheckCircle } from "lucide-react";

interface ServiceStep {
  id: number;
  title: string;
  description: string;
  status: "completed" | "current" | "upcoming";
  timestamp?: string;
  waitTime?: string;
  type: "emergency" | "outpatient";
}

interface ServiceFlowProps {
  steps?: ServiceStep[];
  currentStep?: number;
}

const ServiceFlow = ({
  steps = [
    {
      id: 1,
      title: "Registration",
      description: "Complete patient registration",
      status: "completed",
      timestamp: "09:00 AM",
      waitTime: "5 mins",
      type: "outpatient",
    },
    {
      id: 2,
      title: "Vital Signs",
      description: "Basic health checks",
      status: "completed",
      timestamp: "09:15 AM",
      waitTime: "10 mins",
      type: "outpatient",
    },
    {
      id: 3,
      title: "Specialist Queue",
      description: "Waiting for specialist consultation",
      status: "current",
      timestamp: "09:30 AM",
      waitTime: "45 mins",
      type: "outpatient",
    },
    {
      id: 4,
      title: "Consultation",
      description: "Meet with specialist",
      status: "upcoming",
      type: "outpatient",
    },
    {
      id: 5,
      title: "Pharmacy",
      description: "Collect prescribed medications",
      status: "upcoming",
      type: "outpatient",
    },
  ],
  currentStep = 2,
}: ServiceFlowProps) => {
  const getStatusColor = (status: ServiceStep["status"]) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "current":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Card className="w-full p-6 bg-white">
      <h3 className="text-lg font-semibold mb-4">Service Flow</h3>
      <div className="relative">
        {steps.map((step, index) => (
          <motion.div
            key={step.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-start mb-4 last:mb-0"
          >
            <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center">
              {step.status === "completed" ? (
                <CheckCircle className="w-6 h-6 text-green-500" />
              ) : (
                <div
                  className={`w-6 h-6 rounded-full ${step.status === "current" ? "bg-blue-500" : "bg-gray-200"} flex items-center justify-center text-white text-sm`}
                >
                  {step.id}
                </div>
              )}
            </div>
            <div className="ml-4 flex-grow">
              <div className="flex items-center justify-between">
                <h4 className="text-base font-medium">{step.title}</h4>
                <Badge className={`${getStatusColor(step.status)}`}>
                  {step.status}
                </Badge>
              </div>
              <p className="text-sm text-gray-500 mt-1">{step.description}</p>
              {step.timestamp && (
                <div className="flex items-center gap-2 mt-1 text-xs text-gray-400">
                  <span>Time: {step.timestamp}</span>
                  {step.waitTime && (
                    <span className="text-blue-500">Wait: {step.waitTime}</span>
                  )}
                </div>
              )}
            </div>
            {index < steps.length - 1 && (
              <div className="flex-shrink-0 ml-4">
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </Card>
  );
};

export default ServiceFlow;
