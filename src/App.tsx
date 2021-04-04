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

type ViewOption = 'character-list' | 'character-sheet' | null;

type State = {
    characters: Character[];
    open?: Character;
    selection: ViewOption;
};

export default class App extends React.Component<{}, State> {
    private characterService: CharacterService;

    handleViewChange = (selection: ViewOption) => {
        this.setState({ selection });
    };

    handleSelectCharacter = (character: Character) => {
        this.setState({ open: character }, () => this.handleViewChange('character-sheet'));
    };

    constructor() {
        super({});
        this.characterService = new CharacterService();
        this.state = {
            characters: [],
            selection: null,
        };
    }

    componentDidMount = () => {
      this.characterService
      .bootstrap()
      .then(() =>
          this.characterService
              .getCharacters()
              .then((characters) => this.setState({ characters: [] }))
      );
    }

    render = () => (
        <div className="App">
            <Container>
                <AppHeader></AppHeader>
                {this.state.selection === 'character-list' ? (
                    <CharacterList
                        select$={this.handleSelectCharacter}
                        characters={this.state.characters}
                    ></CharacterList>
                ) : this.state.selection === 'character-sheet' ? (
                    <CharacterSheet id={this.state.open?.id ?? 'NEW'}></CharacterSheet>
                ) : (
                    <div>
                      {JSON.stringify(this.state.characters)}
                    </div>
                )}
            </Container>
        </div>
    );
}
