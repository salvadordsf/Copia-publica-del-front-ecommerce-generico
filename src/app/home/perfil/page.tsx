import ProfilePage from "@/features/publics/profile/profile-page";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Perfil de usuario",
  description: "Gestiona tu perfil de usuario en nuestro ecommerce genérico.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function ProfileDedicatedPage() {
  return (
    <>
      <ProfilePage />
    </>
  );
}
