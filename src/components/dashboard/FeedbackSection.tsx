import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { MessageSquare, Send } from "lucide-react";

const formSchema = z.object({
  serviceType: z.string().min(1, { message: "Please select a service type" }),
  feedback: z
    .string()
    .min(10, { message: "Feedback must be at least 10 characters" }),
});

interface FeedbackSectionProps {
  onSubmit?: (values: z.infer<typeof formSchema>) => void;
  serviceTypes?: Array<{ value: string; label: string }>;
}

const defaultServiceTypes = [
  { value: "general", label: "General Service" },
  { value: "emergency", label: "Emergency Care" },
  { value: "outpatient", label: "Outpatient Services" },
  { value: "pharmacy", label: "Pharmacy Services" },
  { value: "laboratory", label: "Laboratory Services" },
];

const FeedbackSection = ({
  onSubmit = (values) => console.log(values),
  serviceTypes = defaultServiceTypes,
}: FeedbackSectionProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      serviceType: "",
      feedback: "",
    },
  });

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    onSubmit(values);
    form.reset();
  };

  return (
    <Card className="w-full bg-white shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageSquare className="h-5 w-5" />
          Service Feedback
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-6"
          >
            <FormField
              control={form.control}
              name="serviceType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Service Type</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a service type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {serviceTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="feedback"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your Feedback</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Please share your experience..."
                      className="min-h-[120px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full">
              <Send className="mr-2 h-4 w-4" /> Submit Feedback
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default FeedbackSection;
