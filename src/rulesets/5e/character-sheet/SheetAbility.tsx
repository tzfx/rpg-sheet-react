import { Random } from 'random-js';
import React from 'react';
import { Button, Card, Icon, Label, Loader, Transition } from 'semantic-ui-react';
import { Ability } from '../Abilities';

type Props = {
    ability: Ability;
    rng: Random
};

type State = {
    modifier: number;
    roll: number;
    rolling: boolean;
};

export class SheetAbility extends React.Component<Props, State> {
    
    private delay = 500;

    constructor(props: Props) {
        super(props);
        this.state = {
            modifier: this.props.ability.score.modifier,
            roll: 0,
            rolling: false
        };
    }

    getModifierColor = () => {
        const mod = this.props.ability.score.modifier;
        if (mod > 0) {
            return 'positive';
        } else if (mod < 0) {
            return 'negative';
        } else {
            return 'primary';
        }
    }

    getModifierText = () => {
        return this.state.modifier > 0
            ? '+'.concat(this.state.modifier.toString())
            : this.state.modifier.toString();
    }

    rollModifier = () => {
        const roll = this.props.rng.dice(20, 1)[0] + this.state.modifier;
        this.setState({roll});
    }
    
    resetRoll = () => {
        this.setState({roll: 0});
    }

    render() {
        return (
            <Card centered>
                <Card.Content>
                    <Card.Header>{this.props.ability.name}</Card.Header>
                    <Card.Description>
                        <strong>{this.props.ability.score.score}</strong>
                        &nbsp;→&nbsp;
                        <span color={this.getModifierColor()}>
                            {this.getModifierText()}
                        </span>
                    </Card.Description>
                    <Card.Content extra>
                        <Button icon="cube" content="Roll" size="medium" disabled={!!this.state.roll} onClick={this.rollModifier}>
                        </Button>
                        <Transition visible={!!this.state.roll} animation='fade right' duration={this.delay}>
                                <Label attached="bottom right" active onClick={this.resetRoll} size="large">
                                    <div title="Reset" style={{cursor: "pointer"}}>
                                        <span style={{paddingRight: ".5em"}}>
                                            {this.state.roll ? this.state.roll.toString().concat(` (${this.state.roll - this.state.modifier} + ${this.state.modifier})`) : '-'}
                                        </span>
                                        <Icon name='undo' size="small"></Icon>
                                    </div>
                                </Label>
                        </Transition>
                    </Card.Content>
                </Card.Content>
            </Card>
        );
    }
}
