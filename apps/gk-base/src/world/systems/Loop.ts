import {Clock} from 'three';
import {EntityManager} from '../entities/EntityManager';

const clock = new Clock();

class Loop {
    camera: any;
    scene: any;
    renderer: any;
    entityManager: EntityManager;
    updatables: any[];
    constructor(camera, scene, renderer, entityManager: EntityManager) {
        this.camera = camera;
        this.scene = scene;
        this.renderer = renderer;
        this.entityManager = entityManager;
        this.updatables = [];
    }

    start() {
        this.renderer.setAnimationLoop(() => {
            // tell every animated object to tick forward one frame
            this.tick();

            // render a frame
            this.renderer.render(this.scene, this.camera);
        });
    }

    stop() {
        this.renderer.setAnimationLoop(null);
    }

    tick() {
        // only call the getDelta function once per frame!
        const delta = clock.getDelta();

        // console.log(
        //   `The last frame rendered in ${delta * 1000} milliseconds`,
        // );

        this.entityManager.update(delta);
        for (let x of this.updatables) {
            x.tick();
        }
    }
}

export {Loop};
