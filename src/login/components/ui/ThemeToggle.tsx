/**
 * This file has been claimed for ownership from @oussemasahbeni/keycloakify-login-shadcn version 250004.0.18.
 * To relinquish ownership and restore this file to its original content, run the following command:
 *
 * $ npx keycloakify own --path "login/components/ui/ThemeToggle.tsx" --revert
 */

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { useI18n } from "@/login/i18n";
import { Check, Monitor, Moon, Sun } from "lucide-react";
import { Button } from "../../../components/ui/button";
import { type Theme, useTheme } from "./ThemeProvider";

const options = [
    { value: "system", Icon: Monitor, label: "themeSystem" },
    { value: "light", Icon: Sun, label: "themeLight" },
    { value: "dark", Icon: Moon, label: "themeDark" }
] as const satisfies readonly { value: Theme; Icon: typeof Sun; label: string }[];

export function ModeToggle() {
    const { theme, setTheme } = useTheme();
    const { msgStr } = useI18n();

    const current = options.find(option => option.value === theme) ?? options[0];

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" aria-label={msgStr("themeLabel")}>
                    <current.Icon className="h-[1.2rem] w-[1.2rem]" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
                {options.map(({ value, Icon, label }) => (
                    <DropdownMenuItem
                        key={value}
                        onSelect={() => setTheme(value)}
                        className="flex cursor-pointer items-center gap-2"
                    >
                        <Icon className="h-4 w-4" />
                        <span className="flex-1">{msgStr(label)}</span>
                        {value === theme && <Check className="h-4 w-4 opacity-60" />}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
