import React from 'react';
import { Step } from 'semantic-ui-react';

type Props = {
    step: number;
};

type State = {
    // step: number
};

type BuilderStep = {
    title: string;
    description: string;
};

export class BuilderSteps extends React.Component<Props, State> {
    steps: BuilderStep[] = [
        {
            title: 'Race',
            description: 'Choose your race.',
        },
        {
            title: 'Class',
            description: 'Choose your class.',
        },
        {
            title: 'Ability Scores',
            description: 'Distribute Ability Scores.',
        },
        {
            title: 'Description',
            description: 'Describe your character.',
        },
        {
            title: 'Equipment',
            description: 'Choose starting equipment.',
        },
        {
            title: 'Done!',
            description: 'Review and Save!',
        },
    ];

    render = () => (
        <Step.Group size="mini" widths="6">
            {this.steps.map((step, i) => (
                <Step key={i} active={i === this.props.step}>
                    <Step.Title>{step.title}</Step.Title>
                    <Step.Description>{step.description}</Step.Description>
                </Step>
            ))}
        </Step.Group>
    );
}
