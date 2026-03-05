"use client";

import { authClient } from "@/lib/auth-client";
import { useUserById } from "@/features/admin/users/services/users-querys";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { PencilIcon, Settings, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import ProfileOrders from "./profile-orders";

export default function ProfilePage() {
  const { data: session, isPending: isSessionPending } =
    authClient.useSession();

  const router = useRouter();
  const userId = session?.user?.id ?? "";

  const {
    data,
    isPending: isUserPending,
    isError,
  } = useUserById(userId, !!userId);

  if (isSessionPending) {
    return (
      <div className="max-w-xl mx-auto py-10">
        <Card>
          <CardHeader className="flex flex-row items-center gap-4">
            <Skeleton className="h-14 w-14 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-40" />
              <Skeleton className="h-3 w-52" />
            </div>
          </CardHeader>
        </Card>
      </div>
    );
  }

  if (session === null) router.push("/auth/login");
  if (isUserPending) {
    return (
      <div className="max-w-xl mx-auto py-10">
        <Card>
          <CardHeader className="flex flex-row items-center gap-4">
            <Skeleton className="h-14 w-14 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-40" />
              <Skeleton className="h-3 w-52" />
            </div>
          </CardHeader>
        </Card>
      </div>
    );
  }
  if (isError || !data.success)
    return (
      <div className="max-w-xl mx-auto py-10 text-sm text-muted-foreground">
        No se pudo cargar el perfil.
        <Button onClick={() => router.push("/home")}>Volver al inicio</Button>
      </div>
    );

  if (!data?.data) {
    return (
      <div className="max-w-xl mx-auto py-10 text-sm text-muted-foreground">
        No se pudo cargar el perfil.
      </div>
    );
  }

  const user = data.data;
  const orders = user.orders;

  return (
    <div className="max-w-xl mx-auto py-10">
      <Card>
        <CardHeader className="relative flex flex-row items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-muted">
            <User className="h-7 w-7 text-muted-foreground" />
          </div>

          <div className="flex flex-col">
            <span className="text-lg font-semibold leading-none">
              {user.name}
            </span>

            <span className="text-sm text-muted-foreground">{user.email}</span>
          </div>
          <div className="absolute right-5 top-0 flex flex-row gap-1">
            <Button
              className="h-6 w-6 p-1 cursor-pointer"
              variant="outline"
              onClick={() => console.log("future feature")}
            >
              <Settings />
            </Button>

            <Button
              className="h-6 w-6 p-1 cursor-pointer"
              variant="outline"
              onClick={() => console.log("future feature")}
            >
              <PencilIcon />
            </Button>
          </div>
        </CardHeader>

        <CardContent className="space-y-2 text-sm">
          <ProfileOrders orders={orders} />
        </CardContent>
      </Card>
    </div>
  );
}
