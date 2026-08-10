import { z } from "zod";

export const contactSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, "Please enter your full name."),
  organisation: z.string().trim().optional().or(z.literal("")),
  email: z
    .string()
    .trim()
    .min(1, "Please enter a valid email address.")
    .email("Please enter a valid email address."),
  phone: z.string().trim().optional().or(z.literal("")),
  reason: z.string().min(1, "Please select a reason for contacting LABESE."),
  message: z
    .string()
    .trim()
    .min(10, "Please provide a message."),
  consent: z.literal(true, {
    message: "Please confirm that you consent to being contacted.",
  }),
  // Honeypot field — must remain empty. Bots typically fill every field.
  website: z.string().max(0).optional().or(z.literal("")),
});

export type ContactFormValues = z.infer<typeof contactSchema>;

export const contactReasons = [
  "General enquiry",
  "Partnership proposal",
  "Programme enquiry",
  "Media enquiry",
  "Invitation to collaborate",
  "Other",
];
