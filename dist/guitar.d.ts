import type { ChordEvent, NoteEvent } from "@hum2music/core";
import type { InstrumentArranger } from "./types";
export interface GuitarArrangementOptions {
    pattern?: "strum" | "arpeggio";
}
/**
 * Finds a playable chord shape (one fret-window position, each string
 * either muted or fretted within that window) and plays it as either a
 * strummed down/up pattern or a simple arpeggio. Never generates a shape
 * that would require a fret span wider than a hand can cover (PRD §9.4).
 */
export declare function generateGuitarArrangement(chords: ChordEvent[], options?: GuitarArrangementOptions): NoteEvent[];
export declare const guitarArranger: InstrumentArranger;
