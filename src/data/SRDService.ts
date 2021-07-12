import * as localforage from 'localforage';
import * as srd from 'dnd5e';

type SRDType =
    | 'class'
    | 'condition'
    | 'damageType'
    | 'equipment'
    | 'feature'
    | 'language'
    | 'magicSchool'
    | 'proficiency'
    | 'race'
    | 'skill'
    | 'trait';

export class SRDService extends srd.Endpoints {
    loading: Boolean;

    private store: LocalForageDbMethodsCore;

    constructor(name: string = 'rpg-sheet') {
        super(window.fetch.bind(window), 'https://www.dnd5eapi.co/api/')
        this.loading = true;
        this.store = localforage.createInstance({ name });
    }

    async init() {
        const loaded = await this.store.getItem<Date>('srdLoaded');
        if (!loaded) {
            await this.refresh();
        }
        this.loading = false;
    }

    async refresh(): Promise<void> {
        console.log('Refreshing SRD Datastore.');
        try {
            const db = {
                classes: await this.classes(),
                conditions: await this.conditions(),
                damageTypes: await this.damageTypes(),
                equipment: await this.equipment(),
                features: await this.features(),
                languages: await this.languages(),
                magicSchools: await this.magicSchools(),
                proficiencies: await this.proficiencies(),
                races: await this.races(),
                skills: await this.skills(),
                traits: await this.traits(),
                srdLoaded: new Date(),
            };
            await Promise.all(
                Object.entries(db).map(([key, value]) => this.store.setItem(key, value))
            );
            return Promise.resolve();
        } catch (err) {
            return Promise.reject(err);
        }
    }

    // async classes() {
    //     return this.store.getItem<srd.CharClass[]>('classes');
    // }

    // async conditions() {
    //     return this.store.getItem<srd.Condition[]>('conditions');
    // }

    // async damageTypes() {
    //     return this.store.getItem<srd.DamageType[]>('damageTypes');
    // }

    // async equipment() {
    //     return this.store.getItem<srd.Equipment[]>('equipment');
    // }

    // async features() {
    //     return this.store.getItem<srd.Feature[]>('features');
    // }

    // async languages() {
    //     return this.store.getItem<srd.Language[]>('languages');
    // }

    // async magicSchools() {
    //     return this.store.getItem<srd.MagicSchool[]>('magicSchools');
    // }

    // async proficiencies() {
    //     return this.store.getItem<srd.Proficiency[]>('proficiencies');
    // }

    // async races() {
    //     return this.store.getItem<srd.Race[]>('races');
    // }

    // async skills() {
    //     return this.store.getItem<srd.Skill[]>('skills');
    // }

    // async traits() {
    //     return this.store.getItem<srd.Trait[]>('traits');
    // }
}
