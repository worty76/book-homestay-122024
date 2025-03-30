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
  let errorMessage = "Đã xảy ra lỗi. Vui lòng thử lại.";

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
            "Email hoặc mật khẩu không chính xác. Vui lòng kiểm tra lại.";
          setFormError?.("email", { type: "server", message: errorMessage });
          setFormError?.("password", { type: "server", message: errorMessage });
          break;

        // Registration-specific errors
        case "EMAIL_ALREADY_EXISTS":
          errorMessage =
            "Email này đã được sử dụng. Vui lòng thử email khác hoặc đăng nhập.";
          setFormError?.("email", { type: "server", message: errorMessage });
          break;
        case "PHONE_ALREADY_EXISTS":
          errorMessage =
            "Số điện thoại này đã được sử dụng. Vui lòng thử số khác.";
          setFormError?.("phoneNumber", {
            type: "server",
            message: errorMessage,
          });
          break;
        case "ID_ALREADY_EXISTS":
          errorMessage = "Số CMND/CCCD đã được sử dụng. Vui lòng kiểm tra lại.";
          setFormError?.("identificationNumber", {
            type: "server",
            message: errorMessage,
          });
          break;
        case "WEAK_PASSWORD":
          errorMessage =
            "Mật khẩu không đủ mạnh. Vui lòng sử dụng ít nhất 8 ký tự bao gồm chữ hoa, chữ thường và số.";
          setFormError?.("password", { type: "server", message: errorMessage });
          break;
        case "INVALID_USERNAME":
          errorMessage =
            "Tên người dùng không hợp lệ. Vui lòng sử dụng chỉ chữ cái và số.";
          setFormError?.("username", { type: "server", message: errorMessage });
          break;
        case "INVALID_EMAIL":
          errorMessage =
            "Email không hợp lệ. Vui lòng kiểm tra lại định dạng email.";
          setFormError?.("email", { type: "server", message: errorMessage });
          break;
        case "INVALID_PHONE":
          errorMessage = "Số điện thoại không hợp lệ. Vui lòng kiểm tra lại.";
          setFormError?.("phoneNumber", {
            type: "server",
            message: errorMessage,
          });
          break;
        case "INVALID_ID":
          errorMessage = "Số CMND/CCCD không hợp lệ. Vui lòng kiểm tra lại.";
          setFormError?.("identificationNumber", {
            type: "server",
            message: errorMessage,
          });
          break;

        // HTTP errors
        case "HTTP_400":
          errorMessage = "Thông tin không hợp lệ. Vui lòng kiểm tra lại.";
          break;
        case "HTTP_401":
          errorMessage =
            "Tài khoản của bạn chưa được xác thực hoặc đã bị khóa.";
          break;
        case "HTTP_403":
          errorMessage = "Tài khoản của bạn không có quyền truy cập.";
          break;
        case "HTTP_404":
          errorMessage =
            "Tài khoản không tồn tại. Vui lòng kiểm tra email hoặc đăng ký.";
          break;
        case "HTTP_429":
          errorMessage = "Quá nhiều yêu cầu. Vui lòng thử lại sau.";
          break;
        case "HTTP_500":
        case "HTTP_502":
        case "HTTP_503":
          errorMessage = "Hệ thống đang gặp sự cố. Vui lòng thử lại sau.";
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
          errorMessage = "Thông tin không hợp lệ. Vui lòng kiểm tra lại.";
          break;
        case 401:
          errorMessage =
            "Tài khoản của bạn chưa được xác thực hoặc đã bị khóa.";
          break;
        case 403:
          errorMessage = "Tài khoản của bạn không có quyền truy cập.";
          break;
        case 404:
          errorMessage =
            "Tài khoản không tồn tại. Vui lòng kiểm tra email hoặc đăng ký.";
          break;
        case 409:
          errorMessage =
            "Thông tin đã tồn tại trong hệ thống. Vui lòng kiểm tra lại.";
          break;
        case 429:
          errorMessage = "Quá nhiều yêu cầu. Vui lòng thử lại sau.";
          break;
        case 500:
        case 502:
        case 503:
          errorMessage = "Hệ thống đang gặp sự cố. Vui lòng thử lại sau.";
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
    toast.error("Đã xảy ra lỗi", {
      description: errorMessage,
      duration: 3000,
    });
  }

  return errorMessage;
};
