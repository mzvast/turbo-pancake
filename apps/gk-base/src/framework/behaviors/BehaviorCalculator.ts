import {Agent2D} from '../Agent2D';
import {Agent3D} from '../Agent3D';
import {Goal} from '../Goal';

export interface IBehaviorCalculator {
    calculate2D(
        goal: Goal,
        agent: Agent2D,
        force: THREE.Vector2,
        deltaTime: number,
    ): void;
    calculate3D(
        goal: Goal,
        agent: Agent3D,
        force: THREE.Vector3,
        deltaTime: number,
    ): void;
}

export class BehaviorCalculator implements IBehaviorCalculator {
    calculate2D(
        goal: Goal,
        agent: Agent2D,
        force: THREE.Vector2,
        deltaTime: number,
    ) {}
    calculate3D(
        goal: Goal,
        agent: Agent3D,
        force: THREE.Vector3,
        deltaTime: number,
    ) {}
}
