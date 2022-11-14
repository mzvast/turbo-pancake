import {Object3D, Vector2} from 'three';
import {describe, it, expect, vi} from 'vitest';
import {Agent2D} from './Agent2D';
import {Entity} from './Entity';
import {SKNodeComponent} from './SKNodeComponent';
describe('SKNodeComponent', () => {
    it('should add a SKNodeComponent to an entity', () => {
        const e1 = new Entity();
        const skNode = {
            rotation: 0,
            position: new Vector2(0, 0),
        };
        const skNodeComponent = new SKNodeComponent(skNode);
        e1.addComponent(skNodeComponent);
        expect(skNodeComponent.node).toBe(skNode);
        expect(e1.component(SKNodeComponent)).toBe(skNodeComponent);
    });

    it('should sync Agent2D when set as delegate', () => {
        const e1 = new Entity();
        const skNode = {
            rotation: 0,
            position: new Vector2(0, 0),
        };
        const skNodeComponent = new SKNodeComponent(skNode);
        e1.addComponent(skNodeComponent);
        const agent = new Agent2D();
        agent.delegate = skNodeComponent;
        agent._behaviorFn = (_agent: Agent2D) => {
            _agent.position.x = 1;
            _agent.position.y = 1;
            _agent.rotation = 1;
        };
        // before
        expect(skNode.position.x).toBe(0);
        expect(skNode.position.y).toBe(0);
        expect(skNode.rotation).toBe(0);
        // after
        agent.update(10);
        expect(skNode.position.x).toBe(1);
        expect(skNode.position.y).toBe(1);
        expect(skNode.rotation).toBe(1);
    });
});
