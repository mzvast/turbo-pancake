import * as THREE from 'three';
import {Agent2D} from '../Agent2D';
import {Agent3D} from '../Agent3D';
import {AgentKind, EGoalType, Goal} from '../Goal';
import {BehaviorCalculator} from './BehaviorCalculator';
export const displacement2 = new THREE.Vector2();
export const displacement3 = new THREE.Vector3();
export const desiredVelocity2 = new THREE.Vector2();
export const desiredVelocity3 = new THREE.Vector3();
export const EPS = 0.01;

class Arrive extends BehaviorCalculator {
    override calculate2D(
        goal: Goal,
        self: Agent2D,
        force: THREE.Vector2,
        deltaTime: number,
    ) {
        const targetAgent = goal._agents[0] as Agent2D;
        // check if is Agent2D or Agent3D
        displacement2.subVectors(targetAgent.position, self.position);
        const distance = displacement2.length();

        if (distance < EPS) {
            desiredVelocity2.set(0, 0);
        } else {
            // 当落入减速半径，近似计算当前合适的速度
            let speed = distance / goal._deceleration;
            speed = Math.min(speed, self.maxSpeed);
            desiredVelocity2
                .copy(displacement2)
                .multiplyScalar(speed / distance);
        }

        // f = ma (令m=1,计算单位质量受力)
        // f = a = dv/dt = desiredVelocity - self.velocity
        force.subVectors(desiredVelocity2, self.velocity);
    }
    override calculate3D(
        goal: Goal,
        self: Agent3D,
        force: THREE.Vector3,
        deltaTime: number,
    ) {
        const targetAgent = goal._agents[0] as Agent3D;
        displacement3.subVectors(targetAgent.position, self.position);
        const distance = displacement3.length();

        if (distance < EPS) {
            desiredVelocity3.set(0, 0, 0);
        } else {
            // 当落入减速半径，近似计算当前合适的速度
            let speed = distance / goal._deceleration;
            speed = Math.min(speed, self.maxSpeed);
            desiredVelocity3
                .copy(displacement3)
                .multiplyScalar(speed / distance);
        }

        // f = ma (令m=1,计算单位质量受力)
        // f = a = dv/dt = desiredVelocity - self.velocity
        force.subVectors(desiredVelocity3, self.velocity);
    }
}
export default new Arrive();
