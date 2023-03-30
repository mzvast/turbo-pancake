import type {Object3D, Scene, Vector2} from 'three';

// https://sourcegraph.com/github.com/skyunBoss/fsxy/-/blob/server/typings/app/service/index.d.ts?L5:1
export type AnyClass = new (...args: any[]) => any;
export type ofType<T> = new (...args: any[]) => T;

// 连接3D世界的节点
export type SceneRootNodeType = Scene;

// 2D Object
export type Node2D = {
    rotation: number;
    position: Vector2;
};
// 3D Object
export type Node3D = Object3D;
