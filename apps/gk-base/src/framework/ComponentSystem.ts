import {Component} from './Component';
import {Entity} from './Entity';

export interface IComponentSystem<T> {
    readonly componentClass: string; // The class of components managed by the component system.
    readonly components: T[]; // The component system’s list of components.
    addComponent(c: T): void; // Adds a component instance to the component system.
    addComponent(foundIn: Entity): void; // Adds any instances of the component system’s component class in the specified entity to the component system.
    removeComponent(c: T): void; // Removes the specified component instance from the component system.
    removeComponent(foundIn: Entity): void; // Removes any instances of the component system’s component class in the specified entity from the component system.
    update(dt: number): void; // Tells all component instances managed by the system to perform their custom periodic actions.
}

export class ComponentSystem<T extends Component>
    implements IComponentSystem<T>
{
    constructor(Ctor: new (...args: any[]) => T) {
        this.componentClass = Ctor.name;
    }

    componentClass: string;
    components: T[] = [];
    update(dt: number): void {
        for (let c of this.components) {
            c.update(dt);
        }
    }
    addComponent(c: T): void;
    addComponent(foundIn: Entity): void;
    addComponent(x: T | Entity): void {
        if (
            (x as T)._isComponent &&
            x.constructor.name === this.componentClass
        ) {
            this.components.push(x as T);
            return;
        }
        if (x instanceof Entity) {
            if (x.components[this.componentClass]) {
                this.components.push(x.components[this.componentClass]);
                return;
            }
        }
        throw new Error('argument invalid');
    }
    removeComponent(c: T): void;
    removeComponent(foundIn: Entity): void;
    removeComponent(x: T | Entity): void {
        if (
            (x as T)._isComponent &&
            x.constructor.name === this.componentClass
        ) {
            this._removeComponentInstance(x as T);
            return;
        }
        if (x instanceof Entity) {
            let inst = x.components[this.componentClass];
            if (!inst) {
                return;
            }
            this._removeComponentInstance(inst);
            return;
        }
        throw new Error('argument invalid');
    }
    private _removeComponentInstance(x: T): void {
        const idx = this.components.indexOf(x);
        this.components.splice(idx, 1); // todo: delay remove for perf
    }
}
