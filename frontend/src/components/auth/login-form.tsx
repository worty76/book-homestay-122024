"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";
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
import { AlertCircle, CheckCircle2, Eye, EyeOff, Loader2, Mail, Lock } from "lucide-react";
import { useLogin } from "@/api/auth";
import { loginSchema, type LoginFormValues } from "@/schema/auth.schema";
import { motion } from "framer-motion";

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const loginMutation = useLogin();

  useEffect(() => {
    const registered = searchParams.get("registered");
    if (registered === "true") {
      setSuccessMessage("Đăng ký thành công! Bạn có thể đăng nhập.");
    }
  }, [searchParams]);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: LoginFormValues) {
    setError(null);

    try {
      await loginMutation.mutateAsync(data);
      toast.success("Đăng nhập thành công!", {
        description: "Chào mừng bạn quay trở lại!",
        duration: 3000,
      });
      router.push("/dashboard");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMessage =
          error.response?.data?.error ||
          "Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin đăng nhập.";
        setError(errorMessage);
        toast.error("Đăng nhập thất bại", {
          description: errorMessage,
          duration: 3000,
        });
      } else {
        const errorMessage = "Đã xảy ra lỗi. Vui lòng thử lại.";
        setError(errorMessage);
        toast.error("Đã xảy ra lỗi", {
          description: errorMessage,
          duration: 3000,
        });
        console.error(error);
      }
    }
  }

  const fadeIn = {
    hidden: { opacity: 0, y: 10 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut"
      }
    })
  };

  return (
    <div className="w-full">
      <div className="mb-8">
        <motion.h1 
          className="text-3xl font-semibold mb-2 bg-gradient-to-r from-gray-800 to-gray-900 bg-clip-text text-transparent"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Đăng nhập
        </motion.h1>
        <motion.p 
          className="text-gray-500 text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Nhập thông tin đăng nhập để truy cập tài khoản của bạn
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

      {successMessage && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          transition={{ duration: 0.3 }}
        >
          <Alert className="mb-6 border-l-4 border-l-green-500 text-green-700 bg-green-50">
            <CheckCircle2 className="h-4 w-4" />
            <AlertTitle>Thành công</AlertTitle>
            <AlertDescription>{successMessage}</AlertDescription>
          </Alert>
        </motion.div>
      )}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <motion.div 
            custom={0} 
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
                        placeholder="your.email@example.com"
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
            custom={1} 
            variants={fadeIn} 
            initial="hidden" 
            animate="visible"
          >
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center justify-between mb-1">
                    <FormLabel className="text-sm font-medium text-gray-700">Mật khẩu</FormLabel>
                  </div>
                  <FormControl>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="••••••••"
                        type={showPassword ? "text" : "password"}
                        autoComplete="current-password"
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
            custom={2} 
            variants={fadeIn} 
            initial="hidden" 
            animate="visible"
          >
            <Button
              type="submit"
              className="w-full py-2.5 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white rounded-lg shadow-sm hover:shadow transition-all duration-200 font-medium"
              disabled={loginMutation.isPending}
            >
              {loginMutation.isPending ? (
                <div className="flex items-center justify-center">
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  <span>Đang đăng nhập...</span>
                </div>
              ) : (
                "Đăng nhập"
              )}
            </Button>
          </motion.div>
        </form>
      </Form>
      
      <motion.div 
        className="mt-8 text-center text-sm text-gray-500"
        custom={4} 
        variants={fadeIn} 
        initial="hidden" 
        animate="visible"
      >
        Không có tài khoản?{" "}
        <Link href="/register" className="text-green-600 hover:text-green-800 font-medium hover:underline transition-colors">
          Tạo tài khoản
        </Link>
      </motion.div>
    </div>
  );
}
