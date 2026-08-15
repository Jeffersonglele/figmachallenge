"use client";

import { FormEvent, useState } from "react";
import {
    Calendar,
    Scale,
    History,
    HeartPulse,
    CheckCircle2,
    XCircle,
    Clock3,
    ClipboardList,
    Loader2,
} from "lucide-react";
import {
    checkEligibility,
    formatDateFr,
    type EligibilityResult,
    type Gender,
} from "@/lib/eligibility";

const CRITERES = [
    {
        icon: Calendar,
        label: "Âge",
        value: "Entre 18 et 65 ans révolus",
    },
    {
        icon: Scale,
        label: "Poids",
        value: "50 kg minimum",
    },
    {
        icon: History,
        label: "Délai entre deux dons",
        value: "3 mois (hommes) · 4 mois (femmes)",
    },
    {
        icon: HeartPulse,
        label: "État de santé",
        value: "Bonne forme le jour du don, confirmée à l'entretien médical",
    },
];

type SimStatus = "idle" | "loading" | "eligible" | "not-eligible" | "pending";

interface FormValues {
    age: string;
    weight: string;
    gender: Gender | "";
    hasDonatedBefore: "oui" | "non" | "";
    lastDonationDate: string;
}

type FormErrors = Partial<Record<keyof FormValues, string>>;

const INITIAL_FORM: FormValues = {
    age: "",
    weight: "",
    gender: "",
    hasDonatedBefore: "",
    lastDonationDate: "",
};

const TODAY_ISO = new Date().toISOString().split("T")[0];

