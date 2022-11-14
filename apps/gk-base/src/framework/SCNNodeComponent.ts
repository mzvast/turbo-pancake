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
        agent.position = this.node.position.toArray();
        agent.rotation = this.node.rotation.toArray();
    }
    agentDidUpdate(agent: Agent3D) {
        this.node.position.setX(agent.position[0]);
        this.node.position.setY(agent.position[1]);
        this.node.position.setZ(agent.position[2]);

        this.node.rotation.x = agent.rotation[0];
        this.node.rotation.y = agent.rotation[1];
        this.node.rotation.z = agent.rotation[2];
    }
}
