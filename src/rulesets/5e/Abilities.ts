import { Random } from 'random-js';
import { AbilityScoreName } from 'dnd5e'

export type Abilities = {
    [key in AbilityScoreName]: number;
};

// export interface Abilities {
//     str: Ability;
//     dex: Ability;
//     con: Ability;
//     int: Ability;
//     wis: Ability;
//     cha: Ability;
// }

export const getModifier = (score: number) => Math.floor((score - 10)/2);

export class AbilityScore {
    private static BASE_SCORE = 10;
    public static LOWEST_SCORE = 1;
    public static HIGHEST_SCORE = 30;

    private _score: number;

    constructor(score?: number) {
        this._score = score == null ? AbilityScore.rollForScore() : score;
    }

    static rollForScore(): number {
        const rng = new Random();
        const rolls = rng.dice(4, 6);
        const lowest = {
            index: -1,
            value: 0,
        };
        let i = 0;
        rolls.forEach((roll) => {
            i++;
            if (roll < lowest.value) {
                lowest.index = i;
                lowest.value = roll;
            }
        });
        rolls.splice(lowest.index);
        return rolls.reduce((p, c) => c + p);
    }

    set score(score: number) {
        if (score < AbilityScore.LOWEST_SCORE || score > AbilityScore.HIGHEST_SCORE)
            throw new Error(
                `Score of ${score} is outside of the range [${AbilityScore.LOWEST_SCORE},${AbilityScore.HIGHEST_SCORE}]`
            );
        this._score = score;
    }

    get modifier(): number {
        return getModifier(this.score);
    }

    get score(): number {
        return this._score;
    }
}

export const Ability2Name: { [key in AbilityScoreName]: string } = {
    STR: 'Strength',
    DEX: 'Dexterity',
    CON: 'Constitution',
    INT: 'Intelligence',
    WIS: 'Wisdom',
    CHA: 'Charisma',
};

// export type AbilityType = 'str' | 'dex' | 'con' | 'int' | 'wis' | 'cha';
export const ABILITY_TYPES: AbilityScoreName[] = ['STR', 'DEX', 'CON', 'INT', 'WIS', 'CHA'];
