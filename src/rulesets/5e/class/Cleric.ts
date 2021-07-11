import { AbilityScoreName } from 'dnd5e';
import { WeaponType } from '../equipment/weapons/Weapon.types';
import { Class } from './Class.interface';

export class Cleric implements Class {
    name = 'Cleric';
    levelTable: string[] = [];
    proficiencyBonus = 2;
    hitDie = 8;
    proficiencies = {
        weapon: new Set<WeaponType>(['simple', 'marital']),
        throws: new Set<AbilityScoreName>(['WIS', 'CHA']),
        skills: new Set<any>(),
    };
    spells: unknown;
}
