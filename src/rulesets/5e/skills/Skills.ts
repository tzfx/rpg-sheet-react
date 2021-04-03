import { AbilityType } from '../Abilities';

export type Skill = {
    name: string;
    ability: AbilityType;
};

export const AnimalHandling: Skill = {
    name: 'Animal Handling',
    ability: 'wis',
};

export const Stealth: Skill = {
    name: 'Stealth',
    ability: 'dex',
};

export const Survival: Skill = {
    name: 'Survival',
    ability: 'wis',
};

export const Skills: Skill[] = [
    {
        name: 'Acrobatics',
        ability: 'dex',
    },
    AnimalHandling,
    {
        name: 'Arcana',
        ability: 'wis',
    },
    {
        name: 'Athletics',
        ability: 'str',
    },
    {
        name: 'Deception',
        ability: 'cha',
    },
    {
        name: 'History',
        ability: 'int',
    },
    {
        name: 'Insight',
        ability: 'int',
    },
    {
        name: 'Intimidation',
        ability: 'cha',
    },
    {
        name: 'Investigation',
        ability: 'int',
    },
    {
        name: 'Medicine',
        ability: 'wis',
    },
    {
        name: 'Nature',
        ability: 'int',
    },
    {
        name: 'Perception',
        ability: 'wis',
    },
    {
        name: 'Performance',
        ability: 'cha',
    },
    {
        name: 'Persuasion',
        ability: 'cha',
    },
    {
        name: 'Religion',
        ability: 'int',
    },
    {
        name: 'Slight of Hand',
        ability: 'dex',
    },
    Stealth,
    Survival,
];
