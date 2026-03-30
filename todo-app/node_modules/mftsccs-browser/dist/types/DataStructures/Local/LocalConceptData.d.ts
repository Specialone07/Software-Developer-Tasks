import { Concept } from "./../Concept";
export declare class LocalConceptsData {
    name: string;
    constructor();
    static localconceptsArray: Concept[];
    static AddConcept(concept: Concept): void;
    static AddPermanentConcept(concept: Concept): void;
    static RemoveConcept(concept: Concept): Promise<void>;
    static RemoveConceptById(conceptId: number): Promise<void>;
    static AddConceptToMemory(concept: Concept): void;
    static GetConcept(id: number): Promise<Concept>;
    static UpdateConceptSyncStatus(id: number): Promise<void>;
    static GetConceptByGhostId(id: number): Promise<Concept>;
    static GetConceptByCharacter(characterValue: string): Promise<Concept>;
    static GetConceptByCharacterAndTypeLocal(character_value: string, typeId: number): Promise<Concept>;
    static GetConceptByCharacterAndCategoryLocal(character_value: string, categoryId: number): Promise<Concept>;
    static GetConceptsByTypeId(typeId: number): Concept[];
    static GetConceptsByTypeIdAndUser(typeId: number, userId: number): Promise<Concept[]>;
    static ClearData(): Promise<void>;
    getName(): string;
}
