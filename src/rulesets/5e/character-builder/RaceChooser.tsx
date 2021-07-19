// import { Race } from 'dnd5e';
import { Race, fivee } from "fivee";
// import * as fivee from "fivee";
import React from 'react';
import { Accordion, Button, Card, List, Loader, Segment } from 'semantic-ui-react';
// import { SRDAPI } from '../../../data/SRDAPI';

// import { fivee } from "fivee/build/src";

type Props = {
    selected$: (race: Race) => void;
};
type State = {
    loading: boolean;
    races: Race[];
    selected?: Race;
};

const morePanel = (race: Race) => ({
    key: 'more',
    title: 'More Information',
    content: {
        content: (
            <List>
                <List.Item>
                    <List.Content>
                        <List.Header>Alignment</List.Header>
                        <List.Description>{race.alignment}</List.Description>
                    </List.Content>
                </List.Item>
                <List.Item>
                    <List.Content>
                        <List.Header>Age</List.Header>
                        <List.Description>{race.age}</List.Description>
                    </List.Content>
                </List.Item>
                <List.Item>
                    <List.Content>
                        <List.Header>Languages</List.Header>
                        <List.Description>{race.languageDescription}</List.Description>
                    </List.Content>
                </List.Item>
            </List>
        ),
    },
});

export class RaceChooser extends React.Component<Props, State> {
    api = fivee();

    constructor(props: Props) {
        super(props);
        this.state = {
            races: [],
            loading: true,
        };
    }

    componentDidMount = async () => {
        try {
            const res = await this.api.races.fetchAll();
            const races = [...res.values()];
            this.setState({ races }, () => {
                this.setState({ loading: false });
            });
        } catch (err) {
            console.error(err);
        }
    };

    render = () => (
        <Segment>
            <Segment>
                <Button
                    onClick={() => this.props.selected$(this.state.selected!)}
                    disabled={this.state.selected == null}
                >
                    Next &gt;
                </Button>
            </Segment>

            <Card.Group centered>
                {this.state.loading ? (
                    <Card>
                        <Card.Content>
                            <Loader content="Loading..."></Loader>
                        </Card.Content>
                    </Card>
                ) : (
                    this.state.races.map((race) => (
                        <Card
                            key={race.index}
                            link
                            onClick={() => {
                                this.setState({ selected: race });
                            }}
                            color={this.state.selected === race ? 'red' : undefined}
                        >
                            <Card.Content>
                                <Card.Header>{race.name}</Card.Header>
                                <Card.Meta>
                                    {race.size}, {race.speed} speed
                                </Card.Meta>
                                <Card.Description>
                                    <List>
                                        <List.Item>
                                            <List.Content>
                                                <List.Header>Bonuses</List.Header>
                                                <List.Description>
                                                    {race.abilityBonuses
                                                        .map(
                                                            (b) =>
                                                                `${b.ability_score.index} +${b.bonus}`
                                                        )
                                                        .join(', ')}
                                                </List.Description>
                                            </List.Content>
                                        </List.Item>
                                        <List.Item>
                                            <List.Content>
                                                <List.Description>
                                                    <Accordion
                                                        defaultActiveIndex={-1}
                                                        panels={[morePanel(race)]}
                                                    ></Accordion>
                                                </List.Description>
                                            </List.Content>
                                        </List.Item>
                                    </List>
                                </Card.Description>
                            </Card.Content>
                        </Card>
                    ))
                )}
            </Card.Group>
        </Segment>
    );
}