export function EligibilitySection() {
    const [form, setForm] = useState<FormValues>(INITIAL_FORM);
    const [errors, setErrors] = useState<FormErrors>({});
    const [status, setStatus] = useState<SimStatus>("idle");
    const [result, setResult] = useState<EligibilityResult | null>(null);

    function updateField<K extends keyof FormValues>(key: K, value: FormValues[K]) {
        setForm((prev) => ({ ...prev, [key]: value }));
    }

    function handleSubmit(e: FormEvent) {
        e.preventDefault();

        const nextErrors: FormErrors = {};
        const ageNum = Number(form.age);
        const weightNum = Number(form.weight);

        if (!form.age || Number.isNaN(ageNum) || ageNum < 1 || ageNum > 120) {
            nextErrors.age = "Merci d'indiquer votre âge (entre 1 et 120 ans).";
        }
        if (!form.weight || Number.isNaN(weightNum) || weightNum < 1 || weightNum > 300) {
            nextErrors.weight = "Merci d'indiquer votre poids en kg (entre 1 et 300 kg).";
        }
        if (!form.gender) {
            nextErrors.gender = "Merci de préciser votre sexe pour calculer le délai applicable.";
        }
        if (!form.hasDonatedBefore) {
            nextErrors.hasDonatedBefore = "Merci d'indiquer si vous avez déjà donné votre sang.";
        }
        if (form.hasDonatedBefore === "oui") {
            if (!form.lastDonationDate) {
                nextErrors.lastDonationDate = "Merci d'indiquer la date de votre dernier don.";
            } else if (new Date(form.lastDonationDate) > new Date()) {
                nextErrors.lastDonationDate = "Cette date ne peut pas être dans le futur.";
            }
        }

        setErrors(nextErrors);

        if (Object.keys(nextErrors).length > 0) {
            return;
        }

        setStatus("loading");
        setResult(null);

        // Pas de backend : léger délai simulé pour un retour d'interface
        // cohérent (état de chargement explicite exigé par le brief).
        window.setTimeout(() => {
            const res = checkEligibility({
                age: ageNum,
                weight: weightNum,
                gender: form.gender as Gender,
                hasDonatedBefore: form.hasDonatedBefore === "oui",
                lastDonationDate: form.hasDonatedBefore === "oui" ? form.lastDonationDate : null,
            });
            setResult(res);
            setStatus(res.status);
        }, 600);
    }

    return (
        <section id="eligibilite" className="bg-neutral-50 py-20 sm:py-28">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="max-w-2xl">
                    <h2 className="mt-2 text-h2 text-secondary">Qui peut donner ?</h2>
                    <p className="mt-4 text-body-lg text-tertiary">
                        Un premier aperçu des critères généraux, puis un test rapide pour
                        savoir où vous en êtes personnellement.
                    </p>
                </div>

                <div className="mt-12 grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-12">
                    {/* C2 — Critères généraux */}
                    <div className="space-y-4">
                        {CRITERES.map(({ icon: Icon, label, value }) => (
                            <div
                                key={label}
                                className="flex items-start gap-4 rounded-xl border border-neutral-200 bg-white p-5"
                            >
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-50 text-primary-600">
                                    <Icon className="h-5 w-5" aria-hidden="true" />
                                </div>
                                <div>
                                    <p className="text-small font-medium text-neutral-500">{label}</p>
                                    <p className="mt-0.5 text-body text-secondary">{value}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* C3 — Simulateur */}
                    <div className="rounded-2xl border border-neutral-200 bg-white p-6 sm:p-8">
                        <h3 className="text-h4 text-secondary">Testez votre situation</h3>

                        <form noValidate onSubmit={handleSubmit} className="mt-6 space-y-6">
                            <div className="grid gap-6 sm:grid-cols-2">
                                <div>
                                    <label htmlFor="age" className="text-small font-medium text-secondary">
                                        Âge
                                    </label>
                                    <input
                                        id="age"
                                        type="number"
                                        inputMode="numeric"
                                        min={1}
                                        max={120}
                                        placeholder="Ex : 28"
                                        value={form.age}
                                        onChange={(e) => updateField("age", e.target.value)}
                                        aria-invalid={Boolean(errors.age)}
                                        aria-describedby={errors.age ? "age-error" : undefined}
                                        className="mt-2 w-full rounded-lg border border-neutral-300 px-4 py-2.5 text-body text-secondary focus-visible:border-primary-500"
                                    />
                                    {errors.age && (
                                        <p id="age-error" className="mt-1.5 text-small text-error-text">
                                            {errors.age}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label htmlFor="weight" className="text-small font-medium text-secondary">
                                        Poids (kg)
                                    </label>
                                    <input
                                        id="weight"
                                        type="number"
                                        inputMode="numeric"
                                        min={1}
                                        max={300}
                                        placeholder="Ex : 65"
                                        value={form.weight}
                                        onChange={(e) => updateField("weight", e.target.value)}
                                        aria-invalid={Boolean(errors.weight)}
                                        aria-describedby={errors.weight ? "weight-error" : undefined}
                                        className="mt-2 w-full rounded-lg border border-neutral-300 px-4 py-2.5 text-body text-secondary focus-visible:border-primary-500"
                                    />
                                    {errors.weight && (
                                        <p id="weight-error" className="mt-1.5 text-small text-error-text">
                                            {errors.weight}
                                        </p>
                                    )}
                                </div>
                            </div>

                            <fieldset>
                                <legend className="text-small font-medium text-secondary">Sexe</legend>
                                <div className="mt-2 flex gap-3">
                                    {(["homme", "femme"] as const).map((g) => (
                                        <label key={g} className="cursor-pointer">
                                            <input
                                                type="radio"
                                                name="gender"
                                                value={g}
                                                checked={form.gender === g}
                                                onChange={() => updateField("gender", g)}
                                                className="peer sr-only"
                                            />
                                            <span className="inline-block rounded-full border border-neutral-300 px-4 py-2 text-small text-secondary transition-colors peer-checked:border-primary-500 peer-checked:bg-primary-500 peer-checked:text-white peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-primary-500">
                                                {g === "homme" ? "Homme" : "Femme"}
                                            </span>
                                        </label>
                                    ))}
                                </div>
                                {errors.gender && (
                                    <p className="mt-1.5 text-small text-error-text">{errors.gender}</p>
                                )}
                            </fieldset>

                            <fieldset>
                                <legend className="text-small font-medium text-secondary">
                                    Avez-vous déjà donné votre sang ?
                                </legend>
                                <div className="mt-2 flex gap-3">
                                    {(["oui", "non"] as const).map((v) => (
                                        <label key={v} className="cursor-pointer">
                                            <input
                                                type="radio"
                                                name="hasDonatedBefore"
                                                value={v}
                                                checked={form.hasDonatedBefore === v}
                                                onChange={() => updateField("hasDonatedBefore", v)}
                                                className="peer sr-only"
                                            />
                                            <span className="inline-block rounded-full border border-neutral-300 px-4 py-2 text-small text-secondary transition-colors peer-checked:border-primary-500 peer-checked:bg-primary-500 peer-checked:text-white peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-primary-500">
                                                {v === "oui" ? "Oui" : "Non"}
                                            </span>
                                        </label>
                                    ))}
                                </div>
                                {errors.hasDonatedBefore && (
                                    <p className="mt-1.5 text-small text-error-text">
                                        {errors.hasDonatedBefore}
                                    </p>
                                )}
                            </fieldset>

                            {form.hasDonatedBefore === "oui" && (
                                <div>
                                    <label
                                        htmlFor="lastDonationDate"
                                        className="text-small font-medium text-secondary"
                                    >
                                        Date de votre dernier don
                                    </label>
                                    <input
                                        id="lastDonationDate"
                                        type="date"
                                        max={TODAY_ISO}
                                        value={form.lastDonationDate}
                                        onChange={(e) => updateField("lastDonationDate", e.target.value)}
                                        aria-invalid={Boolean(errors.lastDonationDate)}
                                        aria-describedby={
                                            errors.lastDonationDate ? "lastDonationDate-error" : undefined
                                        }
                                        className="mt-2 w-full rounded-lg border border-neutral-300 px-4 py-2.5 text-body text-secondary focus-visible:border-primary-500"
                                    />
                                    {errors.lastDonationDate && (
                                        <p
                                            id="lastDonationDate-error"
                                            className="mt-1.5 text-small text-error-text"
                                        >
                                            {errors.lastDonationDate}
                                        </p>
                                    )}
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={status === "loading"}
                                className="inline-flex items-center gap-2 rounded-full bg-primary-500 px-6 py-3 text-body font-medium text-white transition-colors hover:bg-primary-600 disabled:cursor-not-allowed disabled:opacity-70"
                            >
                                {status === "loading" && (
                                    <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                                )}
                                Vérifier mon éligibilité
                            </button>
                        </form>

                        {/* Résultat — région annoncée dynamiquement aux lecteurs d'écran */}
                        <div className="mt-6" aria-live="polite">
                            {status === "idle" && (
                                <div className="flex items-start gap-3 rounded-xl border border-neutral-200 bg-neutral-50 p-4">
                                    <ClipboardList
                                        className="mt-0.5 h-5 w-5 shrink-0 text-neutral-400"
                                        aria-hidden="true"
                                    />
                                    <p className="text-small text-neutral-500">
                                        Renseignez le formulaire pour connaître votre éligibilité.
                                    </p>
                                </div>
                            )}

                            {status === "loading" && (
                                <div className="flex items-center gap-3 rounded-xl border border-neutral-200 bg-neutral-50 p-4">
                                    <Loader2
                                        className="h-5 w-5 shrink-0 animate-spin text-neutral-400"
                                        aria-hidden="true"
                                    />
                                    <p className="text-small text-neutral-500">Vérification en cours…</p>
                                </div>
                            )}

                            {status === "eligible" && (
                                <div className="rounded-xl border border-success bg-success-bg p-5">
                                    <div className="flex items-start gap-3">
                                        <CheckCircle2
                                            className="mt-0.5 h-5 w-5 shrink-0 text-success"
                                            aria-hidden="true"
                                        />
                                        <div>
                                            <p className="font-heading text-body font-semibold text-success-text">
                                                Vous semblez éligible au don
                                            </p>
                                            <p className="mt-1 text-small text-success-text">
                                                Sous réserve de confirmation lors de l&apos;entretien médical,
                                                vous remplissez les critères généraux.
                                            </p>
                                            <a
                                                href="#centres"
                                                className="mt-3 inline-block text-small font-medium text-success-text underline underline-offset-2"
                                            >
                                                Voir les centres près de chez vous →
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {status === "not-eligible" && result && (
                                <div className="rounded-xl border border-error bg-error-bg p-5">
                                    <div className="flex items-start gap-3">
                                        <XCircle
                                            className="mt-0.5 h-5 w-5 shrink-0 text-error"
                                            aria-hidden="true"
                                        />
                                        <div>
                                            <p className="font-heading text-body font-semibold text-error-text">
                                                Le don n&apos;est pas possible pour l&apos;instant
                                            </p>
                                            <ul className="mt-1 space-y-1 text-small text-error-text">
                                                {result.reasons.map((reason) => (
                                                    <li key={reason}>{reason}</li>
                                                ))}
                                            </ul>
                                            <p className="mt-2 text-small text-error-text">
                                                Ces critères peuvent évoluer avec le temps. N&apos;hésitez pas
                                                à revenir vérifier votre situation plus tard.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {status === "pending" && result?.nextEligibleDate && (
                                <div className="rounded-xl border border-warning bg-warning-bg p-5">
                                    <div className="flex items-start gap-3">
                                        <Clock3
                                            className="mt-0.5 h-5 w-5 shrink-0 text-warning"
                                            aria-hidden="true"
                                        />
                                        <div>
                                            <p className="font-heading text-body font-semibold text-warning-text">
                                                Vous serez bientôt éligible
                                            </p>
                                            <p className="mt-1 text-small text-warning-text">
                                                {result.reasons[0]} Prochain don possible à partir du{" "}
                                                <strong>{formatDateFr(result.nextEligibleDate)}</strong>.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        <p className="mt-6 text-small italic text-neutral-500">
                            Ce simulateur donne une indication générale basée sur des critères
                            simplifiés. Seul un entretien médical avec le personnel soignant lors
                            de votre venue peut confirmer votre aptitude au don.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
