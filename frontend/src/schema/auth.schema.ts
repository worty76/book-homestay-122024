import * as z from "zod";

export const loginSchema = z.object({
  email: z.string().email({ message: "Vui lòng nhập địa chỉ email hợp lệ" }),
  password: z.string().min(8, { message: "Mật khẩu phải có ít nhất 8 ký tự" }),
});

export const registerSchema = z.object({
  username: z.string().min(3, { message: "Tên người dùng phải có ít nhất 3 ký tự" }),
  email: z.string().email({ message: "Vui lòng nhập địa chỉ email hợp lệ" }),
  password: z
    .string()
    .min(8, { message: "Mật khẩu phải có ít nhất 8 ký tự" })
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      "Mật khẩu phải chứa ít nhất một chữ hoa, một chữ thường và một số"
    ),
  confirmPassword: z.string(),
  phoneNumber: z
    .string()
    .regex(/^\+?[0-9]{10,}$/, "Vui lòng nhập số điện thoại hợp lệ"),
  identificationNumber: z
    .string()
    .min(9, { message: "Số CMND/CCCD phải có ít nhất 9 ký tự" })
    .regex(/^[0-9]+$/, "Số CMND/CCCD chỉ được chứa số"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Mật khẩu xác nhận không khớp",
  path: ["confirmPassword"],
});

export type LoginFormValues = z.infer<typeof loginSchema>;
export type RegisterFormValues = z.infer<typeof registerSchema>; 