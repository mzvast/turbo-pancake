import {describe, it, expect, vi} from 'vitest';
import {Agent} from './Agent';
describe('Agent', () => {
    it('should be able to create an agent', () => {
        const agent = new Agent();
        expect(agent).toBeDefined();
    });
});
