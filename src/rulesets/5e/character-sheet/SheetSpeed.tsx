import { Random } from 'random-js';
import React from 'react';
import { Button, Icon, Segment } from 'semantic-ui-react';
import { Character } from '../Character';

type Props = {
    character: Character;
};

export class SheetSpeed extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
    }

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
