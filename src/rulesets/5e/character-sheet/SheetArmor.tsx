import { Random } from 'random-js';
import React from 'react';
import { Button, Icon, Segment } from 'semantic-ui-react';
import { Character } from '../Character';

type Props = {
    character: Character;
};

export class SheetArmor extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
    }

    render() {
        return (
            <Segment compact raised>
                <Icon size="large" name="shield"></Icon>
                <br />
                <big>{this.props.character.ac}</big>
                <br />
                <small>Armor Class</small>
                <br />
            </Segment>
        );
    }
}
