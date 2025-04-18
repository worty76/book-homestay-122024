import { useLanguageStore } from "@/store/useLanguageStore";

type NestedKeyOf<T> = T extends object
  ? {
      [K in keyof T]:
        | `${K & string}`
        | `${K & string}.${NestedKeyOf<T[K]> & string}`;
    }[keyof T]
  : never;

export function useTranslation() {
  const { translations, language } = useLanguageStore();

  const t = <T = string>(
    key: string,
    params?: Record<string, string | number>
  ): T => {
    // Split the key by dots to traverse the translations object
    const keys = key.split(".");
    let result: any = translations;

    // Traverse the translations object
    for (const k of keys) {
      if (result && typeof result === "object" && k in result) {
        result = result[k];
      } else {
        console.warn(`Translation key not found: ${key}`);
        return key as unknown as T;
      }
    }

    // If the result is not a string (e.g., it's a nested object), return the key
    if (typeof result !== "string") {
      console.warn(`Translation key resolves to a non-string value: ${key}`);
      return key as unknown as T;
    }

    // Replace parameters in the string
    if (params) {
      return Object.entries(params).reduce((acc, [paramKey, paramValue]) => {
        return (acc as string).replace(`{{${paramKey}}}`, String(paramValue));
      }, result) as T;
    }

    return result as T;
  };

  return { t, language };
}
