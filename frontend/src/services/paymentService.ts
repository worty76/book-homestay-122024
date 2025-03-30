import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";

export const createVnpayPayment = async (
  bookingId: string,
  amount: number,
  token: string
) => {
  try {
    console.log("Creating VNPAY payment for booking:", bookingId);

    const returnUrl = `${window.location.origin}/payment/callback`;

    // Use the correct API endpoint as defined in the router
    const response = await axios.post(
      `${API_URL}/api/v1/payment/vnpay/create`,
      {
        bookingId,
        amount,
        returnUrl,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("VNPAY payment response:", response.data);

    return response.data;
  } catch (error: any) {
    console.error("Error creating VNPAY payment:", error);
    throw new Error(
      error.response?.data?.message || "Failed to create payment"
    );
  }
};

export const getPaymentStatus = async (paymentId: string, token: string) => {
  try {
    // Use the correct path to get payment by ID
    const response = await axios.get(`${API_URL}/api/v1/payment/${paymentId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error: any) {
    console.error("Error getting payment status:", error);
    throw new Error(
      error.response?.data?.message || "Failed to get payment status"
    );
  }
};
