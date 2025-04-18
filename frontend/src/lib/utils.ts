import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { format } from "date-fns";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Convert amount between currencies
export function convertCurrency(
  amount: number,
  fromCurrency: "VND" | "USD",
  toCurrency: "VND" | "USD"
): number {
  // Default exchange rate: 1 USD = 24,500 VND
  const exchangeRate = 24500;

  if (fromCurrency === toCurrency) {
    return amount;
  }

  if (fromCurrency === "VND" && toCurrency === "USD") {
    return amount / exchangeRate;
  }

  if (fromCurrency === "USD" && toCurrency === "VND") {
    return amount * exchangeRate;
  }

  return amount;
}

// Language-aware currency formatter
export function formatCurrency(amount: number, language?: string): string {
  // Default exchange rate: 1 USD = 24,500 VND
  const exchangeRate = 24500;

  // If language is not provided, try to get it from localStorage
  if (!language) {
    if (typeof window !== "undefined") {
      language = localStorage.getItem("preferred-language") || "en";
    } else {
      language = "en";
    }
  }

  // Use Vietnamese formatting and currency for Vietnamese language
  if (language === "vi") {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
      maximumFractionDigits: 0,
    }).format(amount);
  }

  // Otherwise use USD for English and other languages
  // Convert VND to USD
  const amountInUsd = amount / exchangeRate;

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amountInUsd);
}

// Legacy formatters (keeping for backward compatibility)
export function formatPrice(price: number) {
  return new Intl.NumberFormat("vi-VN").format(price) + "đ";
}

export function formatDate(date: Date): string {
  return format(date, "MMM d, yyyy");
}
