import { AbilityScoreName } from "dnd5e";
import { WeaponType } from "../equipment/weapons/Weapon.types";
import { Class } from "./Class.interface";

export class Ranger implements Class {
    name = "Ranger"
    levelTable: string[] = [];
    proficiencyBonus = 2;
    hitDie = 10;
    proficiencies = {
        weapon: new Set<WeaponType>(["simple", "marital"]),
        throws: new Set<AbilityScoreName>(["STR", "DEX"]),
        skills: new Set<any>()
    };
    spells: unknown;
    
}