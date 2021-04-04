import React from 'react';
import { Button, Table } from 'semantic-ui-react';
import { Character } from './Character';
import { get } from '../../util/get';

type Props = {
    characters: Character[];
    select$: (character: Character) => void;
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
                {Object.values(this.headers).map((heading) => (
                    <Table.HeaderCell key={heading}>{heading}</Table.HeaderCell>
                ))}
                <Table.HeaderCell>Options</Table.HeaderCell>
            </Table.Header>
            {this.props.characters.map((character) => (
                <Table.Row key={character.id}>
                    {Object.keys(this.headers).map((key) => (
                        <Table.Cell key={key}>{get(character, key)}</Table.Cell>
                    ))}
                    <Table.Cell key={'options'}>
                        <Button icon="play" onClick={() => this.props.select$(character)}></Button>
                        <Button icon="trash" color="red"></Button>
                    </Table.Cell>
                </Table.Row>
            ))}
        </Table>
    );
}
