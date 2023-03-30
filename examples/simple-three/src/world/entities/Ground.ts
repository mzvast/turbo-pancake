import * as THREE from 'three';
import * as GK from '@package/framework';
export class Ground extends GK.Entity {
    constructor({scene}) {
        super();
        const planeGeometry = new THREE.PlaneGeometry(6, 6);
        const planeMaterial = new THREE.MeshBasicMaterial({
            color: 0xffffff,
            transparent: true,
            opacity: 0,
        });
        const plane = new THREE.Mesh(planeGeometry, planeMaterial);
        plane.name = 'ground';
        plane.rotation.x = -Math.PI / 2;
        scene.add(plane);
    }
}
