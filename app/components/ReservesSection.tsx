type ReserveLevel = "critique" | "a-renforcer" | "stable";

interface BloodTypeReserve {
    type: string;
    level: ReserveLevel;
    percent: number;
    compatibility: string;
}

// ⚠️ Pourcentages d'exemple — aucune donnée publique en temps réel par groupe
// n'existe côté ANTS. Les textes de compatibilité, eux, sont des faits médicaux généraux.
const RESERVES: BloodTypeReserve[] = [
    { type: "O−", level: "critique", percent: 18, compatibility: "Donneur universel — compatible avec tous les receveurs, y compris en urgence" },
    { type: "O+", level: "a-renforcer", percent: 48, compatibility: "Groupe le plus courant, donc le plus sollicité au quotidien" },
    { type: "A+", level: "stable", percent: 74, compatibility: "Compatible avec les receveurs A+ et AB+" },
    { type: "A−", level: "a-renforcer", percent: 42, compatibility: "Compatible avec A+, A−, AB+ et AB−" },
    { type: "B+", level: "stable", percent: 68, compatibility: "Compatible avec les receveurs B+ et AB+" },
    { type: "B−", level: "critique", percent: 22, compatibility: "Groupe rare — moins de 2% de la population" },
    { type: "AB+", level: "stable", percent: 80, compatibility: "Receveur universel de plasma" },
    { type: "AB−", level: "critique", percent: 15, compatibility: "Le groupe le plus rare, souvent le plus difficile à reconstituer" },
];

const LEVEL_STYLES: Record<ReserveLevel, { label: string; badge: string; bar: string }> = {
    critique: { label: "Critique", badge: "bg-error-bg text-error-text", bar: "bg-error" },
    "a-renforcer": { label: "À renforcer", badge: "bg-warning-bg text-warning-text", bar: "bg-warning" },
    stable: { label: "Stable", badge: "bg-success-bg text-success-text", bar: "bg-success" },
};

export function ReservesSection() {
    return (
        <section id="reserves" className="bg-white pb-20 sm:pb-28">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="border-t border-neutral-200 pt-16 sm:pt-20">
                    <div className="max-w-2xl">
                        <h2 className="mt-2 text-h2 text-secondary">
                            Pourquoi les réserves varient sans cesse ?
                        </h2>
                        <p className="mt-4 text-body-lg text-tertiary">
                            Au Bénin, la demande en sang dépasse structurellement l&apos;offre disponible.
                            Les pénuries reviennent par cycles, et près de 55% des poches collectées
                            chaque année vont à des enfants de moins de 5 ans. Ce n&apos;est pas une
                            question de rareté ponctuelle d&apos;un groupe sanguin en particulier : c&apos;est
                            un besoin continu, quel que soit votre groupe.
                        </p>
                    </div>

                    <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-small font-medium text-neutral-500">
                        <span className="inline-flex items-center gap-1.5">
                            <span className="h-2 w-2 rounded-full bg-error" aria-hidden="true" />
                            Critique
                        </span>
                        <span className="inline-flex items-center gap-1.5">
                            <span className="h-2 w-2 rounded-full bg-warning" aria-hidden="true" />
                            À renforcer
                        </span>
                        <span className="inline-flex items-center gap-1.5">
                            <span className="h-2 w-2 rounded-full bg-success" aria-hidden="true" />
                            Stable
                        </span>
                    </div>

                    <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        {RESERVES.map((reserve) => {
                            const styles = LEVEL_STYLES[reserve.level];
                            return (
                                <div key={reserve.type} className="rounded-2xl border border-neutral-200 bg-white p-5">
                                    <div className="flex items-center justify-between gap-2">
                                        <p className="font-heading text-h3 text-secondary">{reserve.type}</p>
                                        <span className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-medium ${styles.badge}`}>
                                            {styles.label}
                                        </span>
                                    </div>
                                    <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-neutral-100" aria-hidden="true">
                                        <div className={`h-full rounded-full ${styles.bar}`} style={{ width: `${reserve.percent}%` }} />
                                    </div>
                                    <p className="mt-3 text-small text-tertiary">{reserve.compatibility}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}