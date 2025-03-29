import * as z from 'zod';

export const contactSchema = z.object({
  fullname: z.string()
    .min(2, "Tên phải có ít nhất 2 ký tự")
    .max(100, "Tên không được vượt quá 100 ký tự")
    .trim(),
  email: z.string()
    .email("Email không hợp lệ")
    .max(100, "Email không được vượt quá 100 ký tự")
    .trim(),
  subject: z.string()
    .min(2, "Tiêu đề phải có ít nhất 2 ký tự")
    .max(200, "Tiêu đề không được vượt quá 200 ký tự")
    .trim(),
  message: z.string()
    .min(10, "Tin nhắn phải có ít nhất 10 ký tự")
    .max(5000, "Tin nhắn không được vượt quá 5000 ký tự")
    .trim(),
});

export type ContactFormValues = z.infer<typeof contactSchema>; 