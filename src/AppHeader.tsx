import React from "react";
import { Menu, Dropdown } from "semantic-ui-react";

export class AppHeader extends React.Component {

    render = () => (
        <Menu fluid>
            <Menu.Item header name='RPGSheet'></Menu.Item>
            <Menu.Item position="right" disabled fitted></Menu.Item>
            <Dropdown item icon='sliders horizontal' direction="left">
                <Dropdown.Menu>
                    <Dropdown.Item>
                        Back to Character Selection
            </Dropdown.Item>
                    <Dropdown.Item>
                        Save
            </Dropdown.Item>
                    <Dropdown.Item>
                        Delete
            </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </Menu>
    )
}