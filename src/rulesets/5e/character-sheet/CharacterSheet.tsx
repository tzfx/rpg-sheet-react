import { Random } from 'random-js';
import React from 'react';
import { Divider, Grid, Placeholder } from 'semantic-ui-react';
import { Character } from '../Character';
import { Yevgeni } from '../example/Yevgeni';
import { SheetAbilities } from './SheetAbilities';
import { SheetHeader } from './SheetHeader';
import { SheetInspiration } from './SheetInspiration';
import { SheetOtherProficiencies } from './SheetOtherProficiencies';
import { SheetPerception } from './SheetPerception';
import { SheetProficiency } from './SheetProficiency';
import { SheetSkills } from './SheetSkills';
import { SheetStatuses } from './SheetStatuses';

type Props = { id: string };

type State = {
    loading: boolean;
    character: Character;
    rng: Random;
};

class CharacterSheet extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            loading: false,
            character: new Yevgeni(),
            rng: new Random()
        };
    }

    componentDidMount() {
        // CharacterService.getCharacter(this.props.uuid)
        //   .then((res) => res.json())
        //   .then((char: Character) => {
        //     this.setState({ character: char }, () => {
        //       this.setState({ loading: false });
        //     });
        //   });
    }

    render() {
        return (
                <div>
                {
                    this.state.character == null ? (
                    <Placeholder></Placeholder>
                ) : (
                    <Grid>
                            <SheetHeader {...this.state}></SheetHeader>
                            <Grid.Row columns={3}>
                                <Grid.Column>
                                    <SheetAbilities {...this.state}></SheetAbilities>
                                    <SheetPerception {...this.state}></SheetPerception>
                                </Grid.Column>
                                <Grid.Column>
                                    <SheetInspiration {...this.state}></SheetInspiration>
                                    <SheetProficiency {...this.state}></SheetProficiency>
                                    <SheetStatuses {...this.state}></SheetStatuses>
                                </Grid.Column>
                                <Grid.Column>
                                    <SheetSkills {...this.state}></SheetSkills>
                                </Grid.Column>
                                <SheetOtherProficiencies {...this.state}></SheetOtherProficiencies>
                            </Grid.Row>
                    </Grid>
                )
            }
        </div>
        );
    }
}

export default CharacterSheet;
