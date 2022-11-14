import {Agent} from './Agent';
import {Agent2D} from './Agent2D';
import {Agent3D} from './Agent3D';
import {IAgentDelegate} from './AgentDelegate';
import {Component} from './Component';
import {Node3D} from './types';

export interface ISCNNodeComponent {
    node: Node3D;
}

export class SCNNodeComponent
    extends Component
    implements ISCNNodeComponent, IAgentDelegate
{
    node: Node3D;

    constructor(node: Node3D) {
        super();
        this.node = node;
    }
    agentWillUpdate(agent: Agent3D) {
        agent.position.copy(this.node.position);
        agent.rotation.copy(this.node.rotation);
    }
    agentDidUpdate(agent: Agent3D) {
        this.node.position.copy(agent.position);
        this.node.rotation.copy(agent.rotation);
    }
}
