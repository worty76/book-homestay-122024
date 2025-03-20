"use client";

import { Button } from "./ui/button";
import { useLanguageStore } from "@/store/useLanguageStore";

export default function LanguageSwitcher() {
  const { language, setLanguage, setTranslations } = useLanguageStore();

  const toggleLanguage = async () => {
    const newLanguage = language === "en" ? "vi" : "en";
    const translations = (await import(`@/translations/${newLanguage}.json`))
      .default;
    setTranslations(translations);
    setLanguage(newLanguage);
  };

  return (
    <Button onClick={toggleLanguage} variant="outline" size="sm">
      {language === "en" ? "VN" : "EN"}
    </Button>
  );
}
