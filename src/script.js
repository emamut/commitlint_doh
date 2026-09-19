// ==========================================================================
// Commitlint D'oh - Main Logic & Validation
// ==========================================================================

import * as bootstrap from 'bootstrap';
if (typeof window !== 'undefined') {
    window.bootstrap = bootstrap;
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", main);
} else {
    main();
}

function main() {

    function get_version() {
        const version = "0.0.13"; // edit after semver major.minor.patch update
        return version;
    }

    function displayVersion(div_id) {
        /**
         * Display app version number in the provided html tag id.
         * Changes the background color from red to green if this
         * javascript is running.
         */
        let element = document.getElementById(div_id);
        if (element) {
            element.innerHTML = "v" + get_version();
            if (element.classList.contains('bg-danger')) {
                element.classList.remove('bg-danger');
                element.classList.add('bg-success');
            }
        }
    }

    displayVersion("js_version");

    // Enable Bootstrap tooltips
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    [...tooltipTriggerList].forEach((tooltipTriggerEl) => {
        try {
            new bootstrap.Tooltip(tooltipTriggerEl);
        } catch (e) {
            console.warn("Tooltip init skipped: ", e);
        }
    });

    class conventional_lint {
        conventional(msg) {
            /**
             * @param {text} msg - the entire commit message to be linted
             */
            let pattern = /^(build|chore|ci|docs|feat|fix|perf|refactor|revert|style|test){1}(\([\w\-\.]+\))?(!)?: ([\w ])+([\s\S]*)/gm;
            let is_conventional_bool = pattern.test(msg);
            let copy_button = document.getElementById("copy_to_clipboard");
            let copy_git_btn = document.getElementById("copy_git_cmd");
            let commit_message_container = document.getElementById("commit_message_container");
            let commit_message_warning = document.getElementById("commit_message_warning");
            let status_badge = document.getElementById("lint_status_badge");

            if (is_conventional_bool && commit_message_warning && commit_message_warning.innerText.trim() === "") {
                if (copy_button) copy_button.removeAttribute("disabled");
                if (copy_git_btn) copy_git_btn.removeAttribute("disabled");
                if (commit_message_container) {
                    commit_message_container.setAttribute("class", "alert alert-success");
                    if (commit_message_warning) commit_message_warning.innerText = "✓ Commit format conforms to Conventional Commits";
                }
                if (status_badge) {
                    status_badge.className = "badge bg-success";
                    status_badge.innerHTML = '<i class="bi bi-check-circle me-1"></i> Valid format';
                }
            } else {
                if (copy_button) copy_button.setAttribute("disabled", "disabled");
                if (copy_git_btn) copy_git_btn.setAttribute("disabled", "disabled");
                if (commit_message_container) {
                    commit_message_container.setAttribute("class", "alert alert-warning");
                }
                if (status_badge) {
                    status_badge.className = "badge bg-warning text-dark";
                    status_badge.innerHTML = '<i class="bi bi-exclamation-circle me-1"></i> Incomplete / Warning';
                }
            }
        }

        type_must(msg) {
            if (!msg || msg.length === 0) {
                lwm.display_lint_message(lwm.type_must);
            }
        }

        subject_must(msg) {
            if (!msg || msg.length === 0) {
                lwm.display_lint_message(lwm.subject_must);
            }
        }

        commit_msg_first_line_length(msg) {
            if (msg && msg.length > 50) {
                lwm.display_lint_message(lwm.message_length);
            }
        }

        backslash_never(index_of) {
            let there_was_a_backslash = false;
            if (index_of >= 0) {
                lwm.display_lint_message(lwm.backslash_never);
                there_was_a_backslash = true;
            }
            return there_was_a_backslash;
        }

        backslash_remove(msg) {
            return msg ? msg.replace(/\\/g, "") : "";
        }

        period_never(msg) {
            const pattern = /\.$/;
            if (pattern.test(msg)) {
                lwm.display_lint_message(lwm.period_never);
            }
            return msg ? msg.replace(pattern, '') : "";
        }
    }
    const cl = new conventional_lint();

    class lint_warning_messages {
        type_must = "• Commit messages MUST be prefixed with a valid type\n";
        subject_must = "• A subject description MUST immediately follow the colon and space\n";
        message_length = "• First line (type, scope, subject) SHOULD be 50 characters or fewer\n";
        backslash_never = "• Backslashes (\\) can cause issues in git histories and should be avoided\n";
        scope_no_whitespace = "• A scope MUST NOT contain whitespace\n";
        period_never = "• A description SHOULD NOT end with a period (.)\n";

        display_lint_message(msg) {
            let commit_message_container = document.getElementById("commit_message_container");
            if (commit_message_container) {
                commit_message_container.removeAttribute("hidden");
            }
            let commit_message_warning = document.getElementById('commit_message_warning');
            if (commit_message_warning) {
                commit_message_warning.innerText += msg;
            }
        }
        clear_lint_message() {
            let commit_message_warning = document.getElementById('commit_message_warning');
            if (commit_message_warning) {
                commit_message_warning.innerText = "";
            }
        }
    }
    const lwm = new lint_warning_messages();

    // Event listeners for inputs
    const inputElements = [
        "#commit_type",
        "#commit_scope",
        "#commit_exclamation",
        "#commit_subject",
        "#commit_body",
        "#commit_footer",
        "#footer_breaking_changes",
        "#footer_fixes",
        "#footer_deprecated",
        "#footer_closes",
        "#footer_reviewed"
    ];

    inputElements.forEach((selector) => {
        const el = document.querySelector(selector);
        if (el) {
            el.addEventListener("input", update_commit_message);
            el.addEventListener("change", update_commit_message);
        }
    });

    // Copy to clipboard listener
    const copyBtn = document.getElementById("copy_to_clipboard");
    if (copyBtn) {
        copyBtn.addEventListener("click", function() {
            copyToClipboard("commit_message");
        });
    }

    // Copy as Git Command listener
    const copyGitCmd = document.getElementById("copy_git_cmd");
    if (copyGitCmd) {
        copyGitCmd.addEventListener("click", function() {
            let commitEl = document.getElementById("commit_message");
            let commitText = br2nl(commitEl ? commitEl.innerText : "");
            let lines = commitText.split('\n').filter(line => line.trim() !== '');
            let gitCmd = '';

            if (lines.length <= 1) {
                gitCmd = `git commit -m "${(lines[0] || '').replace(/"/g, '\\"')}"`;
            } else {
                let flags = lines.map(line => `-m "${line.replace(/"/g, '\\"')}"`).join(' ');
                gitCmd = `git commit ${flags}`;
            }

            copyGitCommand(gitCmd);
        });
    }

    // Storage configuration for persisting the latest registered data
    const STORAGE_KEY = "commitlint_last_data";
    const STORAGE_KEY_FALLBACK = "commitlint_form_data";
    const HISTORY_KEY = "commitlint_history";
    let isRestoring = false;

    function saveFormData(compiledMessage = "") {
        try {
            const elType = document.getElementById("commit_type");
            const elScope = document.getElementById("commit_scope");
            const elExcl = document.getElementById("commit_exclamation");
            const elSubj = document.getElementById("commit_subject");
            const elBody = document.getElementById("commit_body");
            const elFoot = document.getElementById("commit_footer");

            const type = elType ? elType.value : "";
            const scope = elScope ? elScope.value : "";
            const exclamation = elExcl ? elExcl.value : "";
            const subject = elSubj ? elSubj.value : "";
            const body = elBody ? elBody.value : "";
            const footer = elFoot ? elFoot.value : "";

            const footers = {
                footer_breaking_changes: Boolean(document.getElementById("footer_breaking_changes")?.checked),
                footer_fixes: Boolean(document.getElementById("footer_fixes")?.checked),
                footer_closes: Boolean(document.getElementById("footer_closes")?.checked),
                footer_deprecated: Boolean(document.getElementById("footer_deprecated")?.checked),
                footer_reviewed: Boolean(document.getElementById("footer_reviewed")?.checked),
            };

            const isEmpty = !type && !scope && !exclamation && !subject && !body && !footer && !Object.values(footers).some(Boolean);

            if (isEmpty) {
                localStorage.removeItem(STORAGE_KEY);
                localStorage.removeItem(STORAGE_KEY_FALLBACK);
            } else {
                const data = {
                    commit_type: type,
                    commit_scope: scope,
                    commit_exclamation: exclamation,
                    commit_subject: subject,
                    commit_body: body,
                    commit_footer: footer,
                    footers: footers,
                    message: compiledMessage || "",
                    timestamp: Date.now()
                };
                const serialized = JSON.stringify(data);
                localStorage.setItem(STORAGE_KEY, serialized);
                localStorage.setItem(STORAGE_KEY_FALLBACK, serialized);
            }
        } catch (e) {
            console.warn("No se pudo guardar los datos en localStorage: ", e);
        }
    }

    function loadFormData() {
        try {
            const raw = localStorage.getItem(STORAGE_KEY) || localStorage.getItem(STORAGE_KEY_FALLBACK);
            if (!raw) return false;

            const data = JSON.parse(raw);
            if (!data || typeof data !== "object") return false;

            const elType = document.getElementById("commit_type");
            const elScope = document.getElementById("commit_scope");
            const elExcl = document.getElementById("commit_exclamation");
            const elSubj = document.getElementById("commit_subject");
            const elBody = document.getElementById("commit_body");
            const elFoot = document.getElementById("commit_footer");

            if (elType && data.commit_type !== undefined) elType.value = data.commit_type;
            if (elScope && data.commit_scope !== undefined) elScope.value = data.commit_scope;
            if (elExcl && data.commit_exclamation !== undefined) elExcl.value = data.commit_exclamation;
            if (elSubj && data.commit_subject !== undefined) elSubj.value = data.commit_subject;
            if (elBody && data.commit_body !== undefined) elBody.value = data.commit_body;
            if (elFoot && data.commit_footer !== undefined) elFoot.value = data.commit_footer;

            if (data.footers && typeof data.footers === "object") {
                let anyChecked = false;
                for (const [id, checked] of Object.entries(data.footers)) {
                    const cb = document.getElementById(id);
                    if (cb) {
                        cb.checked = Boolean(checked);
                        if (checked) anyChecked = true;
                    }
                }
                if (anyChecked) {
                    const collapseEl = document.getElementById("collapseOne");
                    const collapseBtn = document.querySelector('button[data-bs-target="#collapseOne"]');
                    if (collapseEl) collapseEl.classList.add("show");
                    if (collapseBtn) {
                        collapseBtn.classList.remove("collapsed");
                        collapseBtn.setAttribute("aria-expanded", "true");
                    }
                }
            }
            return true;
        } catch (e) {
            console.warn("No se pudo cargar los datos desde localStorage: ", e);
            return false;
        }
    }

    function clearSavedFormData() {
        try {
            localStorage.removeItem(STORAGE_KEY);
            localStorage.removeItem(STORAGE_KEY_FALLBACK);
        } catch (e) {
            console.warn("No se pudo limpiar los datos en localStorage: ", e);
        }
    }

    function recordCommitHistory() {
        try {
            const commitEl = document.getElementById("commit_message");
            const commitMsg = commitEl ? br2nl(commitEl.innerText).trim() : "";
            if (!commitMsg || commitMsg.startsWith("feat(auth): add google sso login") || commitMsg.startsWith("your commit message will appear here")) {
                return;
            }

            const elType = document.getElementById("commit_type");
            const elScope = document.getElementById("commit_scope");
            const elExcl = document.getElementById("commit_exclamation");
            const elSubj = document.getElementById("commit_subject");
            const elBody = document.getElementById("commit_body");
            const elFoot = document.getElementById("commit_footer");

            const entry = {
                type: elType ? elType.value : "",
                scope: elScope ? elScope.value : "",
                exclamation: elExcl ? elExcl.value : "",
                subject: elSubj ? elSubj.value : "",
                body: elBody ? elBody.value : "",
                footer: elFoot ? elFoot.value : "",
                message: commitMsg,
                timestamp: Date.now()
            };

            const raw = localStorage.getItem(HISTORY_KEY);
            let history = [];
            if (raw) {
                try {
                    const parsed = JSON.parse(raw);
                    if (Array.isArray(parsed)) history = parsed;
                } catch {
                    history = [];
                }
            }

            if (history.length > 0 && history[0].message === entry.message) {
                history[0].timestamp = entry.timestamp;
            } else {
                history.unshift(entry);
                if (history.length > 20) {
                    history = history.slice(0, 20);
                }
            }

            localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
        } catch (e) {
            console.warn("No se pudo guardar en el historial: ", e);
        }
    }

    if (typeof window !== "undefined") {
        window.commitlintStorage = {
            getLastData: () => {
                try {
                    return JSON.parse(localStorage.getItem(STORAGE_KEY) || localStorage.getItem(STORAGE_KEY_FALLBACK));
                } catch { return null; }
            },
            getHistory: () => {
                try {
                    return JSON.parse(localStorage.getItem(HISTORY_KEY));
                } catch { return []; }
            },
            clear: () => {
                clearSavedFormData();
            }
        };
    }

    // Clear form button listener
    const btnClear = document.getElementById("btn_clear_form");
    if (btnClear) {
        btnClear.addEventListener("click", function() {
            const elType = document.getElementById("commit_type");
            const elScope = document.getElementById("commit_scope");
            const elExcl = document.getElementById("commit_exclamation");
            const elSubj = document.getElementById("commit_subject");
            const elBody = document.getElementById("commit_body");
            const elFoot = document.getElementById("commit_footer");
            if (elType) elType.value = "";
            if (elScope) elScope.value = "";
            if (elExcl) elExcl.value = "";
            if (elSubj) elSubj.value = "";
            if (elBody) elBody.value = "";
            if (elFoot) elFoot.value = "";

            ["footer_breaking_changes", "footer_fixes", "footer_deprecated", "footer_closes", "footer_reviewed"].forEach(id => {
                const cb = document.getElementById(id);
                if (cb) cb.checked = false;
            });

            const collapseEl = document.getElementById("collapseOne");
            const collapseBtn = document.querySelector('button[data-bs-target="#collapseOne"]');
            if (collapseEl) collapseEl.classList.remove("show");
            if (collapseBtn) {
                collapseBtn.classList.add("collapsed");
                collapseBtn.setAttribute("aria-expanded", "false");
            }

            clearSavedFormData();
            update_commit_message();
        });
    }

    // MutationObserver to trigger lint check whenever wip message changes
    let wip_msg_observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            cl.conventional(mutation.target.innerHTML);
        });
    });

    let observerConfig = {
        attributes: true,
        childList: true,
        characterData: true
    };
    let targetNode = document.getElementById("wip_message_to_be_linted");
    if (targetNode) {
        wip_msg_observer.observe(targetNode, observerConfig);
    }

    function update_commit_message() {
        let commit_type = document.getElementById("commit_type") ? document.getElementById("commit_type").value : "";
        let commit_exclamation = document.getElementById("commit_exclamation") ? document.getElementById("commit_exclamation").value : "";
        let commit_scope = document.getElementById("commit_scope") ? document.getElementById("commit_scope").value.trim() : "";
        let commit_subject = document.getElementById("commit_subject") ? document.getElementById("commit_subject").value : "";
        let commit_body = document.getElementById("commit_body") ? document.getElementById("commit_body").value : "";
        let commit_footer = document.getElementById("commit_footer") ? document.getElementById("commit_footer").value : "";

        let footer_breaking_cb = document.getElementById("footer_breaking_changes");
        if (commit_exclamation === "!") {
            if (footer_breaking_cb) footer_breaking_cb.checked = true;
        }

        let footer_breaking_changes = footer_breaking_cb ? footer_breaking_cb.checked : false;
        let footer_fixes = document.getElementById("footer_fixes") ? document.getElementById("footer_fixes").checked : false;
        let footer_deprecated = document.getElementById("footer_deprecated") ? document.getElementById("footer_deprecated").checked : false;
        let footer_closes = document.getElementById("footer_closes") ? document.getElementById("footer_closes").checked : false;
        let footer_reviewed = document.getElementById("footer_reviewed") ? document.getElementById("footer_reviewed").checked : false;

        lwm.clear_lint_message();
        cl.type_must(commit_type);

        if (commit_scope !== "") {
            commit_scope = "(" + commit_scope + ")";
        }

        if (hasWhiteSpace(commit_scope)) {
            lwm.display_lint_message(lwm.scope_no_whitespace);
        }

        cl.subject_must(commit_subject);
        commit_subject = cl.period_never(commit_subject);

        let msg_first_line_to_be_linted = commit_type +
            commit_scope +
            commit_exclamation +
            ": " +
            commit_subject;

        cl.commit_msg_first_line_length(msg_first_line_to_be_linted);

        // Update live first line counter badge
        let firstLineCounter = document.getElementById("first_line_counter");
        if (firstLineCounter) {
            let lineLen = msg_first_line_to_be_linted.trim() === ":" ? 0 : msg_first_line_to_be_linted.length;
            firstLineCounter.innerText = `${lineLen} / 50`;
            if (lineLen === 0) {
                firstLineCounter.className = "badge bg-secondary";
            } else if (lineLen <= 50) {
                firstLineCounter.className = "badge bg-success";
            } else if (lineLen <= 72) {
                firstLineCounter.className = "badge bg-warning text-dark";
            } else {
                firstLineCounter.className = "badge bg-danger";
            }
        }

        let message_to_be_linted = "";
        if (cl.backslash_never(msg_first_line_to_be_linted.indexOf("\\"))) {
            message_to_be_linted = cl.backslash_remove(msg_first_line_to_be_linted);
        } else {
            message_to_be_linted = msg_first_line_to_be_linted;
        }

        if (cl.backslash_never(commit_body.indexOf("\\"))) {
            commit_body = cl.backslash_remove(commit_body);
        }
        if (cl.backslash_never(commit_footer.indexOf("\\"))) {
            commit_footer = cl.backslash_remove(commit_footer);
        }

        if (commit_body !== "") {
            let number_of_characters = 70;
            const wrapped = wrapText(commit_body, number_of_characters);
            commit_body = addHangingIndent(wrapped);
            message_to_be_linted += "\n\n" + commit_body;
        }

        // Handle footers
        let footer_breaking_changes_lbl = document.querySelector('label[for="footer_breaking_changes"]');
        let footer_fixes_lbl = document.querySelector('label[for="footer_fixes"]');
        let footer_deprecated_lbl = document.querySelector('label[for="footer_deprecated"]');
        let footer_closes_lbl = document.querySelector('label[for="footer_closes"]');
        let footer_reviewed_lbl = document.querySelector('label[for="footer_reviewed"]');

        if (footer_breaking_changes_lbl) commit_footer = footer_toggle(footer_breaking_changes, footer_breaking_changes_lbl, commit_footer);
        if (footer_fixes_lbl) commit_footer = footer_toggle(footer_fixes, footer_fixes_lbl, commit_footer);
        if (footer_deprecated_lbl) commit_footer = footer_toggle(footer_deprecated, footer_deprecated_lbl, commit_footer);
        if (footer_closes_lbl) commit_footer = footer_toggle(footer_closes, footer_closes_lbl, commit_footer);
        if (footer_reviewed_lbl) commit_footer = footer_toggle(footer_reviewed, footer_reviewed_lbl, commit_footer);

        if (commit_footer !== "") {
            let number_of_characters = 72;
            commit_footer = wrapText(commit_footer, number_of_characters);
            message_to_be_linted += "\n\n" + commit_footer;
        }

        // Store message values in the DOM
        let lint_this_message = document.getElementById('wip_message_to_be_linted');
        if (lint_this_message) {
            lint_this_message.innerText = message_to_be_linted;
        }

        let approved_commit_message = document.getElementById('commit_message');
        if (approved_commit_message) {
            if (!commit_type && !commit_subject) {
                approved_commit_message.innerText = "feat(auth): add google sso login\n\nImplement OAuth 2.0 authentication flow with Google identity provider.\n\nCloses: #42";
                approved_commit_message.style.opacity = "0.5";
            } else {
                approved_commit_message.innerText = message_to_be_linted;
                approved_commit_message.style.opacity = "1";
            }
        }

        // Validate immediately to update status badges & buttons synchronously
        cl.conventional(message_to_be_linted);

        if (!isRestoring) {
            saveFormData(message_to_be_linted);
        }

    } // end function update_commit_message

    // Platform & Keyboard Shortcuts Configuration
    const isMac = typeof navigator !== "undefined" && (/Mac|iPod|iPhone|iPad/.test(navigator.platform || "") || /Macintosh|Mac OS X/.test(navigator.userAgent || ""));
    const shortcutLabel = isMac ? "⌘↵" : "Ctrl+↵";
    const gitShortcutLabel = isMac ? "⌘⇧↵" : "Ctrl+⇧+↵";

    function updateShortcutBadges() {
        const copyBadge = document.getElementById("copy_shortcut_kbd");
        if (copyBadge) copyBadge.textContent = shortcutLabel;

        const gitBadge = document.getElementById("git_shortcut_kbd");
        if (gitBadge) gitBadge.textContent = gitShortcutLabel;

        document.querySelectorAll(".shortcut-primary").forEach(el => el.textContent = shortcutLabel);
        document.querySelectorAll(".shortcut-git").forEach(el => el.textContent = gitShortcutLabel);
        document.querySelectorAll(".shortcut-alt").forEach(el => el.textContent = isMac ? "⌥C" : "Alt+C");
    }

    function showToast(message, type = "success") {
        const toastEl = document.getElementById("copy_toast");
        const toastBody = document.getElementById("copy_toast_body");
        if (!toastEl || typeof bootstrap === "undefined" || !bootstrap.Toast) return;

        if (toastBody) {
            const iconClass = type === "success" ? "bi-check2-circle text-success" : "bi-exclamation-triangle text-warning";
            toastBody.innerHTML = `<i class="bi ${iconClass} fs-5"></i> <span>${message}</span>`;
        }

        const toastInstance = bootstrap.Toast.getOrCreateInstance(toastEl, { delay: 2200 });
        toastInstance.show();
    }

    function triggerIncompleteFeedback() {
        const copyBtnEl = document.getElementById("copy_to_clipboard");
        const warningBox = document.getElementById("commit_message_container");
        const target = (copyBtnEl && (copyBtnEl.disabled || copyBtnEl.hasAttribute("disabled"))) ? copyBtnEl : warningBox;
        if (target) {
            target.classList.remove("shake-element");
            void target.offsetWidth; // Force reflow
            target.classList.add("shake-element");
            setTimeout(() => target.classList.remove("shake-element"), 400);
        }
        showToast("Completa los campos requeridos antes de copiar", "warning");
    }

    function copyStringToClipboard(str, buttonEl, defaultHtml, successHtml, toastMsg) {
        function showFeedback() {
            if (buttonEl) {
                buttonEl.innerHTML = successHtml;
                buttonEl.classList.add("btn-success");
                setTimeout(() => {
                    buttonEl.innerHTML = defaultHtml;
                    buttonEl.classList.remove("btn-success");
                }, 2000);
            }
            if (toastMsg) {
                showToast(toastMsg, "success");
            }
            recordCommitHistory();
        }

        if (navigator.clipboard && window.isSecureContext) {
            navigator.clipboard.writeText(str)
                .then(showFeedback)
                .catch(() => fallbackCopy(str, showFeedback));
        } else {
            fallbackCopy(str, showFeedback);
        }
    }

    function copyToClipboard(div_id) {
        let copyText = document.getElementById(div_id);
        let copyBtn = document.getElementById("copy_to_clipboard");
        let copyText_with_newlines = copyText ? br2nl(copyText.innerText) : "";
        const defaultHtml = `<i class="bi bi-clipboard"></i> <span>Copiar Mensaje</span> <kbd class="badge bg-white text-dark bg-opacity-25 ms-1 small kbd-shortcut" id="copy_shortcut_kbd">${shortcutLabel}</kbd>`;
        const successHtml = `<i class="bi bi-check2-circle"></i> <span>¡Copiado!</span>`;

        copyStringToClipboard(
            copyText_with_newlines,
            copyBtn,
            defaultHtml,
            successHtml,
            "Mensaje de commit copiado al portapapeles"
        );
    }

    function copyGitCommand(gitCmd) {
        let copyGitBtn = document.getElementById("copy_git_cmd");
        const defaultGitHtml = `<i class="bi bi-terminal"></i> <span>git commit -m</span> <kbd class="badge bg-white text-white bg-opacity-25 ms-1 small kbd-shortcut" id="git_shortcut_kbd">${gitShortcutLabel}</kbd>`;
        const successGitHtml = `<i class="bi bi-check2-circle"></i> <span>¡Comando Copiado!</span>`;

        copyStringToClipboard(
            gitCmd,
            copyGitBtn,
            defaultGitHtml,
            successGitHtml,
            "Comando git commit copiado al portapapeles"
        );
    }

    function initKeyboardShortcuts() {
        updateShortcutBadges();

        document.addEventListener("keydown", function(e) {
            const isCmdOrCtrl = e.metaKey || e.ctrlKey;
            const isEnter = e.key === "Enter" || e.keyCode === 13;
            const isAltC = e.altKey && (e.key === "c" || e.key === "C" || e.keyCode === 67);

            if (isCmdOrCtrl && isEnter) {
                e.preventDefault();
                if (e.shiftKey) {
                    // Ctrl/Cmd + Shift + Enter -> Copy git command
                    const copyGitBtn = document.getElementById("copy_git_cmd");
                    if (copyGitBtn && !copyGitBtn.disabled && !copyGitBtn.hasAttribute("disabled")) {
                        copyGitBtn.click();
                    } else {
                        triggerIncompleteFeedback();
                    }
                } else {
                    // Ctrl/Cmd + Enter -> Copy commit message
                    const copyBtnEl = document.getElementById("copy_to_clipboard");
                    if (copyBtnEl && !copyBtnEl.disabled && !copyBtnEl.hasAttribute("disabled")) {
                        copyBtnEl.click();
                    } else {
                        triggerIncompleteFeedback();
                    }
                }
            } else if (isAltC && !e.ctrlKey && !e.metaKey) {
                // Alt + C -> Copy commit message
                e.preventDefault();
                const copyBtnEl = document.getElementById("copy_to_clipboard");
                if (copyBtnEl && !copyBtnEl.disabled && !copyBtnEl.hasAttribute("disabled")) {
                    copyBtnEl.click();
                } else {
                    triggerIncompleteFeedback();
                }
            }
        });
    }

    function fallbackCopy(text, callback) {
        const textArea = document.createElement("textarea");
        textArea.value = text;
        textArea.style.position = "fixed";
        textArea.style.left = "-999999px";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        try {
            document.execCommand('copy');
            if (callback) callback();
        } catch (err) {
            console.error('Fallback copy failed: ', err);
        }
        document.body.removeChild(textArea);
    }

    function br2nl(str) {
        return str ? str.replace(/<\s*\/?br\s*[\/]?>/gi, "\n") : "";
    }

    function hasWhiteSpace(s) {
        return s.indexOf(' ') >= 0;
    }

    function wrapText(text, maxLineLength) {
        if (!text) return "";
        const lines = [];
        const segments = text.split('\n');
        segments.forEach((segment) => {
            if (segment.length <= maxLineLength) {
                lines.push(segment);
            } else {
                for (let start = 0; start < segment.length; start += maxLineLength) {
                    lines.push(segment.substring(start, start + maxLineLength));
                }
            }
        });
        return lines.join('\n');
    }

    function deleteValue(textAreaObj, textToFind) {
        if (!textAreaObj) return "";
        let pattern = new RegExp(textToFind, "g");
        textAreaObj.value = textAreaObj.value.replace(pattern, "");
        return textAreaObj.value;
    }

    function footer_toggle(selected_bool, input_label, commit_footer) {
        let footerTextarea = document.getElementById("commit_footer");
        if (!footerTextarea || !input_label) return commit_footer;

        if (selected_bool === true) {
            let string = input_label.innerText;
            let pattern = new RegExp(string, "g");
            let text = footerTextarea.value;
            let is_text_in_footer = pattern.test(text);
            if (!is_text_in_footer) {
                footerTextarea.value = input_label.innerText + (commit_footer ? " " + commit_footer : "");
                commit_footer = footerTextarea.value;
            } else {
                footerTextarea.value = commit_footer;
            }
        } else {
            commit_footer = deleteValue(footerTextarea, input_label.innerText);
        }
        return commit_footer;
    }

    function add_current_version_zip_file_link_to_button(semver) {
        let version = "v" + semver;
        let filename = "commitlint_d-oh-" + version + ".zip";
        let link_to_zip_file = "https://commitlint.online/" + filename;
        let zip_file_button = document.getElementById("zip_file_button");
        if (zip_file_button) {
            zip_file_button.setAttribute("href", link_to_zip_file);
        }
    }

    function addHangingIndent(text) {
        const indentSize = 2;
        const indent = ' '.repeat(indentSize);
        const lines = text.split('\n');
        const result = [];
        let isIndented = false;

        for (let i = 0; i < lines.length; i++) {
            const line = lines[i];
            if (line.trim().startsWith('- ')) {
                isIndented = true;
                result.push(line);
            } else if (isIndented && line.trim() !== '') {
                result.push(indent + line);
            } else {
                isIndented = false;
                result.push(line);
            }
        }
        return result.join('\n');
    }

    function initThemeToggle() {
        const themeBtn = document.getElementById("theme_toggle_btn");
        const themeIcon = document.getElementById("theme_toggle_icon");
        const themeText = document.getElementById("theme_toggle_text");

        function getPreferredTheme() {
            const stored = localStorage.getItem("commitlint_theme");
            if (stored) return stored;
            return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
        }

        function applyTheme(theme) {
            document.documentElement.setAttribute("data-bs-theme", theme);
            localStorage.setItem("commitlint_theme", theme);
            if (themeIcon) {
                if (theme === "dark") {
                    themeIcon.className = "bi bi-sun-fill text-warning";
                    if (themeText) themeText.innerText = "Modo Claro";
                    if (themeBtn) themeBtn.setAttribute("title", "Cambiar a modo claro");
                } else {
                    themeIcon.className = "bi bi-moon-stars-fill text-light";
                    if (themeText) themeText.innerText = "Modo Oscuro";
                    if (themeBtn) themeBtn.setAttribute("title", "Cambiar a modo oscuro");
                }
            }
        }

        const currentTheme = document.documentElement.getAttribute("data-bs-theme") || getPreferredTheme();
        applyTheme(currentTheme);

        if (themeBtn) {
            themeBtn.addEventListener("click", () => {
                const activeTheme = document.documentElement.getAttribute("data-bs-theme") === "dark" ? "light" : "dark";
                applyTheme(activeTheme);
            });
        }

        if (window.matchMedia) {
            window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e) => {
                if (!localStorage.getItem("commitlint_theme")) {
                    applyTheme(e.matches ? "dark" : "light");
                }
            });
        }
    }

    initThemeToggle();
    initKeyboardShortcuts();

    add_current_version_zip_file_link_to_button(get_version());

    // Restore last registered data from localStorage
    isRestoring = true;
    loadFormData();
    isRestoring = false;

    // Trigger initial run to set placeholder state or validate restored data
    update_commit_message();

} // end function main()