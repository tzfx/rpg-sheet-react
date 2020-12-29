import { Random } from 'random-js';
import React from 'react';
import { Grid } from 'semantic-ui-react';
import { Character } from '../Character';
import { SheetAbility } from './SheetAbility';

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
                {[
                    this.state.character.abilities.str,
                    this.state.character.abilities.dex,
                    this.state.character.abilities.con,
                    this.state.character.abilities.int,
                    this.state.character.abilities.wis,
                    this.state.character.abilities.cha,
                ].map(stat => (
                    <SheetAbility key={stat.name} ability={stat} rng={this.rng} ></SheetAbility>
                ))}
            </Grid.Column>
        );
    }
}
