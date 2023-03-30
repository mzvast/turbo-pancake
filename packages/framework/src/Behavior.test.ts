import {describe, it, expect, vi} from 'vitest';
import {Behavior} from './Behavior';
import {Goal} from './Goal';

describe('Behavior', () => {
    it('should create from goals', () => {
        const behavior = new Behavior([new Goal(), new Goal()]);
        expect(behavior.goalCount).toBe(2);
        expect(behavior._weight[0]).toBe(1);
    });
    it('should create from goals,weights', () => {
        const behavior = new Behavior([new Goal(), new Goal()], [0.5, 0.5]);
        expect(behavior.goalCount).toBe(2);
        expect(behavior._weight[0]).toBe(0.5);
    });
    it('should create from goal,weight', () => {
        const behavior = new Behavior(new Goal(), 0.5);
        expect(behavior.goalCount).toBe(1);
        expect(behavior._weight[0]).toBe(0.5);
    });
    it('should set/get weight ', () => {
        const goal = new Goal();
        const behavior = new Behavior(goal, 0.5);
        expect(behavior.goalCount).toBe(1);
        expect(behavior._weight[0]).toBe(0.5);
        behavior.setWeight(0.1, goal);
        expect(behavior.weight(goal)).toBe(0.1);
    });
    it('should remove works', () => {
        const goal1 = new Goal();
        const goal2 = new Goal();
        const behavior = new Behavior(goal1, 0.5);
        behavior.setWeight(0.5, goal2);

        const goal3 = new Goal();
        behavior.setWeight(0.5, goal3);
        expect(behavior.goalCount).toBe(3);

        behavior.remove(goal1);
        expect(behavior.goalCount).toBe(2);

        behavior.removeAllGoals();
        expect(behavior.goalCount).toBe(0);
    });
});
