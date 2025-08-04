export default function ResourceStatusPil({
  status,
}: {
  status: "ACTIVE" | "ARCHIVED" | "DELETED";
}) {
  const statusMap = {
    ACTIVE: {
      color: "border-green-400 text-green-600 bg-green-200",
      text: "ACTIVO",
    },
    ARCHIVED: {
      color: "border-blue-400 text-blue-600 bg-blue-200",
      text: "ARCHIVADO",
    },
    DELETED: {
      color: "border-red-400 text-red-600 bg-red-200",
      text: "ELIMINADO",
    },
  };
  const config = statusMap[status];

  return (
    <div
      className={`px-3 w-30 border-1 shadow rounded-3xl text-center ${config.color}`}
    >
      {config.text}
    </div>
  );
}
