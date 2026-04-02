import { IGeneralResources } from "@/types/resources/general-resources";
import { IOrder } from "@/types/resources/order-types";

export const statusRowClassGenerator = (resource: IGeneralResources) =>
  `${
    resource.status === "ARCHIVED"
      ? "bg-blue-200 opacity-70 hover:bg-blue-300"
      : resource.status === "DELETED"
        ? "bg-red-200 hover:bg-red-300"
        : "hover:bg-neutral-200"
  } cursor-pointer`;

export const orderStatusRowClassGenerator = (order: IOrder) => {
  let style = "cursor-pointer ";

  switch (order.status) {
    case "CANCELLED":
      style += "bg-red-200 hover:bg-red-300";
      break;
    case "PENDING":
      style += "hover:bg-neutral-200";
      break;
    case "READY":
      style += "bg-yellow-200 opacity-70 hover:bg-yellow-300";
      break;
    case "PAID":
      style += "bg-green-200 opacity-70 hover:bg-green-300";
      break;
    case "SHIPPED":
      style += "bg-blue-200 opacity-70 hover:bg-blue-300";
      break;
    default:
      style += "hover:bg-neutral-200";
      break;
  }

  return style;
};
