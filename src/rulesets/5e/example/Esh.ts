import { Random } from 'random-js';
import { uuid58 } from 'uuid-base58';
import { Abilities, ABILITIES, AbilityType } from '../Abilities';
import { Character, Proficiencies } from '../Character';
import { Alignment, CharacterBio } from '../CharacterBio.interface';
import { Cleric } from '../class/Cleric';
import { Armor } from '../equipment/armor/Armor.types';
import { RangedWeapon, WeaponType } from '../equipment/weapons/Weapon.types';
import { human } from '../race/Human';
import { AnimalHandling, Skill, Stealth, Survival } from '../skills/Skills';

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

const abilities: Abilities = Array.from(ABILITIES.entries()).reduce((a, c) => {
    a[c[0]] = c[1];
    switch (c[0]) {
        case 'str':
            a[c[0]].score.score = 14;
            break;
        case 'dex':
            a[c[0]].score.score = 12;
            break;
        case 'con':
            a[c[0]].score.score = 15;
            break;
        case 'int':
            a[c[0]].score.score = 8;
            break;
        case 'wis':
            a[c[0]].score.score = 18;
            break;
        case 'cha':
            a[c[0]].score.score = 10;
            break;
    }
    return a;
}, {} as Abilities);

const proficiencies: Proficiencies = {
    weapon: new Set<WeaponType>(['simple', 'marital']),
    throws: new Set<AbilityType>(['wis', 'cha']),
    skills: new Set<Skill>([AnimalHandling, Stealth, Survival]),
};

export class Esh extends Character {
    rng = new Random();
    inspiration = true;
    level = 4;
    languages = ['Common', 'Orcish', 'Dwarvish', 'Elvish'];
    combat = {
        armor: {
            name: 'Scale Mail',
            ac: 14,
            notes: '',
        } as Armor,
    };
    currency = { pp: 0, gp: 95, sp: 8, cp: 0 };
    hitDice = { number: 4, type: 8 };
    xp = 0;
    proficiency = 2;

    constructor() {
        super(bio, abilities, proficiencies);
    }
}
