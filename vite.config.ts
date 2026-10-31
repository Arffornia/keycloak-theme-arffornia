import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { keycloakify } from "keycloakify/vite-plugin";
import path from "node:path";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        react(),
        tailwindcss(),
        keycloakify({
            // "arffornia" is the theme name the realm should use.
            // "keycloak-theme-kube-lab" is the legacy name, still set as `login_theme` in
            // infra/terraform/main.tf. It ships in the same JAR so the login page keeps working
            // until infra switches to "arffornia". Remove it after that change is deployed (#18).
            themeName: ["arffornia", "keycloak-theme-kube-lab"],
            accountThemeImplementation: "none"
        })
    ],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src")
        }
    }
});
