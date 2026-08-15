type Myth = { id: string; claim: string; reality: string };
type FAQItem = { id: string; question: string; answer: string };

const MYTHS: Myth[] = [
    {
        id: "douleur",
        claim: "Donner son sang est très douloureux.",
        reality:
            "La sensation se limite à une piqûre brève, comparable à une prise de sang classique. L'aiguille reste en place le temps du prélèvement, sans douleur continue.",
    },
    {
        id: "maladie",
        claim: "On peut attraper une maladie en donnant son sang.",
        reality:
            "Chaque don utilise du matériel stérile à usage unique, ouvert devant vous. Le risque de contamination pour le donneur est nul.",
    },
    {
        id: "duree",
        claim: "Il faut prévoir toute une demi-journée.",
        reality:
            "Le prélèvement lui-même dure environ 10 minutes. En comptant l'accueil, l'entretien médical et une pause après le don, la visite complète tourne autour de 45 minutes.",
    },
    {
        id: "regles",
        claim: "On ne peut pas donner pendant ses règles.",
        reality:
            "Les règles ne sont pas un critère d'exclusion. Seuls l'âge, le poids et le délai depuis un don précédent sont vérifiés lors de l'entretien.",
    },
    {
        id: "gratuit",
        claim: "Le don de sang est payant, comme à l'étranger parfois.",
        reality:
            "Le don est entièrement bénévole et gratuit, aussi bien pour le donneur que pour le patient receveur.",
    },
];

const FAQS: FAQItem[] = [
    {
        id: "manger",
        question: "Dois-je être à jeun avant de donner ?",
        answer:
            "Non, au contraire : mangez normalement avant votre venue et évitez le jeûne. Buvez également un peu plus d'eau que d'habitude dans les heures précédant le don.",
    },
    {
        id: "medicaments",
        question: "Je prends des médicaments, puis-je quand même donner ?",
        answer:
            "Cela dépend du traitement. Signalez-le lors de l'entretien médical avant le don : le personnel soignant évaluera si votre situation permet un don ce jour-là.",
    },
    {
        id: "malaise",
        question: "Que se passe-t-il si je me sens mal pendant ou après le don ?",
        answer:
            "Le personnel est formé pour ce type de situation. Un espace de repos avec collation est prévu après chaque don, et vous êtes surveillé le temps nécessaire avant de repartir.",
    },
    {
        id: "composant",
        question: "Puis-je choisir ce que je donne (sang total, plasma, plaquettes) ?",
        answer:
            "Un don de sang total est ensuite séparé en trois composants par le centre. Certains centres proposent aussi le don de plasma ou de plaquettes seuls, sur demande et selon votre profil.",
    },
    {
        id: "delai",
        question: "Combien de temps dois-je attendre avant de redonner ?",
        answer:
            "Le délai minimum est de 3 mois pour un homme et 4 mois pour une femme après un don. Utilisez le simulateur d'éligibilité pour vérifier votre prochaine date possible.",
    },
];

export function FaqSection() {
    return (
        <section id="faq" className="bg-white py-20 sm:py-28">
            <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                <p className="mb-3 text-small font-medium uppercase tracking-wide text-primary-500">
                    FAQ &amp; idées reçues
                </p>
                <h2 className="text-h2 max-w-2xl text-secondary">
                    Vos craintes, une par une
                </h2>
                <p className="mt-4 max-w-xl text-body-lg text-tertiary">
                    La plupart des hésitations viennent d&apos;idées reçues plutôt que de la réalité du don.
                    Voici ce qui vous attend vraiment.
                </p>

                {/* Idées reçues — format mythe / réalité */}
                <div className="mt-12 space-y-3">
                    {MYTHS.map((myth) => (
                        <details
                            key={myth.id}
                            className="group rounded-lg border border-neutral-200 open:border-primary-200"
                        >
                            <summary className="flex cursor-pointer list-none items-start justify-between gap-4 px-5 py-4 marker:content-none">
                                <span className="flex items-start gap-3">
                                    <span
                                        className="mt-0.5 shrink-0 rounded-full bg-error-bg px-2 py-0.5 text-xs font-medium text-error-text"
                                        aria-hidden="true"
                                    >
                                        Idée reçue
                                    </span>
                                    <span className="text-body font-medium text-secondary">{myth.claim}</span>
                                </span>
                                <svg
                                    className="mt-1 h-5 w-5 shrink-0 text-neutral-400 transition-transform duration-200 group-open:rotate-180"
                                    viewBox="0 0 20 20"
                                    fill="none"
                                    aria-hidden="true"
                                >
                                    <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </summary>
                            <div className="px-5 pb-5 pl-[4.75rem]">
                                <p className="flex items-start gap-2 text-body text-tertiary">
                                    <span
                                        className="mt-0.5 shrink-0 rounded-full bg-success-bg px-2 py-0.5 text-xs font-medium text-success-text"
                                        aria-hidden="true"
                                    >
                                        Réalité
                                    </span>
                                    <span>{myth.reality}</span>
                                </p>
                            </div>
                        </details>
                    ))}
                </div>

                {/* Questions pratiques — Q&A classique */}
                <h3 className="mt-16 mb-6 font-heading text-h4 text-secondary">Questions pratiques</h3>
                <div className="space-y-3">
                    {FAQS.map((faq) => (
                        <details
                            key={faq.id}
                            className="group rounded-lg border border-neutral-200 open:border-primary-200"
                        >
                            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 marker:content-none">
                                <span className="text-body font-medium text-secondary">{faq.question}</span>
                                <svg
                                    className="h-5 w-5 shrink-0 text-neutral-400 transition-transform duration-200 group-open:rotate-180"
                                    viewBox="0 0 20 20"
                                    fill="none"
                                    aria-hidden="true"
                                >
                                    <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </summary>
                            <div className="px-5 pb-5">
                                <p className="text-body text-tertiary">{faq.answer}</p>
                            </div>
                        </details>
                    ))}
                </div>

                <div className="mt-12 flex flex-col items-start gap-4 rounded-lg bg-primary-50 p-6 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-body text-tertiary">
                        Une question qui ne trouve pas de réponse ici ?
                    </p>

                    <a href="#eligibilite"
                        className="shrink-0 rounded-full bg-primary-500 px-5 py-2.5 text-small font-medium text-white transition-colors hover:bg-primary-600"
                    >
                        Vérifier mon éligibilité
                    </a>
                </div>
            </div>
        </section >
    );
}