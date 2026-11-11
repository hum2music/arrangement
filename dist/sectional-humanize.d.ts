import type { NoteEvent, SongSection } from "@hum2music/core";
export interface SectionalHumanizeOptions {
    baseAmount: number;
    seed: number;
    bpm: number;
    instrument: string;
}
/**
 * Humanizes a track bar-by-bar, varying intensity by song section (via
 * deriveSectionalHumanizeAmount) instead of applying one flat amount to
 * the whole track. Note: each bar re-seeds its own random stream from the
 * same track sub-seed, so notes at the same position-within-bar across
 * different bars can draw correlated (not fully independent) jitter —
 * still fully deterministic/reproducible, just less varied than a single
 * continuous stream would be. Documented tradeoff, not a bug.
 */
export declare function applySectionalHumanization(notes: NoteEvent[], sections: SongSection[], options: SectionalHumanizeOptions): NoteEvent[];
