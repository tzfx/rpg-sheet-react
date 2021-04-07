import { Random } from 'random-js';
import React from 'react';
import { Button, Card, Icon, Label, Transition } from 'semantic-ui-react';
import { Abilities, Ability2Name, AbilityScore, AbilityType } from '../Abilities';

type Props = {
    type: AbilityType;
    abilities: Abilities;
    proficiencies: Set<AbilityType>;
    proficiency: number;
    rng: Random;
};

type State = {
    score: number;
    name: string;
    modifier: number;
    roll: number;
    rolling: boolean;
};

export class SheetAbility extends React.Component<Props, State> {
    private delay = 500;

    constructor(props: Props) {
        super(props);
        this.state = {
            name: Ability2Name[this.props.type],
            score: this.props.abilities[this.props.type],
            modifier: new AbilityScore(this.props.abilities[this.props.type]).modifier,
            roll: 0,
            rolling: false,
        };
    }

    isProficient = (ability: AbilityType) => this.props.proficiencies.has(ability);

    getModifierColor = () => {
        const mod = this.state.modifier;
        if (mod > 0) {
            return 'positive';
        } else if (mod < 0) {
            return 'negative';
        } else {
            return 'primary';
        }
    };

    getModifierText = () => {
        return `${
            this.state.modifier > 0
                ? '+'.concat(this.state.modifier.toString())
                : this.state.modifier.toString()
        }`;
    };

    rollModifier = () => {
        const roll =
            this.props.rng.dice(20, 1)[0] +
            this.state.modifier;
        this.setState({ roll });
    };

    resetRoll = () => {
        this.setState({ roll: 0 });
    };

    render() {
        return (
            <Card centered>
                <Card.Content>
                    <Card.Header>
                        <Icon
                            name={
                                this.isProficient(this.props.type)
                                    ? 'check circle'
                                    : 'circle outline'
                            }
                        ></Icon>
                        {this.state.name}
                    </Card.Header>
                    <Card.Description>
                        <strong>{this.state.score}</strong>
                        &nbsp;→&nbsp;
                        <span color={this.getModifierColor()}>{this.getModifierText()}</span>
                    </Card.Description>
                    <Card.Content extra>
                        <Button
                            icon="cube"
                            content="Roll"
                            size="medium"
                            disabled={!!this.state.roll}
                            onClick={this.rollModifier}
                        ></Button>
                        <Transition
                            visible={!!this.state.roll}
                            animation="fade right"
                            duration={this.delay}
                        >
                            <Label
                                attached="bottom right"
                                active
                                onClick={this.resetRoll}
                                size="large"
                            >
                                <div title="Reset" style={{ cursor: 'pointer' }}>
                                    <span style={{ paddingRight: '.5em' }}>
                                        {this.state.roll
                                            ? this.state.roll
                                                  .toString()
                                                  .concat(
                                                      ` (${
                                                          this.state.roll - this.state.modifier
                                                      } + ${this.state.modifier})`
                                                  )
                                            : '-'}
                                    </span>
                                    <Icon name="undo" size="small"></Icon>
                                </div>
                            </Label>
                        </Transition>
                    </Card.Content>
                </Card.Content>
            </Card>
        );
    }
}
