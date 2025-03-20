import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Translations {
  [key: string]: string | Translations;
}

type Language = "en" | "vi";

interface LanguageState {
  language: Language;
  translations: Translations;
  setLanguage: (language: Language) => void;
  setTranslations: (translations: Translations) => void;
}

export const useLanguageStore = create<LanguageState>()(
  persist(
    (set) => ({
      language: "en",
      translations: {},
      setLanguage: (language) => set({ language }),
      setTranslations: (translations) => set({ translations }),
    }),
    {
      name: "language-storage",
    }
  )
);
