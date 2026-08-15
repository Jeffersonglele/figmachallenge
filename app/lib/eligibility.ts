/**
 * NA HUN — Algorithme d'éligibilité au don de sang
 *
 * Règles simplifiées pour les besoins du challenge (cf. brief) :
 * - Âge : entre 18 et 65 ans révolus
 * - Poids : 50 kg minimum
 * - Délai post-don : 3 mois (hommes) / 4 mois (femmes)
 *
 * Cas particuliers gérés :
 * - Aucun don antérieur → condition de délai considérée comme remplie
 * - Délai non écoulé → renvoie la date à partir de laquelle le don sera possible
 * - Âge ou poids hors critères → motif explicite du critère bloquant
 *
 * Important : ceci est une indication générale. Seul un entretien médical
 * professionnel peut confirmer l'aptitude réelle au don.
 */

export type Gender = "homme" | "femme";

export interface EligibilityInput {
    age: number;
    weight: number;
    gender: Gender;
    hasDonatedBefore: boolean;
    /** Format ISO (YYYY-MM-DD). Ignoré si hasDonatedBefore est false. */
    lastDonationDate: string | null;
}

export type EligibilityStatus = "eligible" | "not-eligible" | "pending";

export interface EligibilityResult {
    status: EligibilityStatus;
    reasons: string[];
    nextEligibleDate?: Date;
}

const MIN_AGE = 18;
const MAX_AGE = 65;
const MIN_WEIGHT = 50;
const DELAY_MONTHS: Record<Gender, number> = { homme: 3, femme: 4 };

export function checkEligibility(
    input: EligibilityInput,
    today: Date = new Date()
): EligibilityResult {
    const blockingReasons: string[] = [];

    if (input.age < MIN_AGE) {
        blockingReasons.push(
            `Âge insuffisant : le don est ouvert à partir de ${MIN_AGE} ans révolus.`
        );
    } else if (input.age > MAX_AGE) {
        blockingReasons.push(
            `Âge hors critère : le don n'est plus possible au-delà de ${MAX_AGE} ans révolus.`
        );
    }

    if (input.weight < MIN_WEIGHT) {
        blockingReasons.push(
            `Poids insuffisant : ${MIN_WEIGHT} kg minimum requis pour donner votre sang.`
        );
    }

    if (blockingReasons.length > 0) {
        return { status: "not-eligible", reasons: blockingReasons };
    }

    if (input.hasDonatedBefore && input.lastDonationDate) {
        const lastDonation = new Date(input.lastDonationDate);
        const nextEligible = new Date(lastDonation);
        nextEligible.setMonth(nextEligible.getMonth() + DELAY_MONTHS[input.gender]);

        if (nextEligible.getTime() > today.getTime()) {
            return {
                status: "pending",
                reasons: [
                    `Délai de repos non écoulé depuis votre dernier don (${DELAY_MONTHS[input.gender]} mois minimum requis).`,
                ],
                nextEligibleDate: nextEligible,
            };
        }
    }

    return { status: "eligible", reasons: [] };
}

export function formatDateFr(date: Date): string {
    return new Intl.DateTimeFormat("fr-FR", {
        day: "numeric",
        month: "long",
        year: "numeric",
    }).format(date);
}
