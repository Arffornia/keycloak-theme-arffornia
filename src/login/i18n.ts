/**
 * WARNING: Before modifying this file, run the following command:
 *
 * $ npx keycloakify own --path "login/i18n.ts"
 *
 * This file is provided by @oussemasahbeni/keycloakify-login-shadcn version 250004.0.18.
 * It was copied into your repository by the postinstall script: `keycloakify sync-extensions`.
 */

/* eslint-disable */

import { i18nBuilder } from "@keycloakify/login-ui/i18n";
import type { ThemeName } from "../kc.gen";

/** @see: https://docs.keycloakify.dev/features/i18n */
const { I18nProvider, useI18n } = i18nBuilder
    .withThemeName<ThemeName>()
    .withCustomTranslations({
        en: {
            welcomeMessage:
                "Welcome to Arffornia ID. One sign-in for every Arffornia service.",
            loginAccountTitle: "Sign in to your account",
            registerTitle: "Register a new account",
            email: "Email",
            noAccount: "Don't have an account?",
            doRegister: "Sign up",
            "organization.selectTitle": "Choose your organization",
            "organization.pickPlaceholder": "Pick an organization to continue",
            "identity-provider-login-last-used": "Last used"
        },
        fr: {
            welcomeMessage:
                "Bienvenue sur Arffornia ID. Une seule connexion pour tous les services Arffornia.",
            loginAccountTitle: "Connectez-vous à votre compte",
            registerTitle: "Créer un nouveau compte",
            email: "E-mail",
            doRegister: "S'inscrire",
            noAccount: "Vous n'avez pas de compte ?",
            "organization.selectTitle": "Choisissez votre organisation",
            "organization.pickPlaceholder":
                "Sélectionnez une organisation pour continuer",
            "identity-provider-login-last-used": "Dernière utilisation"
        }
    })
    .build();

export { I18nProvider, useI18n };
