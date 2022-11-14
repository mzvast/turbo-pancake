import * as GK from '@/framework';
import {TrainComponent} from '../components/TrainComponent';
export class Train extends GK.Entity {
    constructor() {
        super();
        const trainComp = new TrainComponent();
        this.addComponent(trainComp);
        this.addComponent(new GK.SCNNodeComponent(trainComp._train));
    }
}
