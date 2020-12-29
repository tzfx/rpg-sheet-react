import { Random } from 'random-js';
import { uuid58 } from 'uuid-base58';
import { Abilities, Ability, AbilityType } from './Abilities';
import { CharacterBio } from './CharacterBio.interface';
import { Armor } from './equipment/armor/Armor.types';
import { RangedWeapon, Weapon, WeaponType } from './equipment/weapons/Weapon.types';

export type Proficiencies = {
    weapon: Set<WeaponType>,
    throws: Set<AbilityType>,
    skills: Set<any>
}

export class Character {
    id: string = uuid58();
    rng = new Random();

    inspiration: boolean = false;

    bio: CharacterBio;

    BASE_AC = 10;
    level: number;

    abilities: Abilities;
    languages: string[] = [];
    inventory?: any[];
    combat?: {
        armor?: Armor;
        ranged?: RangedWeapon;
        melee?: Weapon;
        shield?: Armor;
    };
    currency = {
        pp: 0,
        gp: 0,
        sp: 0,
        cp: 0,
    };
    hitDice = {
        number: 0,
        type: 6,
    };
    xp: number;
    proficiency: number;

    constructor(bio: CharacterBio, abilities: Abilities, public proficiencies: Proficiencies) {
        this.bio = bio;
        this.level = 0;
        this.xp = 0;
        this.inspiration = false;
        this.abilities = abilities;
        this.proficiency = 2;
    }

    get initiative(): number {
        return this.rng.die(20) + this.abilities.dex.score.modifier;
    }

    get ac(): number {
        // TODO: Equipped armor rating, qualities.
        if (this.combat?.shield != null || this.combat?.armor != null) {
            return (this.combat?.shield?.ac || 0) + (this.combat?.armor?.ac || 0);
        } else {
            return this.BASE_AC + this.abilities.dex.score.modifier;
        }
    }

    equals(other: Character) {
        return this.id === other.id;
    }
}
