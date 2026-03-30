import { Concept } from '../../DataStructures/Concept';
import { Composition } from '../../DataStructures/Composition/Composition';
export declare function CreateTheCompositionWithCache(json: any, ofTheConceptId?: number | null, ofTheConceptUserId?: number | null, mainKey?: number | null, userId?: number | null, accessId?: number | null, sessionInformationId?: number | null, composition?: Composition | null): Promise<Concept>;
