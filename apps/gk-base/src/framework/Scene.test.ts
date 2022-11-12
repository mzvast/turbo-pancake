import {describe, it, expect, vi} from 'vitest';
import {Entity} from './Entity';
import {Scene} from './Scene';

describe('Scene', () => {
    it('init', () => {
        const scene = new Scene();
        expect(scene.entities.length).toBe(0);
    });

    it('can add/remove entity', () => {
        const scene = new Scene();
        const e1 = new Entity();
        scene.addEntity(e1);
        expect(scene.entities.length).toBe(1);
        scene.removeEntity(e1);
        expect(scene.entities.length).toBe(0);
    });
});
