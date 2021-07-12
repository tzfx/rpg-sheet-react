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
import { CharacterBuilder } from './rulesets/5e/character-builder/CharacterBuilder';

type ViewOptions = 'character-list' | 'character-sheet' | 'new-character';

type Props = {};
type State = {
    characters: Character[];
    open?: Character;
    selection: ViewOptions;
};

export default class App extends React.Component<Props, State> {
    private characterService: CharacterService;

    handleViewChange = (selection: ViewOptions) => {
        this.setState({ selection });
    };

    handleCharacterSelect = (character: Character) => {
        this.setState({ open: character }, () => this.handleViewChange('character-sheet'));
    };

    handleNewCharacter = () => {
        this.handleViewChange('new-character');
    };

    constructor(props: Props) {
        super(props);
        this.characterService = new CharacterService();
        this.state = {
            characters: [],
            selection: 'character-list',
        };
        this.characterService.getCharacters().then((characters) => {
            this.setState({
                // characters: [Yevgeni as Character, new Character(Esh)],
                characters: [],
            });
        });
    }

    render = () => (
        <div className="App">
            <Container>
                <AppHeader></AppHeader>
                {this.state.selection === 'character-sheet' && this.state.open != null ? (
                    <CharacterSheet character={this.state.open}></CharacterSheet>
                ) : this.state.selection === 'character-list' ? (
                    <CharacterList
                        new$={() => this.handleNewCharacter()}
                        select$={(character: Character) => this.handleCharacterSelect(character)}
                        characters={this.state.characters}
                    ></CharacterList>
                ) : this.state.selection === "new-character" ? (
                    <CharacterBuilder></CharacterBuilder>
                ) : ('')}
            </Container>
        </div>
    );
}
