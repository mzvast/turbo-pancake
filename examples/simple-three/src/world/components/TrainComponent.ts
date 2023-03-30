import * as THREE from 'three';
import * as GK from '@package/framework';
import {Train} from './train/Train';

export class TrainComponent extends GK.Component {
    _train: Train;
    constructor() {
        super();
        this._train = new Train();
    }

    update(deltaTime: number) {
        this._train.tick(deltaTime);
    }
}
