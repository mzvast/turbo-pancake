import {describe, it, expect, vi} from 'vitest';
import {Agent2D} from './Agent2D';
import {Agent3D} from './Agent3D';
import {Behavior} from './Behavior';
import {Goal} from './Goal';

describe('toSeekGoal 2D', () => {
    // 用agent来测试behavior
    const targetAgent = new Agent2D();
    targetAgent.position.set(10, 0);
    const toSeekGoal = Goal.toSeekAgent(targetAgent);

    it('should create correctly', () => {
        expect(toSeekGoal._agents[0]).toEqual(targetAgent);
    });

    const myAgent = new Agent2D();
    myAgent.maxSpeed = 100;
    myAgent.position.set(0, 0);
    myAgent.behavior = new Behavior(toSeekGoal, 1);
    it('should set behavior', () => {
        expect(myAgent.behavior._goals[0]).toEqual(toSeekGoal);
    });

    it('toSeekGoal should work', () => {
        myAgent.update(0.2);
        // console.log(myAgent.position);
        myAgent.update(0.2);
        // console.log(myAgent.position);
        myAgent.update(0.2);
        myAgent.update(0.2);
        myAgent.update(0.2);
        myAgent.update(0.2);
        myAgent.update(0.2);
        // console.log(myAgent.position);
        expect(myAgent.position.x).toBeLessThan(12);
        expect(myAgent.position.y).toBe(0);
    });
});

describe('toSeekGoal 3D', () => {
    // 用agent来测试behavior
    const targetAgent = new Agent3D();
    targetAgent.position.set(10, 0, 0);
    const toSeekGoal = Goal.toSeekAgent(targetAgent);

    it('should create correctly', () => {
        expect(toSeekGoal._agents[0]).toEqual(targetAgent);
    });

    const myAgent = new Agent3D();
    myAgent.maxSpeed = 100;
    myAgent.position.set(0, 0, 0);
    myAgent.behavior = new Behavior(toSeekGoal, 1);

    it('should set behavior', () => {
        expect(myAgent.behavior._goals[0]).toEqual(toSeekGoal);
    });

    it('should not move if set weight to 0', () => {
        myAgent.behavior.setWeight(0, toSeekGoal);
        myAgent.update(0.2);
        expect(myAgent.position.x).toBe(0);
    });

    it('toSeekGoal should work', () => {
        myAgent.behavior.setWeight(1, toSeekGoal);
        myAgent.update(0.2);
        // console.log(myAgent.position);
        myAgent.update(0.2);
        // console.log(myAgent.position);
        myAgent.update(0.2);
        myAgent.update(0.2);
        myAgent.update(0.2);
        myAgent.update(0.2);
        myAgent.update(0.2);
        // console.log(myAgent.position);
        expect(myAgent.position.x).toBeLessThan(12);
        expect(myAgent.position.y).toBe(0);
        expect(myAgent.position.z).toBe(0);
    });
});
