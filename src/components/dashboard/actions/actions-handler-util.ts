export const getSpResourceName = (resType: string) => {
switch (resType) {
    case "users":
      return "usuario";
    case "products":
      return "producto";
    case "categories":
      return "categoría";
    case "subcategories":
      return "subcategoría";
    case "tags":
      return "etiqueta";
  
    default:
      return "recurso";
  }
}