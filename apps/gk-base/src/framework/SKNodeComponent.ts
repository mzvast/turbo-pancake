import {Agent2D} from './Agent2D';
import {IAgentDelegate} from './AgentDelegate';
import {Component} from './Component';
import {Node2D} from './types';

export interface ISKNodeComponent {
    node: Node2D;
}

export class SKNodeComponent
    extends Component
    implements ISKNodeComponent, IAgentDelegate
{
    node: Node2D;

    constructor(node: Node2D) {
        super();
        this.node = node;
    }
    agentWillUpdate(agent: Agent2D) {
        agent.position.copy(this.node.position);
        agent.rotation = this.node.rotation;
    }
    agentDidUpdate(agent: Agent2D) {
        this.node.position.copy(agent.position);
        this.node.rotation = agent.rotation;
    }
}
