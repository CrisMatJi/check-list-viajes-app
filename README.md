# CheckList Viajes App

Una aplicación web para gestionar listas de elementos necesarios para tus viajes. Permite crear viajes, añadir elementos a la lista y marcarlos como completados. Incluye persistencia compartida para uso familiar.

## Características

- Crear y gestionar múltiples viajes
- Añadir elementos a la lista de cada viaje
- Marcar elementos como completados
- Seguimiento del progreso de preparación
- Persistencia compartida para uso familiar (MongoDB)
- Identificación por código de familia
- Diseño responsive para móviles y escritorio

## Tecnologías utilizadas

- **Frontend**:
  - React
  - React Router
  - Chakra UI
  - Vite

- **Backend**:
  - Node.js
  - Express
  - MongoDB

- **Infraestructura**:
  - Docker
  - Docker Compose

## Instalación

```bash
# Clonar el repositorio
git clone <url-del-repositorio>
cd check-list-viajes-app

# Instalar dependencias del frontend
npm install

# Instalar dependencias del backend
cd server
npm install
cd ..

# Iniciar la aplicación con Docker
docker-compose up -d

# O iniciar solo el frontend para desarrollo
npm run dev
```

## Despliegue

Esta aplicación puede desplegarse fácilmente en servicios de hosting gratuitos como:

- GitHub Pages
- Netlify
- Vercel
- Render

Para construir la aplicación para producción:

```bash
npm run build
```

Esto generará una carpeta `dist` con los archivos optimizados listos para ser desplegados.

## Uso

1. Al iniciar la aplicación, introduce un código de familia (todos los miembros de la familia deben usar el mismo código)
2. En la página principal, haz clic en "Nuevo Viaje" para crear un viaje
3. Completa el formulario con los detalles del viaje
4. En la página de detalles del viaje, añade elementos a tu lista
5. Marca los elementos como completados a medida que los preparas
6. Todos los miembros de la familia con el mismo código verán los mismos viajes y podrán colaborar en las listas

## Licencia

MIT
