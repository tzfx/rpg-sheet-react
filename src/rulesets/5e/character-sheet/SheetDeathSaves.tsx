import { Random } from 'random-js';
import React from 'react';
import { Button, Icon, Segment } from 'semantic-ui-react';
import { Character } from '../Character';

type Props = {
    character: Character;
    rng: Random;
};

type State = {
    roll: number;
    death: number;
    life: number;
};

export class SheetDeathSaves extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            death: 0,
            life: 0,
            roll: 0,
        };
    }

    roll = () => {
        const roll = this.props.rng.die(20);
        if (roll === 1) {
            this.setState({ death: this.state.death + 2 });
        } else if (roll < 10) {
            this.setState({ death: this.state.death + 1 });
        } else if (roll >= 10) {
            this.setState({ life: this.state.life + 1 });
        } else if (roll === 20) {
            this.reset();
        }
        this.setState({ roll });
    };

    reset = () => {
        this.setState({ life: 0, death: 0 });
    };

    render() {
        return (
            <Segment raised>
                <Icon size="large" name="heartbeat"></Icon>
                <br />
                {new Array(3).fill(true).map((_, i) => {
                    return i >= this.state.life ? (
                        <Icon name="square outline"></Icon>
                    ) : (
                        <Icon name="check square"></Icon>
                    );
                })}
                <Icon name="medkit"></Icon>
                <small> Live</small>
                <br />
                {new Array(3).fill(true).map((_, i) => {
                    return i >= this.state.death ? (
                        <Icon name="square outline"></Icon>
                    ) : (
                        <Icon name="check square"></Icon>
                    );
                })}
                <Icon name="bomb"></Icon>
                <small> Die</small>
                <br />
                <Button icon="cube" onClick={this.roll} content="Roll"></Button>
            </Segment>
        );
    }
}
