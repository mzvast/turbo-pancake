import {Object3D, Vector2} from 'three';
import {describe, it, expect, vi} from 'vitest';
import {Agent3D} from './Agent3D';
import {Entity} from './Entity';
import {SCNNodeComponent} from './SCNNodeComponent';
describe('SCNNodeComponent', () => {
    it('should add a SCNNodeComponent to an entity', () => {
        const e1 = new Entity();
        const scnNode = new Object3D();
        const scnNodeComponent = new SCNNodeComponent(scnNode);
        e1.addComponent(scnNodeComponent);
        expect(scnNodeComponent.node).toBe(scnNode);
        expect(e1.component(SCNNodeComponent)).toBe(scnNodeComponent);
    });

    it('should sync Agent3D when set as delegate', () => {
        const e1 = new Entity();
        const scnNode = new Object3D();
        const scnNodeComponent = new SCNNodeComponent(scnNode);
        e1.addComponent(scnNodeComponent);
        const agent = new Agent3D();
        agent.delegate = scnNodeComponent;
        agent._behaviorFn = (_agent: Agent3D) => {
            _agent.position[0] = 1;
            _agent.position[1] = 1;
            _agent.position[2] = 1;
            //
            _agent.rotation[0] = 1;
            _agent.rotation[1] = 1;
            _agent.rotation[2] = 1;
        };
        // before
        expect(scnNode.position.x).toBe(0);
        expect(scnNode.position.y).toBe(0);
        expect(scnNode.position.z).toBe(0);
        expect(scnNode.rotation.x).toBe(0);
        expect(scnNode.rotation.y).toBe(0);
        expect(scnNode.rotation.z).toBe(0);
        // after
        agent.update(10);
        expect(scnNode.position.x).toBe(1);
        expect(scnNode.position.y).toBe(1);
        expect(scnNode.position.z).toBe(1);
        expect(scnNode.rotation.x).toBe(1);
        expect(scnNode.rotation.y).toBe(1);
        expect(scnNode.rotation.z).toBe(1);
    });
});
