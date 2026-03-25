import { MainNavLogo } from "@/components/public-store/main-header/main-nav/main-nav-logo";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <header className="p-2 fixed top-0 left-0 w-full bg-white border-b z-10">
        <MainNavLogo /> | Centro de autentificación
      </header>
      <section className="mt-10">
        {children}
      </section>
    </>
  );
}
