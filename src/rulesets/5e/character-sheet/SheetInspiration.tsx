import React from 'react';
import { Button, Icon, Segment } from 'semantic-ui-react';
import { Character } from '../Character';

type Props = {
    character: Character;
};

type State = {
    checked: boolean;
};

export class SheetInspiration extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { checked: props.character.inspiration };
    }

    toggle = () =>
        this.setState({
            checked: !this.state.checked,
        });

    render() {
        return (
            <Segment raised>
                <Button active={this.state.checked} onClick={this.toggle}>
                    <Icon
                        size="large"
                        name={this.state.checked ? 'check square outline' : 'square outline'}
                    ></Icon>
                    Inspiration
                </Button>
            </Segment>
        );
    }
}
