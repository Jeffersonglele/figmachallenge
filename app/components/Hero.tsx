"use client";

import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

export function HeroSection() {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [muted, setMuted] = useState(true);

    // React ne synchronise pas toujours fiablement la prop `muted` sur le DOM
    // (bug connu) — on force l'état directement sur l'élément vidéo.
    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.muted = muted;
        }
    }, [muted]);

    return (
        <section
            id="top"
            className="relative overflow-hidden bg-white pt-32 pb-24 sm:pt-40 sm:pb-32"
        >
            {/* Accent de fond très discret — pas de dégradé sombre générique */}
            <div
                className="pointer-events-none absolute -right-32 top-16 h-[420px] w-[420px] rounded-full bg-primary-50 blur-3xl"
                aria-hidden="true"
            />

            <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8">
                {/* Colonne texte */}
                <div>
                    <p className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary-50 px-3 py-1 text-small font-medium text-primary-600">
                        <span className="h-1.5 w-1.5 rounded-full bg-primary-500" aria-hidden="true" />
                        Don de sang au Bénin
                    </p>

                    <h1 className="text-h1 max-w-xl text-secondary">
                        Dix minutes de votre temps.
                        <br />
                        <span className="text-primary-500">Trois vies sauvées.</span>
                    </h1>

                    <p className="mt-6 max-w-md text-body-lg text-tertiary">
                        Un don de sang total est séparé en trois composants — globules
                        rouges, plasma et plaquettes. Chacun est destiné à un patient
                        différent : accidenté, personne opérée, malade chronique. Un
                        seul geste peut donc aider jusqu&apos;à trois personnes.
                    </p>

                    <div className="mt-8 flex flex-wrap items-center gap-4">
                        <a
                            href="#eligibilite"
                            className="rounded-full bg-primary-500 px-6 py-3 text-body font-medium text-white transition-colors hover:bg-primary-600"
                        >
                            Tester mon éligibilité
                        </a>

                        <a
                            href="#reserves"
                            className="inline-flex items-center gap-1 text-body font-medium text-secondary transition-colors hover:text-primary-500"
                        >
                            Voir l&apos;état des réserves
                            <span aria-hidden="true">→</span>
                        </a>
                    </div>

                    {/* Chips de contexte — faits vérifiables uniquement */}
                    <dl className="mt-12 grid max-w-md grid-cols-3 gap-4 border-t border-neutral-200 pt-6">
                        <div>
                            <dt className="text-small text-neutral-500">Composants</dt>
                            <dd className="font-heading text-h4 text-secondary">3</dd>
                        </div>
                        <div>
                            <dt className="text-small text-neutral-500">Centres partenaires</dt>
                            <dd className="font-heading text-h4 text-secondary">8+</dd>
                        </div>
                        <div>
                            <dt className="text-small text-neutral-500">Durée moyenne</dt>
                            <dd className="font-heading text-h4 text-secondary">~10 min</dd>
                        </div>
                    </dl>
                </div>

                {/* Colonne visuelle — la goutte scindée en 3, signature de la page */}
                <div className="relative mx-auto w-full max-w-sm">
                    <svg
                        viewBox="0 0 280 340"
                        className="h-auto w-full"
                        role="img"
                        aria-label="Une goutte de sang divisée en trois parts égales, représentant les globules rouges, le plasma et les plaquettes issus d'un même don."
                    >
                        <defs>
                            <clipPath id="dropClip">
                                <path d="M140 10 C190 90 245 160 245 220 A105 105 0 1 1 35 220 C35 160 90 90 140 10Z" />
                            </clipPath>
                        </defs>

                        <g clipPath="url(#dropClip)">
                            <rect x="0" y="10" width="280" height="110" fill="var(--color-primary-500)" />
                            <rect x="0" y="120" width="280" height="105" fill="var(--color-primary-300)" />
                            <rect x="0" y="225" width="280" height="105" fill="var(--color-primary-100)" />
                        </g>

                        <path
                            d="M140 10 C190 90 245 160 245 220 A105 105 0 1 1 35 220 C35 160 90 90 140 10Z"
                            fill="none"
                            stroke="var(--color-secondary)"
                            strokeWidth="1.5"
                        />

                        <line x1="35" y1="120" x2="245" y2="120" stroke="white" strokeWidth="1.5" opacity="0.6" />
                        <line x1="30" y1="225" x2="250" y2="225" stroke="white" strokeWidth="1.5" opacity="0.6" />
                    </svg>

                    <ul className="mt-4 space-y-2">
                        <li className="flex items-center gap-2 text-small text-tertiary">
                            <span className="h-2.5 w-2.5 rounded-full bg-primary-500" aria-hidden="true" />
                            Globules rouges — transport de l&apos;oxygène
                        </li>
                        <li className="flex items-center gap-2 text-small text-tertiary">
                            <span className="h-2.5 w-2.5 rounded-full bg-primary-300" aria-hidden="true" />
                            Plasma — coagulation, chirurgies
                        </li>
                        <li className="flex items-center gap-2 text-small text-tertiary">
                            <span className="h-2.5 w-2.5 rounded-full bg-primary-100" aria-hidden="true" />
                            Plaquettes — cancers, hémorragies
                        </li>
                    </ul>
                </div>
            </div>

            {/* Bloc vidéo — centré, contenu, ne prend pas tout le fond de section */}
            <div className="relative mx-auto mt-16 max-w-3xl px-4 sm:px-6 md:mt-20 lg:px-8">
                <div className="text-center">
                    <p className="text-small font-medium uppercase tracking-wide text-primary-600">
                        En quelques secondes
                    </p>
                    <h2 className="mt-2 text-h3 text-secondary">
                        Un accueil pensé pour vous mettre à l&apos;aise
                    </h2>
                </div>

                <div className="relative mt-6 overflow-hidden rounded-2xl border border-neutral-200 shadow-xl">
                    <video
                        ref={videoRef}
                        className="aspect-video w-full bg-neutral-100 object-cover"
                        autoPlay
                        muted
                        loop
                        playsInline
                        preload="metadata"
                        poster="/videos/hero-don-poster.png"
                    >
                        <source src="/videos/hero-don.mp4" type="video/mp4" />
                        <track
                            kind="captions"
                            src="/videos/hero-don-fr.vtt"
                            srcLang="fr"
                            label="Français"
                            default
                        />
                        Votre navigateur ne prend pas en charge la lecture vidéo.
                    </video>

                    <button
                        type="button"
                        onClick={() => setMuted((m) => !m)}
                        aria-pressed={!muted}
                        aria-label={muted ? "Activer le son de la vidéo" : "Couper le son de la vidéo"}
                        className="absolute bottom-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-secondary/70 text-white backdrop-blur transition-colors hover:bg-secondary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                    >
                        {muted ? (
                            <VolumeX className="h-5 w-5" aria-hidden="true" />
                        ) : (
                            <Volume2 className="h-5 w-5" aria-hidden="true" />
                        )}
                    </button>
                </div>
            </div>
        </section>
    );
}