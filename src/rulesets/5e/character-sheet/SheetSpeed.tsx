import React from 'react';
import { Icon, Segment } from 'semantic-ui-react';
import { Character } from '../Character';

type Props = {
    character: Character;
};

export class SheetSpeed extends React.Component<Props> {

    render() {
        return (
            <Segment compact raised>
                <Icon size="large" name="bicycle"></Icon>
                <br />
                <big>30ft</big>
                <br />
                <small>Movement</small>
                <br />
            </Segment>
        );
    }
}
