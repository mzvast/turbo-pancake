import {Entity} from './Entity';
import {describe, it, expect, vi} from 'vitest';
import {Component} from './Component';
import {ComponentSystem} from './ComponentSystem';

describe('ComponentSystem', () => {
    // setUpEntities
    const e1 = new Entity();
    const e2 = new Entity();

    class TransformComp extends Component {
        x = 0;
        y = 0;
        constructor() {
            super();
        }

        override update(dt) {
            this.x += dt;
            this.y += dt;
        }
    }

    const c1 = new TransformComp();
    const c2 = new TransformComp();

    e1.addComponent(c1);
    e2.addComponent(c2);

    // addComponentsToComponentSystems

    const moveSys = new ComponentSystem(TransformComp);

    it('add component into system should work', () => {
        for (let x of [c1, c2]) {
            moveSys.addComponent(x);
        }
        expect(moveSys.components.length).toBe(2);
    });

    it('update should work', () => {
        moveSys.update(1);
        expect(c1.x).toBe(1);
        expect(c1.y).toBe(1);
        expect(c2.x).toBe(1);
        expect(c2.y).toBe(1);
    });

    it('remove component from system should work', () => {
        moveSys.removeComponent(c1);
        expect(moveSys.components.length).toBe(1);
    });

    it('remove component by entity from system should work', () => {
        moveSys.removeComponent(e2);
        expect(moveSys.components.length).toBe(0);
    });

    it('add component by entity into system should work', () => {
        moveSys.addComponent(e1);
        expect(moveSys.components.length).toBe(1);
    });

    it('remove component by entity from system should work', () => {
        moveSys.removeComponent(e1);
        expect(moveSys.components.length).toBe(0);
    });
});
