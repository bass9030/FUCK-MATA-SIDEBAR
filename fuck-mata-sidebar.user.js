// ==UserScript==
// @name         FUCK-MATA-SIDEBAR
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Return sidebar to previous version(Hide sidebar under 1280px)
// @author       bass9030
// @match        *://ai.matamath.net/*
// @run-at       document-end
// ==/UserScript==

(() => {
    "use strict";
    function hideSidebar() {
        /**
         * @type {HTMLDivElement}
         */
        const SIDEBAR = document.querySelector("div.css-bdev3j");
        if (window.innerWidth < 1280) {
            SIDEBAR.style.display = "none";
        } else {
            SIDEBAR.style.display = "";
        }
    }

    let attamp = 0;
    function pageUpdated() {
        function tryToHide() {
            if (attamp > 10) {
                console.log("hide fail");
                return;
            }
            try {
                hideSidebar();
            } catch {
                attamp++;
                setTimeout(tryToHide, 500);
            }
        }

        window.addEventListener("resize", hideSidebar);
        tryToHide();
    }

    const { pushState, replaceState } = window.history;

    window.history.pushState = function (...args) {
        pushState.apply(window.history, args);
        window.dispatchEvent(new Event("pushState"));
    };

    window.history.replaceState = function (...args) {
        replaceState.apply(window.history, args);
        window.dispatchEvent(new Event("replaceState"));
    };

    window.addEventListener("popstate", pageUpdated);
    window.addEventListener("replaceState", pageUpdated);
    window.addEventListener("pushState", () => pageUpdated);
})();
