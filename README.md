# E-commerce Frontend (Next.js)

Este es el frontend del proyecto de e-commerce desarrollado con Next.js. Por ahora, incluye exclusivamente el **panel de administración** con funcionalidades para manejar productos, categorías, subcategorías, tags y autenticación JWT funcional.

---

## Características principales

- Panel de administración moderno y responsivo
- Gestión de productos (crear, editar, eliminar)
- Gestión de categorías y subcategorías
- Gestión de tags para mejorar la búsqueda y organización
- Sistema de autenticación con JWT (login, logout y rutas protegidas)
- Construido con Next.js, React y Tailwind CSS (puedes ajustar según lo que uses)

---

## Instalación

Instalá las dependencias:

```bash
npm install
# o
yarn install
```

---

## Uso

Ejecutar el servidor de desarrollo:

```bash
npm run dev
# o
yarn dev
```

Abrir en el navegador: [http://localhost:3000](http://localhost:3000)

---

## Scripts disponibles

- `dev` — Inicia el servidor de desarrollo
- `build` — Construye la app para producción
- `start` — Inicia la app en modo producción
- `lint` — Ejecuta linter para verificar código

---

## Estructura de carpetas

- `/pages` — Páginas y rutas de Next.js
- `/components` — Componentes reutilizables
- `/utils` — Funciones y helpers
- `/services` — Comunicación con backend (API)
- `/styles` — Estilos globales y configuración Tailwind

---

## Autenticación

El sistema usa JWT para autenticar usuarios y proteger rutas del panel de administración.

Se recomienda configurar las variables de entorno para la URL del backend y claves secretas.

---

## Variables de entorno

Crear un archivo `.env.local` en la raíz del proyecto y agregar:

```env
NEXT_PUBLIC_API_URL=http://localhost:4000/api
JWT_SECRET=tu_clave_secreta
```

Ajustá los valores según tu entorno.

---

## Contribuciones

Si querés contribuir, hacé un fork, creá una rama para tu feature y abrí un Pull Request.

---

## Licencia

MIT License © 2025 Salvador Di Sabatto Fund
