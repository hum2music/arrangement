import type { ChordEvent, NoteEvent, SongSection } from "@hum2music/core";
import { type StyleProfile } from "./style";
export declare const ARRANGEABLE_INSTRUMENTS: readonly ["piano", "bass", "drums", "guitar"];
export type ArrangeableInstrument = (typeof ARRANGEABLE_INSTRUMENTS)[number];
export interface ComposedTrack {
    instrument: "melody" | ArrangeableInstrument;
    notes: NoteEvent[];
    channel: number;
    programNumber?: number;
}
export interface ComposeTracksOptions {
    melody: NoteEvent[];
    chords: ChordEvent[];
    instruments?: Iterable<ArrangeableInstrument>;
    humanizeAmount?: number;
    seed?: number;
    bpm: number;
    /** Defaults to the "pop" profile; see style.ts. Governs pattern choice, voicing extensions, drum density, and GM program numbers. */
    style?: StyleProfile | string;
    /** When given (and non-empty), humanization intensity varies per bar by repeated section (see sectional-humanize.ts) instead of one flat amount. */
    songSections?: SongSection[];
}
/**
 * Builds the melody track plus any requested arranged instrument tracks
 * (piano/bass/drums/guitar), optionally humanized per-track. Shared by the
 * CLI's `generate` command and the web UI's export endpoints so
 * arrangement + humanization logic lives in exactly one place.
 */
export declare function composeTracks(options: ComposeTracksOptions): ComposedTrack[];
