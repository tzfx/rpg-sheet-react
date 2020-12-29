export interface Race {
    name: string;
    age: {
        min: number;
        max: number;
    };
    size: Size;
    language: string;
}

export enum Size {
    medium,
    small,
}

export interface Ability {
    name: string;
    value: number;
    modifier: number;
}
