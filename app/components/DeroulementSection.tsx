import {
    UserCheck,
    Stethoscope,
    Droplet,
    Utensils,
    Clock,
    ClipboardCheck,
    HeartHandshake,
    Coffee,
} from "lucide-react";

const STEPS = [
    {
        icon: UserCheck,
        title: "Accueil & inscription",
        duration: "~10 min",
        description:
            "Présentez une pièce d'identité et remplissez un questionnaire confidentiel sur votre état de santé général.",
    },
    {
        icon: Stethoscope,
        title: "Entretien médical",
        duration: "~10 min",
        description:
            "Un professionnel de santé vérifie votre aptitude au don lors d'un échange individuel et confidentiel.",
    },
    {
        icon: Droplet,
        title: "Le don",
        duration: "~10 min",
        description:
            "Installé·e confortablement, le prélèvement à proprement parler ne dure qu'une dizaine de minutes.",
    },
    {
        icon: Utensils,
        title: "Collation & repos",
        duration: "~15 min",
        description:
            "Une collation sucrée et salée vous est proposée, accompagnée d'un temps de repos surveillé sur place.",
    },
];

const PREP_COLUMNS = [
    {
        icon: ClipboardCheck,
        title: "Avant",
        items: [
            "Mangez normalement avant de venir — ne venez pas à jeun",
            "Hydratez-vous bien dans les heures précédentes",
            "Dormez suffisamment la nuit précédente",
            "Munissez-vous d'une pièce d'identité",
        ],
    },
    {
        icon: HeartHandshake,
        title: "Pendant",
        items: [
            "Signalez tout malaise ou inquiétude au personnel soignant",
            "Respirez calmement, détendez le bras",
            "N'hésitez pas à poser vos questions",
        ],
    },
    {
        icon: Coffee,
        title: "Après",
        items: [
            "Restez assis·e quelques minutes avant de vous lever",
            "Profitez de la collation proposée sur place",
            "Évitez les efforts physiques intenses le reste de la journée",
            "Continuez à bien vous hydrater, évitez l'alcool",
        ],
    },
];

export function DeroulementSection() {
    return (
        <section id="deroulement" className="bg-white py-20 sm:py-28">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="max-w-2xl">
                    <p className="text-small font-medium uppercase tracking-wide text-primary-600">
                        Le jour J
                    </p>
                    <h2 className="mt-2 text-h2 text-secondary">Comment se passe un don ?</h2>
                    <p className="mt-4 text-body-lg text-tertiary">
                        De l&apos;accueil à la collation, voici à quoi vous attendre — et comment
                        vous y préparer au mieux.
                    </p>

                    <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary-50 px-4 py-2 text-small font-medium text-primary-600">
                        <Clock className="h-4 w-4 shrink-0" aria-hidden="true" />
                        Environ 45 minutes au total — le prélèvement en lui-même ne dure
                        qu&apos;une dizaine de minutes
                    </div>
                </div>

                {/* C4 — Timeline du parcours */}
                <ol className="mt-14 max-w-2xl space-y-8">
                    {STEPS.map((step, i) => (
                        <li key={step.title} className="flex gap-4 sm:gap-6">
                            <div className="flex flex-col items-center">
                                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-500 text-white">
                                    <step.icon className="h-5 w-5" aria-hidden="true" />
                                </span>
                                {i < STEPS.length - 1 && (
                                    <span
                                        className="mt-2 w-px flex-1 bg-neutral-200"
                                        aria-hidden="true"
                                    />
                                )}
                            </div>
                            <div className="pb-2">
                                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                                    <h3 className="text-h4 text-secondary">{step.title}</h3>
                                    <span className="text-small font-medium text-primary-600">
                                        {step.duration}
                                    </span>
                                </div>
                                <p className="mt-1.5 max-w-xl text-body text-tertiary">
                                    {step.description}
                                </p>
                            </div>
                        </li>
                    ))}
                </ol>

                {/* C5 — Préparation avant / pendant / après */}
                <div className="mt-20">
                    <h3 className="text-h3 text-secondary">Bien préparer sa visite</h3>
                    <p className="mt-2 max-w-xl text-body text-tertiary">
                        Quelques conseils simples pour aborder votre don sereinement.
                    </p>

                    <div className="mt-8 grid gap-6 sm:grid-cols-3">
                        {PREP_COLUMNS.map(({ icon: Icon, title, items }) => (
                            <div
                                key={title}
                                className="rounded-2xl border border-neutral-200 bg-white p-6"
                            >
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-50 text-primary-600">
                                    <Icon className="h-5 w-5" aria-hidden="true" />
                                </div>
                                <h4 className="mt-4 text-h4 text-secondary">{title}</h4>
                                <ul className="mt-3 space-y-2">
                                    {items.map((item) => (
                                        <li key={item} className="flex gap-2 text-body text-tertiary">
                                            <span
                                                className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-primary-400"
                                                aria-hidden="true"
                                            />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
