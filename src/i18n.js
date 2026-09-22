// ==========================================================================
// Commitlint D'oh - Internationalization (i18n: ES / EN)
// ==========================================================================

export const translations = {
  es: {
    doc_title: "commitlint_d'oh! — Editor y Pre-linter de Commits Convencionales",
    nav_lint_badge: "lint commit messages",
    nav_engine: "Engine:",
    nav_conventional: "Conventional Commits",
    nav_ecosystem: "CLI & Ecosistema",
    theme_dark: "Modo Oscuro",
    theme_light: "Modo Claro",
    theme_title_dark: "Cambiar a modo oscuro",
    theme_title_light: "Cambiar a modo claro",
    lang_toggle_code: "EN",
    lang_toggle_title: "Switch to English",

    hero_title: "Editor & Validador de Commits Convencionales",
    hero_subtitle: "Escribe commits claros, estandarizados y sin esfuerzo con validación sintáctica en tiempo real.",

    card_builder_title: "Construir Mensaje",
    btn_clear: "Limpiar",
    label_type: "Tipo",
    badge_required: "Obligatorio",
    badge_optional: "Opcional",
    tooltip_type: "El tipo de cambio realizado",
    type_opt_placeholder: "<tipo> Seleccionar tipo...",
    type_opt_feat: "feat (nueva característica)",
    type_opt_fix: "fix (corrección de error)",
    type_opt_docs: "docs (documentación)",
    type_opt_style: "style (formato, espacios, comas)",
    type_opt_refactor: "refactor (ni corrige bug ni añade feature)",
    type_opt_perf: "perf (mejora de rendimiento)",
    type_opt_test: "test (añadir o corregir pruebas)",
    type_opt_build: "build (sistema de build o dependencias)",
    type_opt_ci: "ci (configuración de CI y scripts)",
    type_opt_chore: "chore (mantenimiento y tareas rutinarias)",
    type_opt_revert: "revert (revertir un commit previo)",

    label_scope: "Ámbito / Scope",
    placeholder_scope: "ej: auth, api, ui",
    tooltip_scope: "Indica la sección o módulo del cambio (sin espacios)",

    label_breaking: "Breaking?",
    tooltip_breaking: "Indica cambio que rompe compatibilidad hacia atrás",
    breaking_opt_no: "No",
    breaking_opt_yes: "! (Sí)",

    label_subject: "Descripción Corta (Subject)",
    placeholder_subject: "ej: add authentication middleware for api routes",
    tooltip_subject: "Usa modo imperativo presente: 'add' no 'added'. En minúsculas y sin punto al final.",
    help_subject: "Modo imperativo (\"add\" en vez de \"added\"), sin mayúscula inicial y sin punto final.",

    label_body: "Cuerpo del Mensaje (Body)",
    placeholder_body: "Describe la motivación del cambio y el contraste con el comportamiento anterior...",
    tooltip_body: "Líneas envueltas automáticamente a 72 caracteres con soporte de viñetas",

    accordion_footer_title: "Etiquetas Rápidas de Footer (Issues & Breaking Changes)",
    footer_breaking_help: "Ruptura de compatibilidad",
    footer_fixes_help: "Referencia a issue",
    footer_closes_help: "Cierra issue",
    footer_deprecated_help: "Obsoleto",
    footer_reviewed_help: "Aprobador",
    placeholder_footer: "Información de footer (ej: BREAKING CHANGE: se eliminó el endpoint v1, Closes: #104)...",
    tooltip_footer: "Referencias a issues o detalles de cambios disruptivos",

    preview_title: "commit-message.txt",
    status_waiting: "Esperando...",
    status_valid: "Formato válido",
    status_invalid: "No permitido / Incompleto",
    btn_copy_msg: "Copiar Mensaje",
    btn_copy_git: "git commit -m",
    btn_copied: "¡Copiado!",
    btn_git_copied: "¡Comando Copiado!",
    btn_disabled_title: "No se puede crear el commit",
    copy_msg_title: "Copiar mensaje generado ({shortcut} o Alt+C)",
    copy_git_title: "Copiar como comando git commit ({shortcut})",
    toast_copied_msg: "Mensaje de commit copiado al portapapeles",
    toast_copied_git: "Comando git commit copiado al portapapeles",
    feedback_cannot_create: "No se puede crear el commit",
    feedback_reasons: "razones",
    feedback_fill_required: "completa los campos requeridos antes de copiar",

    lint_valid_title: "✓ ¡Commit válido y listo para usar!",
    lint_valid_desc: "El formato cumple con la especificación de Conventional Commits. Puedes copiar el mensaje o el comando git.",
    lint_reasons_single: "No se puede crear el commit por la siguiente razón:",
    lint_reasons_plural: "No se puede crear el commit por las siguientes razones:",

    lint_type_must: "Debes seleccionar un tipo de commit válido (ej: feat, fix, chore, docs).",
    lint_subject_must: "Debes ingresar una descripción corta (subject) después de los dos puntos.",
    lint_message_length: "La primera línea tiene demasiados caracteres (se recomienda un máximo de 50 caracteres).",
    lint_line_len_dynamic: "La primera línea tiene {len} caracteres (el estándar recomienda un máximo de 50 caracteres para evitar truncamientos en Git).",
    lint_backslash_never: "No se permiten barras invertidas (\\) en el mensaje de commit.",
    lint_scope_no_whitespace: "El ámbito (scope) no debe contener espacios en blanco.",
    lint_period_never: "La descripción corta no debe terminar con un punto final (.).",
    lint_format_invalid: "El formato no cumple con la especificación de Conventional Commits (tipo[(ámbito)][!]: descripción).",

    card_structure_title: "Estructura Rápida",
    struct_body: "[cuerpo opcional]",
    struct_footer: "[footer(s) opcional(es)]",

    card_shortcuts_title: "Atajos de Teclado",
    shortcut_copy_msg: "Copiar mensaje",
    shortcut_copy_git: "Copiar comando git",
    shortcut_or: "o",

    tab_types: "Tipos de Commit",
    types_title: "Estándar Conventional Commits",
    th_type: "Tipo",
    th_desc: "Descripción",
    th_semver: "SemVer Impact",
    desc_feat: "Nueva funcionalidad o característica para el usuario final.",
    desc_fix: "Solución a un defecto o fallo detectado en la aplicación.",
    desc_docs: "Cambios exclusivamente en documentación (README, manuales, docstrings).",
    desc_refactor: "Reestructuración de código sin alterar comportamiento externo ni corregir bugs.",
    desc_perf: "Modificación que optimiza el rendimiento o velocidad de procesamiento.",
    desc_test: "Añadir o corregir pruebas unitarias, de integración o suites de test.",
    desc_build: "Cambios en dependencias externas o herramientas de compilación/bundling (npm, gradle).",
    desc_ci: "Ajustes en integración continua (GitHub Actions, Netlify, Travis, GitLab CI).",
    desc_chore: "Tareas rutinarias de mantenimiento que no afectan el código de producción.",
    desc_breaking: "Cualquier tipo con signo de exclamación ! indica un cambio disruptivo.",
    semver_none: "Ninguno",

    tab_faq: "Reglas & FAQ",
    faq_q1: "¿Por qué la regla de los 50 caracteres?",
    faq_a1: "La primera línea es el resumen de la vista compacta en herramientas como <code>git log --oneline</code>, GitHub y terminales. Mantenerla en 50 caracteres garantiza que sea legible sin truncamiento.",
    faq_q2: "¿Por qué envolver a 72 caracteres?",
    faq_a2: "Git formatea las entradas con una sangría predeterminada en los comandos de consola. Un límite de 72 caracteres evita saltos de línea irregulares en terminales estándar de 80 columnas.",
    faq_q3: "¿Por qué evitar barras invertidas (\\)?",
    faq_a3: "Las contrabarras (<code>\\</code>) pueden interpretarse como caracteres de escape en scripts de CI/CD, shells o parsers de Markdown, provocando errores inesperados en el historial.",
    faq_q4: "¿Por qué tiempo imperativo presente?",
    faq_a4: "Sigue la propia convención de Git (por ejemplo: \"Merge branch...\"). Al leer el commit se completa la frase: <em>\"Si se aplica este commit, este cambio va a [tu descripción]\"</em>.",

    tab_about: "Acerca de & Descarga",
    about_title: "Privacidad y Uso Offline",
    about_desc: "<strong>Commitlint_D'oh!</strong> es una herramienta open-source diseñada para escribir commits conformes con el estándar sin requerir configuraciones adicionales en tu entorno de desarrollo. Todo se ejecuta 100% en tu navegador de forma privada (sin enviar datos a ningún servidor externo).",
    btn_download_zip: "Descargar archivo ZIP para uso offline",
    about_benefits: "Beneficios:",
    benefit_1: "Privacidad total",
    benefit_2: "Modo Claro y Modo Oscuro",
    benefit_3: "Sin dependencias pesadas",
    benefit_4: "Agnóstico a lenguajes",
    benefit_5: "Despliegue instantáneo en Netlify",

    tab_links: "Recursos",
    reading_title: "Lecturas recomendadas",
    credits_title: "Créditos y Recursos",
    credit_regex_by: "Expresión regular de validación por",
    credit_bootstrap_by: "Estilos base con",
    credit_original_by: "Repositorio original por",

    footer_repo: "Repositorio",
    footer_spec: "Especificación"
  },

  en: {
    doc_title: "commitlint_d'oh! — Conventional Commits Editor & Pre-linter",
    nav_lint_badge: "lint commit messages",
    nav_engine: "Engine:",
    nav_conventional: "Conventional Commits",
    nav_ecosystem: "CLI & Ecosystem",
    theme_dark: "Dark Mode",
    theme_light: "Light Mode",
    theme_title_dark: "Switch to dark mode",
    theme_title_light: "Switch to light mode",
    lang_toggle_code: "ES",
    lang_toggle_title: "Cambiar a español",

    hero_title: "Conventional Commits Editor & Linter",
    hero_subtitle: "Write clear, standardized commit messages effortlessly with real-time syntax linting.",

    card_builder_title: "Build Message",
    btn_clear: "Clear",
    label_type: "Type",
    badge_required: "Required",
    badge_optional: "Optional",
    tooltip_type: "The type of change made",
    type_opt_placeholder: "<type> Select type...",
    type_opt_feat: "feat (new feature)",
    type_opt_fix: "fix (bug fix)",
    type_opt_docs: "docs (documentation)",
    type_opt_style: "style (formatting, spaces, commas)",
    type_opt_refactor: "refactor (neither fixes a bug nor adds a feature)",
    type_opt_perf: "perf (performance improvement)",
    type_opt_test: "test (adding or correcting tests)",
    type_opt_build: "build (build system or dependencies)",
    type_opt_ci: "ci (CI configuration and scripts)",
    type_opt_chore: "chore (routine maintenance)",
    type_opt_revert: "revert (revert a previous commit)",

    label_scope: "Scope",
    placeholder_scope: "e.g.: auth, api, ui",
    tooltip_scope: "Indicates the section or module of the change (no spaces)",

    label_breaking: "Breaking?",
    tooltip_breaking: "Indicates a backward-incompatible breaking change",
    breaking_opt_no: "No",
    breaking_opt_yes: "! (Yes)",

    label_subject: "Short Description (Subject)",
    placeholder_subject: "e.g.: add authentication middleware for api routes",
    tooltip_subject: "Use imperative present tense: 'add' not 'added'. Lowercase and no trailing period.",
    help_subject: "Imperative mood (\"add\" instead of \"added\"), lowercase, and no trailing period.",

    label_body: "Message Body",
    placeholder_body: "Describe the motivation for the change and contrast with previous behavior...",
    tooltip_body: "Lines automatically wrapped to 72 characters with bullet support",

    accordion_footer_title: "Quick Footer Tags (Issues & Breaking Changes)",
    footer_breaking_help: "Breaking change",
    footer_fixes_help: "Issue reference",
    footer_closes_help: "Closes issue",
    footer_deprecated_help: "Deprecated",
    footer_reviewed_help: "Reviewer",
    placeholder_footer: "Footer information (e.g.: BREAKING CHANGE: removed v1 endpoint, Closes: #104)...",
    tooltip_footer: "References to issues or breaking change details",

    preview_title: "commit-message.txt",
    status_waiting: "Waiting...",
    status_valid: "Valid format",
    status_invalid: "Not allowed / Incomplete",
    btn_copy_msg: "Copy Message",
    btn_copy_git: "git commit -m",
    btn_copied: "Copied!",
    btn_git_copied: "Command Copied!",
    btn_disabled_title: "Cannot create commit",
    copy_msg_title: "Copy generated message ({shortcut} or Alt+C)",
    copy_git_title: "Copy as git commit command ({shortcut})",
    toast_copied_msg: "Commit message copied to clipboard",
    toast_copied_git: "Git commit command copied to clipboard",
    feedback_cannot_create: "Cannot create commit",
    feedback_reasons: "reasons",
    feedback_fill_required: "complete the required fields before copying",

    lint_valid_title: "✓ Valid commit ready to use!",
    lint_valid_desc: "Format complies with Conventional Commits specification. You can copy the message or git command.",
    lint_reasons_single: "Cannot create commit for the following reason:",
    lint_reasons_plural: "Cannot create commit for the following reasons:",

    lint_type_must: "You must select a valid commit type (e.g.: feat, fix, chore, docs).",
    lint_subject_must: "You must enter a short description (subject) after the colon.",
    lint_message_length: "The first line has too many characters (maximum 50 characters recommended).",
    lint_line_len_dynamic: "The first line has {len} characters (standard recommends at most 50 characters to avoid truncation in Git).",
    lint_backslash_never: "Backslashes (\\) are not allowed in the commit message.",
    lint_scope_no_whitespace: "Scope must not contain whitespace.",
    lint_period_never: "The short description must not end with a period (.).",
    lint_format_invalid: "Format does not comply with Conventional Commits specification (type[(scope)][!]: description).",

    card_structure_title: "Quick Structure",
    struct_body: "[optional body]",
    struct_footer: "[optional footer(s)]",

    card_shortcuts_title: "Keyboard Shortcuts",
    shortcut_copy_msg: "Copy message",
    shortcut_copy_git: "Copy git command",
    shortcut_or: "or",

    tab_types: "Commit Types",
    types_title: "Conventional Commits Standard",
    th_type: "Type",
    th_desc: "Description",
    th_semver: "SemVer Impact",
    desc_feat: "New feature or capability for the end user.",
    desc_fix: "Fix for a defect or bug found in the application.",
    desc_docs: "Changes exclusively in documentation (README, guides, docstrings).",
    desc_refactor: "Code restructuring without altering external behavior or fixing bugs.",
    desc_perf: "Change that optimizes performance or processing speed.",
    desc_test: "Adding or correcting unit tests, integration tests, or test suites.",
    desc_build: "Changes to external dependencies or build/bundling tools (npm, gradle).",
    desc_ci: "Adjustments to continuous integration (GitHub Actions, Netlify, CI scripts).",
    desc_chore: "Routine maintenance tasks that do not affect production code.",
    desc_breaking: "Any type with an exclamation mark ! indicates a breaking change.",
    semver_none: "None",

    tab_faq: "Rules & FAQ",
    faq_q1: "Why the 50-character rule?",
    faq_a1: "The first line is the summary in compact views like <code>git log --oneline</code>, GitHub, and terminal logs. Keeping it at 50 characters ensures full readability without truncation.",
    faq_q2: "Why wrap lines at 72 characters?",
    faq_a2: "Git formats log entries with standard indentation in console tools. A 72-character margin prevents ragged line wraps on standard 80-column terminals.",
    faq_q3: "Why avoid backslashes (\\)?",
    faq_a3: "Backslashes (<code>\\</code>) can be interpreted as escape sequences in CI/CD scripts, shells, or Markdown parsers, leading to unexpected errors in history.",
    faq_q4: "Why imperative present tense?",
    faq_a4: "Follows Git's own convention (e.g. \"Merge branch...\"). When reading the commit, it completes: <em>\"If applied, this commit will [your description]\"</em>.",

    tab_about: "About & Download",
    about_title: "Privacy & Offline Use",
    about_desc: "<strong>Commitlint_D'oh!</strong> is an open-source tool designed to write standard-compliant commits with zero setup required in your development environment. Everything runs 100% locally in your browser (no data is sent to external servers).",
    btn_download_zip: "Download ZIP for offline use",
    about_benefits: "Benefits:",
    benefit_1: "Total privacy",
    benefit_2: "Light & Dark Modes",
    benefit_3: "No heavy dependencies",
    benefit_4: "Language agnostic",
    benefit_5: "Instant deployment on Netlify",

    tab_links: "Resources",
    reading_title: "Recommended Reading",
    credits_title: "Credits & Resources",
    credit_regex_by: "Validation regular expression by",
    credit_bootstrap_by: "Base styles with",
    credit_original_by: "Original repository by",

    footer_repo: "Repository",
    footer_spec: "Specification"
  }
};

