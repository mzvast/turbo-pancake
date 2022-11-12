import {Component} from './Component';
import {SKNode} from './types';

export interface ISKNodeComponent {
    node: SKNode;
}

export class SKNodeComponent extends Component implements ISKNodeComponent {
    constructor(node: SKNode) {
        super();
        this.node = node;
    }
    node: SKNode;
}
