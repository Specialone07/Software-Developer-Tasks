import { Composition } from './Composition';
export declare class CompositionNode {
    expiryTime: Date;
    key: number;
    value: Composition;
    leftNode: CompositionNode | null;
    rightNode: CompositionNode | null;
    height: number;
    constructor(key: number, value: Composition, leftNode: CompositionNode | null, rightNode: CompositionNode | null);
    isValid(): boolean;
    saveToCache(data: any): void;
    addNode(passedNode: CompositionNode, node: CompositionNode | null, height: number): CompositionNode | null;
    rightRotate(y: CompositionNode | null): CompositionNode | null;
    leftRotate(x: CompositionNode | null): CompositionNode | null;
    getHeight(node: CompositionNode | null): number;
    getBalanceFactor(N: CompositionNode | null): number;
    getFromNode(id: number, node: CompositionNode | null): CompositionNode | null;
    removeNode(passedNode: CompositionNode | null, id: number): CompositionNode | null;
    countNodeBelow(root: CompositionNode | null): number;
    inOrderSuccessor(root: CompositionNode): CompositionNode;
}