const LANG_STORAGE_KEY = "commitlint_lang";

export function getSavedLanguage() {
  const saved = localStorage.getItem(LANG_STORAGE_KEY);
  if (saved === "es" || saved === "en") return saved;
  return "es";
}

let currentLanguage = getSavedLanguage();
const changeListeners = [];

export function getLanguage() {
  return currentLanguage;
}

export function t(key, params = {}) {
  const langDict = translations[currentLanguage] || translations.es;
  let str = langDict[key] !== undefined ? langDict[key] : (translations.es[key] || key);
  for (const [paramKey, paramVal] of Object.entries(params)) {
    str = str.replace(new RegExp(`\\{${paramKey}\\}`, "g"), paramVal);
  }
  return str;
}

export function onLanguageChange(callback) {
  if (typeof callback === "function") {
    changeListeners.push(callback);
  }
}

export function applyLanguage(lang) {
  if (lang !== "es" && lang !== "en") lang = "es";
  currentLanguage = lang;
  localStorage.setItem(LANG_STORAGE_KEY, lang);
  document.documentElement.setAttribute("lang", lang);

  // Update document title
  document.title = t("doc_title");

  // Update all text nodes marked with data-i18n
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (key) {
      el.textContent = t(key);
    }
  });

  // Update HTML nodes marked with data-i18n-html
  document.querySelectorAll("[data-i18n-html]").forEach((el) => {
    const key = el.getAttribute("data-i18n-html");
    if (key) {
      el.innerHTML = t(key);
    }
  });

  // Update placeholders marked with data-i18n-placeholder
  document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
    const key = el.getAttribute("data-i18n-placeholder");
    if (key) {
      el.setAttribute("placeholder", t(key));
    }
  });

  // Update titles/tooltips marked with data-i18n-title
  document.querySelectorAll("[data-i18n-title]").forEach((el) => {
    const key = el.getAttribute("data-i18n-title");
    if (key) {
      const translated = t(key);
      el.setAttribute("title", translated);
      if (typeof window.bootstrap !== "undefined" && window.bootstrap.Tooltip) {
        const instance = window.bootstrap.Tooltip.getInstance(el);
        if (instance) {
          instance.setContent({ '.tooltip-inner': translated });
        }
      }
    }
  });

  // Update language toggle button indicator
  const langToggleCode = document.getElementById("lang_toggle_code");
  const langToggleBtn = document.getElementById("lang_toggle_btn");
  if (langToggleCode) {
    langToggleCode.textContent = t("lang_toggle_code");
  }
  if (langToggleBtn) {
    langToggleBtn.setAttribute("title", t("lang_toggle_title"));
    langToggleBtn.setAttribute("aria-label", t("lang_toggle_title"));
  }

  // Notify listeners
  changeListeners.forEach((cb) => {
    try {
      cb(currentLanguage);
    } catch (err) {
      console.warn("Language change listener error: ", err);
    }
  });
}

export function toggleLanguage() {
  const nextLang = currentLanguage === "es" ? "en" : "es";
  applyLanguage(nextLang);
  return nextLang;
}
