import logo from './logo.svg';
import './App.css';
import 'semantic-ui-css/semantic.min.css';
import CharacterSheet from './rulesets/5e/character-sheet/CharacterSheet';
import { Container } from 'semantic-ui-react';

function App() {
  return (
    <div className="App">
      <Container>
        <CharacterSheet></CharacterSheet>
      </Container>
    </div>
  );
}

export default App;
