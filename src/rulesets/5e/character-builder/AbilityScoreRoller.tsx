import React from 'react';
import { Card, CardHeader } from 'semantic-ui-react';

type Props = {};
type State = {};
export class AbilityScoreRoller extends React.Component<Props, State> {
    
    render = () => (
        <Card.Group>
            <Card>
                <CardHeader>
                    Standard Array
                </CardHeader>
            </Card>
            <Card>
                <Card.Header>
                    Point Buy
                </Card.Header>
            </Card>
            <Card>
                <Card.Header>
                    Roller
                </Card.Header>
            </Card>
            
        </Card.Group>
    );
}
