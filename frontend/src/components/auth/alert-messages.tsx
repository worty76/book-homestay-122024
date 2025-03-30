import React from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

interface ErrorAlertProps {
  title?: string;
  message: string | null;
}

export function ErrorAlert({ title = "Lỗi", message }: ErrorAlertProps) {
  if (!message) return null;

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      transition={{ duration: 0.3 }}
    >
      <Alert variant="destructive" className="mb-6 border-l-4 border-l-red-500">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>{title}</AlertTitle>
        <AlertDescription className="mt-1">{message}</AlertDescription>
      </Alert>
    </motion.div>
  );
}

interface SuccessAlertProps {
  title?: string;
  message: string;
  show: boolean;
}

export function SuccessAlert({
  title = "Thành công",
  message,
  show,
}: SuccessAlertProps) {
  if (!show) return null;

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      transition={{ duration: 0.3 }}
    >
      <Alert className="mb-6 border-l-4 border-l-green-500 text-green-700 bg-green-50">
        <CheckCircle2 className="h-4 w-4" />
        <AlertTitle>{title}</AlertTitle>
        <AlertDescription className="mt-1">{message}</AlertDescription>
      </Alert>
    </motion.div>
  );
}
