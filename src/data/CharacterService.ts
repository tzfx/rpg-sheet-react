import * as localforage from 'localforage';
import { Character } from '../rulesets/5e/Character';
import { Esh } from '../rulesets/5e/example/Esh';
import { Yevgeni } from '../rulesets/5e/example/Yevgeni';

export class CharacterService {
    private store: LocalForageDbMethodsCore;

    constructor(name: string = 'rpg-sheet') {
        this.store = localforage.createInstance({ name });
    }

    async bootstrap(): Promise<number> {
        await this.store.clear();
        const saves = await Promise.all(
            [new Esh(), new Yevgeni()].map(async (c) => await this.saveCharacter(c))
        );
        return Promise.resolve(saves.reduce((p, c) => p + c, 0));
    }

    async getCharacters(): Promise<Character[]> {
        const characters = await this.store.getItem<Character[]>('characters');
        return characters ?? [];
    }

    async getCharacter(uuid: string): Promise<Character> {
        try {
            const character = (await this.getCharacters()).filter(
                (character) => character.id === uuid
            )[0];
            return Promise.resolve(character);
        } catch (err) {
            return Promise.reject(`No character with the id ${uuid} was found in local storage.`);
        }
    }

    async saveCharacter(character: Character): Promise<number> {
        const characters = await this.getCharacters();
        // @TODO: Modify the character type to only store serializable data-- functions will not properly store into localforage.
        const saved = this.store.setItem(
            'characters',
            characters.filter((c) => c.id !== character.id).concat(character)
        );
        return 1;
    }
}
