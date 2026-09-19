// ==========================================================================
// Commitlint D'oh - Main Logic & Validation
// ==========================================================================

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

            copyStringToClipboard(gitCmd, copyGitCmd, '<i class="bi bi-terminal me-1"></i> Copy git command', '<i class="bi bi-check2-circle me-1"></i> Command Copied!');
        });
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

    } // end function update_commit_message

    function copyStringToClipboard(str, buttonEl, defaultHtml, successHtml) {
        function showFeedback() {
            if (buttonEl) {
                buttonEl.innerHTML = successHtml;
                buttonEl.classList.add("btn-success");
                setTimeout(() => {
                    buttonEl.innerHTML = defaultHtml;
                    buttonEl.classList.remove("btn-success");
                }, 2000);
            }
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
        copyStringToClipboard(
            copyText_with_newlines,
            copyBtn,
            '<i class="bi bi-clipboard me-1"></i> Copy to Clipboard',
            '<i class="bi bi-check2-circle me-1"></i> Copied to Clipboard!'
        );
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

    add_current_version_zip_file_link_to_button(get_version());

    // Trigger initial run to set placeholder state
    update_commit_message();

} // end function main()