import type { ChordEvent, NoteEvent } from "@hum2music/core";
import type { InstrumentArranger } from "./types";
export interface PianoArrangementOptions {
    pattern?: "block" | "arpeggio";
    /** Lets the voicing search also place the 9th, for a richer/"more advanced" sound (docs/specs/style-profiles.md). */
    allowExtensions?: boolean;
}
/**
 * For each bar, picks the voicing (octave placement of the chord's tones,
 * optionally plus the 9th) within the piano's range with the smallest total
 * movement from the previous bar's voicing, rather than always using the
 * same inversion (PRD §9.2). Played either as a sustained block chord or a
 * simple ascending arpeggio across the bar.
 */
export declare function generatePianoArrangement(chords: ChordEvent[], options?: PianoArrangementOptions): NoteEvent[];
export declare const pianoArranger: InstrumentArranger;
