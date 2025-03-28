# 🛒 Sistema de Tienda y Administración

## 📌 Descripción General
Este proyecto es un sistema integral de tienda en línea con panel de administración, diseñado para gestionar distintos aspectos de un negocio. La solución está compuesta por múltiples módulos que trabajan de forma conjunta para ofrecer una experiencia completa tanto para el cliente como para el administrador.

## 🧩 Componentes del Sistema
- **Frontend de Tienda**: Interfaz de usuario para clientes, desarrollada con Angular.
- **Panel de Administración**: Herramienta de gestión para administradores.
- **Backend**: API y lógica del servidor para manejar datos y operaciones del sistema.
- **Sistema de Rutas**: Control de navegación entre módulos y componentes.

## 📁 Estructura del Proyecto
```
├── admin/           # Panel de administración (Angular)
├── back/            # Backend del sistema (Node.js, Express, etc.)
├── tienda/          # Frontend de la tienda (Angular)
├── ruta/            # Gestión de rutas y navegación
└── node_modules/    # Dependencias del proyecto
```

## ⚙️ Tecnologías Utilizadas
- **Frontend**: Angular + ng-bootstrap
- **Backend**: [Especificar tecnología: Node.js, Express, NestJS, etc.]
- **Base de Datos**: [Especificar: MySQL, PostgreSQL, MongoDB, etc.]
- **Control de versiones**: Git

## ✅ Requisitos Previos
- Node.js (vXX.X.X)
- Angular CLI
- [Otros requisitos: MongoDB instalado, variables de entorno, etc.]

## 🚀 Instalación

1. **Clona el repositorio:**
```bash
git clone [URL del repositorio]
```

2. **Instala las dependencias principales:**
```bash
npm install
```

3. **Configura las variables de entorno:**
> Crea un archivo `.env` en el directorio del backend con las siguientes variables:
```
DB_HOST=...
DB_USER=...
DB_PASSWORD=...
PORT=...
```

## 🧪 Entorno de Desarrollo

### Tienda (Frontend Cliente)
```bash
cd tienda
npm install
ng serve
```

### Panel de Administración
```bash
cd admin
npm install
ng serve
```

### Backend
```bash
cd back
npm install
npm run dev
```

> Asegúrate de tener la base de datos configurada y corriendo antes de iniciar el backend.

## 🌟 Características del Sistema
- Gestión de productos, categorías y stock
- Carrito de compras y proceso de pago
- Registro e inicio de sesión de usuarios
- Panel de administración con dashboard de ventas
- CRUD de productos, usuarios y órdenes
- Control de roles y permisos
- Reportes y estadísticas (opcional)

## 🤝 Contribución
¡Las contribuciones son bienvenidas! Si deseas colaborar:

1. Haz un fork del proyecto
2. Crea una nueva rama (`git checkout -b feature/nueva-funcionalidad`)
3. Realiza tus cambios y haz commit (`git commit -m 'Agrega nueva funcionalidad'`)
4. Haz push a tu rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

## 📄 Licencia
Este proyecto está licenciado bajo la [Nombre de la licencia].

## 📬 Contacto
Para dudas, sugerencias o soporte, puedes contactarnos a:
- Correo: [correo@ejemplo.com]
- GitHub: [Perfil o repositorio]

## 📝 Notas Adicionales
- Asegúrate de tener las versiones correctas de Angular y Node.js.
- Puedes utilizar herramientas como Postman para probar los endpoints del backend.
- Verifica las rutas en el archivo de configuración de navegación si deseas modificar el flujo del sistema.
