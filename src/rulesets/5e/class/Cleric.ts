import { Ability, AbilityType } from '../Abilities';
import { WeaponType } from '../equipment/weapons/Weapon.types';
import { Class } from './Class.interface';

export class Cleric implements Class {
    name = 'Cleric';
    levelTable: string[] = [];
    proficiencyBonus = 2;
    hp = { dice: { number: 3, type: 8 }, first: 1 };
    proficiencies = {
        weapon: new Set<WeaponType>(['simple', 'marital']),
        throws: new Set<AbilityType>(['wis', 'cha']),
        skills: new Set<any>(),
    };
    spells: unknown;
}
