import { Connection } from '../../DataStructures/Connection';
import { Concept } from '../../DataStructures/Concept';
export declare function recursiveFetchNew(id: number, connectionList: Connection[], conceptList: Concept[], compositionList: number[], visitedConcepts?: number[]): Promise<any>;
