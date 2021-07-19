import React from 'react';
import { Button, Icon, Table } from 'semantic-ui-react';
import { Character } from './Character';
import { get } from '../../util/get';

type Props = {
    characters: Character[];
    select$: (character: Character) => void;
    new$: () => void;
};

export class CharacterList extends React.Component<Props, {}> {
    headers = {
        'bio.name': 'Name',
        level: 'Level',
        'bio.race.name': 'Race',
        'bio.class.name': 'Class',
    };

    render = () => (
        <Table textAlign="center">
            <Table.Header>
                <Table.Row>
                    {Object.values(this.headers).map((heading) => (
                        <Table.HeaderCell key={heading}>{heading}</Table.HeaderCell>
                    ))}
                    <Table.HeaderCell>Options</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                <Table.Row>
                    <Table.Cell textAlign="center" width={Object.keys(this.headers).length as any}>
                        <Button onClick={() => this.props.new$()} size="large">
                            <Icon name="plus"></Icon>Add a new character
                        </Button>
                    </Table.Cell>
                </Table.Row>
                {this.props.characters.map((character) => (
                    <Table.Row key={character.id}>
                        {Object.keys(this.headers).map((key) => (
                            <Table.Cell key={key}>{get(character, key)}</Table.Cell>
                        ))}
                        <Table.Cell key={'options'}>
                            <Button
                                icon="play"
                                onClick={() => this.props.select$(character)}
                            ></Button>
                            <Button icon="trash" color="red"></Button>
                        </Table.Cell>
                    </Table.Row>
                ))}
            </Table.Body>
        </Table>
    );
}
