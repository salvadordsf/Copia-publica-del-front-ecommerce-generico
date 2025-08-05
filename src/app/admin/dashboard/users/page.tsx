import UserSearcher from "@/features/users/components/searcher/users-searcher";


export default function ProductsPage() {
  return (
    <main className="flex flex-col gap-7 mt-4 pr-5">
      <h2 className="text-2xl font-bold">Buscar Usuario</h2>
      <UserSearcher />
    </main>
  );
}
