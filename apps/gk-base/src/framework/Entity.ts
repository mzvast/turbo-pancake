import type {IComponent} from './Component';

export interface IEntity {
    components: Record<string, unknown>;
    addComponent(c: IComponent): void;
    update(dt: number): void;
    removeComponent(c: unknown): void;
}

export class Entity implements IEntity {
    public components = {};
    public update = (dt: number) => {
        for (const c in this.components) {
            this.components[c]?.update(dt);
        }
    };
    public addComponent = (c: IComponent) => {
        c.entity = this;
        this.components[c.constructor.name] = c;
        c?.didAddToEntity?.();
    };
    public removeComponent = (c: IComponent) => {
        c?.willRemoveFromEntity?.();
        delete this.components[c.constructor.name];
        c.entity = null;
    };
}
