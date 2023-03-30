import {World} from './world/World';

function main() {
    // Get a reference to the container element
    const container = document.querySelector('#app');

    // create a new world
    const world = new World(container);

    // start the animation loop
    world.start();
}

main();
