import {Object3D} from 'three';
import {describe, it, expect, vi} from 'vitest';
import {Entity} from './Entity';
import {SKNodeComponent} from './SKNodeComponent';
describe('State', () => {
    it('should add a SKNodeComponent to an entity', () => {
        const e1 = new Entity();
        const skNode = new Object3D();
        const skNodeComponent = new SKNodeComponent(skNode);
        e1.addComponent(skNodeComponent);
        expect(skNodeComponent.node).toBe(skNode);
        expect(e1.component(SKNodeComponent)).toBe(skNodeComponent);
    });
});
