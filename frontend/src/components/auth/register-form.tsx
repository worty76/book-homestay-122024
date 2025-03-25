"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import Link from "next/link";
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
import { AlertCircle, Eye, EyeOff, Loader2 } from "lucide-react";
import { useRegister } from "@/api/auth";
import { registerSchema, type RegisterFormValues } from "@/schema/auth.schema";

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
      router.push("/dashboard");
    } catch (error) {
      setError(error instanceof Error ? error.message : "Đã xảy ra lỗi. Vui lòng thử lại.");
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto bg-opacity-50">
      <CardHeader className="space-y-1">
        <CardTitle className="text-5xl text-center font-pinyon text-[#0a3b33]">
          Đăng ký
        </CardTitle>
      </CardHeader>
      <CardContent>
        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Lỗi</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tên người dùng</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Nhập tên người dùng"
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
                        autoComplete="new-password"
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

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Xác nhận mật khẩu</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        placeholder="Xác nhận mật khẩu của bạn"
                        type={showConfirmPassword ? "text" : "password"}
                        autoComplete="new-password"
                        className="bg-white focus-visible:ring-0 focus-visible:ring-offset-0"
                        {...field}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="h-4 w-4 text-gray-500" />
                        ) : (
                          <Eye className="h-4 w-4 text-gray-500" />
                        )}
                        <span className="sr-only">
                          {showConfirmPassword ? "Hide password" : "Show password"}
                        </span>
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Số điện thoại</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Nhập số điện thoại"
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
              name="identificationNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Số CMND/CCCD</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Nhập số CMND/CCCD"
                      className="bg-white focus-visible:ring-0 focus-visible:ring-offset-0"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full flex bg-[#9C6B4A] hover:bg-[#9C6B4A]/80 text-white"
              disabled={registerMutation.isPending}
            >
              {registerMutation.isPending ? (
                <div className="animate-pulse">
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Đang đăng ký
                </div>
              ) : (
                "Đăng ký"
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex flex-col space-y-4 items-center">
        <div className="text-sm text-center text-black">
          Đã có tài khoản?{" "}
          <Link href="/login" className="text-primary hover:underline text-[#9C6B4A]">
            Đăng nhập
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
} 