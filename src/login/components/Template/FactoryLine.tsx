import { useTheme } from "@/login/components/ui/ThemeProvider";
import { useI18n } from "@/login/i18n";
import { useEffect, useState } from "react";
import craftingTable from "../../assets/da/crafting-table.png";
import maquettePoster from "../../assets/da/login.maquette.jpg";
import maquetteLoop from "../../assets/da/login.maquette.webm";
import nightPoster from "../../assets/da/login.night.jpg";
import nightLoop from "../../assets/da/login.night.webm";

const reducedMotionQuery = "(prefers-reduced-motion: reduce)";

function usePrefersReducedMotion() {
    const [prefersReducedMotion, setPrefersReducedMotion] = useState(
        () => window.matchMedia(reducedMotionQuery).matches
    );

    useEffect(() => {
        const media = window.matchMedia(reducedMotionQuery);
        const onChange = () => setPrefersReducedMotion(media.matches);
        media.addEventListener("change", onChange);
        return () => media.removeEventListener("change", onChange);
    }, []);

    return prefersReducedMotion;
}

/** The launcher's factory line, looping behind the brand. Desktop only: the parent hides it below lg. */
export function FactoryLine() {
    const { resolvedTheme } = useTheme();
    const { msg } = useI18n();
    const prefersReducedMotion = usePrefersReducedMotion();

    const isDark = resolvedTheme === "dark";
    const poster = isDark ? nightPoster : maquettePoster;
    const loop = isDark ? nightLoop : maquetteLoop;

    return (
        <div className="relative h-full overflow-hidden" style={{ background: "var(--arf-panel)" }}>
            {prefersReducedMotion ? (
                <img src={poster} alt="" className="absolute inset-0 h-full w-full object-cover object-top" />
            ) : (
                <video
                    // A new element per look, so switching theme restarts on the right file.
                    key={loop}
                    className="absolute inset-0 h-full w-full object-cover object-top"
                    src={loop}
                    poster={poster}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="auto"
                    aria-hidden="true"
                />
            )}

            <div
                className="absolute inset-x-0 bottom-0 h-1/2"
                style={{
                    background:
                        "linear-gradient(to top, var(--arf-panel) 10%, transparent)"
                }}
            />

            <div className="absolute inset-x-0 bottom-0 flex flex-col gap-3 p-10">
                <div className="flex items-center gap-3">
                    <img src={craftingTable} alt="" className="h-12 w-12" />
                    <span className="arf-wordmark text-4xl text-foreground">Arffornia</span>
                </div>
                <p className="max-w-md text-muted-foreground">{msg("welcomeMessage")}</p>
            </div>
        </div>
    );
}
