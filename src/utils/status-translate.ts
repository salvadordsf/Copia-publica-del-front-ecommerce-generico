type Status = "ACTIVE" | "ARCHIVED" | "DELETED";

export function statusTranslate(status: Status, genre: "masc" | "fem") {
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
