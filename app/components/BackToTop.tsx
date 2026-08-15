"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export function BackToTop() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const onScroll = () => setVisible(window.scrollY > 480);
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    function scrollToTop() {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    return (
        <button
            type="button"
            onClick={scrollToTop}
            aria-label="Retourner en haut de la page"
            className={[
                "fixed bottom-6 right-6 z-40 flex h-16 w-16 items-center justify-center rounded-full",
                "bg-white shadow-lg transition-all duration-300",
                "hover:shadow-xl",
                visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0",
            ].join(" ")}
        >
            <svg
                viewBox="0 0 100 100"
                className="absolute inset-0 h-full w-full motion-safe:animate-[spin_9s_linear_infinite]"
                aria-hidden="true"
            >
                <defs>
                    <path id="backToTopCircle" d="M50,50 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0" />
                </defs>
                <text className="fill-primary-500 text-[9px] font-medium uppercase tracking-[0.15em]">
                    <textPath href="#backToTopCircle" startOffset="0%">
                        Retour en haut · Retour en haut ·
                    </textPath>
                </text>
            </svg>

            <ArrowUp className="h-5 w-5 text-secondary" aria-hidden="true" />
        </button>
    );
}