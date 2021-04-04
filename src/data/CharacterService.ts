import * as localforage from "localforage";
import { Character } from "../rulesets/5e/Character";

export class CharacterService {

    private store: LocalForageDbMethodsCore;

    constructor(name: string = "rpg-sheet") {
        this.store = localforage.createInstance({ name });
    }

    async getCharacters(): Promise<Character[]> {
        return await this.store.getItem<Character[]>("characters") ?? [];
    }

    async getCharacter(uuid: string): Promise<Character> {
        try {
            const character = (await this.getCharacters())
                .filter((character) => character.id === uuid)[0];
            return Promise.resolve(character);
        } catch (err) {
            return Promise.reject(`No character with the id ${uuid} was found in local storage.`);
        }
    }

    async saveCharacter(character: Character): Promise<number> {
        const characters = (await this.getCharacters()).filter((c) => c.id !== character.id).push(character);
        return this.store.setItem("characters", characters);
    }

}