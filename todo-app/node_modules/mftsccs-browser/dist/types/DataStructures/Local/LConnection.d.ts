import { Concept } from "../Concept";
export declare class LConnection {
    id: number;
    ghostId: number;
    ofTheConceptId: number;
    toTheConceptId: number;
    entryTimeStamp: Date;
    terminationDateTime: Date;
    accessId: number;
    typeId: number;
    orderId: number;
    typeCharacter: string;
    localSyncTime: Date;
    isTemp: boolean;
    applicationId: number;
    type: Concept;
    constructor(id: number, ofTheConceptId: number, toTheConceptId: number, typeId: number, orderId: number, accessId: number);
}
