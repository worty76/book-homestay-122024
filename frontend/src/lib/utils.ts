import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { format } from "date-fns";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function convertCurrency(
  amount: number,
  fromCurrency: "VND" | "USD",
  toCurrency: "VND" | "USD"
): number {
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

export function formatCurrency(amount: number, language?: string): string {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatPrice(price: number) {
  return new Intl.NumberFormat("vi-VN").format(price) + "đ";
}

export function formatDate(date: Date): string {
  return format(date, "MMM d, yyyy");
}
