"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/react-query/query-client";
import { Toaster } from "sonner";
import ServerWakeUp from "@/components/server-wakeup";

export default function GlobalProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster richColors position="top-right" />
        <ServerWakeUp />
      {children}
    </QueryClientProvider>
  );
}
