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
  ChevronDown,
  HelpCircle,
  Phone,
  Boxes,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MainNavLogo } from "../main-header/main-nav/main-nav-logo";
import UiAdminFooterSidebar from "@/features/admin/dashboard/components/layout/sidebar/admin-sidebar-footer";
import { slugify } from "@/utils/slugify";
import { useCategories } from "@/features/admin/categories/services/categories-querys";

export default function PublicSidebar() {
  //get the pathname for chek active links
  const pathname = usePathname();

  //get the categories + subcategories
  const { data, isLoading, isError } = useCategories({ subcategories: true });

  //create a boolean helper to get the active path
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
        {!isLoading && !isError && (
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

              <CollapsibleContent className="overflow-hidden pr-2">
                <SidebarGroupContent>
                  <SidebarMenu className="ml-2">
                    {[...data.data]
                      .sort((a, b) => a.name.localeCompare(b.name))
                      .map((cat) => (
                        <Collapsible key={cat.name} className="group/subcat">
                          <SidebarMenuItem>
                            {/* Category */}
                            <CollapsibleTrigger className="flex w-full cursor-pointer">
                              <SidebarMenuButton
                                asChild
                                isActive={isActive(
                                  `/home/categoria/${slugify(cat.name)}?id=${cat.id}`,
                                )}
                              >
                                <Link
                                  href={`/home/categoria/${slugify(cat.name)}?id=${cat.id}`}
                                  className="flex-1 hover:underline"
                                >
                                  <span>{cat.name}</span>
                                </Link>
                              </SidebarMenuButton>

                              {cat.subcategories.length > 0 && (
                                <ChevronDown
                                  className="
                              ml-1 h-4 w-4 opacity-70 transition-transform 
                              group-data-[state=open]/subcat:rotate-180
                            "
                                />
                              )}
                            </CollapsibleTrigger>

                            {/* Subcategory */}
                            <CollapsibleContent className="w-[90%]">
                              <SidebarMenu className="ml-4 mt-1 space-y-1">
                                {[...cat.subcategories]
                                  .sort((a, b) => a.name.localeCompare(b.name))
                                  .map((sub) => (
                                    <SidebarMenuItem
                                      key={sub.name}
                                      className="hover:underline"
                                    >
                                      <SidebarMenuButton
                                        asChild
                                        isActive={isActive(
                                          `/home/subcategoria/${slugify(sub.name)}?id=${sub.id}`,
                                        )}
                                        className="text-sm"
                                      >
                                        <Link
                                          href={`/home/subcategoria/${slugify(sub.name)}?id=${sub.id}`}
                                          className="flex-1 hover:underline"
                                        >
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
      </SidebarContent>

      {/* Footer */}
      <SidebarFooter>
        <UiAdminFooterSidebar />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
