import { Random } from 'random-js';
import React from 'react';
import { Grid } from 'semantic-ui-react';
import { Character } from '../Character';
import { SheetAbility } from './SheetAbility';
import { ABILITY_TYPES } from '../Abilities';

type Props = { character: Character };

type State = {
    character: Character;
};

export class SheetAbilities extends React.Component<Props, State> {
    private rng: Random = new Random();

    constructor(props: Props) {
        super(props);
        this.state = { ...props };
    }
    render() {
        return (
            <Grid.Column>
                {ABILITY_TYPES.map((type) => (
                    <SheetAbility
                        proficiency={this.state.character.proficiency}
                        key={type}
                        type={type}
                        abilities={this.state.character.abilities}
                        proficiencies={this.props.character.proficiencies.throws}
                        rng={this.rng}
                    ></SheetAbility>
                ))}
            </Grid.Column>
        );
    }
}
