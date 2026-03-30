import { Connection } from '../../DataStructures/Connection';
import { Concept } from '../../DataStructures/Concept';
export declare class Composition {
    id: number;
    mainConcept: Concept;
    connections: Connection[];
    concepts: Concept[];
    subcompositions: number[];
    cached: any;
    updateCache(): Promise<void>;
    UpdateAcrossDistributedSystem(): void;
    isUpdating(): void;
    GetDataCache(): any;
}
