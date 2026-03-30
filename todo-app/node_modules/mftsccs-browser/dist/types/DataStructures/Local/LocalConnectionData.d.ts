import { Connection } from "../Connection";
export declare class LocalConnectionData {
    name: string;
    constructor();
    static connectionArray: Connection[];
    static connectionDictionary: Connection[];
    static CheckContains(connection: Connection): boolean;
    static AddConnection(connection: Connection): void;
    static AddConnectionToMemory(connection: Connection): void;
    static AddToDictionary(connection: Connection): void;
    static RemoveConnection(connection: Connection): void;
    static RemoveConnectionById(connectionId: number): void;
    static AddPermanentConnection(connection: Connection): void;
    static GetConnection(id: number): Connection | null;
    static waitForDataToLoad(): Promise<unknown>;
    static checkFlag(resolve: any): any;
    static GetConnectionsOfCompositionLocal(id: number): Promise<Connection[]>;
    static GetConnectionOfCompositionAndTypeLocal(typeId: number, ofTheConceptId: number): Promise<Connection[]>;
    getName(): string;
}
