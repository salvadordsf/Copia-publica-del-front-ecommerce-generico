import { TResourceStatus } from "@/types/resources/resource-status.types";

export function statusTranslate(status: TResourceStatus, genre: "masc" | "fem") {
  let translate = "";
  if (status === "ACTIVE") translate = "Activ";
  if (status === "ARCHIVED") translate = "Archivad";
  if (status === "DELETED") translate = "Eliminad";
  if (genre === "fem") {
    return translate.concat("a");
  } else {
    return translate.concat("o");
  }
}

export const ORDER_STATUS_LABEL = {
  CANCELLED: "cancelada",
  PENDING: "pendiente de aprobación",
  READY: "lista para pagar",
  PAID: "pagado aprobado",
  SHIPPED: "enviada",
}