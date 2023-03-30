import type {ComponentType, IComponent} from './Component';
import {ofType} from './types';

export interface IEntity {
    components: IComponent[];
    addComponent(c: IComponent): void;
    update(dt: number): void;
    removeComponent(c: unknown): void;
}
export class Entity implements IEntity {
    public components: IComponent[] = [];
    public update(dt: number) {
        for (const x of this.components) {
            x?.update?.(dt);
        }
    }
    public addComponent = (c: IComponent) => {
        if (this.components.includes(c)) {
            // console.warn('Component already added');
            return;
        }

        c.entity = this;
        this.components.push(c);
        c?.didAddToEntity?.();
    };
    public removeComponent = (compClass: ComponentType) => {
        const idx = this.components.findIndex(x => x instanceof compClass);
        if (idx == -1) {
            // console.warn('Component not exist');
            return;
        }
        const toRemove = this.components[idx];

        toRemove?.willRemoveFromEntity?.();

        toRemove.entity = null;
        this.components.splice(idx, 1);
        return toRemove;
    };

    public component = <T>(componentClass: ofType<T>) => {
        return this.components.find(x => x instanceof componentClass) as T;
    };
}
