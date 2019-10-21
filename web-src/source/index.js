import Input from './libs/input';
import Renderer from './libs/renderer';
import SceneBuilder, { Camera, World, Block } from './libs/scene-builder';


const camera = new Camera({ rotateX : 0, translateZ : 0, rotateZ : 0, beforeUpdate : null, noTransform: true});


Input.setKeyIsPressedListenner('e');
Input.setKeyIsPressedListenner('q');

Input.setKeyIsPressedListenner('w');
Input.setKeyIsPressedListenner('s');
Input.setKeyIsPressedListenner('a');
Input.setKeyIsPressedListenner('d');
Input.setKeyIsPressedListenner('u');
Input.setKeyIsPressedListenner('j');
Input.setKeyIsPressedListenner('h');
Input.setKeyIsPressedListenner('k');


camera.setBeforeUpdate(function() {
    if ( Input.areBothKeysPressed('q', 'e') ) {
        // Faz na por hora
    } else if (Input.isKeyPressed('q')) {
        this.rotateZ -= 1;
    } else if (Input.isKeyPressed('e')) {
        this.rotateZ += 1;
    }
});

const block =  new Block({ xCoord: 100, yCoord: 50 });

block.setBeforeUpdate(function() {
    if ( Input.areBothKeysPressed('u', 'j') ) {
        // Faz na por hora
    } else if (Input.isKeyPressed('u')) {
        this.yCoord -= 2;
    } else if (Input.isKeyPressed('j')) {
        this.yCoord += 2;
    }
    if ( Input.areBothKeysPressed('h', 'k') ) {
        // Faz na por hora
    } else if (Input.isKeyPressed('h')) {
        this.xCoord -= 2;
    } else if (Input.isKeyPressed('k')) {
        this.xCoord += 2;
    }
});

const world = new World({
    rotateX : 75,
    translateZ : 100,
    xCoord : -125,
    yCoord : 0,
    translateX:50,
    translateY: 0,
    dimensions: [ 1024, 1024 ], 
    entities: [
        block
    ]
});
world.setBeforeUpdate(function() {
    if ( Input.areBothKeysPressed('w', 's') ) {
        // Faz na por hora
    } else if (Input.isKeyPressed('w')) {
        this.yCoord -= 2;
    } else if (Input.isKeyPressed('s')) {
        this.yCoord += 2;
    }
    if ( Input.areBothKeysPressed('a', 'd') ) {
        // Faz na por hora
    } else if (Input.isKeyPressed('a')) {
        this.xCoord -= 2;
    } else if (Input.isKeyPressed('d')) {
        this.xCoord += 2;
    }
});


const scene = SceneBuilder.make({
    width : 800,
    height : 500,
    perspective : 1000,
    camera: camera,
    world: world
});

Renderer.render(document.querySelector('.window'), scene);
