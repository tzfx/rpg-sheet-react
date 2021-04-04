import { Random } from 'random-js';
import React from 'react';

type Props = {
    dice?: number;
    sides: number;
};

type State = {
    roll: number;
};

export class Roller extends React.Component<Props, State> {
    private rng = new Random();

    constructor(props: Props) {
        super(props);
        this.state = {
            roll: 0,
        };
    }

    roll = () =>
        this.props.dice == null
            ? this.rng.die(this.props.sides)
            : this.rng.dice(this.props.sides, this.props.dice);
}
