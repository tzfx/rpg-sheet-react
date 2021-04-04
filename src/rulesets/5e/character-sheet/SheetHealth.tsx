import { Random } from 'random-js';
import React from 'react';
import { Button, Icon, Segment } from 'semantic-ui-react';
import { Character } from '../Character';

type Props = {
    character: Character;
};

type State = {
    current: number;
    max: number;
};

export class SheetHealth extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            max: 30,
            current: 30,
        };
    }

    increment = () => {
        this.setState({ current: this.state.current + 1 });
    };

    decrement = () => {
        this.setState({ current: this.state.current - 1 });
    };

    render() {
        return (
            <Segment raised>
                <Icon size="large" name="heart"></Icon>
                <br />
                <Button
                    icon="minus"
                    disabled={this.state.current === 0}
                    onClick={this.decrement}
                ></Button>
                <big>
                    {this.state.current}/{this.state.max}
                </big>
                <small style={{ padding: '2px' }}>HP</small>
                <Button icon="plus" onClick={this.increment}></Button>
                <br />
            </Segment>
        );
    }
}
