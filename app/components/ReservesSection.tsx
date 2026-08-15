type ReserveLevel = "critique" | "a-renforcer" | "stable";

interface BloodTypeReserve {
    type: string;
    level: ReserveLevel;
    percent: number;
    note: string;
}

// ⚠️ Données d'exemple à visée illustrative — à connecter aux stocks réels de l'ANTS.
const RESERVES: BloodTypeReserve[] = [
    {
        type: "O−",
        level: "critique",
        percent: 18,
        note: "Donneur universel — besoin constant et prioritaire",
    },
    {
        type: "O+",
        level: "a-renforcer",
        percent: 48,
        note: "Groupe le plus demandé, à reconstituer régulièrement",
    },
    { type: "A+", level: "stable", percent: 74, note: "Stock actuellement suffisant" },
    {
        type: "A−",
        level: "a-renforcer",
        percent: 42,
        note: "Stock à surveiller dans les prochains jours",
    },
    { type: "B+", level: "stable", percent: 68, note: "Stock actuellement suffisant" },
    { type: "B−", level: "critique", percent: 22, note: "Groupe rare, besoin urgent" },
    {
        type: "AB+",
        level: "stable",
        percent: 80,
        note: "Receveur universel de plasma, stock confortable",
    },
    { type: "AB−", level: "critique", percent: 15, note: "Groupe le plus rare, besoin urgent" },
];

const LEVEL_STYLES: Record<ReserveLevel, { label: string; badge: string; bar: string }> = {
    critique: { label: "Critique", badge: "bg-error-bg text-error-text", bar: "bg-error" },
    "a-renforcer": {
        label: "À renforcer",
        badge: "bg-warning-bg text-warning-text",
        bar: "bg-warning",
    },
    stable: { label: "Stable", badge: "bg-success-bg text-success-text", bar: "bg-success" },
};

export function ReservesSection() {
    return (
        <section id="reserves" className="bg-white pb-20 sm:pb-28">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="border-t border-neutral-200 pt-16 sm:pt-20">
                    <div className="max-w-2xl">
                        <p className="text-small font-medium uppercase tracking-wide text-primary-600">
                            État des réserves
                        </p>
                        <h2 className="mt-2 text-h2 text-secondary">
                            Besoins actuels par groupe sanguin
                        </h2>
                        <p className="mt-4 text-body-lg text-tertiary">
                            Certains groupes sont plus rares ou plus demandés que d&apos;autres — voici
                            où votre don compte le plus en ce moment.
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
                                <div
                                    key={reserve.type}
                                    className="rounded-2xl border border-neutral-200 bg-white p-5"
                                >
                                    <div className="flex items-center justify-between gap-2">
                                        <p className="font-heading text-h3 text-secondary">
                                            {reserve.type}
                                        </p>
                                        <span
                                            className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-medium ${styles.badge}`}
                                        >
                                            {styles.label}
                                        </span>
                                    </div>
                                    <div
                                        className="mt-4 h-2 w-full overflow-hidden rounded-full bg-neutral-100"
                                        aria-hidden="true"
                                    >
                                        <div
                                            className={`h-full rounded-full ${styles.bar}`}
                                            style={{ width: `${reserve.percent}%` }}
                                        />
                                    </div>
                                    <p className="mt-3 text-small text-tertiary">{reserve.note}</p>
                                </div>
                            );
                        })}
                    </div>

                    <p className="mt-6 text-xs text-neutral-400">
                        Données d&apos;exemple à visée illustrative — à connecter aux stocks réels de
                        l&apos;ANTS.
                    </p>
                </div>
            </div>
        </section>
    );
}
