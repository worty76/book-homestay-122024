"use client";

import { useEffect, useState } from "react";
import { useLanguageStore } from "@/store/useLanguageStore";
import { useTranslation } from "@/hooks/useTranslation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "./ui/button";
import { Check, Globe } from "lucide-react";

export default function LanguageSwitcher() {
  const { language, setLanguage, setTranslations } = useLanguageStore();
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  // Language options
  const languages = [
    {
      code: "en",
      label: "English",
      flag: "🇺🇸",
      bgColor: "bg-blue-600",
      textColor: "text-white",
      hoverColor: "hover:bg-blue-700",
    },
  ];

  const changeLanguage = async (newLanguage: "en") => {
    if (newLanguage === language) return;

    try {
      setIsLoading(true);
      const translations = (await import(`@/translations/${newLanguage}.json`))
        .default;
      setTranslations(translations);
      setLanguage(newLanguage);

      // Store language preference in localStorage for persistence
      localStorage.setItem("preferred-language", newLanguage);
    } catch (error) {
      console.error("Failed to load translations:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Check for user's preferred language on component mount
  useEffect(() => {
    const preferredLanguage = localStorage.getItem("preferred-language") as
      | "en"
      | null;
    if (preferredLanguage && preferredLanguage !== language) {
      changeLanguage(preferredLanguage);
    }
  }, []);

  const currentLanguage = languages.find((lang) => lang.code === language);

  if (isLoading) {
    return (
      <Button
        variant="ghost"
        size="sm"
        className={`relative h-9 w-9 rounded-full opacity-70 bg-blue-600 text-white hover:bg-blue-700`}
        disabled
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent hover:text-white"></div>
        </div>
      </Button>
    );
  }

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className={`group relative h-9 w-9 overflow-hidden rounded-full transition-all focus:outline-none 
          ${currentLanguage?.bgColor} ${currentLanguage?.textColor} ${currentLanguage?.hoverColor} hover:text-white`}
          aria-label="Select Language"
        >
          <span className="absolute inset-0 flex items-center justify-center transition-transform duration-300 ease-in-out group-hover:scale-110">
            {currentLanguage?.flag}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="animate-in fade-in-80 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-80 min-w-[180px] rounded-xl p-2 shadow-lg"
      >
        <DropdownMenuLabel className="px-2 text-xs font-medium text-muted-foreground">
          {t("Select Language")}
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="my-1" />
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => {
              changeLanguage(lang.code as "en");
              setIsOpen(false);
            }}
            className={`flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2 transition-colors 
            ${
              language === lang.code
                ? `${lang.bgColor} ${lang.textColor} ${lang.hoverColor} hover:text-white`
                : `hover:bg-blue-100`
            }`}
          >
            <span className="text-xl">{lang.flag}</span>
            <span className="flex-1 font-medium">{lang.label}</span>
            {language === lang.code && (
              <Check className="h-4 w-4 text-white animate-in fade-in-50 zoom-in-95" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
