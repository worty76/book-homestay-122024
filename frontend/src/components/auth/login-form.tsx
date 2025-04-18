"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Loader2, Mail } from "lucide-react";
import { useLogin } from "@/api/auth";
import { loginSchema, type LoginFormValues } from "@/schema/auth.schema";
import { motion } from "framer-motion";
import { useAuthStore } from "@/store/useAuthStore";
import { toast } from "sonner";
import { handleAuthError } from "@/utils/error-handlers";
import { ErrorAlert, SuccessAlert } from "./alert-messages";
import { IconInputField, PasswordField } from "./form-fields";
import { useTranslation } from "@/hooks/useTranslation";

export function LoginForm() {
  const { t } = useTranslation();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const loginMutation = useLogin();

  useEffect(() => {
    const registered = searchParams.get("registered");
    if (registered === "true") {
      setSuccessMessage(t("auth.loginForm.registerSuccess"));
    }
  }, [searchParams, t]);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: LoginFormValues) {
    setError(null);
    form.clearErrors();

    try {
      await loginMutation.mutateAsync(data);
      toast.success(t("auth.loginForm.loginSuccess"), {
        description: t("auth.loginForm.welcomeBack"),
        duration: 3000,
      });

      // Check user role and redirect accordingly
      const isAdmin = useAuthStore.getState().isAdmin();
      if (isAdmin) {
        router.push("/dashboard");
      } else {
        router.push("/");
      }
    } catch (error) {
      handleAuthError(error, {
        setError,
        setFormError: form.setError,
        formValues: form.getValues(),
      });
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
        ease: "easeOut",
      },
    }),
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
          {t("navigation.login")}
        </motion.h1>
        <motion.p
          className="text-gray-500 text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {t("auth.loginForm.loginInstructions")}
        </motion.p>
      </div>

      <ErrorAlert title={t("common.notifications.error")} message={error} />

      {successMessage && (
        <SuccessAlert
          title={t("common.notifications.success")}
          message={successMessage}
          show={!!successMessage}
        />
      )}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <motion.div
            custom={0}
            variants={fadeIn}
            initial="hidden"
            animate="visible"
          >
            <IconInputField
              name="email"
              control={form.control}
              label={t("common.form.email")}
              placeholder="your.email@example.com"
              icon={<Mail className="h-4 w-4" />}
              type="email"
              autoComplete="email"
            />
          </motion.div>

          <motion.div
            custom={1}
            variants={fadeIn}
            initial="hidden"
            animate="visible"
          >
            <PasswordField
              name="password"
              control={form.control}
              label={t("common.form.password")}
              placeholder="••••••••"
              autoComplete="current-password"
              showPassword={showPassword}
              togglePassword={() => setShowPassword(!showPassword)}
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
                  <span>{t("auth.loggingIn")}</span>
                </div>
              ) : (
                <span>{t("navigation.login")}</span>
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
        <span>{t("auth.noAccount")} </span>
        <Link
          href="/register"
          className="text-green-600 hover:text-green-800 font-medium hover:underline transition-colors"
        >
          {t("auth.loginForm.registerLink")}
        </Link>
      </motion.div>
    </div>
  );
}
