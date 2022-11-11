import type {Entity} from './Entity';
import {ofType} from './types';

export interface IComponent {
    _isComponent: boolean;
    entity: Entity; // The entity that owns this component.
    update?(dt: number): void;
    didAddToEntity?(): void; // Notifies the component that it has been assigned to an entity.
    willRemoveFromEntity?(): void; // Notifies the component that it has been removed from an entity.
}

export type ComponentType = ofType<IComponent>;

export abstract class Component implements IComponent {
    _isComponent = true;
    public entity: Entity;
    update?(dt: number): void;
    didAddToEntity?(): void;
    willRemoveFromEntity?(): void;
}
