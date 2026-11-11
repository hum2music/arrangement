import type { ChordEvent, NoteEvent } from "@hum2music/core";
import type { InstrumentArranger } from "./types";
/** General MIDI percussion map note numbers. */
export declare const KICK_PITCH = 36;
export declare const SNARE_PITCH = 38;
export declare const CLOSED_HIHAT_PITCH = 42;
export interface DrumArrangementOptions {
    /** "sparse" drops to a half-time feel (kick on 1 only, snare on 3 only, quarter-note hi-hat) for e.g. a ballad. */
    density?: "normal" | "sparse";
}
/**
 * One bar of the basic 4/4 backbeat per bar (kick on 1 & 3, snare on 2 & 4,
 * eighth-note closed hi-hat throughout), per PRD §10.3's example pattern.
 * `density: "sparse"` is the one documented variation beyond this fixed
 * template; further variation is left to future work.
 */
export declare function generateDrumArrangement(chords: ChordEvent[], options?: DrumArrangementOptions): NoteEvent[];
export declare const drumsArranger: InstrumentArranger;
