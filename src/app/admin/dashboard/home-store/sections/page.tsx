import { StoreEditor } from "@/features/admin/store-managment/components/overviews/store-editor";

export default function SectionEditorPage() {
  return (
    <main className="flex flex-col gap-7 mt-4 pr-5">
      <section>
        <h2 className="text-2xl font-bold">Estado de la tienda</h2>
        <StoreEditor />
      </section>
    </main>
  );
}
