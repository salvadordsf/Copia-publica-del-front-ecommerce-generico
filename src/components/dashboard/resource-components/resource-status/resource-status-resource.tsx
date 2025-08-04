import ResourceStatusPil from "./resource-status-resource-pil";

export default function ResourceStatus({
  status,
}: {
  status: "ACTIVE" | "ARCHIVED" | "DELETED";
}) {
  return (
    <div className="flex gap-2 items-center col-start-1 col-end-2">
      <h3 className="font-semibold">Estado:</h3>
      <div className="flex gap-4">
        <ResourceStatusPil status={status} />
      </div>
    </div>
  );
}
