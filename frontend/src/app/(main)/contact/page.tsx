"use client";

import AnotherHeader from "@/components/main/another-header";
import { Contact } from "@/components/main/contact";
import React from "react";
import { useTranslation } from "@/hooks/useTranslation";

export default function ContactPage() {
  const { t } = useTranslation();
  return (
    <>
      <AnotherHeader
        subtitle={t("contact.title")}
        description={t("contact.description")}
        image="/images/img2.jpg"
        finalPage={t("contact.finalPage")}
      />
      <Contact />
    </>
  );
}
