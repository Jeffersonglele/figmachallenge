"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ChevronDown } from "lucide-react";

const NAV_LINKS = [
    { label: "Pourquoi donner", href: "#pourquoi-donner" },
    { label: "Éligibilité", href: "#eligibilite" },
    { label: "Réserves", href: "#reserves" },
    { label: "FAQ", href: "#faq" },
];

const VILLES = [
    "Cotonou",
    "Porto-Novo",
    "Abomey-Calavi",
    "Parakou",
    "Bohicon",
    "Ouidah",
    "Natitingou",
    "Lokossa",
];

export function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [centresOpen, setCentresOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Nav flottante tant qu'on est sur le hero, solide ensuite
    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 80);
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    useEffect(() => {
        document.body.style.overflow = mobileOpen ? "hidden" : "";
        return () => {
            document.body.style.overflow = "";
        };
    }, [mobileOpen]);

    // Fermer le mega-menu au clic extérieur / Échap
    useEffect(() => {
        function onClickOutside(e: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setCentresOpen(false);
            }
        }
        function onKeyDown(e: KeyboardEvent) {
            if (e.key === "Escape") setCentresOpen(false);
        }
        document.addEventListener("mousedown", onClickOutside);
        document.addEventListener("keydown", onKeyDown);
        return () => {
            document.removeEventListener("mousedown", onClickOutside);
            document.removeEventListener("keydown", onKeyDown);
        };
    }, []);

    // "Flotte" = transparent sur le hero et pas encore scrollé, pas de menu ouvert
    const floating = !scrolled && !mobileOpen;

    return (
        <header
            className={[
                "fixed inset-x-0 top-0 z-50 w-full transition-colors duration-300",
                floating ? "bg-transparent" : "bg-white shadow-[0_1px_0_0_theme(colors.neutral.200)]",
            ].join(" ")}
        >
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                {/* Logo */}
                <Link
                    href="/"
                    className="group flex items-center gap-2 rounded-md"
                    aria-label="NAHUN — retour en haut de page"
                >
                    <span className="relative flex h-8 w-8 items-center justify-center">
                        <Image
                            src="/logo/logo_nahun.png"
                            alt="Logo NAHUN"
                            width={32}
                            height={32}
                            className="h-8 w-8 object-contain"
                            priority
                        />
                    </span>
                    <span
                        className={[
                            "font-heading text-lg font-semibold transition-colors",
                            floating ? "text-white" : "text-secondary",
                        ].join(" ")}
                    >
                        NA<span className="text-primary-500">HUN</span>
                    </span>
                </Link>

                {/* Nav desktop */}
                <nav aria-label="Navigation principale" className="hidden items-center gap-8 md:flex">
                    {NAV_LINKS.slice(0, 1).map((link) => (
                        <a
                            key={link.href}
                            href={link.href}
                            className={[
                                "text-body transition-colors",
                                floating ? "text-white/90 hover:text-white" : "text-tertiary hover:text-primary-500",
                            ].join(" ")}
                        >
                            {link.label}
                        </a>
                    ))}

                    {/* Mega-menu Centres */}
                    <div ref={dropdownRef} className="relative">
                        <button
                            type="button"
                            onClick={() => setCentresOpen((v) => !v)}
                            aria-expanded={centresOpen}
                            aria-controls="centres-panel"
                            className={[
                                "flex items-center gap-1 text-body transition-colors",
                                floating ? "text-white/90 hover:text-white" : "text-tertiary hover:text-primary-500",
                                centresOpen && (floating ? "text-white" : "text-primary-500"),
                            ].join(" ")}
                        >
                            Centres
                            <ChevronDown
                                className={["h-4 w-4 transition-transform", centresOpen ? "rotate-180" : ""].join(" ")}
                                aria-hidden="true"
                            />
                        </button>

                        <div
                            id="centres-panel"
                            role="region"
                            aria-label="Centres par ville"
                            className={[
                                "absolute left-1/2 top-full mt-3 w-[520px] -translate-x-1/2 rounded-lg border border-neutral-200 bg-white p-6 shadow-lg transition-all duration-200",
                                centresOpen
                                    ? "pointer-events-auto translate-y-0 opacity-100"
                                    : "pointer-events-none translate-y-1 opacity-0",
                            ].join(" ")}
                        >
                            <div className="grid grid-cols-2 gap-x-8">
                                <div>
                                    <p className="mb-3 text-small font-medium text-neutral-500">Par ville</p>
                                    <ul className="space-y-2">
                                        {VILLES.map((ville) => (
                                            <li key={ville}>
                                                <a
                                                    href={`#centres?ville=${encodeURIComponent(ville)}`}
                                                    onClick={() => setCentresOpen(false)}
                                                    className="text-body text-tertiary transition-colors hover:text-primary-500"
                                                >
                                                    {ville}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="flex flex-col justify-between rounded-md bg-primary-50 p-4">
                                    <div>
                                        <p className="font-heading text-body font-semibold text-secondary">
                                            8 centres référencés
                                        </p>
                                        <p className="mt-1 text-small text-tertiary">
                                            Horaires, statut en direct et types de dons acceptés pour chaque centre.
                                        </p>
                                    </div>

                                    <a
                                        href="#centres"
                                        onClick={() => setCentresOpen(false)}
                                        className="mt-4 text-small font-medium text-primary-500 hover:text-primary-600"
                                    >
                                        Voir tous les centres →
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    {NAV_LINKS.slice(1).map((link) => (
                        <a
                            key={link.href}
                            href={link.href}
                            className={[
                                "text-body transition-colors",
                                floating ? "text-white/90 hover:text-white" : "text-tertiary hover:text-primary-500",
                            ].join(" ")}
                        >
                            {link.label}
                        </a>
                    ))}
                </nav>

                {/* CTA + burger */}
                <div className="flex items-center gap-3">
                    <a
                        href="#eligibilite"
                        className={[
                            "hidden rounded-full px-5 py-2.5 text-small font-medium transition-colors md:inline-block",
                            floating
                                ? "bg-white text-primary-500 hover:bg-white/90"
                                : "bg-primary-500 text-white hover:bg-primary-600",
                        ].join(" ")}
                    >
                        Tester mon éligibilité
                    </a>

                    <button
                        type="button"
                        onClick={() => setMobileOpen((v) => !v)}
                        aria-expanded={mobileOpen}
                        aria-controls="mobile-menu"
                        aria-label={mobileOpen ? "Fermer le menu" : "Ouvrir le menu"}
                        className={["rounded-md p-2 transition-colors md:hidden", floating ? "text-white" : "text-secondary"].join(" ")}
                    >
                        {mobileOpen ? <X className="h-6 w-6" aria-hidden="true" /> : <Menu className="h-6 w-6" aria-hidden="true" />}
                    </button>
                </div>
            </div>

            {/* Panneau mobile */}
            <div
                id="mobile-menu"
                className={[
                    "fixed inset-x-0 top-16 z-40 h-[calc(100dvh-4rem)] overflow-y-auto bg-white transition-transform duration-300 ease-out md:hidden",
                    mobileOpen ? "translate-x-0" : "translate-x-full",
                ].join(" ")}
            >
                <nav aria-label="Navigation mobile" className="flex h-full flex-col gap-1 px-6 py-8">
                    {NAV_LINKS.slice(0, 1)
                        .concat({ label: "Centres", href: "#centres" })
                        .concat(NAV_LINKS.slice(1))
                        .map((link) => (
                            <a
                                key={link.href}
                                href={link.href}
                                onClick={() => setMobileOpen(false)}
                                className="border-b border-neutral-200 py-4 text-h4 text-secondary"
                            >
                                {link.label}
                            </a>
                        ))}

                    <a
                        href="#eligibilite"
                        onClick={() => setMobileOpen(false)}
                        className="mt-6 rounded-full bg-primary-500 px-5 py-3 text-center text-body font-medium text-white"
                    >
                        Tester mon éligibilité
                    </a>
                </nav>
            </div>
        </header>
    );
}

