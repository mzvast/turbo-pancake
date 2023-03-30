import {Component, ComponentType, IComponent} from './Component';
import {Entity} from './Entity';
import {ofType} from './types';

export interface IComponentSystem<T extends IComponent, U extends ofType<T>> {
    componentClass: U; // The class of components managed by the component system.
    components: T[]; // The component system’s list of components.
    addComponent(c: T): void; // Adds a component instance to the component system.
    addComponent(foundIn: Entity): void; // Adds any instances of the component system’s component class in the specified entity to the component system.
    removeComponent(c: T): void; // Removes the specified component instance from the component system.
    removeComponent(foundIn: Entity): void; // Removes any instances of the component system’s component class in the specified entity from the component system.
    update(dt: number): void; // Tells all component instances managed by the system to perform their custom periodic actions.
}

// T 实例，U Class
export class ComponentSystem<T extends IComponent, U extends ofType<T>>
    implements IComponentSystem<T, U>
{
    constructor(componentClass: U) {
        this.componentClass = componentClass;
    }

    componentClass: U;
    components: T[] = [];
    update(dt: number): void {
        for (let c of this.components) {
            c.update(dt);
        }
    }
    addComponent(c: T): void;
    addComponent(foundIn: Entity): void;
    addComponent(x: T | Entity): void {
        if ((x as T)._isComponent && x instanceof this.componentClass) {
            this.components.push(x as T);
            return;
        }
        if (x instanceof Entity) {
            if (x.component(this.componentClass)) {
                let u = x.component(this.componentClass) as T;
                if (u) {
                    this.components.push(u);
                    return;
                }
            }
        }
        // throw new Error('argument invalid');
    }
    removeComponent(c: T): void;
    removeComponent(foundIn: Entity): void;
    removeComponent(x: T | Entity): void {
        if ((x as T)._isComponent && x instanceof this.componentClass) {
            this._removeComponentInstance(x as T);
            return;
        }
        if (x instanceof Entity) {
            const toRemove = x.removeComponent(this.componentClass) as T;
            if (toRemove) this._removeComponentInstance(toRemove);
            return;
        }
        // throw new Error('argument invalid');
    }
    private _removeComponentInstance(x: T): void {
        const idx = this.components.indexOf(x);
        this.components.splice(idx, 1); // todo: delay remove for perf
    }
}
