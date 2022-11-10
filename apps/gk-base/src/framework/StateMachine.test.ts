import {describe, it, expect, vi} from 'vitest';
import {IState, State} from './State';
import {StateMachine} from './StateMachine';
import {AnyClass} from './types';

describe('StateMachine', () => {
    it('should be a function', () => {
        expect(StateMachine).a('function');
    });

    const FnWillExit = vi.fn();
    const FnDidEnter = vi.fn();
    const FnUpdate = vi.fn();

    // S1->S2 允许
    // S2->S1 不允许

    class S1 extends State {
        override isValidNextState(stateClass: AnyClass): boolean {
            if (stateClass === S2) {
                return true;
            }
            return false;
        }
        override didEnter(_): void {
            FnDidEnter('s1');
        }
        override willExit(_): void {
            FnWillExit('s1');
        }

        override update(dt) {
            FnUpdate('s1', dt);
        }
    }

    class S2 extends State {
        override isValidNextState(stateClass: AnyClass): boolean {
            if (stateClass === S1) {
                return false;
            }
            return true;
        }
        override didEnter(_): void {
            FnDidEnter('s2');
        }
        override willExit(_): void {
            FnWillExit('s2');
        }
        override update(dt) {
            FnUpdate('s2', dt);
        }
    }

    it('should has no currentState on init', () => {
        const [s1, s2] = [new S1(), new S2()];
        const FSM = new StateMachine([s1, s2]);

        expect(FSM.currentState).undefined;
    });

    it('should enter/exit state work', () => {
        const [s1, s2] = [new S1(), new S2()];
        const FSM = new StateMachine([s1, s2]);
        // empty->S1
        expect(FSM.canEnterState(S1)).toBe(true);

        FSM.enter(S1);
        FSM.update(100);
        expect(FnUpdate).toBeCalledWith('s1', 100);

        expect(FSM.currentState).equal(s1);
        expect(FnDidEnter).toBeCalledWith('s1');
        // S1->S2
        expect(FSM.canEnterState(S2)).toBe(true);
        FSM.enter(S2);

        expect(FnWillExit).toBeCalledWith('s1');
        expect(FnDidEnter).toBeCalledWith('s2');

        FSM.update(100);
        expect(FnUpdate).toBeCalledWith('s2', 100);

        // S2->S1 not allowed，we are still in s2
        expect(FSM.canEnterState(S1)).toBe(false);
        FSM.enter(S1);
        expect(FSM.currentState).equal(s2);
    });
});
