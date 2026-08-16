import Image from "next/image";
const NAV_LINKS = [
    { label: "Pourquoi donner", href: "#pourquoi-donner" },
    { label: "Éligibilité", href: "#eligibilite" },
    { label: "Centres", href: "#centres" },
    { label: "Réserves", href: "#reserves" },
    { label: "FAQ", href: "#faq" },
];

const VILLES = [
    "Cotonou",
    "Porto-Novo",
    "Abomey-Calavi",
    "Parakou",
    "Bohicon",
    "Natitingou",
    "Lokossa",
];

export function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer className="bg-secondary text-white">
            <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
                <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr_1fr_1.2fr]">
                    {/* Marque */}
                    <div>
                        <div className="flex items-center gap-2">
                            <span className="relative flex h-9 w-9 items-center justify-center rounded-full bg-primary-500">
                                <Image src="/logo/logo2_nahun.png" alt="Logo" width={22} height={22} className="object-contain" />
                            </span>
                            <span className="font-heading text-lg font-semibold">
                                NA<span className="text-primary-500">HUN</span>
                            </span>
                        </div>
                        <p className="mt-4 max-w-xs text-body text-white/70">
                            L&apos;information de référence sur le don de sang au Bénin — pour repartir avec des
                            certitudes, pas des doutes.
                        </p>

                        <a href="#eligibilite"
                            className="mt-6 inline-flex items-center gap-1 text-small font-medium text-primary-400 transition-colors hover:text-primary-300"
                        >
                            Tester mon éligibilité
                            <span aria-hidden="true">→</span>
                        </a>
                    </div>

                    {/* Navigation */}
                    <nav aria-label="Navigation du pied de page">
                        <p className="mb-4 text-small font-medium uppercase tracking-wide text-white/40">
                            Navigation
                        </p>
                        <ul className="space-y-3">
                            {NAV_LINKS.map((link) => (
                                <li key={link.href}>

                                    <a href={link.href}
                                        className="text-body text-white/80 transition-colors hover:text-white"
                                    >
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    {/* Villes */}
                    <nav aria-label="Centres par ville">
                        <p className="mb-4 text-small font-medium uppercase tracking-wide text-white/40">
                            Centres par ville
                        </p>
                        <ul className="space-y-3">
                            {VILLES.map((ville) => (
                                <li key={ville}>

                                    <a href={`#centres?ville=${encodeURIComponent(ville)}`}
                                        className="text-body text-white/80 transition-colors hover:text-white"
                                    >
                                        {ville}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    {/* Aide */}
                    <div>
                        <p className="mb-4 text-small font-medium uppercase tracking-wide text-white/40">
                            Une question ?
                        </p>
                        <p className="text-body text-white/80">
                            Beaucoup d&apos;hésitations trouvent leur réponse dans notre FAQ — douleur, durée,
                            préparation, idées reçues.
                        </p>

                        <a href="#faq"
                            className="mt-4 inline-flex items-center gap-1 text-small font-medium text-primary-400 transition-colors hover:text-primary-300"
                        >
                            Consulter la FAQ
                            <span aria-hidden="true">→</span>
                        </a>
                    </div >

                    {/* Barre légale */}
                    < div className="mt-14 flex flex-row gap-4 border-t border-white/10 pt-8 sm:flex-row sm:items-center sm:justify-between" >
                        <p className="text-xs text-white/50">
                            © {year} NAHUN. Les informations de ce site sont données à titre indicatif ; seul un
                            entretien médical professionnel peut confirmer l&apos;aptitude au don.
                        </p>
                    </div >
                </div>
            </div>
        </footer>
    );
}