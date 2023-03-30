import * as THREE from 'three';
import * as GK from '@package/framework';

export class EntityManager {
    entities: Map<string, GK.Entity> = new Map();
    scene: THREE.Scene;
    private entityIdCounter: number = 0;

    static IDs = {
        spawner: 'spawner',
    };

    constructor(scene: THREE.Scene) {
        this.scene = scene;
    }

    add(entity: GK.Entity, id?: string) {
        if (id !== undefined && this.entities.has(id)) {
            throw new Error(`Entity with id ${id} already exists`);
        }
        const entityId =
            id !== undefined ? id : (this.entityIdCounter++).toString();
        //@ts-ignore todo: GK.entity增加id？？？？？
        entity.id = entityId;
        this.entities.set(entityId, entity);
        let node = entity.component(GK.SCNNodeComponent)?.node;
        if (node) {
            this.scene.add(node);
        }
    }

    remove(entity: GK.Entity) {
        let node = entity.component(GK.SCNNodeComponent)?.node;
        if (node) {
            this.scene.remove(node);
        }
        //@ts-ignore
        this.entities.delete(entity.id);
    }

    update(deltaTime: number) {
        for (let entity of this.entities.values()) {
            entity.update(deltaTime);
        }
    }

    findEntityById<T extends GK.Entity>(id: string): T | undefined {
        return this.entities.get(id) as T | undefined;
    }

    removeEntityById<T extends GK.Entity>(id: string): void {
        const toDel = this.findEntityById<T>(id);
        this.remove(toDel);
    }
}
