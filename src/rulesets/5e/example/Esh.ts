import { uuid58 } from 'uuid-base58';
import { Abilities, AbilityType } from '../Abilities';
import { CharacterData, Proficiencies } from '../Character';
import { Alignment, CharacterBio } from '../CharacterBio.interface';
import { Cleric } from '../class/Cleric';
import { Armor } from '../equipment/armor/Armor.types';
import { WeaponType } from '../equipment/weapons/Weapon.types';
import { human } from '../race/Human';
import { AnimalHandling, Skill, Stealth, Survival } from '../skills/Skills';

const id = '1';

const bio: CharacterBio = {
    id: uuid58(),
    name: 'Esh',
    class: new Cleric(),
    race: human,
    age: 250,
    sex: 'M',
    height: 65,
    weight: 300,
    background: 'Acolyte',
    alignment: Alignment.LAWFUL_GOOD,
};

const abilities: Abilities = {
    str: 14,
    dex: 12,
    con: 15,
    int: 8,
    wis: 18,
    cha: 10
};

const proficiencies: Proficiencies = {
    weapon: new Set<WeaponType>(['simple', 'marital']),
    throws: new Set<AbilityType>(['wis', 'cha']),
    skills: new Set<Skill>([AnimalHandling, Stealth, Survival]),
};

export const Esh: CharacterData = {
    inspiration: true,
    level: 4,
    languages : ['Common', 'Orcish', 'Dwarvish', 'Elvish'],
    combat : {
        armor: {
            name: 'Scale Mail',
            ac: 14,
            notes: '',
        } as Armor,
    },
    currency : { pp: 0, gp: 95, sp: 8, cp: 0 },
    // hitDice : { number: 4, type: 8 },
    proficiency : 2,
    id,
    bio,
    abilities,
    // language: string[],
    inventory : [],
    proficiencies,
    health: { max: 35, current: 35 },
    deathSaves: { live: 0, die: 0 },
}
