import { uuid58 } from 'uuid-base58';
import { Abilities, AbilityType } from '../Abilities';
import { CharacterData, Proficiencies } from '../Character';
import { Alignment, CharacterBio } from '../CharacterBio.interface';
import { Ranger } from '../class/Ranger';
import { Armor } from '../equipment/armor/Armor.types';
import { RangedWeapon, WeaponType } from '../equipment/weapons/Weapon.types';
import { human } from '../race/Human';
import { AnimalHandling, Skill, Stealth, Survival } from '../skills/Skills';

const bio: CharacterBio = {
    id: uuid58(),
    name: 'Yevgeni',
    class: new Ranger(),
    race: human,
    age: 22,
    sex: 'M',
    height: 52,
    weight: 150,
    background: 'Urchin',
    alignment: Alignment.LAWFUL_NEUTRAL,
};

const abilities: Abilities = {
    str: 14,
    dex: 19,
    con: 14,
    int: 12,
    wis: 16,
    cha: 10
};

const proficiencies: Proficiencies = {
    weapon: new Set<WeaponType>(['simple', 'marital']),
    throws: new Set<AbilityType>(['str', 'dex']),
    skills: new Set<Skill>([AnimalHandling, Stealth, Survival]),
};

export const Yevgeni: CharacterData = {
    inventory: [],
    deathSaves: {
        live: 0,
        die: 0
    },
    health: {
        current: 15,
        max: 36
    },
    proficiencies,
    id: "2",
    inspiration: true,
    level: 6,
    languages: ['Common', 'Orcish', 'Sylvan'],
    combat: {
        armor: {
            name: 'Leather Armor',
            ac: 12,
            notes: '',
        } as Armor,
        ranged: {
            name: 'Heavy Crossbow',
            damage: 10,
            range: 400,
            close: 5,
            far: 120,
            ammo: 10,
            damageType: 'piercing',
            properties: {},
            weight: 10,
            cost: 2,
            type: 'marital',
        } as RangedWeapon,
    },
    currency: { pp: 0, gp: 0, sp: 0, cp: 0 },
    xp: 0,
    proficiency: 3,
    bio,
    abilities
}
