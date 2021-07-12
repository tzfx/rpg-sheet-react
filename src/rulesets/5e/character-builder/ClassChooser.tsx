import { CharClass } from 'dnd5e';
import React from 'react';
import { Button, Card, List, Loader, Segment } from 'semantic-ui-react';
import { SRDAPI } from '../../../data/SRDAPI';

type Props = {
    selected$: (race: CharClass) => void;
};
type State = {
    loading: boolean;
    classes: CharClass[];
    selected?: CharClass;
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
    api = SRDAPI;

    constructor(props: Props) {
        super(props);
        this.state = {
            classes: [],
            loading: true,
        };
    }

    componentDidMount = async () => {
        try {
            const classNames = await this.api.classes();
            const classes = await Promise.all(
                classNames.results.map((r) => this.api.classes((r as any).index))
            );
            this.setState({ classes }, () => {
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
                                                <List.List bulleted>
                                                    {clazz.saving_throws.map((prof) => (
                                                        <List.Item>{prof.name}</List.Item>
                                                    ))}
                                                </List.List>
                                            </List.Item>
                                        </List.Item>
                                        <List.Item>
                                            <List.Header>Proficiencies</List.Header>
                                            <List.Item>
                                                <List bulleted>
                                                    {clazz.proficiencies.map((prof) => (
                                                        <List.Item>{prof.name}</List.Item>
                                                    ))}
                                                </List>
                                            </List.Item>
                                        </List.Item>
                                        <List.Item>
                                            <List.Header>Proficiency Options</List.Header>
                                            <List.Item>
                                                <List>
                                                    {clazz.proficiency_choices.map((prof) => (
                                                        <List.Item>
                                                            Choose {prof.choose}:
                                                            <List.List bulletted>
                                                                {prof.from.map((choice) => (
                                                                    <List.Item>
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
                                                <List.List bulleted>
                                                    {(clazz.starting_equipment as any).map(
                                                        (equip: any) => (
                                                            <List.Item>
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
                                                <List.List bulleted>
                                                    {(clazz as any).starting_equipment_options.map(
                                                        (equip: any) => (
                                                            <List.Item>
                                                                Choose {equip.choose}:
                                                                <List.List bulletted>
                                                                    {equip.from.map(
                                                                        (choice: any) => (
                                                                            <List.Item>
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
