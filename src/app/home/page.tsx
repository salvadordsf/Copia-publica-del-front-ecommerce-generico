import { MainHeroCarousel } from "@/components/public-store/home/hero/main-hero";
import { CategoriesSlider } from "@/components/public-store/home/sliders/categories/categories-slider";
import { RelevantProductsSlider } from "@/components/public-store/home/sliders/relevant-products/relevant-products-slider";

export default function Home() {
  return (
    <>
      <main>
        <MainHeroCarousel />
      </main>
      <section className="m-auto max-w-3xl">
        <CategoriesSlider />
        <RelevantProductsSlider />
      </section>
    </>
  );
}
