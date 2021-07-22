import { AbilityScoreName, Race } from 'dnd5e';
import { Random } from 'random-js';
import React from 'react';
import { Button, Card, CardGroup, Divider, Segment } from 'semantic-ui-react';
import { Abilities, Ability2Name } from '../Abilities';

type Props = {
    race?: any;
    selected$: (abilities: Abilities) => void;
};
type State = {
    abilities: Abilities;
    array: number[];
    points: number;
    view: 'std' | 'point' | 'roll' | 'none';
    ok: boolean;
};
export class AbilityScoreRoller extends React.Component<Props, State> {
    private rng = new Random();
    private standardArray = [15, 14, 13, 12, 10, 8];
    private defaultPoints = 27;

    constructor(props: Props) {
        super(props);
        this.state = {
            abilities: {
                STR: 0,
                DEX: 0,
                INT: 0,
                CON: 0,
                WIS: 0,
                CHA: 0,
            },
            array: this.standardArray,
            points: 27,
            view: 'none',
            ok: false,
        };
    }

    reset() {
        const abilities: any = Object.keys(this.state.abilities).reduce((p, c) => {
            p[c] = 0;
            return p;
        }, {} as any);
        const array = this.standardArray;
        const points = this.defaultPoints;
        this.setState({ abilities, array, points });
    }

    setAbilityViaArray(ability: AbilityScoreName, choice: number) {
        let array = this.state.array;
        const current = this.state.abilities[ability];
        if (
            this.standardArray.includes(choice) &&
            current !== 0 &&
            !this.state.array.includes(current)
        ) {
            array.push(current);
        }
        array = array.filter((v) => v !== choice);
        this.setState(
            {
                array,
                abilities: { ...this.state.abilities, ...{ [ability]: choice } },
            },
            () => {
                this.setState({ ok: Object.values(this.state.abilities).every((v) => v !== 0) });
            }
        );
    }

    render = () => (
        <Segment>
            <Segment>
                <Button
                    onClick={() => this.props.selected$(this.state.abilities!)}
                    disabled={!this.state.ok}
                >
                    Next &gt;
                </Button>
            </Segment>
            <Card.Group>
                <Card link onClick={() => this.setState({ view: 'std' }, () => this.reset())}>
                    <Card.Header>Standard Array</Card.Header>
                    <Card.Content>
                        Assign your abilities based on a standard set of numbers.
                    </Card.Content>
                </Card>
                <Card>
                    <Card.Header>Point Buy</Card.Header>
                    <Card.Content>
                        Distribute points as you see fit from a set number of points.
                    </Card.Content>
                </Card>
                <Card>
                    <Card.Header>Roller</Card.Header>
                    <Card.Content>Let fate decide!</Card.Content>
                </Card>
            </Card.Group>
            <Divider />
            <CardGroup itemsPerRow="3">
                {Object.entries(Ability2Name).map(([k, name]) => (
                    <Card key={k}>
                        <Card.Header>{name}</Card.Header>
                        <Card.Content>
                            <Segment>
                                {this.state.abilities[k as AbilityScoreName]}
                                <br />
                                {(this.props.race?.abilityBonuses as any[]).find(
                                    (s) => s.ability_score.name === k
                                ) != null
                                    ? ` +${
                                          (this.props.race?.abilityBonuses as any[]).find(
                                              (s) => s.ability_score.name === k
                                          ).bonus
                                      } (${this.props.race?.name})`
                                    : ' '}
                            </Segment>
                            <Divider />
                            {this.state.view === 'std' ? (
                                <CardGroup itemsPerRow={3}>
                                    {this.state.array.map((n) => (
                                        <Card
                                            onClick={() =>
                                                this.setAbilityViaArray(k as AbilityScoreName, n)
                                            }
                                            link
                                            key={n}
                                        >
                                            <Card.Content>{n}</Card.Content>
                                        </Card>
                                    ))}
                                </CardGroup>
                            ) : (
                                ''
                            )}
                        </Card.Content>
                    </Card>
                ))}
            </CardGroup>
        </Segment>
    );
}
