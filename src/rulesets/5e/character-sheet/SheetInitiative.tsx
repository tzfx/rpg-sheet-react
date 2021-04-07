import { Random } from 'random-js';
import React from 'react';
import { Button, Icon, Segment } from 'semantic-ui-react';
import { getModifier } from '../Abilities';
import { Character } from '../Character';

type Props = {
    character: Character;
    rng: Random;
};

type State = {
    initiative: number;
};

export class SheetInitiative extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            initiative: 0,
        };
    }

    roll = () => {
        this.setState({
            initiative: this.props.rng.die(20) + getModifier(this.props.character.abilities.dex),
        });
    };

    render() {
        return (
            <Segment compact raised>
                <Icon size="large" name="recycle"></Icon>
                <br />
                <Button
                    icon="cube"
                    onClick={this.roll}
                    label={this.state.initiative.toString()}
                ></Button>
                <small>Initiative</small>
                <br />
            </Segment>
        );
    }
}
