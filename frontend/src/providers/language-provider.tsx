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
        // Check for user's preferred language in localStorage first
        const preferredLanguage = localStorage.getItem("preferred-language") as
          | "en"
          | "vi"
          | null;
        const langToLoad = preferredLanguage || language;

        // If there's a preferred language different from the current one, update the store
        if (preferredLanguage && preferredLanguage !== language) {
          setLanguage(preferredLanguage);
        }

        const translations = (await import(`@/translations/${langToLoad}.json`))
          .default;
        setTranslations(translations);
      } catch (error) {
        console.error("Failed to load translations:", error);
        setError("Failed to load translations. Using fallback content.");

        // Try to load English as fallback
        if (language !== "en") {
          try {
            const fallbackTranslations = (
              await import("@/translations/en.json")
            ).default;
            setTranslations(fallbackTranslations);
            setLanguage("en");
          } catch (fallbackError) {
            console.error(
              "Failed to load fallback translations:",
              fallbackError
            );
          }
        }
      } finally {
        setIsLoading(false);
      }
    };

    loadTranslations();
  }, [language, setLanguage, setTranslations]);

  // Simple loading state - you can customize this with a nicer loading component
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loading size="md" variant="primary" text="Loading" />
      </div>
    );
  }

  // Error state
  if (error) {
    console.warn(error);
    // Continue rendering children so the application doesn't break completely
  }

  return <>{children}</>;
}
