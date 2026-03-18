import {
  SidebarMenu,
  SidebarMenuSkeleton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

export default function UiSidebarSkeleton({ length }: { length: number }) {
  return (
    <SidebarMenu>
      {Array.from({ length: length }).map((_, i) => (
        <SidebarMenuItem key={i}>
          <SidebarMenuSkeleton />
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}
