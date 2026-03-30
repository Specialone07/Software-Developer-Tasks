import { Concept } from "./Concept";
export declare class ConceptsToDraw {
    name: string;
    constructor();
    static conceptsArray: Concept[];
    static CheckContains(concept: Concept): boolean;
    static AddConcept(concept: Concept): void;
    static RemoveConcept(concept: Concept): void;
    static GetConcept(id: number): Concept | null;
    getName(): string;
}
