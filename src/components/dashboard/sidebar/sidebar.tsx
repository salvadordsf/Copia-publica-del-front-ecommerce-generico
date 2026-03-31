"use client";

import {
  Sidebar,
  SidebarContent,
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
  UsersRound,
  Package,
  ShoppingBasket,
  Folder,
  FolderTree,
  Tag,
  ChartSpline,
  Store,
  ChevronDown,
  LayoutTemplate,
  LucideProps,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import UiAdminFooterSidebar from "@/features/admin/dashboard/components/layout/sidebar/admin-sidebar-footer";
import { MainNavLogo } from "@/components/public-store/main-header/main-nav/main-nav-logo";
import { ForwardRefExoticComponent, RefAttributes } from "react";

interface ISidebarProps {
  title: string;
}

export default function UiSidebar({ title }: ISidebarProps) {
  const pathname = usePathname();

  interface IItemObj {
    type: "item";
    icon: ForwardRefExoticComponent<
      Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
    >;
    title: string;
    url: string;
    isActive: boolean;
  }
  interface IGroupObj {
    type: "group";
    label: string;
    items: IItemObj[];
  }

  const SIDEBAR_ARY: (IItemObj | IGroupObj)[] = [
    {
      type: "item",
      icon: Home,
      title: "Inicio de administrador",
      url: "/admin/dashboard",
      isActive: pathname === "/admin/dashboard",
    },
    {
      type: "item",
      icon: UsersRound,
      title: "Usuarios",
      url: "/admin/dashboard/users",
      isActive: pathname === "/admin/dashboard/users",
    },
    {
      type: "item",
      icon: Package,
      title: "Órdenes",
      url: "/admin/dashboard/orders",
      isActive: pathname === "/admin/dashboard/orders",
    },
    {
      type: "item",
      icon: ShoppingBasket,
      title: "Productos",
      url: "/admin/dashboard/products",
      isActive: pathname === "/admin/dashboard/products",
    },
    {
      type: "group",
      label: "Categorización",
      items: [
        {
          type: "item",
          icon: Folder,
          title: "Categorías",
          url: "/admin/dashboard/categories",
          isActive: pathname === "/admin/dashboard/categories",
        },
        {
          type: "item",
          icon: FolderTree,
          title: "Subcategorías",
          url: "/admin/dashboard/subcategories",
          isActive: pathname === "/admin/dashboard/subcategories",
        },
        {
          type: "item",
          icon: Tag,
          title: "Tags",
          url: "/admin/dashboard/tags",
          isActive: pathname === "/admin/dashboard/tags",
        },
      ],
    },
    {
      type: "group",
      label: "Acciones en lote",
      items: [
        {
          type: "item",
          icon: ShoppingBasket,
          title: "Productos - Acciones en lote",
          url: "/admin/dashboard/bulk/products",
          isActive: pathname === "/admin/dashboard/bulk/products",
        },
        {
          type: "item",
          icon: Folder,
          title: "Categorías - Acciones en lote",
          url: "/admin/dashboard/bulk/categories",
          isActive: pathname === "/admin/dashboard/bulk/categories",
        },
        {
          type: "item",
          icon: FolderTree,
          title: "Subcategorías - Acciones en lote",
          url: "/admin/dashboard/bulk/subcategories",
          isActive: pathname === "/admin/dashboard/bulk/subcategories",
        },
        {
          type: "item",
          icon: Tag,
          title: "Tags - Acciones en lote",
          url: "/admin/dashboard/bulk/tags",
          isActive: pathname === "/admin/dashboard/bulk/tags",
        },
      ],
    },
    {
      type: "item",
      icon: ChartSpline,
      title: "Ventas",
      url: "/admin/dashboard/sels",
      isActive: pathname === "/admin/dashboard/sels",
    },
    {
      type: "item",
      icon: LayoutTemplate,
      title: "Gestor de home público",
      url: "/admin/dashboard/home-store",
      isActive: pathname === "/",
    },
    {
      type: "item",
      icon: Store,
      title: "Tienda pública",
      url: "/home",
      isActive: pathname === "/home",
    },
  ];

  return (
    <Sidebar id="ui-sidebar-id">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem className="flex flex-col-reverse  items-center gap-2">
            <MainNavLogo />
            <span className="font-semibold">{title}</span>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        {SIDEBAR_ARY.map((obj, i) =>
          obj.type === "group" ? (
            <Collapsible defaultOpen className="group/collapsible" key={i}>
              <SidebarGroup>
                <SidebarGroupLabel asChild>
                  <CollapsibleTrigger>
                    <span className="text-sm font-semibold">{obj.label}</span>
                    <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                  </CollapsibleTrigger>
                </SidebarGroupLabel>
                <CollapsibleContent>
                  <SidebarGroupContent>
                    <SidebarMenu>
                      {obj.items.map((item) => (
                        <SidebarMenuItem key={item.title}>
                          <SidebarMenuButton asChild isActive={item.isActive}>
                            <Link href={item.url}>
                              <item.icon />
                              <span>{item.title}</span>
                            </Link>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      ))}
                    </SidebarMenu>
                  </SidebarGroupContent>
                </CollapsibleContent>
              </SidebarGroup>
            </Collapsible>
          ) : (
            <SidebarMenu key={i}>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={obj.isActive}>
                  <Link href={obj.url}>
                    <obj.icon />
                    <span>{obj.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          ),
        )}
      </SidebarContent>
      <UiAdminFooterSidebar />
      <SidebarRail />
    </Sidebar>
  );
}
