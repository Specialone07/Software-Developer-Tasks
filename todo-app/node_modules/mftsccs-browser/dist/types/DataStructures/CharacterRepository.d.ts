import { TheCharacter } from "./TheCharacter";
export declare class CharacterRepository {
    name: string;
    constructor();
    static characterData: TheCharacter[];
    static AddCharacter(character: TheCharacter): void;
    static GetCharacter(value: string): TheCharacter;
}
