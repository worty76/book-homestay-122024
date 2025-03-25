"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { AlertCircle, CheckCircle2, Eye, EyeOff, Loader2 } from "lucide-react";
import { useLogin } from "@/api/auth";
import { loginSchema, type LoginFormValues } from "@/schema/auth.schema";

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const loginMutation = useLogin();

  useEffect(() => {
    // Check if user just registered successfully
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
      // Show success toast
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
        // Show error toast
        toast.error("Đăng nhập thất bại", {
          description: errorMessage,
          duration: 3000,
        });
      } else {
        const errorMessage = "Đã xảy ra lỗi. Vui lòng thử lại.";
        setError(errorMessage);
        // Show error toast
        toast.error("Đã xảy ra lỗi", {
          description: errorMessage,
          duration: 3000,
        });
        console.error(error);
      }
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto bg-opacity-50">
      <CardHeader className="space-y-1">
        <CardTitle className="text-5xl text-center font-pinyon text-[#0a3b33]">Đăng nhập</CardTitle>
      </CardHeader>
      <CardContent>
        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Lỗi</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {successMessage && (
          <Alert className="mb-4 border-green-500 text-green-700 bg-green-50">
            <CheckCircle2 className="h-4 w-4" />
            <AlertTitle>Thành công</AlertTitle>
            <AlertDescription>{successMessage}</AlertDescription>
          </Alert>
        )}

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Địa chỉ email của bạn"
                      type="email"
                      autoComplete="email"
                      className="bg-white focus-visible:ring-0 focus-visible:ring-offset-0"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mật khẩu</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        placeholder="Mật khẩu của bạn"
                        type={showPassword ? "text" : "password"}
                        autoComplete="current-password"
                        className="bg-white focus-visible:ring-0 focus-visible:ring-offset-0"
                        {...field}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4 text-gray-500" />
                        ) : (
                          <Eye className="h-4 w-4 text-gray-500" />
                        )}
                        <span className="sr-only">
                          {showPassword ? "Hide password" : "Show password"}
                        </span>
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full flex bg-[#9C6B4A] hover:bg-[#9C6B4A]/80 text-white"
              disabled={loginMutation.isPending}
            >
              {loginMutation.isPending ? (
                <div className="animate-pulse">
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Đang đăng nhập
                </div>
              ) : (
                "Đăng nhập"
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex flex-col space-y-4 items-center">
        <div className="text-sm text-center text-black">
          Không có tài khoản?{" "}
          <Link href="/register" className="text-primary hover:underline text-[#9C6B4A]">
            Đăng ký
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
}
