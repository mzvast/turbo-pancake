import {Agent2D} from './Agent2D';
import {Agent3D} from './Agent3D';

export type AgentKind = Agent2D | Agent3D;
// 每个goal都需要有一个subClass来处理各自的逻辑
export enum EGoalType {
    // general movement
    toSeekAgent,
    toFleeAgent,
    toArriveAgent, // 慢慢减速直到停止
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
    _deceleration: number = 3; // 开始减速的距离
    constructor() {}

    static toSeekAgent(agent: AgentKind) {
        const ans = new Goal();
        ans._type = EGoalType.toSeekAgent;
        ans._agents.push(agent);
        return ans;
    }

    static toArriveAgent(agent: AgentKind, deceleration = 3) {
        const ans = new Goal();
        ans._deceleration = deceleration;
        ans._type = EGoalType.toArriveAgent;
        ans._agents.push(agent);
        return ans;
    }
}
