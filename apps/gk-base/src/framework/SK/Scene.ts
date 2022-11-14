import {Entity} from '../Entity';
import {SceneRootNodeType} from '../types';
// https://sourcegraph.com/github.com/xybp888/iOS-SDKs/-/blob/iPhoneOS16.1.sdk/System/Library/Frameworks/GameplayKit.framework/Headers/GKScene.h
export interface IScene {
    // init with file and attach node
    entities: Entity[];
    addEntity(entity: Entity): void;
    removeEntity(entity: Entity): void;
    rootNode: SceneRootNodeType;
    // graphs
    // addGraph(graph:IGraph):void
    // removeGraph(graph:IGraph):void
}

export class Scene implements IScene {
    constructor() {}
    rootNode: SceneRootNodeType;
    entities: Entity[] = [];
    addEntity(entity: Entity): void {
        this.entities.push(entity);
    }
    removeEntity(entity: Entity): void {
        this.entities.splice(this.entities.indexOf(entity), 1);
    }
}
