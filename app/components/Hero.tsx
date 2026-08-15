"use client";

import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX, Play, Pause } from "lucide-react";
import Image from "next/image";

export function HeroSection() {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [muted, setMuted] = useState(true);
    const [isPlaying, setIsPlaying] = useState(true);
    const [isVideoLoaded, setIsVideoLoaded] = useState(false);

    // Gestion du son et de la lecture
    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.muted = muted;
            videoRef.current.play().catch(e => console.log("Autoplay prevented:", e));
        }
    }, [muted]);

    const togglePlay = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
            } else {
                videoRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    return (
        <section
            id="top"
            className="relative overflow-hidden bg-white pt-24 pb-20 sm:pt-32 sm:pb-24"
        >
            {/* Fond décoratif subtil */}
            <div
                className="pointer-events-none absolute -right-40 top-0 h-[500px] w-[500px] rounded-full bg-primary-50/50 blur-3xl"
                aria-hidden="true"
            />

            <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
                {/* Colonne texte - améliorée */}
                <div className="space-y-6">
                    <div className="mb-8">
                        <p
                            className="font-heading leading-none tracking-tight text-primary-500"
                            style={{
                                fontSize: "clamp(3.5rem, 10vw, 7.5rem)",
                                letterSpacing: "-0.03em",
                                lineHeight: "0.9"
                            }}
                            aria-hidden="true"
                        >
                            NA HUN
                        </p>
                        <p className="mt-3 max-w-sm text-small text-tertiary">
                            En fon, <em className="italic">« hùn »</em> signifie <strong className="font-semibold">« sang »</strong> et <em className="italic">« na »</em> veut dire
                            <strong className="font-semibold"> donner</strong>. Un geste simple qui sauve des vies.
                        </p>
                    </div>

                    <h1 className="text-h1 font-bold text-secondary leading-tight">
                        Donne ton sang.
                        <br />
                        <span className="text-primary-500">Sauve trois vies.</span>
                    </h1>

                    <p className="max-w-lg text-body-lg text-tertiary leading-relaxed">
                        Chaque don de sang est séparé en trois composants essentiels :
                        globules rouges, plasma et plaquettes. Chacun peut sauver une vie différente -
                        accident, chirurgie ou maladie chronique. Votre don compte.
                    </p>

                    <div className="flex flex-wrap items-center gap-4 pt-2">
                        <a
                            href="#eligibilite"
                            className="rounded-full bg-primary-500 px-6 py-3 text-body font-medium text-white transition-all hover:bg-primary-600 hover:shadow-lg"
                        >
                            Vérifier mon éligibilité
                        </a>

                        <a
                            href="#reserves"
                            className="inline-flex items-center gap-1.5 text-body font-medium text-secondary transition-colors hover:text-primary-500 group"
                        >
                            État des réserves
                            <span className="transition-transform group-hover:translate-x-1">→</span>
                        </a>
                    </div>

                    {/* Statistiques améliorées */}
                    <dl className="mt-10 grid grid-cols-3 gap-6 border-t border-neutral-200 pt-8">
                        <div className="text-center">
                            <dt className="text-small text-neutral-500">Composants</dt>
                            <dd className="font-heading text-h3 font-bold text-secondary mt-1">3</dd>
                        </div>
                        <div className="text-center">
                            <dt className="text-small text-neutral-500">Centres</dt>
                            <dd className="font-heading text-h3 font-bold text-secondary mt-1">8+</dd>
                        </div>
                        <div className="text-center">
                            <dt className="text-small text-neutral-500">Don</dt>
                            <dd className="font-heading text-h3 font-bold text-secondary mt-1">Gratuit</dd>
                        </div>
                    </dl>
                </div>

                {/* Colonne visuelle - améliorée */}
                <div className="relative flex flex-col items-center">
                    <div className="relative w-full max-w-sm">
                        {/* Goutte de sang améliorée */}
                        <svg
                            viewBox="0 0 280 340"
                            className="h-auto w-full drop-shadow-xl"
                            role="img"
                            aria-label="Goutte de sang divisée en trois composants"
                        >
                            <defs>
                                <clipPath id="dropClip">
                                    <path d="M140 10 C190 90 245 160 245 220 A105 105 0 1 1 35 220 C35 160 90 90 140 10Z" />
                                </clipPath>
                                <linearGradient id="redGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                                    <stop offset="0%" stopColor="var(--color-primary-500)" />
                                    <stop offset="100%" stopColor="var(--color-primary-600)" />
                                </linearGradient>
                                <linearGradient id="plasmaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                                    <stop offset="0%" stopColor="var(--color-primary-300)" />
                                    <stop offset="100%" stopColor="var(--color-primary-400)" />
                                </linearGradient>
                            </defs>

                            <g clipPath="url(#dropClip)">
                                <rect x="0" y="10" width="280" height="110" fill="url(#redGradient)" />
                                <rect x="0" y="120" width="280" height="105" fill="url(#plasmaGradient)" />
                                <rect x="0" y="225" width="280" height="105" fill="var(--color-primary-100)" />
                            </g>

                            <path
                                d="M140 10 C190 90 245 160 245 220 A105 105 0 1 1 35 220 C35 160 90 90 140 10Z"
                                fill="none"
                                stroke="var(--color-secondary)"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                            />

                            <line x1="35" y1="120" x2="245" y2="120" stroke="white" strokeWidth="1.5" strokeOpacity="0.6" />
                            <line x1="30" y1="225" x2="250" y2="225" stroke="white" strokeWidth="1.5" strokeOpacity="0.6" />
                        </svg>

                        {/* Légende améliorée */}
                        <ul className="mt-4 space-y-2.5">
                            {[
                                { color: "bg-primary-500", text: "Globules rouges - Transport d'oxygène" },
                                { color: "bg-primary-300", text: "Plasma - Coagulation et chirurgies" },
                                { color: "bg-primary-100", text: "Plaquettes - Cancers et hémorragies" }
                            ].map((item, index) => (
                                <li key={index} className="flex items-center gap-2.5 text-small text-tertiary">
                                    <span className={`h-2.5 w-2.5 rounded-full ${item.color} shadow-sm`} aria-hidden="true" />
                                    <span className="font-medium">{item.text}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            {/* Section vidéo améliorée */}
            <div className="relative mx-auto mt-16 max-w-4xl px-4 sm:px-6 md:mt-24 lg:px-8">
                <div className="text-center mb-6">
                    <p className="text-small font-medium uppercase tracking-wider text-primary-600">
                        Le don en action
                    </p>
                    <h2 className="mt-2 text-h2 font-bold text-secondary">
                        Un processus simple et rassurant
                    </h2>
                    <p className="mt-3 max-w-2xl mx-auto text-body text-tertiary">
                        Découvrez comment se déroule un don de sang, de l'accueil à la collation.
                        Moins de 10 minutes pour sauver des vies.
                    </p>
                </div>

                <div className="relative aspect-video overflow-hidden rounded-2xl shadow-2xl">
                    {!isVideoLoaded && (
                        <div className="absolute inset-0 bg-neutral-100 flex items-center justify-center">
                            <div className="animate-pulse text-neutral-400">
                                Chargement de la vidéo...
                            </div>
                        </div>
                    )}

                    <video
                        ref={videoRef}
                        className="w-full h-full object-cover"
                        autoPlay
                        muted={muted}
                        loop
                        playsInline
                        preload="metadata"
                        poster="/videos/hero-don-poster.png"
                        onLoadedData={() => setIsVideoLoaded(true)}
                        onClick={togglePlay}
                    >
                        <source src="/videos/hero-don.mp4" type="video/mp4" />
                        <track
                            kind="captions"
                            src="/videos/hero-don-fr.vtt"
                            srcLang="fr"
                            label="Français"
                            default
                        />
                        Votre navigateur ne supporte pas la lecture vidéo.
                    </video>

                    {/* Contrôles vidéo améliorés */}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-4">
                        <div className="flex items-center justify-between">
                            <button
                                type="button"
                                onClick={togglePlay}
                                aria-label={isPlaying ? "Pause" : "Lecture"}
                                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-sm transition-colors hover:bg-white/30"
                            >
                                {isPlaying ? (
                                    <Pause className="h-5 w-5" />
                                ) : (
                                    <Play className="h-5 w-5" />
                                )}
                            </button>

                            <button
                                type="button"
                                onClick={() => setMuted((m) => !m)}
                                aria-label={muted ? "Activer le son" : "Couper le son"}
                                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-sm transition-colors hover:bg-white/30"
                            >
                                {muted ? (
                                    <VolumeX className="h-5 w-5" />
                                ) : (
                                    <Volume2 className="h-5 w-5" />
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}