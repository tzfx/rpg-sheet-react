import React from 'react';
import { Segment } from 'semantic-ui-react';
import { Character } from '../Character';

type Props = {
    character: Character;
};

export class SheetPerception extends React.Component<Props> {
    render() {
        return (
            <Segment raised>
                {this.props.character.abilities.WIS}
                <br />
                Passive Perception (wis)
            </Segment>
        );
    }
}
