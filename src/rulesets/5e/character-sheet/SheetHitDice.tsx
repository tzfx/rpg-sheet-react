import { Random } from 'random-js';
import React from 'react';
import { Button, Icon, Segment } from 'semantic-ui-react';
import { Character } from '../Character';

type Props = {
    character: Character;
};

type State = {
    dice: number;
};

export class SheetHitDice extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            dice: props.character.hitDice.number,
        };
    }

    render() {
        return (
            <Segment raised>
                <Icon size="large" name="medkit"></Icon>
                <br />
                <big>{this.state.dice}</big>
                <small> Hit Dice</small>
                <br />
                <Button icon="cube" content="Roll"></Button>
            </Segment>
        );
    }
}
