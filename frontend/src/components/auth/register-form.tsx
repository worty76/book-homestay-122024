"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { User, Mail, Phone, CreditCard, Loader2 } from "lucide-react";
import { useRegister } from "@/api/auth";
import { registerSchema, type RegisterFormValues } from "@/schema/auth.schema";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { handleAuthError } from "@/utils/error-handlers";
import { ErrorAlert, SuccessAlert } from "./alert-messages";
import { IconInputField, PasswordField } from "./form-fields";
import { useTranslation } from "@/hooks/useTranslation";

export function RegisterForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { t } = useTranslation();
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
    form.clearErrors();

    try {
      await registerMutation.mutateAsync(data);
      toast.success("Đăng ký thành công!", {
        description:
          "Tài khoản của bạn đã được tạo. Bạn có thể đăng nhập ngay bây giờ.",
        duration: 3000,
      });
      router.push("/login?registered=true");
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
        delay: i * 0.05,
        duration: 0.4,
        ease: "easeOut",
      },
    }),
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
          {t("auth.registerForm.registerTitle")}
        </motion.h1>
        <motion.p
          className="text-gray-500 text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {t("auth.registerForm.registerDescription")}
        </motion.p>
      </div>

      <ErrorAlert
        title={t("auth.registerForm.registerError")}
        message={error}
      />

      <SuccessAlert
        title={t("auth.registerForm.registerSuccess")}
        message={t("auth.registerForm.registerSuccessMessage")}
        show={registerMutation.isSuccess}
      />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <motion.div
            custom={0}
            variants={fadeIn}
            initial="hidden"
            animate="visible"
          >
            <IconInputField
              name="username"
              control={form.control}
              label={t("auth.registerForm.usernameLabel")}
              placeholder={t("auth.registerForm.usernamePlaceholder")}
              icon={<User className="h-4 w-4" />}
            />
          </motion.div>

          <motion.div
            custom={1}
            variants={fadeIn}
            initial="hidden"
            animate="visible"
          >
            <IconInputField
              name="email"
              control={form.control}
              label={t("auth.registerForm.emailLabel")}
              placeholder={t("auth.registerForm.emailPlaceholder")}
              icon={<Mail className="h-4 w-4" />}
              type="email"
              autoComplete="email"
            />
          </motion.div>

          <motion.div
            custom={2}
            variants={fadeIn}
            initial="hidden"
            animate="visible"
          >
            <PasswordField
              name="password"
              control={form.control}
              label={t("auth.registerForm.passwordLabel")}
              placeholder={t("auth.registerForm.passwordPlaceholder")}
              autoComplete="new-password"
              showPassword={showPassword}
              togglePassword={() => setShowPassword(!showPassword)}
            />
          </motion.div>

          <motion.div
            custom={3}
            variants={fadeIn}
            initial="hidden"
            animate="visible"
          >
            <PasswordField
              name="confirmPassword"
              control={form.control}
              label={t("auth.registerForm.confirmPasswordLabel")}
              placeholder={t("auth.registerForm.confirmPasswordPlaceholder")}
              autoComplete="new-password"
              showPassword={showConfirmPassword}
              togglePassword={() =>
                setShowConfirmPassword(!showConfirmPassword)
              }
            />
          </motion.div>

          <motion.div
            custom={4}
            variants={fadeIn}
            initial="hidden"
            animate="visible"
          >
            <IconInputField
              name="phoneNumber"
              control={form.control}
              label={t("auth.registerForm.phoneNumberLabel")}
              placeholder={t("auth.registerForm.phoneNumberPlaceholder")}
              icon={<Phone className="h-4 w-4" />}
            />
          </motion.div>

          <motion.div
            custom={5}
            variants={fadeIn}
            initial="hidden"
            animate="visible"
          >
            <IconInputField
              name="identificationNumber"
              control={form.control}
              label={t("auth.registerForm.identificationNumberLabel")}
              placeholder={t(
                "auth.registerForm.identificationNumberPlaceholder"
              )}
              icon={<CreditCard className="h-4 w-4" />}
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
                  <span>{t("auth.registerForm.registerPending")}</span>
                </div>
              ) : (
                t("auth.registerForm.registerButton")
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
        <span>{t("auth.registerForm.alreadyHaveAccount")}</span>
        <Link
          href="/login"
          className="text-green-600 hover:text-green-800 font-medium hover:underline transition-colors"
        >
          {t("auth.registerForm.loginLink")}
        </Link>
      </motion.div>

      <motion.div
        className="mt-4 text-center text-xs text-gray-400"
        custom={8}
        variants={fadeIn}
        initial="hidden"
        animate="visible"
      >
        <span>{t("auth.registerForm.agreeToTerms")}</span>
        <Link
          href="/terms"
          className="text-green-600 hover:text-green-800 hover:underline transition-colors"
        >
          <span> {t("auth.registerForm.termsLink")} </span>
        </Link>{" "}
        <span>{t("auth.registerForm.and")}</span>
        <Link
          href="/privacy"
          className="text-green-600 hover:text-green-800 hover:underline transition-colors"
        >
          <span> {t("auth.registerForm.privacyLink")} </span>
        </Link>{" "}
      </motion.div>
    </div>
  );
}
