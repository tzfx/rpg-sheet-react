import { Class } from './class/Class.interface';
import { Race } from './race/Race.interface';

export interface CharacterBio {
    id: string;
    name: string;
    class: Class;
    race: Race;
    age: number;
    sex: 'M' | 'F';
    height: number;
    weight: number;
    background: string;
    alignment: Alignment;
}

export enum Alignment {
    LAWFUL_GOOD="Lawful Good",
    LAWFUL_NEUTRAL="Lawful Neutral",
    LAWFUL_EVIL="Lawful Evil",
    NEUTRAL_GOOD="Neutral Good",
    TRUE_NEUTRAL="True Neutral",
    NEUTRAL_EVIL="Neutral Evil",
    CHAOTIC_GOOD="Chaotic Good",
    CHAOTIC_NEUTRAL="Chaotic Neutral",
    CHAOTIC_EVIL="Chaotic Evil"
}
