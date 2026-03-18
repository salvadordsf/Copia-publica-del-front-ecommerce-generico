"use client"

import { FieldError } from 'react-hook-form';

interface FormErrorProps {
  error?: FieldError;
  className?: string;
}

export const FormError = ({ error, className = "" }: FormErrorProps) => {
  if (!error) return null;

  return (
    <p className={`text-sm text-red-500 mt-1 ${className}`}>
      {error.message}
    </p>
  );
};