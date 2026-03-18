import { AxiosError } from "axios";
import { toast } from "sonner";
import { getErrorMessage } from "./error-messages-utility";

export const toastError = (
  error: AxiosError | {status: number},
  context: "login" | "register" | "general"
) => toast.error(getErrorMessage(error.status, context));
