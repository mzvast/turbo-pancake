import * as THREE from 'three';
import * as GK from '@/framework';
import {Agent3D} from '@/framework';
import {TrainComponent} from '../components/TrainComponent';
import {RoundedBoxGeometry} from 'three-stdlib';

const pointer = new THREE.Vector2();
const raycaster = new THREE.Raycaster();
export class Train extends GK.Entity {
    targetAgent: Agent3D;
    camera: THREE.Camera;
    scene: THREE.Scene;
    constructor({camera, scene}) {
        super();
        this.camera = camera;
        this.scene = scene;

        const cap = new THREE.Mesh(
            new RoundedBoxGeometry(1.0, 2.0, 1.0, 10, 0.5),
            new THREE.MeshStandardMaterial(),
        );

        cap.geometry.translate(0, -0.5, 0);

        // const trainComp = new TrainComponent();
        // this.addComponent(trainComp);
        const scnNodeComponent = new GK.SCNNodeComponent(cap);
        this.addComponent(scnNodeComponent);

        // 跟踪代理
        this.targetAgent = new Agent3D(); // not visible
        this.targetAgent.position.set(0, 0, 0);

        const toSeekGoal = GK.Goal.toSeekAgent(this.targetAgent);
        // 玩家代理
        const myAgent = new Agent3D();
        myAgent.maxSpeed = 1;
        myAgent.position.set(0, 0, 0);
        myAgent.behavior = new GK.Behavior(toSeekGoal, 1);
        myAgent.delegate = scnNodeComponent;
        this.addComponent(myAgent);

        document.addEventListener('mousemove', this.handleMove);
        document.addEventListener('mouseup', this.handleClick);
    }

    handleMove = event => {
        pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
        pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    handleClick = e => {
        raycaster.setFromCamera(pointer, this.camera);
        const intersects = raycaster.intersectObjects(this.scene.children);
        if (intersects.length) {
            for (const p of intersects) {
                console.log(p.object.name);
                if (p.object.name === 'ground') {
                    this.targetAgent.position.copy(p.point);
                }
            }
        }
    };
}
