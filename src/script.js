document.addEventListener("DOMContentLoaded", main());
//

function main() {

    //
    function get_version() {
        const version = "0.0.13"; // edit  after semver major.minor.patch update
        return version;
    }

    function displayVersion(div_id) {
        /**
         * Display app version number in the provided html tag id.
         * Changes the background color from red to green if this
         * javascript is running.
         *
         * param{string} div_id
         * side-effect:
         * changes innerHTML of the provided tag ID
         */
        let element = document.getElementById(div_id)
        element.innerHTML = "v" + get_version();
        // Check if the element exists and has the class
        if (element && element.classList.contains('bg-danger')) {
            // Remove the 'bg-danger' class and add 'bg-success'
            element.classList.remove('bg-danger');
            element.classList.add('bg-success');
        }
    }

    displayVersion("js_version");

    //

    // Reference:
    // https://getbootstrap.com/docs/5.3/components/tooltips/#enable-tooltips
    const tooltipTriggerList =
        document.querySelectorAll('[data-bs-toggle="tooltip"]');
    const tooltipList = [...tooltipTriggerList].map((tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl));

    //
    class conventional_lint {
        conventional(msg) {
            /**
             * @param {text} msg - the entire commit message to be linted
             * @return nothing
             *
             * Side effects:
             *     The copy_button enabled/disabled.
             *     Changes commit_message_container class from alert-success to alert-warning.
             *     Regular expression only checks the first line, so the commit_message_warning
             *     is checked to confirm success.
             */
            console.log("linting conventional: ", msg);
            // reference:
            //     https://gist.github.com/marcojahn/482410b728c31b221b70ea6d2c433f0c
            let pattern = /^(build|chore|ci|docs|feat|fix|perf|refactor|revert|style|test){1}(\([\w\-\.]+\))?(!)?: ([\w ])+([\s\S]*)/gm;
            let is_conventional_bool = pattern.test(msg);
            console.log("is_conventional_bool: ", is_conventional_bool);
            let copy_button = document.getElementById("copy_to_clipboard");
            let commit_message_container = document.getElementById("commit_message_container");
            let commit_message_warning = document.getElementById("commit_message_warning");
            if (is_conventional_bool && commit_message_warning.innerText == "") {
                copy_button.removeAttribute("disabled");
                commit_message_container.setAttribute("class", "alert alert-success");
            } else {
                copy_button.setAttribute("disabled", "disabled");
                commit_message_container.setAttribute("class", "alert alert-warning");

            }

        }

        type_must(msg) {
            if (msg.length == 0) {
                lwm.display_lint_message(lwm.type_must);
            }
        }

        subject_must(msg) {
            if (msg.length == 0) {
                lwm.display_lint_message(lwm.subject_must);
            }
        }

        commit_msg_first_line_length(msg) {
            if (msg.length > 50) {
                lwm.display_lint_message(lwm.message_length);
            }
        }

        backslash_never(index_of) {
            /**
             * Log a backslash warning message
             *
             * @param {number} index_of - where the backslash occured in the text
             * @return {boolean}
             */
            let there_was_a_backslash = false;
            if (index_of >= 0) {
                lwm.display_lint_message(lwm.backslash_never);
                console.log(lwm.backslash_never);
                there_was_a_backslash = true;
            }
            return there_was_a_backslash;
        }

        backslash_remove(msg) {
            let escape_replaced = msg.replace(/\\/g, "");
            console.log("user input backslashes unceremoniously removed: ", escape_replaced);
            return escape_replaced;
        }

        period_never(msg) {
            /**
             * Remove period "." at the end of text
             * @parm {text} msg
             * @return {text}

             * displays a warning message
             */
            const pattern = /\.$/;
            if (pattern.test(msg)) {
                lwm.display_lint_message(lwm.period_never);
            }
            return msg.replace(pattern, '');
        }

    }
    const cl = new conventional_lint();

    //

    class lint_warning_messages {
        // usage:
        //  lwm.display_lint_message(lwm.type_must)
        type_must = "Commit messages MUST be prefixed with a type \n";
        subject_must = "A subject description MUST immediately follow the colon and space\n";
        message_length = "Type, scope, and subject description SHOULD be less than 50 characters\n";
        backslash_never = "Backslashes in conventional commit messages can cause rendering issues\n";
        /*, as they may be misinterpreted by some systems, leading to unexpected
          characters appearing. It's generally advisable to avoid using them to
          ensure clarity and consistency in your commit history.
          (duck.ai search assist)"
        */
        scope_no_whitespace = "A scope MUST consist of a noun ... no extra whitespace\n";
        period_never = "A description SHOULD never have a period at the end";

        display_lint_message(msg) {
            let commit_message_container = document.getElementById("commit_message_container");
            commit_message_container.removeAttribute("hidden");
            let commit_message_warning = document.getElementById('commit_message_warning');
            commit_message_warning.innerText += msg;
        }
        clear_lint_message() {
            let commit_message_warning = document.getElementById('commit_message_warning');
            commit_message_warning.innerText = ""; // no message
        }
    }
    const lwm = new lint_warning_messages();

    //

    document.querySelector("#commit_type").addEventListener("change", update_commit_message);
    document.querySelector("#commit_scope").addEventListener("input", update_commit_message);
    document.querySelector("#commit_exclamation").addEventListener("input", update_commit_message);
    document.querySelector("#commit_subject").addEventListener("input", update_commit_message);
    document.querySelector("#commit_body").addEventListener("input", update_commit_message);
    document.querySelector("#commit_footer").addEventListener("input", update_commit_message);

    document.querySelector("#footer_breaking_changes").addEventListener("input", update_commit_message);
    document.querySelector("#footer_fixes").addEventListener("input", update_commit_message);
    document.querySelector("#footer_deprecated").addEventListener("input", update_commit_message);
    document.querySelector("#footer_closes").addEventListener("input", update_commit_message);
    document.querySelector("#footer_reviewed").addEventListener("input", update_commit_message);

    document.getElementById("copy_to_clipboard").addEventListener("click", function() {
        copyToClipboard("commit_message");
    });


    //-----------------------------
    // Reference:
    //   https://stackoverflow.com/questions/37452164/call-function-on-change-of-value-inside-p-tag
    //   https://hacks.mozilla.org/2012/05/dom-mutationobserver-reacting-to-dom-changes-without-killing-browser-performance/
    let wip_msg_observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            //console.dir(mutation)
            //console.log(mutation.type)
            //console.log("mutation.target.innerText",mutation.target.innerText)
            //cl.conventional(mutation.target.innerText);
            cl.conventional(mutation.target.innerHTML);
        });
    });
    let observerConfig = {
        attributes: true,
        childList: true, // like innner html, and inner text
        characterData: true
    };
    let targetNode = document.getElementById("wip_message_to_be_linted");
    console.log("Observing targetNode:", targetNode);
    wip_msg_observer.observe(targetNode, observerConfig);
    //------------------------------


    //


    function update_commit_message() {

        let commit_type = document.getElementById("commit_type").value;
        let commit_exclamation = document.getElementById("commit_exclamation").value;
        let commit_scope = document.getElementById("commit_scope").value;
        let commit_subject = document.getElementById("commit_subject").value;
        let commit_body = document.getElementById("commit_body").value;


        if (commit_exclamation == "!") {
            // it is a breaking change, check the box
            document.getElementById("footer_breaking_changes").checked = true;
        } else {
            // uncheck
            document.getElementById("footer_breaking_changes").checked = false;
        }

        let commit_footer = document.getElementById("commit_footer").value;
        let footer_breaking_changes = document.getElementById("footer_breaking_changes").checked;
        let footer_fixes = document.getElementById("footer_fixes").checked;
        let footer_deprecated = document.getElementById("footer_deprecated").checked;
        let footer_closes = document.getElementById("footer_closes").checked;
        let footer_reviewed = document.getElementById("footer_reviewed").checked;

        lwm.clear_lint_message();
        cl.type_must(commit_type);


        if (commit_scope != "") {
            // scope is optional
            // parenthesis are mandatory with scope
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

        let message_to_be_linted = "";
        // escape characater '\' can cause errors with other tools
        // in this script \n means new line
        // remove user input backslashes!
        if (cl.backslash_never(msg_first_line_to_be_linted.indexOf("\\"))) {
            message_to_be_linted = cl.backslash_remove(msg_first_line_to_be_linted);
        } else { // no backslashes found
            message_to_be_linted = msg_first_line_to_be_linted;
        }
        if (cl.backslash_never(commit_body.indexOf("\\"))) {
            commit_body = cl.backslash_remove(commit_body);
        }
        if (cl.backslash_never(commit_footer.indexOf("\\"))) {
            commit_footer = cl.backslash_remove(commit_footer);
        }
        //



        if (commit_body != "") {

            // Suggest 70 because with a two character hanging indent,
            // wrap will be at 72 characters.
            let number_of_characters = 70
            const wrapped = wrapText(commit_body, number_of_characters);
            commit_body = wrapped;
            const hang_indented = addHangingIndent(commit_body);
            commit_body = hang_indented;

            //The body MUST begin one blank line after the description.
            message_to_be_linted += "\n\n" + commit_body;
        } else {}

        // ---start footer
        let footer_breaking_changes_lbl = document.querySelector('label[for="footer_breaking_changes"]');
        let footer_fixes_lbl = document.querySelector('label[for="footer_fixes"]');
        let footer_deprecated_lbl = document.querySelector('label[for="footer_deprecated"]');
        let footer_closes_lbl = document.querySelector('label[for="footer_closes"]');
        let footer_reviewed_lbl = document.querySelector('label[for="footer_reviewed"]');
        commit_footer = footer_toggle(footer_breaking_changes, footer_breaking_changes_lbl, commit_footer);
        commit_footer = footer_toggle(footer_fixes, footer_fixes_lbl, commit_footer);
        commit_footer = footer_toggle(footer_deprecated, footer_deprecated_lbl, commit_footer);
        commit_footer = footer_toggle(footer_closes, footer_closes_lbl, commit_footer);
        commit_footer = footer_toggle(footer_reviewed, footer_reviewed_lbl, commit_footer);

        console.log("after footer_toggle commit_footer:", commit_footer);

        if (commit_footer != "") {
            let number_of_characters = 72
            const wrapped = wrapText(commit_footer, number_of_characters);
            commit_footer = wrapped;

            // footers MAY be provided one blank line after the body
            message_to_be_linted += "\n\n" + commit_footer;
        }
        // --- end footer

        console.log("in function update_commit_message, message_to_be_linted:");
        console.log(message_to_be_linted);

        // store message values in the dom
        let lint_this_message = document.getElementById('wip_message_to_be_linted');
        lint_this_message.innerText = message_to_be_linted;


        let approved_commit_message = document.getElementById('commit_message');
        approved_commit_message.innerText = message_to_be_linted;

    } //end function update_commit_message

    //

    function copyToClipboard(div_id) {
        // Input div_id: name without the # symbol
        // Output: nothing
        // Side effect: Text copied to clipboard with newlines
        console.log("div_id:", div_id);
        let copyText = document.getElementById(div_id);
        let copyText_with_newlines = br2nl(copyText.innerHTML);
        try {
            navigator.clipboard.writeText(copyText_with_newlines);
            console.log("Copied to clipboard");
        } catch (err) {
            console.error("copyToClipboard error: ", err.name, err.message);
        }
    }


    function br2nl(str) {
        // Convert break </br> to newline
        // Input str: text string including <br>, or </br> or <br/>
        // Output: string with \n in place of </br> symbol
        // Credit:
        //   https://stackoverflow.com/questions/8062399/how-to-replace-an-html-br-with-newline-character-n
        return str.replace(/<\s*\/?br\s*[\/]?>/gi, "\n");
    }

    function hasWhiteSpace(s) {
        return s.indexOf(' ') >= 0;
    }

    //


    function wrapText(text, maxLineLength) {
        /**
         * param{string} text
         * param{integer} maxLineLength
         * return{array} lines
         *
         * credit: Microsot Copilot Think Deeper
         */
        const lines = [];

        // Split the text into segments at each newline
        const segments = text.split('\n');
        console.log("in function wrapText segments.length:", segments.length);
        console.log("in function wrapText segments:", segments);
        segments.forEach((segment) => {
            // Wrap each segment at maxLineLength
            for (let start = 0; start < segment.length; start += maxLineLength) {
                lines.push(segment.substring(start, start + maxLineLength));
            }

            // Preserve the blank line if the segment was terminated by '\n'
            // (segments.length >= 1 ensures we don't add an extra newline at end)
            //if (segments.length >= 1) {
            //   lines.push(' ');
            //}
        });

        // Remove the last added blank line if the original text didn't end with '\n'
        //if (!text.endsWith('\n')) {
        //  lines.pop();
        //}
        console.log("in function wrapText lines:", lines);

        return lines.join('\n');
    }


    //

    function deleteValue(textAreaObj, textToFind) {
        /**
         * @param {object} textAreaObj - like document.getElementById("divID")
         * @parm  {string} textToFind
         * @return{empty string} textAreaObj.value
         * Reference:
         *     https://stackoverflow.com/questions/17483329/remove-certain-text-from-textarea-in-javascript
         **/
        let pattern = RegExp(textToFind, "g");
        textAreaObj.value = textAreaObj.value.replace(pattern, "");
        return textAreaObj.value;
    }

    //
    function footer_toggle(selected_bool, input_label, commit_footer) {
        /**
         * Toggle footer text based on footer option check boxes.
         * Adds the text when checked, and removes text when unchecked
         *
         * @param {boolean} selected_bool - whether the checkbox is selected or not
         * @param {htmlObject} input_label - for example
         *               document.querySelector('label[for="footer_breaking_changes"]')
         * @param {string} commit_footer - concatenated string to be added to the footer
         * @return {string} commit_footer - concatenated string to be added to the footer
         *
         * Usage:
         *    commit_footer = footer_toggle(footer_breaking_changes, footer_breaking_changes_lbl, commit_footer)
         * */
        if (selected_bool == true) {
            // check for label text that may already be in the footer textarea
            let string = input_label.innerText;
            let pattern = new RegExp(string, "g");
            let text = document.getElementById("commit_footer").value;
            let is_text_in_footer = pattern.test(text);
            console.log("pattern:", pattern);
            console.log("is_text_in_footer: ", is_text_in_footer);
            if (is_text_in_footer != true) { // only add label value once if it is not already there
                console.log("only add label value once if it is not already there");
                document.getElementById("commit_footer").value = input_label.innerText + commit_footer;
                commit_footer = document.getElementById("commit_footer").value;
            } else {
                document.getElementById("commit_footer").value = commit_footer;
            }
        } else { // remove the 'XXXXXXXX:' text from both the html element and javascript variable
            commit_footer = deleteValue(document.getElementById("commit_footer"), input_label.innerText);

        }

        return commit_footer;
    } // end function footer_toggle

    //

    function add_current_version_zip_file_link_to_button(semver) {
        /**
         * Output the link to the zip file of this project into
         * a button link.
         * Match the input version.
         *
         * param{string} semver - version text

         */
        let version = "v" + semver
        let filename = "commitlint_d-oh-" + version + ".zip"
        let link_to_zip_file = "https://commitlint.online/" + filename
        console.log("In function add_current_version_zip_file_link_to_button: ")
        console.log("  link_to_zip_file: ", link_to_zip_file)
        let zip_file_button = document.getElementById("zip_file_button")
        zip_file_button.setAttribute("href", link_to_zip_file);
    } // end function add_current_version_zip_file_link_to_button

    //

    function addHangingIndent(text) {
        /**
         * Credit: Google Gemini
         * search term: javascript add hanging indents in text after dash NOT html
         */
        // Define the indent size
        const indentSize = 2;
        const indent = ' '.repeat(indentSize);

        // Split the text into lines
        const lines = text.split('\n');
        const result = [];
        let isIndented = false;

        for (let i = 0; i < lines.length; i++) {
            const line = lines[i];

            // Check for a line starting with a dash followed by a space
            if (line.trim().startsWith('- ')) {
                isIndented = true;
                result.push(line);
            } else if (isIndented && line.trim() !== '') {
                // Indent subsequent lines of a bullet point
                result.push(indent + line);
            } else {
                isIndented = false;
                result.push(line);
            }
        }

        return result.join('\n');
    }

    //

    add_current_version_zip_file_link_to_button(get_version())

} //end function main()



/* Reference:
    Commit length
      https://tbaggery.com/2008/04/19/a-note-about-git-commit-messages.html
    Regex
      https://gist.github.com/marcojahn/482410b728c31b221b70ea6d2c433f0c
      https://dev.to/mbarzeev/a-git-hook-for-commit-messages-validation-no-husky-just-js-1hni
      https://regex101.com/library/JCoEea
      https://regex101.com/r/08wK46/1

    Capitalize first character
      https://stackoverflow.com/questions/1026069/how-do-i-make-the-first-letter-of-a-string-uppercase-in-javascript
*/