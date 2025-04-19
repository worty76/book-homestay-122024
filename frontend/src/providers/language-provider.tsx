"use client";

import { useEffect, useState } from "react";
import { useLanguageStore } from "@/store/useLanguageStore";
import { Loading } from "@/components/ui/loading";

interface LanguageProviderProps {
  children: React.ReactNode;
}

export default function LanguageProvider({ children }: LanguageProviderProps) {
  const { language, setLanguage, setTranslations } = useLanguageStore();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadTranslations = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const translations = (await import(`@/translations/en.json`)).default;
        setTranslations(translations);
        setLanguage("en");

        localStorage.setItem("preferred-language", "en");
      } catch (error) {
        console.error("Failed to load translations:", error);
        setError("Failed to load translations. Using fallback content.");
      } finally {
        setIsLoading(false);
      }
    };

    loadTranslations();
  }, [setLanguage, setTranslations]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loading size="md" variant="primary" text="Loading" />
      </div>
    );
  }

  if (error) {
    console.warn(error);
  }

  return <>{children}</>;
}
