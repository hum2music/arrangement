import type { ChordEvent, NoteEvent } from "@hum2music/core";
import type { ArrangementContext, InstrumentArranger } from "./types.ts";

/** General MIDI percussion map note numbers. */
export const KICK_PITCH = 36;
export const SNARE_PITCH = 38;
export const CLOSED_HIHAT_PITCH = 42;

const HIT_DURATION_BEATS = 0.1;
// Toned down from an earlier 100/95/70: at those levels the drums read as
// louder and more constant than the rest of a typical mix, since this
// pattern repeats unvaried for the whole song (no fills/section dynamics
// yet - see tasks/STATUS.md). The hi-hat drops the most since it's the one
// part playing on every eighth note, so it's the most audibly "continuous".
const VELOCITY = { kick: 85, snare: 80, hihat: 55 };

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
export function generateDrumArrangement(chords: ChordEvent[], options: DrumArrangementOptions = {}): NoteEvent[] {
  const density = options.density ?? "normal";
  const notes: NoteEvent[] = [];

  for (const chord of chords) {
    const quarter = chord.durationBeats / 4;
    const eighth = quarter / 2;

    if (density === "sparse") {
      notes.push(hit(KICK_PITCH, chord.startBeat, VELOCITY.kick));
      notes.push(hit(SNARE_PITCH, chord.startBeat + quarter * 2, VELOCITY.snare));
      for (let quarterIndex = 0; quarterIndex < 4; quarterIndex++) {
        notes.push(hit(CLOSED_HIHAT_PITCH, chord.startBeat + quarterIndex * quarter, VELOCITY.hihat));
      }
      continue;
    }

    notes.push(hit(KICK_PITCH, chord.startBeat, VELOCITY.kick));
    notes.push(hit(KICK_PITCH, chord.startBeat + quarter * 2, VELOCITY.kick));
    notes.push(hit(SNARE_PITCH, chord.startBeat + quarter, VELOCITY.snare));
    notes.push(hit(SNARE_PITCH, chord.startBeat + quarter * 3, VELOCITY.snare));

    for (let eighthIndex = 0; eighthIndex < 8; eighthIndex++) {
      notes.push(hit(CLOSED_HIHAT_PITCH, chord.startBeat + eighthIndex * eighth, VELOCITY.hihat));
    }
  }

  return notes;
}

function hit(pitch: number, startBeat: number, velocity: number): NoteEvent {
  return { pitch, startBeat, durationBeats: HIT_DURATION_BEATS, velocity };
}

export const drumsArranger: InstrumentArranger = {
  generate: (context: ArrangementContext) => generateDrumArrangement(context.chords),
};
