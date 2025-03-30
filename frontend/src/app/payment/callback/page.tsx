"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle, Loader2 } from "lucide-react";
import Link from "next/link";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";

export default function PaymentCallback() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading"
  );
  const [message, setMessage] = useState("");
  const { token, isAuthenticated } = useAuthStore();
  const [debugInfo, setDebugInfo] = useState<any>(null);
  const [bookingId, setBookingId] = useState<string | null>(null);

  useEffect(() => {
    const processVnpayCallback = async () => {
      // Get all query parameters for debugging
      const paramsObj: Record<string, string> = {};
      searchParams.forEach((value, key) => {
        paramsObj[key] = value;
      });
      console.log("VNPAY callback params:", paramsObj);
      setDebugInfo(paramsObj);

      // VNPAY response parameters
      const vnp_ResponseCode = searchParams.get("vnp_ResponseCode");
      const vnp_TxnRef = searchParams.get("vnp_TxnRef"); // Payment ID from VNPAY
      const vnp_OrderInfo = searchParams.get("vnp_OrderInfo"); // Contains booking ID info

      if (!isAuthenticated || !token) {
        setStatus("error");
        setMessage("Phiên đăng nhập không hợp lệ. Vui lòng đăng nhập lại.");
        return;
      }

      // Try to find the booking ID from different sources
      let relatedBookingId = null;

      // 1. Try to extract from session storage (we stored it during booking)
      const storedBookingId = sessionStorage.getItem("vnpay_booking_id");
      if (storedBookingId) {
        relatedBookingId = storedBookingId;
      }

      // 2. Try to extract from vnp_OrderInfo if still not found
      if (!relatedBookingId && vnp_OrderInfo) {
        // OrderInfo format: "Thanh toan cho ma dat phong: 123456"
        const match = vnp_OrderInfo.match(/dat phong:\s*(\w+)/i);
        if (match && match[1]) {
          relatedBookingId = match[1];
        }
      }

      console.log("Related booking ID:", relatedBookingId);
      setBookingId(relatedBookingId);

      // If we have a payment ID and response code, we can consider the transaction processed
      if (vnp_TxnRef && vnp_ResponseCode) {
        if (vnp_ResponseCode === "00") {
          // Payment successful
          setStatus("success");
          setMessage(
            "Thanh toán thành công. Đơn đặt phòng của bạn đã được xác nhận."
          );

          // If we have a booking ID, we can update its status
          if (relatedBookingId) {
            try {
              // Since there's no specific endpoint in the router for updating payment status,
              // we might need to create a custom endpoint or use the existing ones

              // Option 1: Use the generic payment creation endpoint
              await axios.post(
                `${API_URL}/api/v1/payment`,
                {
                  bookingId: relatedBookingId,
                  amount: paramsObj.vnp_Amount
                    ? parseInt(paramsObj.vnp_Amount) / 100
                    : 0, // Convert back from VNPay format
                  paymentMethod: "VNPAY",
                  transactionId: vnp_TxnRef,
                  status: vnp_ResponseCode === "00" ? "COMPLETED" : "FAILED",
                },
                {
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                  },
                }
              );

              // If additional booking update is needed and there's no automatic update in the backend
              if (vnp_ResponseCode === "00") {
                try {
                  await axios.patch(
                    `${API_URL}/api/v1/booking/${relatedBookingId}`,
                    {
                      paymentStatus: "PAID",
                    },
                    {
                      headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                      },
                    }
                  );
                } catch (updateError) {
                  console.error("Error updating booking:", updateError);
                }
              }
            } catch (updateError) {
              console.error("Error recording payment result:", updateError);
            }
          }
        } else {
          // Payment failed
          setStatus("error");
          setMessage("Thanh toán không thành công hoặc đã bị hủy.");

          // If we have a booking ID, we can update or cancel it
          if (relatedBookingId) {
            try {
              // Mark booking as payment failed
              await axios.post(
                `${API_URL}/api/v1/booking/${relatedBookingId}/update-payment`,
                {
                  paymentStatus: "FAILED",
                  transactionId: vnp_TxnRef,
                },
                {
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                  },
                }
              );
            } catch (updateError) {
              console.error(
                "Error updating booking payment status:",
                updateError
              );
            }
          }
        }
      } else {
        setStatus("error");
        setMessage("Không nhận được thông tin thanh toán từ cổng thanh toán.");
      }

      // Clear booking ID from session storage
      sessionStorage.removeItem("vnpay_booking_id");
    };

    processVnpayCallback();
  }, [searchParams, token, isAuthenticated]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6 sm:p-8">
        <div className="text-center">
          {status === "loading" && (
            <div className="flex flex-col items-center">
              <Loader2 className="h-12 w-12 text-primary animate-spin mb-4" />
              <h2 className="text-xl font-bold mb-2">Đang xử lý thanh toán</h2>
              <p className="text-gray-600">Vui lòng đợi trong giây lát...</p>
            </div>
          )}

          {status === "success" && (
            <div className="flex flex-col items-center">
              <CheckCircle className="h-12 w-12 text-green-500 mb-4" />
              <h2 className="text-xl font-bold mb-2">Thanh toán thành công</h2>
              <p className="text-gray-600 mb-6">{message}</p>
              <Link href="/user/bookings">
                <Button>Xem đơn đặt phòng</Button>
              </Link>
            </div>
          )}

          {status === "error" && (
            <div className="flex flex-col items-center">
              <XCircle className="h-12 w-12 text-red-500 mb-4" />
              <h2 className="text-xl font-bold mb-2">Thanh toán thất bại</h2>
              <p className="text-gray-600 mb-6">{message}</p>
              <div className="flex flex-col sm:flex-row gap-3 w-full">
                <Button variant="outline" onClick={() => router.push("/")}>
                  Về trang chủ
                </Button>
                <Link href="/user/bookings">
                  <Button className="w-full">Xem đơn đặt phòng</Button>
                </Link>
              </div>
            </div>
          )}

          {/* Debug information section */}
          {process.env.NODE_ENV === "development" && debugInfo && (
            <div className="mt-6 text-left border-t pt-4">
              <h3 className="font-medium text-sm mb-2">Debug Information:</h3>
              <pre className="bg-gray-100 p-3 rounded text-xs overflow-auto max-h-40">
                {JSON.stringify(debugInfo, null, 2)}
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
