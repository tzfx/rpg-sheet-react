export type BasicDamageType = 'piercing' | 'bludegoning' | 'slashing';

export type WeaponProperty =
    | 'light'
    | 'heavy'
    | 'finesse'
    | 'versatile'
    | 'thrown'
    | 'two-handed'
    | 'loading'
    | 'reach'
    | 'ammunition';

export type Weapon = {
    name: string;
    damage: number;
    damageType: BasicDamageType;
    properties: Set<WeaponProperty>;
    close: number;
    weight: number;
    cost: number;
    type: WeaponType;
};

export type WeaponType = 'simple' | 'marital';

export type RangedWeapon = {
    range: number;
    far: number;
    ammo?: number;
} & Weapon;
