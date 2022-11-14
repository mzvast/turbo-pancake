import {Goal} from './Goal';

export interface IBehavior {
    setWeight(weight: number, goal: Goal); // Sets the weight for the specified goal’s influence on agents, adding that goal to the behavior if not already present.
    weight(goal): number; // Returns the weight for the specified goal’s influence on agents.
    remove(goal: Goal); // Removes the specified goal from the behavior.
    removeAllGoals(); // Removes all goals from the behavior.
    goalCount: number; // The number of goals in the behavior.
}
export class Behavior implements IBehavior {
    _goals: Goal[];
    _weight: number[];
    get goalCount() {
        return this._goals.length;
    }

    constructor(goals: Goal[]); // 1
    constructor(goal: Goal, weight: number); // 2
    constructor(goals: Goal[], weights: number[]); // 3
    constructor(goals: Goal | Goal[], weights?: number[] | number) {
        if (weights !== undefined) {
            if (goals instanceof Array && weights instanceof Array) {
                // 3
                this._goals = goals;
                this._weight = weights;
                return;
            }
            if (goals instanceof Goal && typeof weights === 'number') {
                // 2
                this._goals = [goals];
                this._weight = [weights];
                return;
            }
        }
        if (goals instanceof Array) {
            // 1
            this._goals = goals;
            this._weight = Array(goals.length).fill(1);
            return;
        }

        throw new Error('Invalid ctor params');
    }

    setWeight(weight: number, goal: Goal) {
        const goalIdx = this._goals.indexOf(goal);
        if (goalIdx === -1) {
            this._goals.push(goal);
            this._weight.push(weight);
        } else {
            this._weight[goalIdx] = weight;
        }
    }
    weight(goal: any): number {
        const goalIdx = this._goals.indexOf(goal);
        if (goalIdx === -1) return 0;
        return this._weight[goalIdx];
    }
    remove(goal: Goal) {
        const goalIdx = this._goals.indexOf(goal);
        if (goalIdx === -1) return;
        this._goals.splice(goalIdx, 1);
        this._weight.splice(goalIdx, 1);
    }
    removeAllGoals() {
        this._goals = [];
        this._weight = [];
    }
}
