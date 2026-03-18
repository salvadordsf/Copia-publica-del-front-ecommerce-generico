import { TUserRoles } from "@/types/roles/users-roles.types";
import ResourceUserRolePil from "./resource-user-role-pil";

export default function ResourceUserRole({ role }: { role: TUserRoles }) {
  return (
    <div className="flex gap-2 items-center col-start-1 col-end-2">
      <h3 className="font-semibold">Rol:</h3>
      <div className="flex gap-4">
        <ResourceUserRolePil role={role} />
      </div>
    </div>
  );
}
