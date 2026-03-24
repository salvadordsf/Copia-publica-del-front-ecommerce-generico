"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { authClient } from "@/lib/auth-client";

type Role = "ADMIN" | "EDITOR" | "USER";

export const useRequireRole = (requiredRoles: Role[]) => {
  const router = useRouter();
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);
  const [havePermission, setHavePermission] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const check = async () => {
      const session = await authClient.getSession();

      if (!isMounted) return;

      if (!session?.data?.user) {
        setHavePermission(false);
        router.replace(`/auth/login?redirect=${pathname}`);
        setLoading(false);
        return;
      }

      const role = session.data.user.role;

      if (!role || !requiredRoles.includes(role)) {
        setHavePermission(false);
        router.replace("/home");
        setLoading(false);
        return;
      }

      setHavePermission(true);
      setLoading(false);
    };

    check();

    return () => {
      isMounted = false;
    };
  }, [pathname, router]);

  return { loading, havePermission };
};
