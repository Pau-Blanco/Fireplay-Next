# 🎮 Fireplay

**Fireplay** es una aplicación web que te ofrece una inmensa selección de videojuegos para explorar y comprar. Cada título incluye información detallada, capturas de pantalla, y reseñas de usuarios. Además, puedes guardar tus juegos favoritos y disfrutar de una experiencia personalizada gracias a la autenticación de usuarios y almacenamiento en la nube mediante Firebase.

## 🚀 Características

- Amplio catálogo de videojuegos proporcionado por la **RAWG API**
- Información detallada de cada juego: descripción, capturas, y reseñas
- Sistema de compras y favoritos
- Autenticación de usuarios con **Firebase Authentication**
- Almacenamiento de datos (usuarios, compras, mensajes, favoritos) con **Firebase Firestore**
- Soporte para almacenamiento persistente usando **LocalStorage** y **Cookies**
- Aplicación Progresiva (PWA) con soporte offline mediante `manifest.json` y `service worker`
- Diseño moderno, rápido y responsive

---

## 🛠️ Tecnologías utilizadas

- ⚛️ **React 19**
- 🌐 **Next.js 15** (con App Router y Server Components)
- 🎨 **Tailwind CSS 4**
- 🔥 **Firebase** (Authentication + Firestore)
- 💾 **LocalStorage** y **Cookies**
- 🎮 **RAWG API**
- ⚙️ **Vite** (como sistema de desarrollo rápido integrado)
- 📱 **Progressive Web App (PWA)**

---

## 📦 Instalación

Sigue estos pasos para clonar e iniciar el proyecto localmente:

```bash
# 1. Clona este repositorio
git clone https://github.com/tu-usuario/fireplay.git

# 2. Entra al directorio del proyecto
cd fireplay

# 3. Instala las dependencias
npm install

# 4. Ejecuta el servidor de desarrollo
npm run dev
