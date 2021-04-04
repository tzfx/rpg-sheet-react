import React from 'react';
import { Icon, Input, List, Segment } from 'semantic-ui-react';
import { Abilities, Ability, AbilityType } from '../Abilities';
import { Character } from '../Character';
import { Skill, Skills } from '../skills/Skills';

type Props = {
    character: Character;
};

type State = {
    search?: string;
    throws: Set<AbilityType>;
    skills: Set<Skill>;
};

export class SheetSkills extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        if (props.character.bio != null)
            this.state = {
                throws: new Set(Object.keys(props.character.abilities) as AbilityType[]),
                skills: new Set(Array.from(props.character.proficiencies.skills).concat(Skills)),
            };
    }

    isProficientInThrow = (ability: AbilityType) => {
        return this.props.character.proficiencies.throws.has(ability);
    };

    isProficientInSkill = (skill: Skill) => {
        return Array.from(this.props.character.proficiencies.skills).some(
            (s) => s.name === skill.name
        );
    };

    search = (event: React.KeyboardEvent<HTMLInputElement>) => {
        const query = event.currentTarget.value;
        if (query != '')
            this.setState({
                throws: new Set(
                    ((Object.entries(this.props.character.abilities) as unknown) as [
                        AbilityType,
                        Ability
                    ][])
                        .filter((t) => t[1].name.toLowerCase().startsWith(query.toLowerCase()))
                        .map((t) => t[0])
                ),
                skills: new Set(
                    Array.from(this.props.character.proficiencies.skills)
                        .concat(Skills)
                        .filter((a) => a.name.toLowerCase().startsWith(query.toLowerCase()))
                ),
            });
        else if (this.props.character.bio != null)
            this.setState({
                throws: new Set(Object.keys(this.props.character.abilities) as AbilityType[]),
                skills: new Set(
                    Array.from(this.props.character.proficiencies.skills).concat(Skills)
                ),
            });
    };

    render() {
        return (
            <Segment raised>
                <h2>Throws and Skills</h2>
                <Input icon>
                    <input onKeyUp={this.search} type="text" placeholder="Search..."></input>
                    <Icon name="search"></Icon>
                </Input>
                <h3>Saving Throws</h3>
                <List ordered={false}>
                    {((Object.entries(this.props.character.abilities) as unknown) as [
                        AbilityType,
                        Ability
                    ][])
                        .filter((a) => this.state.throws.has(a[0]))
                        .map((a) => (
                            <Segment key={a[0]} raised={this.isProficientInThrow(a[0])}>
                                <Icon
                                    name={
                                        this.isProficientInThrow(a[0])
                                            ? 'check circle'
                                            : 'circle outline'
                                    }
                                ></Icon>
                                {a[1].name}
                                <br />
                                (&nbsp;
                                {this.isProficientInThrow(a[0])
                                    ? a[1].score.modifier +
                                      ' ' +
                                      a[0] +
                                      ' + ' +
                                      this.props.character.proficiency +
                                      ' prof. )'
                                    : a[1].score.modifier + ' ' + a[0] + ' )'}
                            </Segment>
                        ))}
                </List>
                <h3>Skills</h3>
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
                                ( {this.props.character.abilities[skill.ability].score.modifier}{' '}
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
