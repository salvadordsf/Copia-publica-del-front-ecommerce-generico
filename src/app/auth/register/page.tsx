import RegisterForm from "@/features/publics/auth/components/register/auth-register-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Registrarse",
  robots: {
    index: false,
    follow: false,
  },
};

export default function LoginPage() {
  return <RegisterForm />;
}
