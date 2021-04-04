import React from 'react';
import { Segment } from 'semantic-ui-react';
import { Character } from '../Character';
import { Armor } from '../equipment/armor/Armor.types';
import { RangedWeapon, Weapon } from '../equipment/weapons/Weapon.types';

type Props = {
    character: Character;
};

type State = {
    armor?: Armor;
    melee?: Weapon;
    ranged?: RangedWeapon;
    shield?: Armor;
};

export class SheetWeapons extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            ...props.character.combat,
        };
    }

    render() {
        return <Segment></Segment>;
    }
}
