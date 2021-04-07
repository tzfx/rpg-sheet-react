import { AbilityType } from '../Abilities';
import { WeaponType } from '../equipment/weapons/Weapon.types';

export interface Class {
    name: string;
    levelTable: Array<string>;
    proficiencyBonus: number;
    hitDie: number;
    proficiencies: {
        weapon: Set<WeaponType>;
        throws: Set<AbilityType>;
        skills: Set<any>;
    };
    // skills: Set<Skill>;
    spells: unknown;
}
