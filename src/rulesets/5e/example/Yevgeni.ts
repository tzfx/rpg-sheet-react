import { AbilityScoreName, SkillName } from 'dnd5e';
import { uuid58 } from 'uuid-base58';
import { Abilities } from '../Abilities';
import { CharacterData, Proficiencies } from '../Character';
import { Alignment, CharacterBio } from '../CharacterBio.interface';
import { Ranger } from '../class/Ranger';
import { Armor } from '../equipment/armor/Armor.types';
import { RangedWeapon, WeaponType } from '../equipment/weapons/Weapon.types';
import { human } from '../race/Human';
// import { AnimalHandling, Skill, Stealth, Survival } from '../skills/Skills';

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
    STR: 14,
    DEX: 19,
    CON: 14,
    INT: 12,
    WIS: 16,
    CHA: 10
};

const proficiencies: Proficiencies = {
    weapon: new Set<WeaponType>(['simple', 'marital']),
    throws: new Set<AbilityScoreName>(['STR', 'DEX']),
    skills: new Set<SkillName>(),
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
