import { deriveSectionalHumanizeAmount, humanizeMelody } from "@hum2music/expression";
const BEATS_PER_BAR = 4;
/**
 * Humanizes a track bar-by-bar, varying intensity by song section (via
 * deriveSectionalHumanizeAmount) instead of applying one flat amount to
 * the whole track. Note: each bar re-seeds its own random stream from the
 * same track sub-seed, so notes at the same position-within-bar across
 * different bars can draw correlated (not fully independent) jitter —
 * still fully deterministic/reproducible, just less varied than a single
 * continuous stream would be. Documented tradeoff, not a bug.
 */
export function applySectionalHumanization(notes, sections, options) {
    if (options.baseAmount <= 0)
        return notes;
    if (sections.length === 0) {
        return humanizeMelody(notes, {
            seed: options.seed,
            humanizeAmount: options.baseAmount,
            bpm: options.bpm,
            instrument: options.instrument,
        });
    }
    const notesByBar = new Map();
    for (const note of notes) {
        const barIndex = Math.floor(note.startBeat / BEATS_PER_BAR);
        const bucket = notesByBar.get(barIndex) ?? [];
        bucket.push(note);
        notesByBar.set(barIndex, bucket);
    }
    const result = [];
    for (const [barIndex, barNotes] of notesByBar) {
        const amount = deriveSectionalHumanizeAmount(options.baseAmount, sections, barIndex);
        result.push(...humanizeMelody(barNotes, {
            seed: options.seed,
            humanizeAmount: amount,
            bpm: options.bpm,
            instrument: options.instrument,
        }));
    }
    return result;
}
