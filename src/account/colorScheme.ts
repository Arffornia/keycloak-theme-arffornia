/**
 * This file has been claimed for ownership from @keycloakify/keycloak-account-ui version 260502.0.2.
 * To relinquish ownership and restore this file to its original content, run the following command:
 * 
 * $ npx keycloakify own --path "account/colorScheme.ts" --revert
 */

/* IMPORTANT NOTE:
 * If you modify how the light/dark mode is implemented
 * you must also update public/keycloak-theme/account/early-color-scheme.js
 * This scrip is ran before this to avoid white flashes
 */

import { getKcContext } from "./KcContext";

const DARK_THEME_CLASS = "pf-v5-theme-dark";

function setIsDarkModeEnabled(isDarkModeEnabled: boolean) {
    {
        const elementId = "root-color-scheme-style";

        // Remove the style tag that might have been added by early-color-scheme.js
        document.getElementById(elementId)?.remove();

        const element = document.createElement("style");

        element.id = elementId;

        element.innerHTML = `:root { color-scheme: ${isDarkModeEnabled ? "dark" : "light"}; }`;

        document.head.appendChild(element);
    }

    // Remove the background color that might have been set by early-color-scheme.js
    // The stylesheet should have been loaded by now.
    document.documentElement.style.removeProperty("background-color");

    {
        const { classList } = document.documentElement;

        if (isDarkModeEnabled) {
            classList.add(DARK_THEME_CLASS);
        } else {
            classList.remove(DARK_THEME_CLASS);
        }
    }
}

export function startColorSchemeManagement() {
    const { kcContext } = getKcContext();

    // The "Dark Mode" realm configuration has been set to false
    // (Admin Console -> Realm Setting -> Themes -> Dark Mode)
    // This means that the admin don't want the UI to be render in dark mode
    // even when it's the user preference.
    if (kcContext.darkMode === false) {
        setIsDarkModeEnabled(false);
        return;
    }

    // The choice made with the selector on the login pages (same origin, same key as
    // src/login/components/ui/ThemeProvider.tsx). "system" or nothing follows the OS.
    let storedTheme: string | null = null;
    try {
        storedTheme = localStorage.getItem("arffornia-theme");
    } catch {
        // Storage blocked: follow the OS.
    }
    if (storedTheme === "dark" || storedTheme === "light") {
        setIsDarkModeEnabled(storedTheme === "dark");
        return;
    }

    const mediaQuery_isDarkThePreferredColorScheme = window.matchMedia("(prefers-color-scheme: dark)");

    setIsDarkModeEnabled(mediaQuery_isDarkThePreferredColorScheme.matches);

    mediaQuery_isDarkThePreferredColorScheme.addEventListener("change", event =>
        setIsDarkModeEnabled(event.matches)
    );
}
