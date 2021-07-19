import { CharClass } from 'dnd5e';
import React from 'react';
import { Button, Card, List, Loader, Segment } from 'semantic-ui-react';
import { SRDAPI } from '../../../data/SRDAPI';
import { fivee, Class } from "fivee";

type Props = {
    selected$: (race: Class) => void;
};
type State = {
    loading: boolean;
    classes: Class[];
    selected?: Class;
};

// const morePanel = (clazz: CharClass) => ({
//     key: 'more',
//     title: 'More Information',
//     content: {
//         content: (
//             <List>
//                 <List.Item>
//                     <List.Content>
//                         <List.Header>Alignment</List.Header>
//                         <List.Description>{race.alignment}</List.Description>
//                     </List.Content>
//                 </List.Item>
//                 <List.Item>
//                     <List.Content>
//                         <List.Header>Age</List.Header>
//                         <List.Description>{race.age}</List.Description>
//                     </List.Content>
//                 </List.Item>
//                 <List.Item>
//                     <List.Content>
//                         <List.Header>Languages</List.Header>
//                         <List.Description>{race.language_desc}</List.Description>
//                     </List.Content>
//                 </List.Item>
//             </List>
//         ),
//     },
// });

export class ClassChooser extends React.Component<Props, State> {
    api = fivee();

    constructor(props: Props) {
        super(props);
        this.state = {
            classes: [],
            loading: true,
        };
    }

    componentDidMount = async () => {
        try {
            const classes = await this.api.classes.fetchAll();
            // const classes = await Promise.all(
            //     [...classNames.values()].map((r) => this.api.classes((r as any).index))
            // );
            console.log([...classes.values()]);
            this.setState({ classes: [...classes.values()] }, () => {
                this.setState({ loading: false });
            });
        } catch (err) {
            console.error(err);
        }
    };

    render = () => (
        <Segment>
            <Segment>
                <Button
                    onClick={() => this.props.selected$(this.state.selected!)}
                    disabled={this.state.selected == null}
                >
                    Next &gt;
                </Button>
            </Segment>

            <Card.Group centered>
                {this.state.loading ? (
                    <Card>
                        <Card.Content>
                            <Loader content="Loading..."></Loader>
                        </Card.Content>
                    </Card>
                ) : (
                    this.state.classes.map((clazz) => (
                        <Card
                            key={clazz.name}
                            link
                            onClick={() => {
                                this.setState({ selected: clazz });
                            }}
                            color={this.state.selected === clazz ? 'red' : undefined}
                        >
                            <Card.Content textAlign="left">
                                <Card.Header>{clazz.name}</Card.Header>
                                <Card.Meta>
                                    {clazz.spellcasting != null
                                        ? `Spellcaster - ${
                                              (clazz.spellcasting as any).spellcasting_ability.index
                                          }`
                                        : `Martial`}
                                </Card.Meta>
                                <Card.Description>
                                    <List>
                                        <List.Item>
                                            <List.Header>Saving Throws</List.Header>
                                            <List.Item>
                                                <List.List>
                                                    {clazz.savingThrows.map((prof) => (
                                                        <List.Item key={prof.index}>{(prof as any).name}</List.Item>
                                                    ))}
                                                </List.List>
                                            </List.Item>
                                        </List.Item>
                                        <List.Item>
                                            <List.Header>Proficiencies</List.Header>
                                            <List.Item>
                                                <List bulleted>
                                                    {clazz.proficiencies.map((prof) => (
                                                        <List.Item key={prof.index}>{(prof as any).name}</List.Item>
                                                    ))}
                                                </List>
                                            </List.Item>
                                        </List.Item>
                                        <List.Item>
                                            <List.Header>Proficiency Options</List.Header>
                                            <List.Item>
                                                <List>
                                                    {clazz.proficiency_choices.map((prof, i) => (
                                                        <List.Item key={i}>
                                                            Choose {prof.choose}:
                                                            <List.List>
                                                                {(prof.from as any[]).map((choice) => (
                                                                    <List.Item key={choice.name}>
                                                                        {choice.name}
                                                                    </List.Item>
                                                                ))}
                                                            </List.List>
                                                        </List.Item>
                                                    ))}
                                                </List>
                                            </List.Item>
                                        </List.Item>
                                        <List.Item>
                                            <List.Header>Starting Equipment</List.Header>
                                            <List.Item>
                                                <List.List>
                                                    {(clazz.startingEquipment as any).map(
                                                        (equip: any, i: number) => (
                                                            <List.Item key={i}>
                                                                {equip.equipment.name}
                                                            </List.Item>
                                                        )
                                                    )}
                                                </List.List>
                                            </List.Item>
                                        </List.Item>
                                        <List.Item>
                                            <List.Header>Equipment Options</List.Header>
                                            <List.Item>
                                                <List.List>
                                                    {(clazz as any).data?.starting_equipment_options?.map(
                                                        (equip: any, i: number) => (
                                                            <List.Item key={i}>
                                                                Choose {equip.choose}:
                                                                <List.List>
                                                                    {equip.from.map(
                                                                        (choice: any, i: number) => (
                                                                            <List.Item key={i}>
                                                                                {choice.equipment?.name ?? JSON.stringify(choice)}
                                                                            </List.Item>
                                                                        )
                                                                    )}
                                                                </List.List>
                                                            </List.Item>
                                                        )
                                                    )}
                                                </List.List>
                                            </List.Item>
                                        </List.Item>
                                        {clazz.spellcasting != null ? (
                                            <List.Item>
                                                <List.Header>Spell Casting</List.Header>
                                                <List.Item>
                                                    {JSON.stringify(clazz.spellcasting)}
                                                </List.Item>
                                            </List.Item>
                                        ) : (
                                            ''
                                        )}
                                    </List>
                                </Card.Description>
                            </Card.Content>
                        </Card>
                    ))
                )}
            </Card.Group>
        </Segment>
    );
}
