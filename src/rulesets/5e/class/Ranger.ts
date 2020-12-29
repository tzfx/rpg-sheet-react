import { Ability, AbilityType } from "../Abilities";
import { WeaponType } from "../equipment/weapons/Weapon.types";
import { Class } from "./Class.interface";

export class Ranger implements Class {
    name = "Ranger"
    levelTable: string[] = [];
    proficiencyBonus = 2;
    hp= { dice: { number: 3, type: 10 }, first: 1 };
    proficiencies = {
        weapon: new Set<WeaponType>(["simple", "marital"]),
        throws: new Set<AbilityType>(["str", "dex"]),
        skills: new Set<any>()
    };
    spells: unknown;
    
}