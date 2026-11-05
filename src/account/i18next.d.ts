/**
 * This file has been claimed for ownership from @keycloakify/keycloak-account-ui version 260502.0.2.
 * To relinquish ownership and restore this file to its original content, run the following command:
 * 
 * $ npx keycloakify own --path "account/i18next.d.ts" --revert
 */

/* eslint-disable */

// @ts-nocheck

// https://www.i18next.com/overview/typescript
import "i18next";

declare module "i18next" {
  interface CustomTypeOptions {
    // Upstream sets true, which widens React children types for the whole project and
    // breaks the shadcn login components. The account pages are @ts-nocheck, so false costs nothing.
    allowObjectInHTMLChildren: false;
  }
}
