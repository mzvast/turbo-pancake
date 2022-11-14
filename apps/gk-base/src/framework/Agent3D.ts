import {Matrix3, Vector3} from 'three';
import {Agent} from './Agent';

export interface IAgent3D {
    position: Vector3; // vector3 The current position of the agent in 3D space.
    velocity: Vector3; // vector3 The current velocity of the agent in 3D space.
    rotation: Matrix3; // 3x3 matrix The orientation of the agent in 3D space.
    rightHanded: boolean; // 是否右手坐标系
    update(deltaTime: number); // Causes the agent to evaluate its goals and update its position, rotation, and velocity accordingly.
}
const totalForce = new Vector3(); // 合外力
const curForce = new Vector3(); // 受力分量
export class Agent3D extends Agent implements IAgent3D {
    _isAgent3D = true;
    rightHanded: boolean = true;
    position = new Vector3();
    velocity = new Vector3();
    rotation = new Matrix3();
    override updateWithDeltaTime(deltaTime: number) {
        if (!this.behavior) return;

        totalForce.set(0, 0, 0);
        // Mass Spring System 只考虑质点，不存在旋转 todo: ??
        for (let i = 0; i < this.behavior._goals.length; i++) {
            const goal = this.behavior._goals[i];
            const weight = this.behavior._weight[i];
            curForce.set(0, 0, 0);
            goal?._calculate3D?.(this, curForce, deltaTime); // 计算因goal产生的受力
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
