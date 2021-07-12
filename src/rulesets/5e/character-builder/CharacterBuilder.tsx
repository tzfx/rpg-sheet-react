import { CharClass, Race } from 'dnd5e';
import React from 'react';
import { Container } from 'semantic-ui-react';
import { BuilderSteps } from './BuilderSteps';
import { ClassChooser } from './ClassChooser';
import { RaceChooser } from './RaceChooser';

type Props = {};

type State = {
    step: number;
    race?: Race;
    clazz?: CharClass;
    equipment?: [];
};

export class CharacterBuilder extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            step: 0,
        };
    }

    render = () => (
        <Container>
            <BuilderSteps step={this.state.step}></BuilderSteps>
            {this.state.step === 0 ? (
                <RaceChooser
                    selected$={(race) => {
                        this.setState({ race, step: this.state.step + 1 });
                    }}
                ></RaceChooser>
            ) : this.state.step === 1 ? (
                <ClassChooser
                    selected$={(clazz) => {
                        this.setState({ clazz, step: this.state.step + 1 });
                    }}
                ></ClassChooser>
            ) : (
                ''
            )}
        </Container>
    );
}
