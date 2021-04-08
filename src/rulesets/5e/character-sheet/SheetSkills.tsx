import React from 'react';
import { Icon, Input, List, Segment } from 'semantic-ui-react';
import { getModifier } from '../Abilities';
import { Character } from '../Character';
import { Skill, Skills } from '../skills/Skills';

type Props = {
    character: Character;
};

type State = {
    search?: string;
    skills: Set<Skill>;
};

export class SheetSkills extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        if (props.character.bio != null)
            this.state = {
                skills: new Set(Array.from(props.character.proficiencies.skills).concat(Skills)),
            };
    }


    isProficientInSkill = (skill: Skill) => {
        return Array.from(this.props.character.proficiencies.skills).some(
            (s) => s.name === skill.name
        );
    };

    search = (event: React.KeyboardEvent<HTMLInputElement>) => {
        const query = event.currentTarget.value;
        if (query !== '')
            this.setState({
                skills: new Set(
                    Array.from(this.props.character.proficiencies.skills)
                        .concat(Skills)
                        .filter((a) => a.name.toLowerCase().startsWith(query.toLowerCase()))
                ),
            });
        else if (this.props.character.bio != null)
            this.setState({
                skills: new Set(
                    Array.from(this.props.character.proficiencies.skills).concat(Skills)
                ),
            });
    };

    render() {
        return (
            <Segment raised>
                <h2>Skills</h2>
                <Input icon>
                    <input onKeyUp={this.search} type="text" placeholder="Search..."></input>
                    <Icon name="search"></Icon>
                </Input>
                <List ordered={false}>
                    {Array.from(this.state.skills).map((skill) => (
                        <Segment key={skill.name} raised={this.isProficientInSkill(skill)}>
                            <Icon
                                name={
                                    this.isProficientInSkill(skill)
                                        ? 'check circle'
                                        : 'circle outline'
                                }
                            ></Icon>
                            {skill.name}
                            <br />
                            <span color="grey">
                                ( {getModifier(this.props.character.abilities[skill.ability])}{' '}
                                {skill.ability}
                                {this.isProficientInSkill(skill)
                                    ? ' + '
                                          .concat(this.props.character.proficiency.toString())
                                          .concat(' prof. )')
                                    : ' )'}
                            </span>
                        </Segment>
                    ))}
                </List>
            </Segment>
        );
    }
}
