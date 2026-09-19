# commitlint_d'oh! 🚀

Editor y validador previo (*pre-linter*) interactivo en el navegador para mensajes de commit basados en el estándar [Conventional Commits](https://www.conventionalcommits.org).

Diseñado para funcionar sin dependencias de compilación, 100% privado en el cliente y listo para desplegarse con un clic en **Netlify** o utilizarse sin conexión.

---

## 🛠️ Tecnologías

* **HTML5 & CSS3**: Interfaz moderna, responsive y accesible basada en [Bootstrap 5](https://getbootstrap.com) y [Bootstrap Icons](https://icons.getbootstrap.com).
* **JavaScript Vanilla (ES6+)**: Lógica de validación con expresiones regulares y observadores DOM, sin bundlers ni frameworks pesados.
* **Despliegue Estático**: Compatible con Netlify, GitHub Pages, Vercel y Cloudflare Pages.

---

## 🚀 Despliegue en Netlify

Este proyecto está preconfigurado para desplegarse en Netlify automáticamente sin pasos adicionales:

1. **Vía Git (Recomendado)**:
   - Sube este repositorio a GitHub, GitLab o Bitbucket.
   - En tu panel de [Netlify](https://app.netlify.com), selecciona **"Add new site" > "Import an existing project"**.
   - Netlify detectará automáticamente el archivo [`netlify.toml`](./netlify.toml) configurado en la raíz con:
     - **Publish directory**: `.` (raíz)
     - **Build command**: (vacío, sitio estático puro)
   - Haz clic en **Deploy**.

2. **Vía Netlify CLI**:
   ```bash
   npm install -g netlify-cli
   netlify deploy --prod --dir=.
   ```

3. **Vía Drag & Drop**:
   - Arrastra la carpeta del repositorio directamente a la sección de despliegue manual en la web de Netlify.

---

## 💻 Ejecución Local

Puedes ejecutar el proyecto en tu máquina local de varias maneras:

### Opción 1: Abrir directamente en el navegador
```bash
# En macOS:
open index.html
```

### Opción 2: Servidor local ligero
* **Con Python:**
  ```bash
  python3 -m http.server 8000
  ```
  Abre [http://localhost:8000](http://localhost:8000) en tu navegador.

* **Con Node.js:**
  ```bash
  npx serve .
  ```

---

## 📁 Estructura del Proyecto

```text
.
├── index.html        # Página principal de la aplicación (entrypoint para Netlify)
├── netlify.toml      # Configuración de despliegue, seguridad y redirecciones en Netlify
├── _redirects        # Redirecciones automáticas de compatibilidad para Netlify
├── assets/
│   └── icons/        # Favicons e íconos de la aplicación
├── src/
│   ├── style.css     # Estilos personalizados y diseño de la terminal/cards
│   ├── script.js     # Lógica de validación y utilidades del editor
│   └── index.html    # Redirección de compatibilidad a la raíz
├── LICENSE           # Licencia MIT
└── README.md         # Documentación del proyecto
```

---

## 📄 Licencia

Este proyecto está distribuido bajo la licencia MIT.
