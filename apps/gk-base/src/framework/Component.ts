import type {Entity} from './Entity';

export interface IComponent {
    entity: Entity; // The entity that owns this component.
    update?(dt: number): void;
    didAddToEntity?(): void; // Notifies the component that it has been assigned to an entity.
    willRemoveFromEntity?(): void; // Notifies the component that it has been removed from an entity.
}

export abstract class Component implements IComponent {
    _isComponent = true;
    public entity: Entity;
    update?(dt: number): void;
    didAddToEntity?(): void;
    willRemoveFromEntity?(): void;
}
