import {Entity} from './Entity';
import {describe, it, expect, vi} from 'vitest';
import {Component} from './Component';

describe('Entity', () => {
    const entity = new Entity();

    const FnComponentDidAddToEntity = vi.fn();
    const FnComponentWillRemoveFromEntity = vi.fn();
    const FnComponentUpdate = vi.fn();

    class TestComp extends Component {
        constructor() {
            super();
        }
        override didAddToEntity() {
            FnComponentDidAddToEntity();
        }

        override willRemoveFromEntity() {
            FnComponentWillRemoveFromEntity();
        }

        override update() {
            FnComponentUpdate();
        }
    }

    it('should create an instance', () => {
        expect(entity).toBeTruthy();
    });

    const c1 = new TestComp();

    it('add component should work', () => {
        entity.addComponent(c1);
        expect(c1.entity).toEqual(entity);
        expect(entity.components[c1.constructor.name]).toEqual(c1);
        expect(FnComponentDidAddToEntity).toHaveBeenCalledOnce();
    });

    it('update on entity should recursively call update in components', () => {
        entity.update(1);
        expect(FnComponentUpdate).toHaveBeenCalledOnce();
    });

    it('remove component should work', () => {
        entity.removeComponent(c1);
        expect(entity.components[c1.constructor.name]).toBeUndefined();
        expect(FnComponentWillRemoveFromEntity).toHaveBeenCalledOnce();
    });
});
