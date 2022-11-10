import {describe, it, expect, vi} from 'vitest';
import {State} from './State';

describe('State', () => {
    it('should be a function', () => {
        expect(State).a('function');
    });

    it('should be valid to next state on init', () => {
        const s1 = new State();
        class AnyState {}
        expect(s1.isValidNextState(AnyState)).to.be.true;
    });
});
