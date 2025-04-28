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
        image="/images/3DKENHOME/floor1/09.png"
        finalPage={t("contact.finalPage")}
      />
      <Contact />
    </>
  );
}
