import * as THREE from 'three';
import * as GK from '@/framework';
export class EntityManager {
    entities: Set<GK.Entity> = new Set();
    scene: THREE.Scene;
    constructor(scene: THREE.Scene) {
        this.scene = scene;
    }

    add(entity: GK.Entity) {
        this.entities.add(entity);
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
        this.entities.delete(entity);
    }

    update(deltaTime: number) {
        for (let entity of this.entities) {
            entity.update(deltaTime);
        }
    }
}
