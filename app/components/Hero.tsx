"use client";

import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX, Play, Pause } from "lucide-react";
import {
    motion,
    useReducedMotion,
    useScroll,
    useTransform,
} from "framer-motion";

export function HeroSection() {
    const videoRef = useRef<HTMLVideoElement>(null);
    const videoScrollRef = useRef<HTMLDivElement>(null);

    const [muted, setMuted] = useState(true);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isVideoLoaded, setIsVideoLoaded] = useState(false);

    const shouldReduceMotion = useReducedMotion();

    const { scrollYProgress } = useScroll({
        target: videoScrollRef,
        offset: ["start 75%", "end start"],
    });

    const frameMaxWidth = useTransform(
        scrollYProgress,
        [0, 1],
        shouldReduceMotion ? [896, 896] : [896, 1280]
    );

    const frameRadius = useTransform(
        scrollYProgress,
        [0, 1],
        shouldReduceMotion ? [24, 24] : [24, 0]
    );

    const frameShadow = useTransform(
        scrollYProgress,
        [0, 1],
        shouldReduceMotion
            ? [
                "0 20px 50px rgba(0,0,0,0.12)",
                "0 20px 50px rgba(0,0,0,0.12)",
            ]
            : [
                "0 20px 50px rgba(0,0,0,0.12)",
                "0 40px 100px rgba(0,0,0,0.20)",
            ]
    );

    const frameScale = useTransform(
        scrollYProgress,
        [0, 1],
        shouldReduceMotion ? [1, 1] : [1, 1.04]
    );

    useEffect(() => {
        if (!videoRef.current) return;
        videoRef.current.muted = muted;
    }, [muted]);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        const tryAutoplay = async () => {
            try {
                await video.play();
                setIsPlaying(true);
            } catch {
                setIsPlaying(false);
            }
        };

        tryAutoplay();
    }, []);

    const togglePlay = async () => {
        const video = videoRef.current;
        if (!video) return;

        if (video.paused) {
            try {
                await video.play();
                setIsPlaying(true);
            } catch {
                setIsPlaying(false);
            }
        } else {
            video.pause();
            setIsPlaying(false);
        }
    };

    return (
        <section
            id="top"
            className="relative overflow-x-hidden bg-white pt-32 pb-20 sm:pt-40 sm:pb-28"
        >
            <div
                className="pointer-events-none absolute -right-32 top-16 h-[420px] w-[420px] rounded-full bg-primary-50 blur-3xl"
                aria-hidden="true"
            />

            <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8">
                <div>
                    <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-primary-100 bg-primary-50 py-1.5 pl-1.5 pr-4">
                        <span className="rounded-full bg-primary-500 px-2.5 py-1 font-heading text-xs font-semibold text-white">
                            NA HUN
                        </span>
                        <span className="text-small text-primary-700">
                            « donner du sang », en fongbé
                        </span>
                    </div>

                    <h1 className="text-h1 max-w-xl text-secondary">
                        Toutes les trois minutes,
                        <br />
                        <span className="text-primary-500">
                            quelqu&apos;un attend une poche de sang.
                        </span>
                    </h1>

                    <div className="mt-6 max-w-lg space-y-4 text-body-lg text-tertiary">
                        <p>
                            Au Bénin, ce sont d&apos;abord des enfants et des femmes qui en ont besoin le
                            plus souvent à cause du paludisme ou de complications liées à la grossesse. Le
                            sang ne se fabrique pas et ne s&apos;achète pas : la seule façon d&apos;en
                            disposer, c&apos;est qu&apos;une personne en bonne santé en fasse don à une autre.
                        </p>
                        <p>
                            Un don de sang total est ensuite séparé en trois composants, chacun destiné à un
                            patient différent.{" "}
                            <span className="font-medium text-[#c13e32]">
                                <br />
                                Nă hun{" "}
                            </span>
                            ( donner du sang ): c&apos;est donc un seul geste qui peut en aider plusieurs.
                        </p>
                    </div>

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

                    <dl className="mt-12 grid max-w-lg gap-6 border-t border-neutral-200 pt-6 sm:grid-cols-3">
                        <div>
                            <dd className="font-heading text-h3 text-secondary">3 min</dd>
                            <dt className="mt-1 text-small text-tertiary">
                                intervalle moyen entre deux demandes de poche de sang au Bénin
                            </dt>
                        </div>
                        <div>
                            <dd className="font-heading text-h3 text-secondary">51%</dd>
                            <dt className="mt-1 text-small text-tertiary">
                                de ces demandes concernent des enfants
                            </dt>
                        </div>
                        <div>
                            <dd className="font-heading text-h3 text-secondary">1%</dd>
                            <dt className="mt-1 text-small text-tertiary">
                                de la population donneuse, seuil minimum recommandé par l&apos;OMS
                            </dt>
                        </div>
                    </dl>
                </div>

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

            <div className="relative mx-auto mt-16 max-w-4xl px-4 text-center sm:px-6 md:mt-24 lg:px-8">
                <h2 className="mt-2 text-h2 text-secondary">
                    Un processus simple et rassurant
                </h2>
                <p className="mx-auto mt-3 max-w-2xl text-body text-tertiary">
                    Découvrez comment se déroule un don de sang, de l&apos;accueil à la collation.
                </p>
            </div>

            <div
                ref={videoScrollRef}
                className="relative mt-8 min-h-[130vh] md:min-h-[170vh]"
            >
                <div className="sticky top-20 md:top-24">
                    <div className="flex justify-center px-4 sm:px-6 lg:px-8">
                        <motion.div
                            style={{
                                maxWidth: frameMaxWidth,
                                borderRadius: frameRadius,
                                boxShadow: frameShadow,
                                scale: frameScale,
                            }}
                            className="relative aspect-video w-full overflow-hidden bg-neutral-950"
                        >
                            {!isVideoLoaded && (
                                <div className="absolute inset-0 flex items-center justify-center bg-neutral-100">
                                    <div className="animate-pulse text-neutral-400">
                                        Chargement de la vidéo...
                                    </div>
                                </div>
                            )}

                            <video
                                ref={videoRef}
                                className="h-full w-full object-cover"
                                autoPlay
                                muted={muted}
                                loop
                                playsInline
                                preload="metadata"
                                poster="/videos/hero-don-poster.png"
                                onLoadedData={() => setIsVideoLoaded(true)}
                                onClick={togglePlay}
                                onPlay={() => setIsPlaying(true)}
                                onPause={() => setIsPlaying(false)}
                            >
                                <source src="/videos/video2.mp4" type="video/mp4" />
                                <track
                                    kind="captions"
                                    src="/videos/hero-don-fr.vtt"
                                    srcLang="fr"
                                    label="Français"
                                    default
                                />
                                Votre navigateur ne supporte pas la lecture vidéo.
                            </video>

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
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}