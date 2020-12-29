import React from 'react';
import { BreadcrumbDivider, Grid, Item, Label, Segment } from 'semantic-ui-react';
import { Character } from '../Character';

type Props = { character: Character };

type State = {
    character: Character;
};

export class SheetHeader extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { character: props.character };
    }
    render() {
        return (
                <Grid.Row verticalAlign="middle" columns={2}>
                    <Grid.Column width={6}>
                        <Segment>
                        <h1>{this.state.character.bio.name}</h1>
                        </Segment>
                    </Grid.Column>
                    <Grid.Column width={10}>
                        <Segment>
                            <Grid divided>
                                {[
                                    ["Class", this.state.character.bio.class.name],
                                    ["Level",this.state.character.level],
                                    ["Background", this.state.character.bio.background],
                                ].map((e,i) => (
                                    <Grid.Column key={i} width={5}><strong>{e[1]}</strong><br /><small>{e[0]}</small></Grid.Column>
                                ))}
                            </Grid>
                        </Segment>
                        <Segment>
                            <Grid divided>
                                {[
                                    ["Race", this.state.character.bio.race.name],
                                    ["Alignment", this.state.character.bio.alignment.toLocaleString()],
                                    ["xp", this.state.character.xp],
                                ].map((e,i) => (
                                    <Grid.Column key={i} width={5}><strong>{e[1]}</strong><br /><small>{e[0]}</small></Grid.Column>
                                ))}
                            </Grid>
                        </Segment>
                    </Grid.Column>
                </Grid.Row>
        );
    }
}
