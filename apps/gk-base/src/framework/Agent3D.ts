import {Agent} from './Agent';

export interface IAgent3D {
    position: number[]; // vector3 The current position of the agent in 3D space.
    velocity: number[]; // vector3 The current velocity of the agent in 3D space.
    rotation: number[]; // 3x3 matrix The orientation of the agent in 3D space.
    rightHanded: boolean; // 是否右手坐标系
    update(deltaTime: number); // Causes the agent to evaluate its goals and update its position, rotation, and velocity accordingly.
}

export class Agent3D extends Agent implements IAgent3D {
    rightHanded: boolean = true;
    position: number[];
    velocity: number[];
    rotation: number[];
}
