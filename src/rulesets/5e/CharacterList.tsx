import React from "react";
import { Button, Table } from "semantic-ui-react";
import { Character } from "./Character";

type Props = {
    characters: Character[];
}

export class CharacterList extends React.Component<Props, {}> {

    // Native implementation for lodash get.
    private get = (obj: Object, path: string, defaultValue = undefined) => {
        const travel = (regexp: any) =>
            String.prototype.split
                .call(path, regexp)
                .filter(Boolean)
                .reduce((res, key) => (res !== null && res !== undefined ? (res as any)[key] : res), obj);
        const result = travel(/[,[\]]+?/) || travel(/[,[\].]+?/);
        return result === undefined || result === obj ? defaultValue : result;
    };

    headers = {
        'bio.name': 'Name',
        level: 'Level',
        'bio.race.name': 'Race',
        'bio.class.name': 'Class'
    };

    render = () => (
        <Table textAlign="center">
            <Table.Header>
                {Object.values(this.headers).map((heading) => (
                    <Table.HeaderCell key={heading}>
                        {heading}
                    </Table.HeaderCell>
                ))}
                <Table.HeaderCell>
                    Options
                </Table.HeaderCell>
            </Table.Header>
            { this.props.characters.map((character) => (
                <Table.Row key={character.id}>
                    { Object.keys(this.headers).map(key => (
                        <Table.Cell key={key}>
                            {this.get(character, key)}
                        </Table.Cell>
                    ))}
                    <Table.Cell key={'options'}>
                        <Button icon='play'></Button>
                        <Button icon='trash' color="red"></Button>
                    </Table.Cell>
                </Table.Row>
            ))}
        </Table>
    );
}