import { IGeneralResources } from "@/types/resources/general-resources";

interface IResourceDatesRegisters {
  resource: IGeneralResources
}

export default function ResourceDatesRegisters({
  resource,
}: IResourceDatesRegisters) {
  return (
    <div className="flex flex-col italic text-sm text-muted-foreground">
      <span>Creada el: {new Date(resource.createdAt).toLocaleString()}</span>
      <span>
        Última actualización: {new Date(resource.updatedAt).toLocaleString()}
      </span>
      {resource.status === "ARCHIVED" && resource.archivedAt && (
        <span className="text-blue-400">
          Archivado: {new Date(resource.archivedAt).toLocaleString()}
        </span>
      )}
      {resource.status === "DELETED" && resource.deletedAt && (
        <span className="text-red-500">
          Eliminado: {new Date(resource.deletedAt).toLocaleString()}
        </span>
      )}
    </div>
  );
}
