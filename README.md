# commitlint_d'oh! 🚀

Editor y validador previo (*pre-linter*) interactivo en el navegador para mensajes de commit basados en el estándar [Conventional Commits](https://www.conventionalcommits.org).

Empaquetado con **Vite** y administrado con **pnpm**. **100% privado y autónomo: no realiza ninguna llamada externa** a CDNs, Google Fonts ni servicios de analíticas. Todo (fuentes, estilos e íconos) se sirve de forma local y optimizada.

---

## 🛠️ Tecnologías

* **Vite**: Bundler ultrarrápido para desarrollo y compilación en producción.
* **pnpm**: Gestor de paquetes rápido y eficiente en espacio de disco.
* **Fuentes Autoalojadas**: `@fontsource/plus-jakarta-sans` y `@fontsource/jetbrains-mono` integradas localmente (sin peticiones a Google Fonts).
* **Bootstrap 5 & Bootstrap Icons**: Dependencias empaquetadas localmente (sin CDNs externas).
* **JavaScript Vanilla (ES6+)**: Lógica de validación con expresiones regulares y observadores DOM.

---

## 💻 Desarrollo Local con pnpm y Vite

1. **Instalar dependencias:**
   ```bash
   pnpm install
   ```

2. **Iniciar servidor de desarrollo:**
   ```bash
   pnpm dev
   ```

3. **Compilar para producción:**
   ```bash
   pnpm build
   ```

4. **Previsualizar la compilación de producción:**
   ```bash
   pnpm preview
   ```

---

## 🚀 Despliegue en Netlify

El proyecto está configurado en [`netlify.toml`](./netlify.toml) para compilar y desplegar automáticamente:
- **Build command**: `pnpm run build`
- **Publish directory**: `dist`

---

## ⌨️ Atajos de Teclado

| Acción | Windows / Linux | macOS |
| :--- | :--- | :--- |
| **Copiar mensaje generado** | <kbd>Ctrl</kbd> + <kbd>Enter</kbd> *o* <kbd>Alt</kbd> + <kbd>C</kbd> | <kbd>⌘</kbd> + <kbd>Enter</kbd> *o* <kbd>⌥</kbd> + <kbd>C</kbd> |
| **Copiar comando `git commit -m`** | <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>Enter</kbd> | <kbd>⌘</kbd> + <kbd>Shift</kbd> + <kbd>Enter</kbd> |

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
