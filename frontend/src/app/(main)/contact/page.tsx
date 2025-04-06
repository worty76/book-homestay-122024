import AnotherHeader from "@/components/main/another-header";
import { Contact } from "@/components/main/contact";
import React from "react";

export default function ContactPage() {
  return (
    <>
      <AnotherHeader
        subtitle="Liên hệ chúng tôi"
        description="Liên hệ với chúng tôi để nhận được sự hỗ trợ tốt nhất."
        image="/images/img2.jpg"
        finalPage="Liên hệ"
      />
      <Contact />
    </>
  );
}
