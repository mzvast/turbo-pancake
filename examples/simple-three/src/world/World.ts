import {createCamera} from './components/camera';
import {createAxesHelper, createGridHelper} from './components/helpers';
import {createLights} from './components/lights';
import {createScene} from './components/scene';

import {createControls} from './systems/controls';
import {createRenderer} from './systems/renderer';
import {Resizer} from './systems/Resizer';
import {Loop} from './systems/Loop';
import * as GK from '@package/framework';
import {TrainComponent} from './components/TrainComponent';
import {Train} from './entities/Train';
import {EntityManager} from './utils/EntityManager';
import {Ground} from './entities/Ground';

let camera;
let renderer;
let scene: THREE.Scene;
let loop;

class World {
    entityManager: EntityManager;
    constructor(container) {
        camera = createCamera();
        renderer = createRenderer();
        scene = createScene();
        this.entityManager = new EntityManager(scene);
        loop = new Loop(camera, scene, renderer, this.entityManager);
        container.append(renderer.domElement);

        const controls = createControls(camera, renderer.domElement);
        const {ambientLight, mainLight} = createLights();

        loop.updatables.push(controls /*train*/);
        scene.add(ambientLight, mainLight /*train*/);

        // train is in ECS world
        const trainEntity = new Train({camera, scene});
        this.entityManager.add(trainEntity);

        const GroundEntity = new Ground({scene});
        this.entityManager.add(GroundEntity);

        const resizer = new Resizer(container, camera, renderer);

        scene.add(createAxesHelper(), createGridHelper());
    }

    render() {
        renderer.render(scene, camera);
    }

    start() {
        loop.start();
    }

    stop() {
        loop.stop();
    }
}

export {World};
