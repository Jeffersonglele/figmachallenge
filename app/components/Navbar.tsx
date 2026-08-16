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
    "Cotonou", "Porto-Novo", "Abomey-Calavi", "Parakou",
    "Bohicon", "Ouidah", "Natitingou", "Lokossa",
];

export function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [centresOpen, setCentresOpen] = useState(false);
    const [centresExpanded, setCentresExpanded] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 80);
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    useEffect(() => {
        document.body.style.overflow = menuOpen ? "hidden" : "";
        return () => { document.body.style.overflow = ""; };
    }, [menuOpen]);

    useEffect(() => {
        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                setCentresOpen(false);
                setMenuOpen(false);
            }
        };
        function onClickOutside(e: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setCentresOpen(false);
            }
        }
        document.addEventListener("keydown", onKeyDown);
        document.addEventListener("mousedown", onClickOutside);
        return () => {
            document.removeEventListener("keydown", onKeyDown);
            document.removeEventListener("mousedown", onClickOutside);
        };
    }, []);

    return (
        <>
            <header className="fixed inset-x-0 top-0 z-50 flex h-20 items-center px-4 sm:px-8 pointer-events-none">

                {/* ══════════════════════════════════════════
                    PILL HERO — pleine largeur, non scrollé
                    ══════════════════════════════════════════ */}
                <div
                    className={[
                        "pointer-events-auto w-full transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]",
                        scrolled
                            ? "opacity-0 -translate-y-3 scale-[0.97] select-none pointer-events-none"
                            : "opacity-100 translate-y-0 scale-100",
                    ].join(" ")}
                >
                    <div className="flex items-center justify-between rounded-full bg-neutral-900/85 backdrop-blur-md px-3 py-2 shadow-[0_4px_24px_rgba(0,0,0,0.3)]">

                        {/* Logo */}
                        <Link
                            href="/"
                            aria-label="NAHUN"
                            className="flex h-9 w-9 items-center justify-center rounded-full bg-white hover:bg-neutral-100 transition-colors flex-shrink-0"
                        >
                            <Image
                                src="/logo/logo_nahun.png"
                                alt="NAHUN"
                                width={22}
                                height={22}
                                className="h-[22px] w-[22px] object-contain"
                                priority
                            />
                        </Link>

                        {/* ── Liens desktop + Centres dropdown ── */}
                        <nav
                            aria-label="Navigation principale"
                            className="hidden items-center gap-7 md:flex"
                        >
                            {/* Pourquoi donner */}
                            <a
                                href={NAV_LINKS[0].href}
                                className="text-sm font-medium text-white/75 hover:text-white transition-colors"
                            >
                                {NAV_LINKS[0].label}
                            </a>

                            {/* Centres avec dropdown */}
                            <div ref={dropdownRef} className="relative">
                                <button
                                    type="button"
                                    onClick={() => setCentresOpen((v) => !v)}
                                    aria-expanded={centresOpen}
                                    aria-controls="centres-panel"
                                    className={[
                                        "flex items-center gap-1 text-sm font-medium transition-colors",
                                        centresOpen ? "text-white" : "text-white/75 hover:text-white",
                                    ].join(" ")}
                                >
                                    Centres
                                    <ChevronDown
                                        className={[
                                            "h-3.5 w-3.5 transition-transform duration-200",
                                            centresOpen ? "rotate-180" : "",
                                        ].join(" ")}
                                        aria-hidden="true"
                                    />
                                </button>

                                {/* Dropdown Centres */}
                                <div
                                    id="centres-panel"
                                    role="region"
                                    aria-label="Centres par ville"
                                    className={[
                                        "absolute left-1/2 top-full mt-4 w-[480px] -translate-x-1/2",
                                        "rounded-2xl bg-neutral-900/95 backdrop-blur-md p-6",
                                        "shadow-[0_8px_32px_rgba(0,0,0,0.4)]",
                                        "transition-all duration-200 origin-top",
                                        centresOpen
                                            ? "pointer-events-auto scale-100 opacity-100 translate-y-0"
                                            : "pointer-events-none scale-95 opacity-0 -translate-y-2",
                                    ].join(" ")}
                                >
                                    <div className="grid grid-cols-2 gap-x-8">
                                        {/* Liste villes */}
                                        <div>
                                            <p className="mb-3 text-xs font-medium uppercase tracking-[0.15em] text-white/40">
                                                Par ville
                                            </p>
                                            <ul className="space-y-2">
                                                {VILLES.map((ville) => (
                                                    <li key={ville}>
                                                        <a
                                                            href={`#centres?ville=${encodeURIComponent(ville)}`}
                                                            onClick={() => setCentresOpen(false)}
                                                            className="text-sm text-white/70 transition-colors hover:text-white"
                                                        >
                                                            {ville}
                                                        </a>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>

                                        {/* Carte info */}
                                        <div className="flex flex-col justify-between rounded-xl bg-white/5 border border-white/10 p-4">
                                            <div>
                                                <p className="text-sm font-semibold text-white">
                                                    8 centres référencés
                                                </p>
                                                <p className="mt-1.5 text-xs text-white/50 leading-relaxed">
                                                    Horaires, statut en direct et types de dons acceptés pour chaque centre.
                                                </p>
                                            </div>
                                            <a
                                                href="#centres"
                                                onClick={() => setCentresOpen(false)}
                                                className="mt-4 text-xs font-medium text-primary-400 hover:text-primary-300 transition-colors"
                                            >
                                                Voir tous les centres →
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Éligibilité, Réserves, FAQ */}
                            {NAV_LINKS.slice(1).map((link) => (
                                <a
                                    key={link.href}
                                    href={link.href}
                                    className="text-sm font-medium text-white/75 hover:text-white transition-colors"
                                >
                                    {link.label}
                                </a>
                            ))}
                        </nav>

                        {/* CTA */}
                        <a
                            href="#eligibilite"
                            className="hidden md:inline-flex items-center rounded-full bg-white px-5 py-2 text-sm font-semibold text-neutral-900 hover:bg-white/90 transition-colors flex-shrink-0"
                        >
                            Tester mon éligibilité
                        </a>

                        {/* Burger mobile */}
                        <button
                            type="button"
                            onClick={() => setMenuOpen(true)}
                            aria-label="Ouvrir le menu"
                            className="flex h-9 w-9 items-center justify-center rounded-full text-white/80 hover:bg-white/10 transition-colors md:hidden"
                        >
                            <Menu className="h-5 w-5" />
                        </button>
                    </div>
                </div>

                {/* ══════════════════════════════════════════
                    MINI PILL SCROLLÉE — logo + hamburger
                    ══════════════════════════════════════════ */}
                <div
                    className={[
                        "pointer-events-auto absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2",
                        "transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]",
                        scrolled
                            ? "opacity-100 scale-100"
                            : "opacity-0 scale-90 select-none pointer-events-none",
                    ].join(" ")}
                >
                    <div className="flex items-center gap-1 rounded-full bg-white/95 backdrop-blur-sm shadow-[0_2px_16px_rgba(0,0,0,0.12)] px-1.5 py-1.5">

                        {/* Logo seul */}
                        <Link
                            href="/"
                            aria-label="NAHUN"
                            className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-neutral-100 transition-colors flex-shrink-0"
                        >
                            <Image
                                src="/logo/logo_nahun.png"
                                alt="NAHUN"
                                width={20}
                                height={20}
                                className="h-5 w-5 object-contain"
                            />
                        </Link>

                        {/* Séparateur */}
                        <div className="h-5 w-px bg-neutral-200" aria-hidden="true" />

                        {/* Hamburger */}
                        <button
                            type="button"
                            onClick={() => setMenuOpen(true)}
                            aria-label="Ouvrir le menu"
                            className="flex h-8 w-8 items-center justify-center rounded-full text-neutral-700 hover:bg-neutral-100 transition-colors"
                        >
                            <Menu className="h-4 w-4" />
                        </button>
                    </div>
                </div>

            </header>

            {/* ── Overlay ── */}
            <div
                aria-hidden="true"
                onClick={() => setMenuOpen(false)}
                className={[
                    "fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity duration-300",
                    menuOpen ? "opacity-100" : "opacity-0 pointer-events-none",
                ].join(" ")}
            />

            {/* ══════════════════════════════════════════
                PANNEAU LATÉRAL DROIT
                ══════════════════════════════════════════ */}
            <div
                id="slide-menu"
                ref={menuRef}
                role="dialog"
                aria-modal="true"
                aria-label="Menu de navigation"
                className={[
                    "fixed right-0 top-0 z-50 h-screen w-full max-w-lg",
                    "rounded-l-[2.5rem] bg-white",
                    "shadow-[-8px_0_40px_rgba(0,0,0,0.12)]",
                    "flex flex-col overflow-y-auto",
                    "transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]",
                    menuOpen ? "translate-x-0" : "translate-x-full",
                ].join(" ")}
            >
                {/* En-tête */}
                <div className="flex items-center justify-between px-10 pt-8 pb-4">
                    <span className="text-xs font-medium uppercase tracking-[0.2em] text-neutral-400">
                        Navigation
                    </span>
                    <button
                        type="button"
                        onClick={() => setMenuOpen(false)}
                        aria-label="Fermer le menu"
                        className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-900 text-white transition-transform duration-200 hover:scale-110"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>

                {/* Liens */}
                <nav aria-label="Navigation panneau" className="flex flex-1 flex-col px-10 py-2">

                    {/* Pourquoi donner */}
                    <a
                        href={NAV_LINKS[0].href}
                        onClick={() => setMenuOpen(false)}
                        className="group flex items-center border-b border-neutral-100 py-5"
                    >
                        <span className="font-heading text-4xl font-semibold text-neutral-900 transition-transform duration-300 group-hover:translate-x-3 sm:text-5xl">
                            {NAV_LINKS[0].label}
                        </span>
                    </a>

                    {/* Centres accordéon */}
                    <div className="border-b border-neutral-100">
                        <button
                            type="button"
                            onClick={() => setCentresExpanded((v) => !v)}
                            aria-expanded={centresExpanded}
                            className={[
                                "group flex w-full items-center justify-between py-5 text-left transition-all duration-300",
                                centresExpanded ? "rounded-2xl bg-neutral-900 px-6 my-2" : "",
                            ].join(" ")}
                        >
                            <span className={[
                                "font-heading text-4xl font-semibold transition-all duration-300 sm:text-5xl",
                                centresExpanded ? "text-white" : "text-neutral-900 group-hover:translate-x-3",
                            ].join(" ")}>
                                Centres
                            </span>
                            <ChevronDown
                                className={[
                                    "h-7 w-7 flex-shrink-0 transition-all duration-300",
                                    centresExpanded ? "rotate-180 text-white" : "text-neutral-400",
                                ].join(" ")}
                            />
                        </button>

                        <div className={[
                            "overflow-hidden transition-all duration-300 ease-in-out",
                            centresExpanded ? "max-h-96 opacity-100 pb-5" : "max-h-0 opacity-0",
                        ].join(" ")}>
                            <div className="flex flex-wrap gap-2 px-2">
                                {VILLES.map((ville) => (
                                    <a
                                        key={ville}
                                        href={`#centres?ville=${encodeURIComponent(ville)}`}
                                        onClick={() => setMenuOpen(false)}
                                        className="rounded-full border border-white/10 bg-neutral-800 px-5 py-2 text-sm font-medium text-neutral-400 transition-all duration-200 hover:bg-neutral-700 hover:text-white"
                                    >
                                        {ville}
                                    </a>
                                ))}
                                <a
                                    href="#centres"
                                    onClick={() => setMenuOpen(false)}
                                    className="rounded-full border border-primary-200 bg-primary-50 px-5 py-2 text-sm font-medium text-primary-500 transition-all duration-200 hover:bg-primary-100"
                                >
                                    Voir tous →
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Éligibilité, Réserves, FAQ */}
                    {NAV_LINKS.slice(1).map((link) => (
                        <a
                            key={link.href}
                            href={link.href}
                            onClick={() => setMenuOpen(false)}
                            className="group flex items-center border-b border-neutral-100 py-5"
                        >
                            <span className="font-heading text-4xl font-semibold text-neutral-900 transition-transform duration-300 group-hover:translate-x-3 sm:text-5xl">
                                {link.label}
                            </span>
                        </a>
                    ))}

                    {/* Footer panneau */}
                    <div className="mt-auto pt-10 pb-8 flex flex-col gap-4">
                        <a
                            href="#eligibilite"
                            onClick={() => setMenuOpen(false)}
                            className="w-full rounded-full bg-primary-500 px-6 py-4 text-center text-base font-semibold text-white transition-colors hover:bg-primary-600"
                        >
                            Tester mon éligibilité
                        </a>
                        <div className="flex gap-6 text-sm font-medium text-neutral-400">
                            <a href="#" className="hover:text-neutral-900 transition-colors">Facebook</a>
                            <a href="#" className="hover:text-neutral-900 transition-colors">Instagram</a>
                            <a href="#" className="hover:text-neutral-900 transition-colors">Twitter</a>
                        </div>
                    </div>
                </nav>
            </div>
        </>
    );
}