import { Concept } from "../../DataStructures/Concept";
import { LNode } from "./../Local/LNode";
export declare class LocalBinaryTree {
    static root: LNode | null;
    static addNodeToTree(node: LNode): LNode | undefined;
    static addConceptToTree(concept: Concept): void;
    static waitForDataToLoad(): Promise<unknown>;
    static checkFlag(resolve: any): any;
    static getNodeFromTree(id: number): Promise<LNode | null>;
    static getCharacterAndTypeFromTree(value: string, typeId: number): LNode | null;
    static updateSyncStatus(id: number): LNode | null;
    static removeNodeFromTree(id: number): Promise<void>;
}
