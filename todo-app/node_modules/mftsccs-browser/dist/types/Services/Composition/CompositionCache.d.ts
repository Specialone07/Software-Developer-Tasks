import { Connection } from '../../DataStructures/Connection';
export declare function GetCompositionWithCache(id: number, connectionListPassed?: Connection[]): Promise<any>;
export declare function GetCompositionWithDataIdWithCache(id: number, connectionListPassed?: Connection[]): Promise<any>;
export declare function GetCompositionWithDataIdBulk(ids: number[], connections: number[]): Promise<any[]>;
