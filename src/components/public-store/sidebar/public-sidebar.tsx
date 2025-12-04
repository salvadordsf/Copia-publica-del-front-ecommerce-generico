"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

import {
  Home,
  ShoppingBasket,
  Folder,
  FolderTree,
  Tag,
  ChevronDown,
  HelpCircle,
  Phone,
  Boxes,
} from "lucide-react";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MainNavLogo } from "../main-header/main-nav/main-nav-logo";
import UiAdminFooterSidebar from "@/features/dashboard/components/layout/sidebar/admin-sidebar-footer";
import { slugify } from "@/utils/slugify";
import { useCategories } from "@/features/categories/services/categories-querys";

//Mock
const CATEGORIES = [
  {
    name: "Ropa",
    subcategories: [
      { name: "Camperas frío" },
      { name: "Pantalones" },
      { name: "Remeras" },
    ],
  },
  {
    name: "Electrónica",
    subcategories: [{ name: "Celulares" }, { name: "Auriculares" }],
  },
  {
    name: "Hogar",
    subcategories: [{ name: "Muebles" }, { name: "Cocina" }],
  },
];

export default function PublicSidebar() {
  const pathname = usePathname();
  const { data, isLoading } = useCategories({ subcategories: true });

  const isActive = (url: string) => pathname === url;

  return (
    <Sidebar className="border-r bg-white pr-2">
      {/* Logo */}
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <MainNavLogo />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      {/* Content */}
      <SidebarContent className="py-2">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={isActive("/home")}>
              <Link href="/home">
                <Home />
                <span>Inicio</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>

        {/* Categories*/}
        {!isLoading && (
          <Collapsible className="group/collapsible">
            <SidebarGroup>
              <SidebarGroupLabel asChild>
                <CollapsibleTrigger className="flex items-center cursor-pointer">
                  <Link
                    href="/categorias"
                    className="flex-1 flex items-center text-sm font-semibold hover:underline"
                  >
                    Categorías
                  </Link>

                  <ChevronDown
                    className="
                    ml-2 h-4 w-4 transition-transform 
                    group-data-[state=open]/collapsible:rotate-180
                  "
                  />
                </CollapsibleTrigger>
              </SidebarGroupLabel>

              <CollapsibleContent>
                <SidebarGroupContent>
                  <SidebarMenu className="ml-2">
                    {data.data.map((cat) => (
                      <Collapsible key={cat.name} className="group/subcat">
                        <SidebarMenuItem>
                          {/* Category */}
                          <CollapsibleTrigger className="flex w-full cursor-pointer">
                            <SidebarMenuButton
                              asChild
                              isActive={isActive(`/categories/${cat.name}`)}
                            >
                              <Link
                                href={`/categorias/${slugify(cat.name)}`}
                                className="flex-1 hover:underline"
                              >
                                <span>{cat.name}</span>
                              </Link>
                            </SidebarMenuButton>

                            <ChevronDown
                              className="
                              ml-1 h-4 w-4 opacity-70 transition-transform 
                              group-data-[state=open]/subcat:rotate-180
                            "
                            />
                          </CollapsibleTrigger>

                          {/* SUBCATEGORÍAS */}
                          <CollapsibleContent>
                            <SidebarMenu className="ml-4 mt-1 space-y-1">
                              {cat.subcategories.map((sub) => (
                                <SidebarMenuItem key={sub.name}>
                                  <SidebarMenuButton
                                    asChild
                                    isActive={isActive(
                                      `/categorias/${cat.name}/${sub.name}`
                                    )}
                                    className="text-sm"
                                  >
                                    <Link
                                      href={`/categorias/${slugify(
                                        cat.name
                                      )}/${slugify(sub.name)}`}
                                    >
                                      <Tag className="h-4 w-4" />
                                      <span>{sub.name}</span>
                                    </Link>
                                  </SidebarMenuButton>
                                </SidebarMenuItem>
                              ))}
                            </SidebarMenu>
                          </CollapsibleContent>
                        </SidebarMenuItem>
                      </Collapsible>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </CollapsibleContent>
            </SidebarGroup>
          </Collapsible>
        )}

        {/* Products */}
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={isActive("/home/productos")}>
              <Link href="/home/productos">
                <ShoppingBasket />
                <span>Productos</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>

        {/* Faq */}
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={isActive("/home/faq")}>
              <Link href="/home/faq">
                <HelpCircle />
                <span>Preguntas frecuentes</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>

        {/* Contact */}
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={isActive("/home/contacto")}>
              <Link href="/home/contacto">
                <Phone />
                <span>Contacto</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>

        {/* Generics */}
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={isActive("/home/generic-1")}>
              <Link href="/home/generic-1">
                <Boxes />
                <span>Sección genérica 1</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>

        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={isActive("/home/generic-2")}>
              <Link href="/home/generic-2">
                <Boxes />
                <span>Sección genérica 2</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>

      {/* Footer */}
      <SidebarFooter>
        <UiAdminFooterSidebar userName="nombre" email="mail" />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
