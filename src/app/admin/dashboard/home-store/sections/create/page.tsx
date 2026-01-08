import UiDivider from "@/components/dashboard/divider/divider";
import { AddSectionForm } from "@/features/store-managment/components/sections/add-section/add-section";

export default function AddSectionPage() {
  return (
    <main className="flex flex-col gap-7 mt-4 pr-5">
      <section>
        <h2 className="text-2xl font-bold">Agregar sección</h2>
        <AddSectionForm />
      </section>

      <UiDivider />

    </main>
  );
}
