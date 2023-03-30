import {Agent} from './Agent';

export interface IAgentDelegate {
    agentWillUpdate(agent: Agent); // Tells the delegate that an agent is about to perform its next simulation step.
    agentDidUpdate(agent: Agent); // Tells the delegate that an agent has just performed a simulation step.
}
export class AgentDelegate implements IAgentDelegate {
    agentWillUpdate(agent: Agent) {}
    agentDidUpdate(agent: Agent) {}
}
