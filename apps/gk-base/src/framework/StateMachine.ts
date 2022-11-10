import {IState, State} from './State';
import {AnyClass} from './types';

export interface IStateMachine {
    states: State[];
    currentState: State;
    canEnterState(stateClass: AnyClass): boolean;
    enter(stateClass: AnyClass): void;
    update(deltaTime: number): void;
}

export class StateMachine implements IStateMachine {
    states: State[];
    constructor(states: State[]) {
        this.states = states;
        for (let x of states) {
            x.stateMachine = this;
        }
    }
    currentState: State;
    canEnterState(stateClass: AnyClass): boolean {
        if (!this.currentState) return true;
        return this.currentState.isValidNextState(stateClass);
    }
    enter(stateClass: AnyClass): void {
        if (this.currentState) {
            if (!this.currentState.isValidNextState(stateClass)) return;

            this.currentState.willExit?.(this.currentState);
        }

        const previousState = this.currentState;

        const nextState = this.states.find(x => x instanceof stateClass);

        if (!nextState) throw new Error('no such state');

        this.currentState = nextState;
        nextState.didEnter(previousState);
    }
    update(deltaTime: number): void {
        this.currentState?.update?.(deltaTime);
    }
}
