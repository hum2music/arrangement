export const STYLE_NAMES = ["pop", "ballad"];
/**
 * A style is a weighting/parameter profile layered on top of the existing
 * engines, not a new generation algorithm, to keep everything deterministic
 * (PRD §15.1) and the engines swappable (docs/specs/style-profiles.md).
 * Proposed values below are unvalidated starting points.
 */
export const STYLE_PROFILES = {
    pop: {
        name: "pop",
        harmonyWeights: { melodyFit: 0.5, harmonicNaturalness: 0.3, voiceLeading: 0.2 },
        pianoPattern: "block",
        pianoAllowExtensions: false,
        guitarPattern: "strum",
        drumDensity: "normal",
        humanizeMultiplier: 1,
        programNumbers: { piano: 0, bass: 33, guitar: 29 },
    },
    ballad: {
        name: "ballad",
        harmonyWeights: { melodyFit: 0.55, harmonicNaturalness: 0.25, voiceLeading: 0.2 },
        pianoPattern: "arpeggio",
        pianoAllowExtensions: true,
        guitarPattern: "arpeggio",
        drumDensity: "sparse",
        humanizeMultiplier: 0.7,
        programNumbers: { piano: 0, bass: 32, guitar: 24 },
    },
};
export function resolveStyleProfile(name) {
    if (name && isStyleName(name))
        return STYLE_PROFILES[name];
    return STYLE_PROFILES.pop;
}
function isStyleName(name) {
    return STYLE_NAMES.includes(name);
}
