import {Vector2} from 'three';
import {Agent} from './Agent';

export interface IAgent2D {
    position: Vector2; // The current position of the agent in 2D space.
    velocity: Vector2; // The current velocity of the agent in 2D space.
    rotation: number; // The rotation of the agent around the z-axis.
    update(deltaTime: number); // Causes the agent to evaluate its goals and update its position, rotation, and velocity accordingly.
}

export class Agent2D extends Agent implements IAgent2D {
    position: Vector2;
    velocity: Vector2;
    rotation: number;

    override update(deltaTime: number) {}
}
