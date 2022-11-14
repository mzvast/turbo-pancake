import {Vector2, Vector3} from 'three';
import {Agent2D} from './Agent2D';
import {Agent3D} from './Agent3D';

type AgentKind = Agent2D | Agent3D;
// 每个goal都需要有一个subClass来处理各自的逻辑
export enum EGoalType {
    // general movement
    toSeekAgent,
    toFleeAgent,
    toReachTargetSpeed,
    toWander,
    // Avoidance and Interception
    toAvoidAgents,
    toAvoidObstacles,
    toInterceptAgent,
    // Flocking
    toSeparateFrom,
    toAlignWith,
    toCohereWith,
    // Path-Following
    toStayOn,
    toFollow,
}
// type Obstacle = any; //  todo:
export class Goal {
    _type: EGoalType;
    _agents: AgentKind[] = [];
    //  _obstacles: Obstacle[];
    _speed: number = 0;
    _time: number = 0;
    constructor() {}
    _calculate2D(agent: AgentKind, force: Vector2, deltaTime: number) {
        throw new Error('_calculate() must be implemented in subClass');
    }
    _calculate3D(agent: AgentKind, force: Vector3, deltaTime: number) {
        throw new Error('_calculate() must be implemented in subClass');
    }
    /**
     * 创建一个新目标来寻找给定的代理。
     * @param {Agent} agent - 代理寻求。
     * @returns 一个新的目标对象。
     */
    static toSeekAgent(agent: AgentKind) {
        const ans = new ToSeekGoal();
        ans._type = EGoalType.toSeekAgent;
        ans._agents.push(agent);
        return ans;
    }
    // todo:
    // /**
    //  * 创建一个新目标以逃离给定的代理。
    //  * @param {Agent} agent - 要逃离的代理人。
    //  * @returns 一个新的目标对象。
    //  */
    // static toFleeAgent(agent: Agent) {
    //     const ans = new Goal();
    //     ans._type = EGoalType.toFleeAgent;
    //     ans._agents.push(agent);
    //     return ans;
    // }
    // /**
    //  * 创建一个新目标，告诉汽车达到目标速度。
    //  * @param {number} targetSpeed - 您希望汽车达到的速度。
    //  * @returns Goal 类的一个新实例。
    //  */
    // static toReachTargetSpeed(targetSpeed: number) {
    //     const ans = new Goal();
    //     ans._type = EGoalType.toReachTargetSpeed;
    //     ans._speed = targetSpeed;
    //     return ans;
    // }
    // /**
    //  * 创建一个新目标，告诉实体以给定速度四处游荡。
    //  * @param {number} speed - 角色移动的速度。
    //  * @returns Goal 类的一个新实例。
    //  */
    // static toWander(speed: number) {
    //     const ans = new Goal();
    //     ans._type = EGoalType.toWander;
    //     ans._speed = speed;
    //     return ans;
    // }
}
const displacement2 = new Vector2();
const displacement3 = new Vector3();
const desiredVelocity2 = new Vector2();
const desiredVelocity3 = new Vector3();
const temp = new Vector3();
const EPS = 0.01;
class ToSeekGoal extends Goal {
    constructor() {
        super();
    }
    override _calculate2D(self: Agent2D, force: Vector2, deltaTime: number) {
        const targetAgent = this._agents[0] as Agent2D;
        // check if is Agent2D or Agent3D
        displacement2.subVectors(targetAgent.position, self.position);
        const distance = displacement2.length();

        if (distance < EPS) {
            desiredVelocity2.set(0, 0);
        } else {
            // todo: 在最大速度和速度之间得进行一下选择??不然飞过头了啊
            desiredVelocity2
                .copy(displacement2)
                .multiplyScalar(self.maxSpeed / distance);
        }

        // f = ma (令m=1,计算单位质量受力)
        // f = a = dv/dt = desiredVelocity - self.velocity
        force.subVectors(desiredVelocity2, self.velocity);
    }
    override _calculate3D(self: Agent3D, force: Vector3, deltaTime: number) {
        const targetAgent = this._agents[0] as Agent3D;
        displacement3.subVectors(targetAgent.position, self.position);
        const distance = displacement3.length();

        if (distance < EPS) {
            desiredVelocity3.set(0, 0, 0);
        } else {
            // todo: 在最大速度和速度之间得进行一下选择??不然飞过头了啊
            desiredVelocity3
                .copy(displacement3)
                .multiplyScalar(self.maxSpeed / distance);
        }

        // f = ma (令m=1,计算单位质量受力)
        // f = a = dv/dt = desiredVelocity - self.velocity
        force.subVectors(desiredVelocity3, self.velocity);
    }
}
