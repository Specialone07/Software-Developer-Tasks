import { Concept } from "./../Concept";
export declare class LNode {
    key: any;
    value: Concept;
    leftNode: LNode | null;
    rightNode: LNode | null;
    currentNode: LNode | null;
    variants: LNode[];
    height: number;
    constructor(key: any, value: Concept, leftNode: LNode | null, rightNode: LNode | null);
    addCurrentNode(passedNode: LNode, node: LNode | null): LNode;
    addCurrentNodeType(passedNode: LNode, node: LNode | null): LNode;
    addNode(passedNode: LNode, node: LNode | null, height: number): LNode | null;
    addCharacterNode(passedNode: LNode, node: LNode | null, height: number): LNode | null;
    addTypeNode(passedNode: LNode, node: LNode | null, height: number): LNode | null;
    rightRotate(y: LNode | null): LNode | null;
    leftRotate(x: LNode | null): LNode | null;
    getHeight(node: LNode | null): number;
    getBalanceFactor(N: LNode | null): number;
    getFromNode(id: number, node: LNode | null): LNode | null;
    updateNodeSyncStatus(id: number, value: any, node: LNode | null): LNode | null;
    getCharacterFromNode(value: string, node: LNode | null): LNode | null;
    getFromNodeWithCharacterAndType(value: string, typeId: number, node: LNode | null): LNode | null;
    getFromNodeWithCharacterAndCategory(value: string, categoryId: number, node: LNode | null): LNode | null;
    removeNode(passedNode: LNode | null, id: number): LNode | null;
    removeNodeWithVariants(passedNode: LNode | null, typeIdentifier: any, conceptId: number): LNode | null;
    countNodeBelow(root: LNode | null): number;
    inOrderSuccessor(root: LNode): LNode;
}
