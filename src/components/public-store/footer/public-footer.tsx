"use client";

import Link from "next/link";
import { MainNavLogo } from "../main-header/main-nav/main-nav-logo";

export default function MainFooter() {
  return (
    <footer className="w-full bg-black border-t z-50">
      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Logo */}
        <div className="scale-90 md:scale-100">
          <MainNavLogo />
        </div>

        {/* Links */}
        <nav className="flex flex-wrap justify-center gap-4 text-sm text-gray-400">
          <Link href="/home" className="hover:text-white transition-colors">
            Inicio
          </Link>
          <Link
            href="/home/categorias"
            className="hover:text-white transition-colors"
          >
            Categorías
          </Link>
          <Link
            href="/home/productos"
            className="hover:text-white transition-colors"
          >
            Productos
          </Link>
          <Link
            href="/home/generic-1"
            className="hover:text-white transition-colors"
          >
            Sección genérica 1
          </Link>
          <Link
            href="/home/generic-2"
            className="hover:text-white transition-colors"
          >
            Sección genérica 2
          </Link>
          <Link href="/home/faq" className="hover:text-white transition-colors">
            Preguntas frecuentes
          </Link>
          <Link
            href="/home/contacto"
            className="hover:text-white transition-colors"
          >
            Contacto
          </Link>
        </nav>
      </div>
    </footer>
  );
}
