import axios from "axios";
import { toast } from "sonner";
import { ApiErrorResponse } from "@/api/api-client";
import { UseFormSetError } from "react-hook-form";

interface ErrorHandlerOptions {
  setError?: (message: string) => void;
  setFormError?: UseFormSetError<any>;
  formValues?: Record<string, any>;
  showToast?: boolean;
}

export const handleAuthError = (
  error: unknown,
  options: ErrorHandlerOptions = {}
) => {
  const { setError, setFormError, formValues, showToast = true } = options;
  let errorMessage = "An error occurred. Please try again later.";

  if (axios.isAxiosError(error)) {
    // Get our standardized error response
    const errorData = error.response?.data as ApiErrorResponse;

    // If we have a standardized error format
    if (errorData) {
      const { code, message, details } = errorData;

      // Set field-specific errors if they exist in the response
      if (
        setFormError &&
        formValues &&
        details &&
        typeof details === "object"
      ) {
        // Handle field-specific validation errors
        const fieldErrors = details.fieldErrors || details.errors;
        if (fieldErrors && typeof fieldErrors === "object") {
          Object.entries(fieldErrors).forEach(([field, message]) => {
            if (field in formValues) {
              setFormError(field as any, {
                type: "server",
                message: Array.isArray(message)
                  ? message[0]
                  : (message as string),
              });
            }
          });
        }
      }

      // Process error codes
      switch (code) {
        // Authentication errors
        case "INVALID_CREDENTIALS":
          errorMessage =
            "Invalid email or password. Please check and try again.";
          setFormError?.("email", { type: "server", message: errorMessage });
          setFormError?.("password", { type: "server", message: errorMessage });
          break;
        case "EMAIL_EXISTS":
          errorMessage =
            "This email is already registered. Please use a different email or login.";
          setFormError?.("email", { type: "server", message: errorMessage });
          break;
        case "USERNAME_EXISTS":
          errorMessage =
            "This username is already taken. Please choose a different one.";
          setFormError?.("username", { type: "server", message: errorMessage });
          break;
        case "USER_NOT_FOUND":
          errorMessage = "User not found. Please check your email or register.";
          break;
        case "ACCOUNT_DISABLED":
          errorMessage =
            "Your account has been disabled. Please contact support.";
          break;
        case "INVALID_TOKEN":
          errorMessage =
            "Invalid or expired authentication token. Please login again.";
          break;
        case "SESSION_EXPIRED":
          errorMessage = "Your session has expired. Please login again.";
          break;
        case "WEAK_PASSWORD":
          errorMessage =
            "Password is too weak. Please use a stronger password.";
          setFormError?.("password", { type: "server", message: errorMessage });
          break;
        case "PASSWORD_MISMATCH":
          errorMessage = "Passwords don't match. Please check and try again.";
          setFormError?.("confirmPassword", {
            type: "server",
            message: errorMessage,
          });
          break;
        case "RESET_TOKEN_EXPIRED":
          errorMessage =
            "Password reset link has expired. Please request a new one.";
          break;
        case "TOO_MANY_ATTEMPTS":
          errorMessage = "Too many login attempts. Please try again later.";
          break;

        // Registration-specific errors
        case "PHONE_ALREADY_EXISTS":
          errorMessage =
            "This phone number is already registered. Please use a different one.";
          setFormError?.("phoneNumber", {
            type: "server",
            message: errorMessage,
          });
          break;
        case "ID_ALREADY_EXISTS":
          errorMessage =
            "This ID number is already registered. Please check again.";
          setFormError?.("identificationNumber", {
            type: "server",
            message: errorMessage,
          });
          break;

        // Validation errors
        case "INVALID_EMAIL":
          errorMessage = "Invalid email format. Please check and try again.";
          setFormError?.("email", { type: "server", message: errorMessage });
          break;
        case "INVALID_PHONE":
          errorMessage = "Invalid phone number. Please check and try again.";
          setFormError?.("phoneNumber", {
            type: "server",
            message: errorMessage,
          });
          break;
        case "INVALID_ID":
          errorMessage = "Invalid ID number. Please check and try again.";
          setFormError?.("identificationNumber", {
            type: "server",
            message: errorMessage,
          });
          break;

        // HTTP errors
        case "HTTP_400":
          errorMessage = "Invalid information. Please check and try again.";
          break;
        case "HTTP_401":
          errorMessage =
            "Your account is not authenticated or has been locked.";
          break;
        case "HTTP_403":
          errorMessage =
            "Your account doesn't have permission to access this resource.";
          break;
        case "HTTP_404":
          errorMessage =
            "Account not found. Please check your email or register.";
          break;
        case "HTTP_429":
          errorMessage = "Too many requests. Please try again later.";
          break;
        case "HTTP_500":
        case "HTTP_502":
        case "HTTP_503":
          errorMessage =
            "System is experiencing issues. Please try again later.";
          break;
        default:
          // Use the message from the API if available
          errorMessage = message || errorMessage;
      }
    } else {
      // Fallback to status code if we don't have standardized error
      const statusCode = error.response?.status;
      switch (statusCode) {
        case 400:
          errorMessage = "Invalid information. Please check and try again.";
          break;
        case 401:
          errorMessage =
            "Your account is not authenticated or has been locked.";
          break;
        case 403:
          errorMessage =
            "Your account doesn't have permission to access this resource.";
          break;
        case 404:
          errorMessage =
            "Account not found. Please check your email or register.";
          break;
        case 409:
          errorMessage =
            "Information already exists in the system. Please check again.";
          break;
        case 429:
          errorMessage = "Too many requests. Please try again later.";
          break;
        case 500:
        case 502:
        case 503:
          errorMessage =
            "System is experiencing issues. Please try again later.";
          break;
      }
    }

    // Log detailed error information for debugging
    console.error("API Error:", error.response?.data);
  } else if (error instanceof Error) {
    errorMessage = error.message || errorMessage;
    console.error("Unexpected error:", error);
  } else {
    console.error("Unknown error:", error);
  }

  // Set the error message
  if (setError) {
    setError(errorMessage);
  }

  // Show toast if required
  if (showToast) {
    toast.error("An error occurred", {
      description: errorMessage,
      duration: 3000,
    });
  }

  return errorMessage;
};
