export function getErrorMessage(status: number | undefined, context: "login" | "register" | "general") {
    const messages: Record<string, Record<number, string>> = {
      login: {
        401: "Correo o contraseña incorrectos.",
        403: "Tu cuenta ha sido suspendida.",
      },
      register: {
        409: "Este correo ya está registrado.",
        400: "Datos inválidos. Verificá los campos.",
      },
      general: {
        //Perso errors codes
        1000: "Obtención de recurso no disponible.",
        1001: "Obtención de recursos no disponible.",
        2000: "Creación de recurso no disponible.",
        3000: "Actualización de recurso no disponible.",
        4000: "Eliminación de recurso no disponible.",
        //Server status codes
        401: "No estás autorizado.",
        404: "No se encontró el recurso.",
        409: "El recurso ya se encuentra creado.",
        500: "Error interno del servidor. Intentalo más tarde.",
      },
    };
    
    if (status) {
        return messages[context][status] || "Ocurrió un error inesperado.";
    } else {
        return "Ocurrió un error inesperado."
    }
  }