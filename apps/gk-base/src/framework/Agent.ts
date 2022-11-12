import {AgentDelegate} from './AgentDelegate';
import {Behavior} from './Behavior';
import {Component} from './Component';

export interface IAgent {
    behavior: Behavior; // A weighted collection of goals that influence the agent’s movement.
    mass: number; // The resistance of the agent to changes in speed or direction.
    maxSpeed: number; // The agent’s maximum forward speed, in units per second.
    radius: number; // The agent’s radius.
    delegate: AgentDelegate; // An object that prepares for or responds to updates in the agent simulation.
}

export class Agent extends Component implements IAgent {
    behavior: Behavior;
    mass: number;
    maxSpeed: number;
    radius: number;
    delegate: AgentDelegate;
}
