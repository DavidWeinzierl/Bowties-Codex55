import { z } from "zod";

export const eventTypes = [
  "Wedding",
  "Birthday",
  "Company celebration",
  "Gala",
  "Prom",
  "Other",
] as const;

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name."),
  email: z.string().trim().email("Please enter a valid email address."),
  eventDate: z.string().min(1, "Please select a date."),
  eventType: z.enum(eventTypes, { message: "Please select an event type." }),
  message: z
    .string()
    .trim()
    .min(15, "Tell us a little more about your event.")
    .max(2000, "Please keep your message under 2,000 characters."),
});

export type ContactFormData = z.infer<typeof contactSchema>;
