import { Random } from 'random-js';
import { uuid58 } from 'uuid-base58';
import { Abilities, ABILITIES, AbilityType } from '../Abilities';
import { Character, Proficiencies } from '../Character';
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
    background: 'Haunted One',
    alignment: Alignment.LAWFUL_NEUTRAL,
};

const abilities: Abilities = Array.from(ABILITIES.entries()).reduce((a, c) => {
    a[c[0]] = c[1];
    switch (c[0]) {
        case 'str':
            a[c[0]].score.score = 14;
            break;
        case 'dex':
            a[c[0]].score.score = 19;
            break;
        case 'con':
            a[c[0]].score.score = 14;
            break;
        case 'int':
            a[c[0]].score.score = 12;
            break;
        case 'wis':
            a[c[0]].score.score = 16;
            break;
        case 'cha':
            a[c[0]].score.score = 10;
            break;
    }
    return a;
}, {} as Abilities);

const proficiencies: Proficiencies = {
    weapon: new Set<WeaponType>(["simple", "marital"]),
    throws: new Set<AbilityType>(["str", "dex"]),
    skills: new Set<Skill>([AnimalHandling, Stealth, Survival])
}

export class Yevgeni extends Character {
    rng = new Random();
    inspiration = true;
    level = 4;
    languages = ['Common', 'Orcish', 'Sylvan'];
    combat = {
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
            damageType: "piercing",
            properties: {},
            weight: 10,
            cost: 2,
            type: 'marital',
        } as RangedWeapon,
    };
    currency = { pp: 0, gp: 0, sp: 0, cp: 0 };
    hitDice = { number: 4, type: 10 };
    xp = 0;
    proficiency = 2;

    constructor() {
        super(bio, abilities, proficiencies);
    }
}
