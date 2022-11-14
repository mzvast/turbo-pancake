import {Vector2} from 'three';
import {Agent} from './Agent';

export interface IAgent2D {
    position: Vector2; // vector2 The current position of the agent in 2D space.
    velocity: Vector2; // vector2 The current velocity of the agent in 2D space.
    rotation: number; // The rotation of the agent around the z-axis.
    update(deltaTime: number); // Causes the agent to evaluate its goals and update its position, rotation, and velocity accordingly.
}
const totalForce = new Vector2(); // 合外力
const curForce = new Vector2(); // 受力分量
export class Agent2D extends Agent implements IAgent2D {
    _isAgent2D = true;
    position = new Vector2();
    velocity = new Vector2();
    rotation = 0;
    override updateWithDeltaTime(deltaTime: number) {
        if (!this.behavior) return;

        totalForce.set(0, 0);
        // Mass Spring System 只考虑质点，不存在旋转 todo: ??
        for (let i = 0; i < this.behavior._goals.length; i++) {
            const goal = this.behavior._goals[i];
            const weight = this.behavior._weight[i];
            curForce.set(0, 0);
            goal?._calculate2D?.(this, curForce, deltaTime); // 计算因goal产生的受力
            totalForce.addScaledVector(curForce, weight);
            // todo: mass的影响
            // todo: velocity,rotation 合并
        }
        // a = F/m
        // v = v0 + at
        // x = x0 + vt
        this.velocity.addScaledVector(totalForce, deltaTime);
        this.position.addScaledVector(this.velocity, deltaTime);
    }
}
