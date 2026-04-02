"use client";

import { Collapsible } from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";
import { CollapsibleTrigger } from "@radix-ui/react-collapsible";
import { ChevronDown } from "lucide-react";

export default function PublicSidebarSkeleton() {
  return (
    <>
      {/* Home */}
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton>
            <div className="flex items-center gap-2 w-full">
              <Skeleton className="h-4 w-4 rounded" />
              <Skeleton className="h-4 w-20" />
            </div>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>

      {/* Categories */}
      <Collapsible className="group/collapsible">
        <SidebarGroup>
          <SidebarGroupLabel>
            <CollapsibleTrigger className="flex items-center w-full">
              <Skeleton className="h-4 w-24" />
              <ChevronDown className="ml-auto h-4 w-4 opacity-50" />
            </CollapsibleTrigger>
          </SidebarGroupLabel>

          {/* Fake categories list */}
          <div className="mt-2 space-y-2 px-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="space-y-2">
                {/* Category */}
                <div className="flex items-center gap-2">
                  <Skeleton className="h-3 w-32" />
                </div>

                {/* Subcategories */}
                <div className="ml-4 space-y-1">
                  {Array.from({ length: 3 }).map((_, j) => (
                    <Skeleton key={j} className="h-3 w-24" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </SidebarGroup>
      </Collapsible>

      {/* Products */}
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton>
            <div className="flex items-center gap-2 w-full">
              <Skeleton className="h-4 w-4 rounded" />
              <Skeleton className="h-4 w-24" />
            </div>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>

      {/* Generic 1 */}
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton>
            <div className="flex items-center gap-2 w-full">
              <Skeleton className="h-4 w-4 rounded" />
              <Skeleton className="h-4 w-32" />
            </div>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>

      {/* Generic 2 */}
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton>
            <div className="flex items-center gap-2 w-full">
              <Skeleton className="h-4 w-4 rounded" />
              <Skeleton className="h-4 w-32" />
            </div>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>

      {/* FAQ */}
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton>
            <div className="flex items-center gap-2 w-full">
              <Skeleton className="h-4 w-4 rounded" />
              <Skeleton className="h-4 w-40" />
            </div>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>

      {/* Contact */}
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton>
            <div className="flex items-center gap-2 w-full">
              <Skeleton className="h-4 w-4 rounded" />
              <Skeleton className="h-4 w-28" />
            </div>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </>
  );
}
