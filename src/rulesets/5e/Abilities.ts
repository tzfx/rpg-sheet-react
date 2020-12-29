import { Random } from 'random-js';

export interface Ability {
    name: string;
    score: AbilityScore;
}

export interface Abilities {
    str: Ability;
    dex: Ability;
    con: Ability;
    int: Ability;
    wis: Ability;
    cha: Ability;
}

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
        rolls.forEach(roll => {
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
        const norm = this.score % 2 ? this.score : this.score - 1;
        const step = norm - AbilityScore.BASE_SCORE;
        if (step === 0)
            return step;
        else
            return Math.floor(step - ((step < 0 ? -1 : 1) * step) / 2);
    }

    get score(): number {
        return this._score;
    }
}

export const ABILITIES: Map<AbilityType, Ability> = new Map()
    .set('str', {
        name: 'Strength',
        score: new AbilityScore(),
    })
    .set('dex', {
        name: 'Dexterity',
        score: new AbilityScore(),
    })
    .set('con', {
        name: 'Constitution',
        score: new AbilityScore(),
    })
    .set('int', {
        name: 'Intelligence',
        score: new AbilityScore(),
    })
    .set('wis', {
        name: 'Wisdom',
        score: new AbilityScore(),
    })
    .set('cha', {
        name: 'Charisma',
        score: new AbilityScore(),
    });

export type AbilityType = 'str' | 'dex' | 'con' | 'int' | 'wis' | 'cha';
