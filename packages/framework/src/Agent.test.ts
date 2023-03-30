import {describe, it, expect, vi} from 'vitest';
import {Agent2D} from './Agent2D';
describe('Agent', () => {
    it('should be able to create an agent', () => {
        const agent = new Agent2D();
        expect(agent).toBeDefined();
    });

    it('should call agentWillUpdate/agentDidUpdate method on delegate', () => {
        const agent = new Agent2D();
        const delegate = {
            agentWillUpdate: vi.fn(),
            agentDidUpdate: vi.fn(),
        };
        agent.delegate = delegate;
        agent.update(10);
        expect(delegate.agentWillUpdate).toHaveBeenCalled();
        expect(delegate.agentDidUpdate).toHaveBeenCalled();
    });
});
