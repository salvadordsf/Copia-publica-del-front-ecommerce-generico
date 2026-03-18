"use client";

interface Props {
  resource: {
    label: string;
    original: string;
    edited?: string;
    alert?: boolean;
  }[];
}

const detectFieldUtil = (value: string | undefined) => {
  switch (value) {
    case "USER":
      return "Usuario";
    case "EDITOR":
      return "Editor";
    case "ADMIN":
      return "Administrador";
    case "ACTIVE":
      return "Activo";
    case "ARCHIVED":
      return "Archivado";
    case "DELETED":
      return "Eliminado";
    default:
      return value;
  }
};

export default function UpdateConfirmDialog({ resource }: Props) {
  //Edited fields values
  const editedFieldsAry: any[] = resource.filter((item) => {
    console.log(item)
    if (item && item.original !== item.edited)
      return [item.original, item.edited];
  });

  //Render if has almost one property edited
  if (editedFieldsAry.length > 0) {
    return (
      <div className="space-y-2">
        {editedFieldsAry.map((item) => (
          <div
            key={item.label}
            className={
              item.alert &&
              "p-2 rounded-lg bg-yellow-200 border-2 border-yellow-400"
            }
          >
            <strong className="font-bold">
              {item.alert && "⚠️ "}
              {item.label}:{" "}
            </strong>
            <span className="font-semibold text-red-500">
              {detectFieldUtil(item.original)}{" "}
            </span>
            →
            <span className="font-semibold text-green-500">
              {" "}
              {detectFieldUtil(item.edited)}
            </span>
          </div>
        ))}
      </div>
    );
  } else {
    return (
      <p className="text-center text-neutral-500 cursor-pointe">
        No se han modificado propiedades. Vuelva al paso anterior para editar el recurso o cancele la acción para dejar de editar.
      </p>
    );
  }
}
