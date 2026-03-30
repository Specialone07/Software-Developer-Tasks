export declare class TheCharacter {
    id: number;
    userId: number;
    data: string;
    securityId: number;
    securityUserId: number;
    accessId: number;
    accessUserId: number;
    sessionId: number;
    sessionUserId: number;
    isNew: boolean;
    constructor(userId: number, data: string, securityId: number, securityUserId: number, accessId: number, accessUserId: number, sessionId: number, sessionUserId: number, entryTimestamp: string, isNew: boolean);
}
