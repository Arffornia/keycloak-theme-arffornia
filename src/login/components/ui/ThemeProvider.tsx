/**
 * This file has been claimed for ownership from @oussemasahbeni/keycloakify-login-shadcn version 250004.0.18.
 * To relinquish ownership and restore this file to its original content, run the following command:
 *
 * $ npx keycloakify own --path "login/components/ui/ThemeProvider.tsx" --revert
 */

import { createContext, useContext, useEffect, useState } from "react";

export type Theme = "dark" | "light" | "system";

// Also read by public/keycloak-theme/early-color-scheme.js, which sets the class before the
// first paint so a dark page never flashes white.
export const THEME_STORAGE_KEY = "arffornia-theme";

const darkQuery = "(prefers-color-scheme: dark)";

export type ResolvedTheme = "dark" | "light";

type ThemeProviderState = {
    theme: Theme;
    resolvedTheme: ResolvedTheme;
    setTheme: (theme: Theme) => void;
};

const ThemeProviderContext = createContext<ThemeProviderState>({
    theme: "system",
    resolvedTheme: "light",
    setTheme: () => null
});

function readStoredTheme(): Theme | undefined {
    try {
        const value = localStorage.getItem(THEME_STORAGE_KEY);
        return value === "dark" || value === "light" || value === "system" ? value : undefined;
    } catch {
        return undefined;
    }
}

function resolveTheme(theme: Theme): ResolvedTheme {
    if (theme !== "system") {
        return theme;
    }
    return window.matchMedia(darkQuery).matches ? "dark" : "light";
}

function applyTheme(resolved: ResolvedTheme) {
    const root = document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(resolved);
    root.style.colorScheme = resolved;
}

export function ThemeProvider(props: { children: React.ReactNode; defaultTheme?: Theme }) {
    const { children, defaultTheme = "system" } = props;

    // getTheme() returns "light" when the realm turns dark mode off: the stored choice is ignored.
    const isLockedToLight = defaultTheme === "light";

    const [theme, setThemeState] = useState<Theme>(() =>
        isLockedToLight ? "light" : (readStoredTheme() ?? defaultTheme)
    );

    const [resolvedTheme, setResolvedTheme] = useState<ResolvedTheme>(() => resolveTheme(theme));

    useEffect(() => {
        const sync = () => {
            const resolved = resolveTheme(theme);
            applyTheme(resolved);
            setResolvedTheme(resolved);
        };
        sync();

        if (theme !== "system") {
            return;
        }

        const media = window.matchMedia(darkQuery);
        const onChange = sync;
        media.addEventListener("change", onChange);
        return () => media.removeEventListener("change", onChange);
    }, [theme]);

    const setTheme = (next: Theme) => {
        try {
            localStorage.setItem(THEME_STORAGE_KEY, next);
        } catch {
            // Storage blocked (private window): the choice lasts until the next page.
        }
        setThemeState(next);
    };

    return (
        <ThemeProviderContext.Provider value={{ theme, resolvedTheme, setTheme }}>
            {children}
        </ThemeProviderContext.Provider>
    );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useTheme = () => useContext(ThemeProviderContext);
