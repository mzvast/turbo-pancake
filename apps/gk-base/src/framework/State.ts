import {StateMachine} from './StateMachine';
import {AnyClass} from './types';

export interface IState {
    stateMachine: StateMachine; // The state machine that owns this state object.
    isValidNextState(stateClass: AnyClass): boolean; // Returns a Boolean value indicating whether a state machine currently in this state is allowed to transition into the specified state.
    didEnter(previousState: State): void; // Performs custom actions when a state machine transitions into this state.
    update(deltaTime: number): void; //
    willExit(to: State): void; // Performs custom actions when a state machine transitions out of this state
}

export class State implements IState {
    stateMachine: StateMachine;
    isValidNextState(stateClass: AnyClass): boolean {
        return true;
    }
    didEnter(previousState: State): void {}
    update(deltaTime: number): void {}
    willExit(to: State): void {}
}
