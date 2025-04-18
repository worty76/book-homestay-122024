"use client";

import { useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { MapPin, Mail, Phone, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { contactSchema, ContactFormValues } from "@/schema/contact.schema";
import Image from "next/image";
import { useTranslation } from "@/hooks/useTranslation";

export function Contact() {
  const { t } = useTranslation();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      fullname: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  if (isSubmitSuccessful) {
    setTimeout(() => reset(), 500);
  }

  const onSubmit = useCallback(
    async (data: ContactFormValues) => {
      setIsSubmitting(true);
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 15000);

        const response = await fetch("/api/contact", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
          signal: controller.signal,
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();

        if (result.success) {
          toast.success(t("contact.contactForm.successTitle"), {
            description: t("contact.contactForm.successDescription"),
            duration: 5000,
          });
        } else {
          throw new Error(result.message || t("contact.contactForm.sendError"));
        }
      } catch (error) {
        if (error instanceof Error) {
          if (error.name === "AbortError") {
            toast.error(t("contact.contactForm.timeoutError"), {
              description: t("contact.contactForm.timeoutDescription"),
            });
          } else {
            toast.error(t("contact.contactForm.sendError"), {
              description:
                t("contact.contactForm.unknownError") + error.message,
            });
          }
        } else {
          toast.error(t("contact.contactForm.sendError"), {
            description: t("contact.contactForm.unknownError"),
          });
        }
        console.error("Error submitting form:", error);
      } finally {
        setIsSubmitting(false);
      }
    },
    [t]
  );

  return (
    <section className="py-16 md:py-24 mx-auto">
      <div className="container">
        <div className="grid gap-12 lg:grid-cols-2">
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-4xl font-medium">
                {t("contact.contactForm.homestayName")}
              </h2>
              <p className="text-muted-foreground">
                {t("contact.contactForm.description")}
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <Phone className="h-6 w-6 text-black" />
                <div>
                  <p className="text-sm uppercase text-muted-foreground">
                    {t("contact.contactForm.booking")}
                  </p>
                  <p className="text-lg">+84 236 1234 567</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="h-6 w-6 text-black" />
                <div>
                  <p className="text-sm uppercase text-muted-foreground">
                    {t("contact.contactForm.email")}
                  </p>
                  <p className="text-lg">info@kenhomestay.com</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="h-6 w-6 text-black" />
                <div>
                  <p className="text-sm uppercase text-muted-foreground">
                    {t("contact.contactForm.address")}
                  </p>
                  <p className="text-lg">
                    {t("contact.contactForm.addressDetails")}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-lg bg-white p-8 shadow-md">
            <div className="mb-8">
              <h3 className="text-2xl font-medium">
                {t("contact.contactForm.formTitle")}
              </h3>
              <p className="text-muted-foreground mt-2">
                {t("contact.contactForm.formDescription")}
              </p>
            </div>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-6"
              noValidate
            >
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Input
                    placeholder={t("contact.contactForm.fullname")}
                    className="bg-white"
                    {...register("fullname")}
                    aria-invalid={errors.fullname ? "true" : "false"}
                    aria-describedby={
                      errors.fullname ? "fullname-error" : undefined
                    }
                  />
                  {errors.fullname && (
                    <p
                      className="text-sm text-red-500"
                      id="fullname-error"
                      role="alert"
                    >
                      {errors.fullname.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Input
                    type="email"
                    placeholder={t("contact.contactForm.emailInput")}
                    className="bg-white"
                    {...register("email")}
                    aria-invalid={errors.email ? "true" : "false"}
                    aria-describedby={errors.email ? "email-error" : undefined}
                  />
                  {errors.email && (
                    <p
                      className="text-sm text-red-500"
                      id="email-error"
                      role="alert"
                    >
                      {errors.email.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid gap-4">
                <div className="space-y-2">
                  <Input
                    placeholder={t("contact.contactForm.subject")}
                    className="bg-white"
                    {...register("subject")}
                    aria-invalid={errors.subject ? "true" : "false"}
                    aria-describedby={
                      errors.subject ? "subject-error" : undefined
                    }
                  />
                  {errors.subject && (
                    <p
                      className="text-sm text-red-500"
                      id="subject-error"
                      role="alert"
                    >
                      {errors.subject.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Textarea
                  placeholder={t("contact.contactForm.message")}
                  className="min-h-[120px] bg-white"
                  {...register("message")}
                  aria-invalid={errors.message ? "true" : "false"}
                  aria-describedby={
                    errors.message ? "message-error" : undefined
                  }
                />
                {errors.message && (
                  <p
                    className="text-sm text-red-500"
                    id="message-error"
                    role="alert"
                  >
                    {errors.message.message}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                className="w-full bg-[#5b8c40] hover:bg-[#5b8c40]/90 transition-all duration-200"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />{" "}
                    {t("contact.contactForm.sending")}
                  </>
                ) : (
                  t("contact.contactForm.sendButton")
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
