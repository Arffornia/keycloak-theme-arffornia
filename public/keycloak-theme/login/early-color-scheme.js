// Keycloakify loads <themeType>/early-color-scheme.js in <head>, before React, so the color theme
// is set before the first paint and a dark page never flashes white. Same storage key and values
// as src/login/components/ui/ThemeProvider.tsx ("system" | "light" | "dark").
{
    const isDark = (() => {
        realm_policy: {
            if (typeof kcContext === "undefined" || kcContext.darkMode !== false) {
                break realm_policy;
            }
            return false;
        }

        query_param: {
            switch (new URLSearchParams(location.search).get("dark")) {
                case "true":
                    return true;
                case "false":
                    return false;
                default:
                    break query_param;
            }
        }

        local_storage: {
            let value = null;
            try {
                value = localStorage.getItem("arffornia-theme");
            } catch {
                break local_storage;
            }
            switch (value) {
                case "dark":
                    return true;
                case "light":
                    return false;
                default:
                    break local_storage;
            }
        }

        return matchMedia("(prefers-color-scheme: dark)").matches;
    })();

    const root = document.documentElement;
    root.classList.add(isDark ? "dark" : "light");
    root.style.colorScheme = isDark ? "dark" : "light";
}
