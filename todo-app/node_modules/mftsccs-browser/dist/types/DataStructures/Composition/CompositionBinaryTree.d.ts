import { Composition } from './Composition';
import { CompositionNode } from './CompositionNode';
export declare class CompositionBinaryTree {
    static root: CompositionNode | null;
    static addNodeToTree(node: CompositionNode): CompositionNode | undefined;
    static addCompositionToTree(composition: Composition): void;
    static getNodeFromTree(id: number): Promise<CompositionNode | null>;
    static removeNodeFromTree(id: number): Promise<void>;
    static countNumberOfNodes(): number;
}
