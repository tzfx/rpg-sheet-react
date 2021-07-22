import { Class, Race } from 'fivee';
import React from 'react';
import { Container } from 'semantic-ui-react';
import { Abilities } from '../Abilities';
import { AbilityScoreRoller } from './AbilityScoreRoller';
import { BuilderSteps } from './BuilderSteps';
import { ClassChooser } from './ClassChooser';
import { RaceChooser } from './RaceChooser';

type Props = {};

type State = {
    step: number;
    race?: Race;
    clazz?: Class;
    abilities?: Abilities;
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
                    selected$={(race: any) => {
                        this.setState({ race, step: this.state.step + 1 });
                    }}
                ></RaceChooser>
            ) : this.state.step === 1 ? (
                <ClassChooser
                    selected$={(clazz) => {
                        this.setState({ clazz, step: this.state.step + 1 });
                    }}
                ></ClassChooser>
            ) : this.state.step === 2 ? (
                <AbilityScoreRoller
                    race={this.state.race as any}
                    selected$={(abilities) => {
                        this.setState({ abilities, step: this.state.step + 1 });
                    }}
                ></AbilityScoreRoller>
            ) : (
                ''
            )}
        </Container>
    );
}
