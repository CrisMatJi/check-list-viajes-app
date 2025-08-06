#!/bin/bash

# Script para preparar el proyecto para despliegue en GitHub Pages

# Asegurarse de que estamos en la rama principal
git checkout main || git checkout master

# Instalar dependencias
npm install

# Construir el proyecto
npm run build

# Mensaje informativo
echo "=================================================="
echo "Proyecto construido con éxito en la carpeta dist"
echo "Para desplegar manualmente en GitHub Pages:"
echo "1. Crea un repositorio en GitHub"
echo "2. Ejecuta los siguientes comandos:"
echo "   git remote add origin https://github.com/TU_USUARIO/check-list-viajes-app.git"
echo "   git add ."
echo "   git commit -m 'Preparado para despliegue'"
echo "   git push -u origin main"
echo "3. Configura GitHub Pages en la configuración del repositorio"
echo "   para usar la rama gh-pages"
echo "=================================================="