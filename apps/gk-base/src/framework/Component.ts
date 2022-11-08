import type {IEntity} from './Entity';

export interface IComponent {
    entity: IEntity; // The entity that owns this component.
    update?(dt: number): void;
    didAddToEntity?(): void; // Notifies the component that it has been assigned to an entity.
    willRemoveFromEntity?(): void; // Notifies the component that it has been removed from an entity.
}

export abstract class Component implements IComponent {
    _isComponent = true;
    public entity: IEntity;
    update?(dt: number): void;
    didAddToEntity?(): void;
    willRemoveFromEntity?(): void;
}
