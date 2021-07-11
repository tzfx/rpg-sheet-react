import React from 'react';
import { Icon, Input, List, Segment } from 'semantic-ui-react';
// import { getModifier } from '../Abilities';
import { Character } from '../Character';
// import { Skill, Skills } from '../skills/Skills';
import { AbilityScoreName, Skill } from 'dnd5e';
import { SRDAPI } from '../../../data/SRDAPI';
import { getModifier } from '../Abilities';
// import { ClientEndpoints as API } from 'dnd5e-client';

type Props = {
    character: Character;
};

type State = {
    search?: string;
    skills: Skill[];
    filtered: Skill[];
};

export class SheetSkills extends React.Component<Props, State> {
    api = SRDAPI;

    constructor(props: Props) {
        super(props);
        this.state = { skills: [], filtered: [] };
    }

    componentDidMount = async () => {
        try {
            const skillList = (await this.api.skills()).results as Skill[];
            const skillsDetails = skillList.map(async (s) => await this.api.skills(s.index));
            const res = await Promise.all(skillsDetails);
            // console.log(await Promise.all(skillsDetails));
            skillList.forEach((s, i) => {
                skillList[i] = { ...s, ...res[i] };
            });
            // console.log(skillList);
            this.setState({ skills: skillList, filtered: skillList });
        } catch (err) {
            throw new Error(err);
        }
    };

    isProficientInSkill = (skill: Skill) => {
        return Array.from(this.props.character.proficiencies.skills).some((s) => s === skill.name);
    };

    search = (event: React.KeyboardEvent<HTMLInputElement>) => {
        const query = event.currentTarget.value;
        if (query !== '')
            this.setState({
                filtered: this.state.filtered.filter((a) =>
                    a.name.toLowerCase().startsWith(query.toLowerCase())
                ),
            });
        else
            this.setState({
                filtered: this.state.skills,
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
                    {this.state.filtered.map((skill) => (
                        <Segment title={skill.desc} key={skill.name} raised={this.isProficientInSkill(skill)}>
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
                                ( {getModifier(this.props.character.abilities[(skill.ability_score as any).name as AbilityScoreName])}
                                {' '}
                                {(skill.ability_score as any).index}
                                {' '}
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
