import logo from './logo.svg';
import './App.css';
import 'semantic-ui-css/semantic.min.css';
import CharacterSheet from './rulesets/5e/character-sheet/CharacterSheet';
import { Container } from 'semantic-ui-react';
import React from 'react';
import { Character } from './rulesets/5e/Character';
import { CharacterService } from './data/CharacterService';
import { CharacterList } from './rulesets/5e/CharacterList';
import { AppHeader } from './AppHeader';
import { Yevgeni } from './rulesets/5e/example/Yevgeni';
import { Esh } from './rulesets/5e/example/Esh';

type State = {
    characters: Character[];
    open?: Character;
    selection: string;
};

export default class App extends React.Component<{}, State> {
    private characterService: CharacterService;

    handleViewChange = (selection: string) => {
        this.setState({ selection });
    };

    constructor() {
        super({});
        this.characterService = new CharacterService();
        this.state = {
            characters: [],
            selection: 'character-list',
        };
        this.characterService.getCharacters().then((characters) => {
            this.setState({
                characters: [new Yevgeni(), new Esh()],
            });
        });
    }

    render = () => (
        <div className="App">
            <Container>
                <AppHeader></AppHeader>
                <CharacterList characters={this.state.characters}></CharacterList>
            </Container>
        </div>
    );
}
