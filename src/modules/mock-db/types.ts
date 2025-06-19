export type WordPos = [string, number | null, number, number, number[]][];

export interface WordStrucute {
    word: string;
    pos: WordPos;
    definition: string;
    translation: string;
    pos_percentage: string;
    exchange: string;
    ipa: string | null
}
