import { Random } from 'random-js';
import { uuid58 } from 'uuid-base58';
import { Abilities, getModifier } from './Abilities';
import { CharacterBio } from './CharacterBio.interface';
import { Armor } from './equipment/armor/Armor.types';
import { RangedWeapon, Weapon, WeaponType } from './equipment/weapons/Weapon.types';

import * as dnd5e from "dnd5e";
import { AbilityScoreName, SkillName } from 'dnd5e';

export type Proficiencies = {
    weapon: Set<WeaponType>;
    throws: Set<AbilityScoreName>;
    skills: Set<SkillName>;
};

type CombatBlock = {
    armor?: Armor;
    ranged?: RangedWeapon;
    melee?: Weapon;
    shield?: Armor;
};

type CurrencyBlock = {
    pp: number;
    gp: number;
    sp: number;
    cp: number;
};



export type CharacterData = {
    id: string;
    inspiration: boolean;
    level: dnd5e.Level;
    // class: dnd5e.CharClass;
    // race: dnd5e.Race;
    bio: CharacterBio;
    abilities: Abilities;
    languages: dnd5e.LanguageName[];
    inventory: any[];
    combat: CombatBlock;
    currency: CurrencyBlock;
    proficiencies: Proficiencies;
    xp?: number;
    proficiency: number;
    health: {
        max: number;
        current: number;
    };
    deathSaves: {
        live: number;
        die: number;
    };
};

export class Character implements CharacterData {
    
    id: string = uuid58();
    rng = new Random();

    inspiration = false;

    BASE_AC = 10;
    currency = {
        pp: 0,
        gp: 0,
        sp: 0,
        cp: 0,
    };
    abilities!: Abilities;

    constructor(private data: CharacterData) {
        Object.assign(this, data);
    }

    languages!: string[];
    proficiencies!: Proficiencies;
    bio!: CharacterBio;
    level!: dnd5e.Level;
    inventory!: any[];
    xp?: number;
    proficiency!: number;
    combat: CombatBlock = {};
    language = [];
    health = { max: 0, current: 0 };
    deathSaves = { live: 0, die: 0 };

    get initiative(): number {
        return this.rng.die(20) + getModifier(this.abilities.DEX);
    }

    get ac(): number {
        // TODO: Equipped armor rating, qualities.
        if (this.combat?.shield != null || this.combat?.armor != null) {
            return (this.combat?.shield?.ac || 0) + (this.combat?.armor?.ac || 0);
        } else {
            return this.BASE_AC + getModifier(this.abilities.DEX);
        }
    }

    equals(other: Character) {
        return this.id === other.id;
    }
}
