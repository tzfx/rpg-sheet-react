import { Random } from 'random-js';
import React from 'react';
import { Grid, Segment } from 'semantic-ui-react';
import { Character } from '../Character';
import { SheetArmor } from './SheetArmor';
import { SheetDeathSaves } from './SheetDeathSaves';
import { SheetHealth } from './SheetHealth';
import { SheetHitDice } from './SheetHitDice';
import { SheetInitiative } from './SheetInitiative';
import { SheetSpeed } from './SheetSpeed';

type Props = {
    character: Character;
};

export class SheetStatuses extends React.Component<Props> {
    private rng = new Random();

    constructor(props: Props) {
        super(props);
    }

    render() {
        return (
            <Segment raised>
                <Grid>
                    <Grid.Row columns={3} verticalAlign="middle">
                        <Grid.Column stretched>
                            <SheetArmor {...this.props}></SheetArmor>
                        </Grid.Column>
                        <Grid.Column stretched>
                            <SheetInitiative {...this.props} rng={this.rng}></SheetInitiative>
                        </Grid.Column>
                        <Grid.Column stretched>
                            <SheetSpeed {...this.props}></SheetSpeed>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row columns={1}>
                        <Grid.Column>
                            <SheetHealth {...this.props}></SheetHealth>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row columns={2} stretched>
                        <Grid.Column>
                            <SheetHitDice {...this.props}></SheetHitDice>
                        </Grid.Column>
                        <Grid.Column>
                            <SheetDeathSaves {...this.props} rng={this.rng}></SheetDeathSaves>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Segment>
        );
    }
}
