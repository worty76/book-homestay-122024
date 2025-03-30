import React from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";
import { Control } from "react-hook-form";

interface IconInputFieldProps {
  name: string;
  control: Control<any>;
  label: string;
  placeholder: string;
  icon: React.ReactNode;
  type?: string;
  autoComplete?: string;
}

export function IconInputField({
  name,
  control,
  label,
  placeholder,
  icon,
  type = "text",
  autoComplete,
}: IconInputFieldProps) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field, formState }) => (
        <FormItem>
          <FormLabel className="text-sm font-medium text-gray-700">
            {label}
          </FormLabel>
          <FormControl>
            <div className="relative">
              <div
                className={`absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 ${
                  formState.errors[name] ? "text-red-400" : "text-gray-400"
                }`}
              >
                {icon}
              </div>
              <Input
                placeholder={placeholder}
                type={type}
                autoComplete={autoComplete}
                className={`bg-white border-gray-200 pl-10 rounded-lg focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-green-300 focus-visible:border-green-400 transition-all ${
                  formState.errors[name]
                    ? "border-red-300 focus-visible:ring-red-300 focus-visible:border-red-400"
                    : ""
                }`}
                {...field}
              />
            </div>
          </FormControl>
          <FormMessage className="text-xs mt-1" />
        </FormItem>
      )}
    />
  );
}

interface PasswordFieldProps {
  name: string;
  control: Control<any>;
  label: string;
  placeholder: string;
  autoComplete?: string;
  showPassword: boolean;
  togglePassword: () => void;
}

export function PasswordField({
  name,
  control,
  label,
  placeholder,
  autoComplete,
  showPassword,
  togglePassword,
}: PasswordFieldProps) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field, formState }) => (
        <FormItem>
          <FormLabel className="text-sm font-medium text-gray-700">
            {label}
          </FormLabel>
          <FormControl>
            <div className="relative">
              <div
                className={`absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 ${
                  formState.errors[name] ? "text-red-400" : "text-gray-400"
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4"
                >
                  <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
              </div>
              <Input
                placeholder={placeholder}
                type={showPassword ? "text" : "password"}
                autoComplete={autoComplete}
                className={`bg-white border-gray-200 pl-10 rounded-lg focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-green-300 focus-visible:border-green-400 transition-all ${
                  formState.errors[name]
                    ? "border-red-300 focus-visible:ring-red-300 focus-visible:border-red-400"
                    : ""
                }`}
                {...field}
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent text-gray-400 hover:text-gray-700"
                onClick={togglePassword}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
                <span className="sr-only">
                  {showPassword ? "Hide password" : "Show password"}
                </span>
              </Button>
            </div>
          </FormControl>
          <FormMessage className="text-xs mt-1" />
        </FormItem>
      )}
    />
  );
}
