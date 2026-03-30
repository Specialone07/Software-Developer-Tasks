export declare class Concept {
    id: number;
    ghostId: number;
    count: number;
    userId: number;
    typeId: number;
    categoryId: number;
    accessId: number;
    characterValue: string;
    typeCharacter: string;
    entryTimeStamp: Date;
    referentId: number;
    updatedTimeStamp: Date;
    type: null | void | Concept;
    isNew: boolean;
    isComposition: boolean;
    isTemp: boolean;
    isSynced: boolean;
    applicationId: number;
    x: number;
    y: number;
    constructor(id: number, userId: number, typeId: number, categoryId: number, referentId: number, characterValue: string, accessId: number, isNew: boolean | undefined, entryTimeStamp: Date, updatedTimeStamp: Date, typeCharacter: string);
    getType(): void;
}
