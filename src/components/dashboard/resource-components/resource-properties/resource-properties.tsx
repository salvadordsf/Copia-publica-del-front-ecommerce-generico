import { TResourceStatus } from "@/types/resources/resource-status.types";
import ResourceStatus from "../resource-status/resource-status-resource";
import ResourcePropertie from "./resource-properti";
import { TUserRoles } from "@/types/roles/users-roles.types";
import ResourceUserRole from "../resource-user-role/resource-user-role";

interface IResourceProperties {
  properties?: { key: string; value: string; link?: string }[];
  optionals?: {
    status?: {
      include: boolean;
      resourceStatus: TResourceStatus;
    };
    role?: {
      include: boolean;
      userRole: TUserRoles;
    };
    tags?: {
      include: boolean;
      resourceTags: any[];
    };
  };
}

export default function ResourceProperties({
  properties,
  optionals,
}: IResourceProperties) {
  return (
    <div className="flex flex-col gap-4 mt-4">
      {/*Resource properties*/}
      {properties &&
        properties.map((prop) => (
          <ResourcePropertie
            key={prop.key}
            value={prop.value}
            resourcekey={prop.key}
            link={
              prop.link
                ? {
                    enabled: true,
                    to: prop.link,
                  }
                : undefined
            }
          />
        ))}

      {/*Tags*/}
      {optionals && optionals.tags && optionals.tags?.include && (
        <div className="flex gap-2 items-center col-start-1 col-end-2">
          <h3 className="font-semibold">Etiquetas:</h3>
          <div className="flex gap-1 flex-wrap">
            {optionals.tags?.resourceTags.length <= 0 && (
              <span className="italic">Sin etiquetas</span>
            )}
            {optionals.tags?.resourceTags.map((tag: any) => (
              <div
                key={tag.id}
                className="min-w-15 py-0.5 px-2 border-1 border-neutral-400 bg-gray-300/80 rounded-3xl text-sm text-center shadow"
              >
                {tag.name}
              </div>
            ))}
          </div>
        </div>
      )}

      {/*User Role*/}
      {optionals && optionals.role && optionals.role?.include && (
        <ResourceUserRole role={optionals.role.userRole} />
      )}

      {/*Status*/}
      {optionals && optionals.status && optionals.status?.include && (
        <ResourceStatus status={optionals.status.resourceStatus} />
      )}
    </div>
  );
}
