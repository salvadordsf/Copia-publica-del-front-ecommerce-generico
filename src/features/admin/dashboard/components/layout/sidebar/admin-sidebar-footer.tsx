"use client";

import {
  SidebarFooter,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  UserRound,
  ChevronUp,
  CircleUserRound,
  LogOut,
  Settings,
  Loader2,
} from "lucide-react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export default function UiAdminFooterSidebar() {
  const { isMobile } = useSidebar();

  //try to get the user session if exist
  const { data: session, isPending, error } = authClient.useSession();

  //Signout logic
  const router = useRouter();
  const signOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/home");
        },
      },
    });
  };

  if (isPending) return <Loader2 />;
  if (error) return <div>Error al obtener sesión</div>;
  //If user session not exist
  if (session === null)
    return (
      <div className="flex flex-col items-center gap-3">
        <Link
          href="/auth/login"
          className="underline font-semibold text-blue-500"
        >
          Iniciar Sesión
        </Link>
        <div className="flex flex-col items-center">
          <p className="text-neutral-500">¿No tenes cuenta?</p>
          <Link
            href="/auth/register"
            className="underline font-semibold text-blue-500"
          >
            Registrate
          </Link>
        </div>
      </div>
    );

  //If user session exist
  return (
    <SidebarFooter>
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton>
                <CircleUserRound />
                <span className="self-start">{session?.user.name}</span>
                <ChevronUp className="ml-auto" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg shadow-xl p-2"
              side={isMobile ? "bottom" : "right"}
              align="end"
              sideOffset={4}
            >
              <DropdownMenuLabel className="p-0 font-normal">
                <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">
                      {session?.user.name}
                    </span>
                    <span className="truncate text-xs">
                      {session?.user.email}
                    </span>
                  </div>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <Link href="/admin/profile" className="cursor-pointer">
                  <DropdownMenuItem>
                    <UserRound />
                    Mi perfil
                  </DropdownMenuItem>
                </Link>
                <DropdownMenuItem>
                  <Settings />
                  Ajustes
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={signOut} className="text-red-500 cursor-pointer">
                <LogOut className="text-red-500"/>
                Cerrar sesión
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarFooter>
  );
}
