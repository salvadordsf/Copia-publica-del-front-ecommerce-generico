"use client"

import { getErrorMessage } from '@/utils/error-messages-utility';

interface FormErrorProps {
  status: number | undefined,
  context: "login" | "register" | "general",
  className?: string;
}

export const FormServerError = ({status, context, className = "" }: FormErrorProps) => {

  return (
    <p className={`text-sm text-red-500 mt-1 ${className}`}>
      {getErrorMessage(status, context)}
    </p>
  );
};