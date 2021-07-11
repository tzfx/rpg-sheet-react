import { Endpoints as API } from 'dnd5e';

export const SRDAPI = new API(window.fetch.bind(window), "https://www.dnd5eapi.co/api/");