export const getSpResourceName = (resType: string) => {
switch (resType) {
    case "user":
      return "usuario";
    case "product":
      return "producto";
    case "category":
      return "categoría";
    case "subcategory":
      return "subcategoría";
    case "tag":
      return "etiqueta";
  
    default:
      return "recurso";
  }
}