import {Vector3} from 'three';
import {Agent} from './Agent';

export interface IAgent3D {
    position: Vector3; // The current position of the agent in 2D space.
    velocity: Vector3; // The current velocity of the agent in 2D space.
    rotation: number; // The rotation of the agent around the z-axis.
    rightHanded: boolean; // 是否右手坐标系
    update(deltaTime: number); // Causes the agent to evaluate its goals and update its position, rotation, and velocity accordingly.
}

export class Agent3D extends Agent implements IAgent3D {
    rightHanded: boolean = true;
    position: Vector3;
    velocity: Vector3;
    rotation: number;

    override update(deltaTime: number) {}
}
