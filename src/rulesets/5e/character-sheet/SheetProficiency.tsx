import React from 'react';
import { Segment } from 'semantic-ui-react';
import { Character } from '../Character';

type Props = {
    character: Character;
};

type State = {
    value: number;
};

export class SheetProficiency extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { value: props.character.proficiency };
    }

    render() {
        return (
            <Segment raised>
                +{this.state.value}
                <br />
                Proficiency
            </Segment>
        );
    }
}
