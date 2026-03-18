type Status = "ACTIVE" | "ARCHIVED" | "DELETED";

export const statusRowClassGenerator = (resource: { status: Status }) =>
  `${
    resource.status === "ARCHIVED"
      ? "bg-blue-200 opacity-70 hover:bg-blue-300"
      : resource.status === "DELETED"
      ? "bg-red-200 hover:bg-red-300"
      : "hover:bg-neutral-200"
  } cursor-pointer`;
