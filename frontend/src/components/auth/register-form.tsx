"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { 
  AlertCircle, 
  Eye, 
  EyeOff, 
  Loader2, 
  User, 
  Mail, 
  Lock, 
  Phone, 
  CreditCard 
} from "lucide-react";
import { useRegister } from "@/api/auth";
import { registerSchema, type RegisterFormValues } from "@/schema/auth.schema";
import { motion } from "framer-motion";

export function RegisterForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const registerMutation = useRegister();

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      phoneNumber: "",
      identificationNumber: "",
    },
  });

  async function onSubmit(data: RegisterFormValues) {
    setError(null);
    try {
      await registerMutation.mutateAsync(data);
      router.push("/login?registered=true");
    } catch (error) {
      setError(error instanceof Error ? error.message : "Đã xảy ra lỗi. Vui lòng thử lại.");
    }
  }

  const fadeIn = {
    hidden: { opacity: 0, y: 10 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.4,
        ease: "easeOut"
      }
    })
  };

  return (
    <div className="w-full">
      <div className="mb-6">
        <motion.h1 
          className="text-3xl font-semibold mb-2 bg-gradient-to-r from-gray-800 to-gray-900 bg-clip-text text-transparent"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Đăng ký tài khoản
        </motion.h1>
        <motion.p 
          className="text-gray-500 text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Điền thông tin bên dưới để tạo tài khoản mới
        </motion.p>
      </div>

      {error && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          transition={{ duration: 0.3 }}
        >
          <Alert variant="destructive" className="mb-6 border-l-4 border-l-red-500">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Lỗi</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        </motion.div>
      )}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <motion.div 
            custom={0} 
            variants={fadeIn} 
            initial="hidden" 
            animate="visible"
          >
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700">Tên người dùng</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="Nhập tên người dùng của bạn"
                        className="bg-white border-gray-200 pl-10 rounded-lg focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-green-300 focus-visible:border-green-400 transition-all"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage className="text-xs mt-1" />
                </FormItem>
              )}
            />
          </motion.div>

          <motion.div 
            custom={1} 
            variants={fadeIn} 
            initial="hidden" 
            animate="visible"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700">Email</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="Địa chỉ email của bạn"
                        type="email"
                        autoComplete="email"
                        className="bg-white border-gray-200 pl-10 rounded-lg focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-green-300 focus-visible:border-green-400 transition-all"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage className="text-xs mt-1" />
                </FormItem>
              )}
            />
          </motion.div>

          <motion.div 
            custom={2} 
            variants={fadeIn} 
            initial="hidden" 
            animate="visible"
          >
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700">Mật khẩu</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="Mật khẩu của bạn"
                        type={showPassword ? "text" : "password"}
                        autoComplete="new-password"
                        className="bg-white border-gray-200 pl-10 rounded-lg focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-green-300 focus-visible:border-green-400 transition-all"
                        {...field}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent text-gray-400 hover:text-gray-700"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                        <span className="sr-only">
                          {showPassword ? "Hide password" : "Show password"}
                        </span>
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage className="text-xs mt-1" />
                </FormItem>
              )}
            />
          </motion.div>

          <motion.div 
            custom={3} 
            variants={fadeIn} 
            initial="hidden" 
            animate="visible"
          >
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700">Xác nhận mật khẩu</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="Xác nhận mật khẩu của bạn"
                        type={showConfirmPassword ? "text" : "password"}
                        autoComplete="new-password"
                        className="bg-white border-gray-200 pl-10 rounded-lg focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-green-300 focus-visible:border-green-400 transition-all"
                        {...field}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent text-gray-400 hover:text-gray-700"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                        <span className="sr-only">
                          {showConfirmPassword ? "Hide password" : "Show password"}
                        </span>
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage className="text-xs mt-1" />
                </FormItem>
              )}
            />
          </motion.div>

          <motion.div 
            custom={4} 
            variants={fadeIn} 
            initial="hidden" 
            animate="visible"
          >
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700">Số điện thoại</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="Nhập số điện thoại của bạn"
                        className="bg-white border-gray-200 pl-10 rounded-lg focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-green-300 focus-visible:border-green-400 transition-all"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage className="text-xs mt-1" />
                </FormItem>
              )}
            />
          </motion.div>

          <motion.div 
            custom={5} 
            variants={fadeIn} 
            initial="hidden" 
            animate="visible"
          >
            <FormField
              control={form.control}
              name="identificationNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700">Số CMND/CCCD</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="Nhập số CMND/CCCD của bạn"
                        className="bg-white border-gray-200 pl-10 rounded-lg focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-green-300 focus-visible:border-green-400 transition-all"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage className="text-xs mt-1" />
                </FormItem>
              )}
            />
          </motion.div>

          <motion.div 
            custom={6} 
            variants={fadeIn} 
            initial="hidden" 
            animate="visible"
            className="pt-2"
          >
            <Button
              type="submit"
              className="w-full py-2.5 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white rounded-lg shadow-sm hover:shadow transition-all duration-200 font-medium"
              disabled={registerMutation.isPending}
            >
              {registerMutation.isPending ? (
                <div className="flex items-center justify-center">
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  <span>Đang đăng ký...</span>
                </div>
              ) : (
                "Đăng ký"
              )}
            </Button>
          </motion.div>
        </form>
      </Form>
      
      <motion.div 
        className="mt-6 text-center text-sm text-gray-500"
        custom={7} 
        variants={fadeIn} 
        initial="hidden" 
        animate="visible"
      >
        Đã có tài khoản?{" "}
        <Link href="/login" className="text-green-600 hover:text-green-800 font-medium hover:underline transition-colors">
          Đăng nhập
        </Link>
      </motion.div>

      <motion.div
        className="mt-4 text-center text-xs text-gray-400"
        custom={8}
        variants={fadeIn}
        initial="hidden"
        animate="visible"
      >
        Bằng việc đăng ký, bạn đồng ý với{" "}
        <Link href="/terms" className="text-green-600 hover:text-green-800 hover:underline transition-colors">
          Điều khoản dịch vụ
        </Link>{" "}
        và{" "}
        <Link href="/privacy" className="text-green-600 hover:text-green-800 hover:underline transition-colors">
          Chính sách bảo mật
        </Link>{" "}
        của chúng tôi.
      </motion.div>
    </div>
  );
} 