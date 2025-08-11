import { TUserRoles } from "@/types/roles/users-roles.types";

export default function ResourceUserRolePil({
  role,
}: {role: TUserRoles}) {
  const roleMap = {
    USER: {
      color: "border-neutral-400 text-neutral-600 bg-neutral-200",
      text: "USUARIO",
    },
    EDITOR: {
      color: "border-orange-400 text-orange-600 bg-orange-200",
      text: "EDITOR",
    },
    ADMIN: {
      color: "border-purple-400 text-purple-600 bg-purple-200",
      text: "ADMINISTRADOR",
    },
  };
  const config = roleMap[role];

  return (
    <div
      className={`px-3 w-30 border-1 shadow rounded-3xl text-center ${config.color}`}
    >
      {config.text}
    </div>
  );
}
