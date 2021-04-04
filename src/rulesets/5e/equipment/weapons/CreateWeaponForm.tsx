import React from "react";
import { Form, Input, Label } from "semantic-ui-react";
import { Weapon } from "./Weapon.types";

type Dice = {
    number: number,
    die: number
}

type State = {
    weapon: Weapon
};

export class CreateWeaponForm extends React.Component<{},State> {
    constructor() {
        super({});
    }
    
    render() {
        return (
            <Form>
                <Form.Field>
                    <Label>
                        Name
                    </Label>
                    <Input>
                        Weapon Name
                    </Input>
                </Form.Field>
            </Form>
        )
    }
}