import type { ProgressionSearchWeights } from "@hum2music/harmony";
export type StyleName = "pop" | "ballad";
export declare const STYLE_NAMES: StyleName[];
export interface StyleProfile {
    name: StyleName;
    /** Passed through to searchChordProgression; style-dependent weighting stands in for the S term (PRD §8.3). */
    harmonyWeights: ProgressionSearchWeights;
    pianoPattern: "block" | "arpeggio";
    /** Whether the piano voicing may add the 9th as an extra available tone, beyond the chord's own tones. */
    pianoAllowExtensions: boolean;
    guitarPattern: "strum" | "arpeggio";
    drumDensity: "normal" | "sparse";
    humanizeMultiplier: number;
    programNumbers: {
        piano: number;
        bass: number;
        guitar: number;
    };
}
/**
 * A style is a weighting/parameter profile layered on top of the existing
 * engines, not a new generation algorithm, to keep everything deterministic
 * (PRD §15.1) and the engines swappable (docs/specs/style-profiles.md).
 * Proposed values below are unvalidated starting points.
 */
export declare const STYLE_PROFILES: Record<StyleName, StyleProfile>;
export declare function resolveStyleProfile(name: string | undefined): StyleProfile;
