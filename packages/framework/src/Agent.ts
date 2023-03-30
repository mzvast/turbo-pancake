import {Vector3} from 'three';
import {IAgentDelegate} from './AgentDelegate';
import {Behavior} from './Behavior';
import {Component} from './Component';

export interface IAgent {
    behavior: Behavior; // A weighted collection of goals that influence the agent’s movement.
    mass: number; // The resistance of the agent to changes in speed or direction.
    maxSpeed: number; // The agent’s maximum forward speed, in units per second.
    radius: number; // The agent’s radius.
    delegate: IAgentDelegate; // An object that prepares for or responds to updates in the agent simulation.
}
export abstract class Agent extends Component implements IAgent {
    behavior: Behavior;
    _behaviorFn: (agent) => void;
    mass: number;
    maxSpeed: number;
    radius: number;
    delegate: IAgentDelegate;
    update(deltaTime: number) {
        this.delegate?.agentWillUpdate?.(this);
        this?._behaviorFn?.(this); // TODO: this is a hack to get the behavior to work
        this.updateWithDeltaTime(deltaTime);
        this.delegate?.agentDidUpdate?.(this);
    }
    updateWithDeltaTime(deltaTime) {}
}
