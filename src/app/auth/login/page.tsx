import { Spinner } from "@/components/ui/spinner";
import LoginForm from "@/features/publics/auth/components/login/auth-login-form";
import { Suspense } from "react";

export default function LoginPage() {
  return (
    <Suspense fallback={<Spinner />}>
      <LoginForm />
    </Suspense>
  );
}
