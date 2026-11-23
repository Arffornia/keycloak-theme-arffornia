/**
 * This file has been claimed for ownership from @oussemasahbeni/keycloakify-login-shadcn version 250004.0.24.
 * To relinquish ownership and restore this file to its original content, run the following command:
 *
 * $ npx keycloakify own --path "login/components/Template/Template.tsx" --revert
 */

import { useKcClsx } from "@keycloakify/login-ui/useKcClsx";
import { useSetClassName } from "keycloakify/tools/useSetClassName";
import type { ReactNode } from "react";
import { useEffect } from "react";
import { useI18n } from "../../i18n";
import { useKcContext } from "../../KcContext";
import "../../arffornia.css";
import { FactoryLine } from "./FactoryLine";
import { TemplateContent } from "./TemplateContent";
import { TemplateTopBar } from "./TemplateTopBar";
import { useInitializeTemplate } from "./useInitializeTemplate";

export type TemplateProps = {
    displayInfo?: boolean;
    displayMessage?: boolean;
    displayRequiredFields?: boolean;
    headerNode: ReactNode;
    socialProvidersNode?: ReactNode;
    infoNode?: ReactNode;
    documentTitle?: string;
    bodyClassName?: string;
    children: ReactNode;
};

export function Template(props: TemplateProps) {
    const { documentTitle, bodyClassName } = props;

    const { kcContext } = useKcContext();
    const { msgStr } = useI18n();
    const { kcClsx } = useKcClsx();

    useEffect(() => {
        document.title =
            documentTitle ??
            msgStr("loginTitle", kcContext.realm.displayName || kcContext.realm.name);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useSetClassName({
        qualifiedName: "html",
        className: kcClsx("kcHtmlClass")
    });

    useSetClassName({
        qualifiedName: "body",
        className: bodyClassName ?? kcClsx("kcBodyClass")
    });

    useInitializeTemplate();
    // useApplyThemePreset is not called: it would override the --arf-* palette with the shadcn presets.

    return (
        <div className="grid min-h-svh lg:grid-cols-2 ">
            <div className="flex flex-col gap-4 px-0 py-0 pb-6 lg:p-6 lg:md:p-10 lg:pt-10 min-h-screen lg:min-h-0">
                <TemplateTopBar />

                <div className="flex flex-1 items-start lg:items-center justify-center flex-col ">
                    <div className="w-full max-w-xl">
                        <TemplateContent {...props} />
                    </div>
                </div>
            </div>

            <div className="relative hidden lg:block">
                <FactoryLine />
            </div>
        </div>
    );
}
