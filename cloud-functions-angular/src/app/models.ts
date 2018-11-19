import { DocumentReference } from 'angularfire2/firestore';

export class Transition {
    encounter: DocumentReference;
    text: string;
}

  export class Encounter {
    name: string;
    scenario: string;
    transitions: Transition[];
}

export class Game {
    id: string;
    players: DocumentReference[];
    characters: Character[];
    // lastCity: Encounter;
    encounter: Encounter;
}

export class Player {
    id: string;
    username: string;
    email: string;
    characters: Character[];
}

export class Character {
    id: string;
    game: DocumentReference;
    name: string;
    race: Race;
    class: Class;
    stats: Stats;
    skills: Skill[];
    items: Item[];
    equipment: Item[];
    money: Wallet;
}

export enum Class {
    Unset, WIZARD, WARRIOR, RANGER
}

export enum Race {
    Unset, HUMAN, ELF, DWARF
}

export class Stats {
    health: number;
    mana: number;
    strength: number;
    defense: number;
    magic: number;
    resistance: number;
    agility: number;
}

export class Skill {
    id: string;
    name: string;
    type: Type;
    duration: number;
    combatFunction: CombatFunction;

}

export enum Type {
    FIRE, ICE, LIGHTNING
}

export class CombatFunction {
    health: number;
    mana: number;
    strength: number;
    defense: number;
    magic: number;
    resistance: number;
    agility: number;
}

export class Item {
    id: string;
    name: string;
    duration: number;
    isEquipment: boolean;
    combatFunction: CombatFunction;
}

export class Wallet {
    copper: number;
    silver: number;
    gold: number;
}
