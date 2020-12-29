import { Ability, AbilityType } from '../Abilities';
import { WeaponType } from '../equipment/weapons/Weapon.types';

export interface Class {
    name: string;
    levelTable: Array<string>;
    proficiencyBonus: number;
    hp: {
        dice: {
            number: number;
            type: number;
        };
        first: number;
    };
    proficiencies: {
        weapon: Set<WeaponType>;
        throws: Set<AbilityType>;
        skills: Set<any>;
    };
    // skills: Set<Skill>;
    spells: unknown;
}
