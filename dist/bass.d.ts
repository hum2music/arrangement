import type { ChordEvent, NoteEvent } from "@hum2music/core";
import type { InstrumentArranger } from "./types";
/**
 * Root-driven bass: holds the chord root through beats 1-2, repeats it on
 * beat 3, then on beat 4 plays a chromatic approach note into the next
 * chord's root (or holds the root again on the final bar). Lands on the
 * same strong beats (1 and 3) as the drum arranger's kick, approximating
 * "kick sync" without reading the drum track directly (PRD §9.3).
 */
export declare function generateBassArrangement(chords: ChordEvent[]): NoteEvent[];
export declare const bassArranger: InstrumentArranger;
