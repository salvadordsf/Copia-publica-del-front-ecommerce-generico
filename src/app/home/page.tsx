import { HomePage } from "@/features/publics/home/components/home-page";
import { getHome } from "@/features/publics/home/services/home.axios";
import cloudinaryLoader from "@/lib/cloudinary/cloudinary-loader";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Inicio",
  description:
    "Bienvenido a nuestro ecommerce genérico. Explora nuestros productos y encuentra lo que necesitas.",
  openGraph: {
    url: "/home",
  },
};

export default async function Home() {
  const home = await getHome();
  const bannerSection = home.success
    ? home.data.filter((section) => section.type === "BANNER")[0]
    : null;
  const firstItem =
    bannerSection && bannerSection.items.length > 0
      ? bannerSection.items[0]
      : null;
  const firstImageUrl = firstItem?.imageUrl
    ? cloudinaryLoader({ src: firstItem.imageUrl, width: 1920, quality: 85 })
    : null;

  return (
    <>
      {firstImageUrl && <link rel="preload" as="image" href={firstImageUrl} />}
      <HomePage />
    </>
  );
}
