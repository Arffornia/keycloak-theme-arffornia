import { useKcContext } from "@/login/KcContext";
import { useEffect, useState } from "react";

type State = "idle" | "running" | "error";

// Pages where the browser is waiting for a security key or a passkey.
const waitingForKeyPages = new Set(["webauthn-authenticate.ftl", "webauthn-register.ftl"]);

/** The card's status light. See .arf-status-light in arffornia.css. */
export function StatusLight() {
    const { kcContext } = useKcContext();

    const initialState: State =
        kcContext.message?.type === "error"
            ? "error"
            : waitingForKeyPages.has(kcContext.pageId)
              ? "running"
              : "idle";

    const [state, setState] = useState<State>(initialState);

    useEffect(() => {
        const onSubmit = () => setState("running");
        document.addEventListener("submit", onSubmit, true);
        return () => document.removeEventListener("submit", onSubmit, true);
    }, []);

    return (
        <div
            className="arf-status-light absolute inset-x-0 top-0 hidden lg:block"
            data-state={state}
            aria-hidden="true"
        />
    );
}
