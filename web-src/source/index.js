import Input from './libs/input';
import Renderer from './libs/renderer';
import SceneBuilder, { Camera, World, Block } from './libs/scene-builder';

import Vector2D from 'victor';
import Matter from 'matter-js';


const WORLD_WIDTH = 1024;
const WORLD_HEIGHT = 1024;

const Bodies = Matter.Bodies;
{

    const World = Matter.World;
    const Engine = Matter.Engine;
    // Matter.Render;
    
    const engine = Engine.create();

    //engine.world.gravity.y = 0.05;
    engine.world.gravity.y = 0;
    engine.world.gravity.x = 0;

    const worldInstance = engine.world;
    const box = Bodies.rectangle(Math.floor(WORLD_WIDTH/2),Math.floor(WORLD_HEIGHT/2),100,200, {friction:1, speed: 0});

    World.add(worldInstance,  [ box ]);

    window.box = box;

    Engine.run(engine); 
}










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

Input.setKeyIsPressedListenner('z');


camera.setBeforeUpdate(function() {
    if ( Input.areBothKeysPressed('q', 'e') ) {
        // Faz na por hora
    } else if (Input.isKeyPressed('q')) {
        this.rotateZ -= 1;
    } else if (Input.isKeyPressed('e')) {
        this.rotateZ += 1;
    }
});

const block =  new Block({ xCoord: window.box.position.x, yCoord: window.box.position.y, velocity: new Vector2D(0, 0), acceleration: new Vector2D(0, 0) });

block.setBeforeUpdate(function() {
    var force = {x: 0, y: 0};
    if ( Input.areBothKeysPressed('u', 'j') ) {
        // Faz na por hora
    } else if (Input.isKeyPressed('u')) {
        force.y = -0.005;
    } else if (Input.isKeyPressed('j')) {
        force.y = 0.005;
    }
    if ( Input.areBothKeysPressed('h', 'k') ) {
        // Faz na por hora
    } else if (Input.isKeyPressed('h')) {
        force.x = -0.005;
    } else if (Input.isKeyPressed('k')) {
        force.x = 0.005;
    }

    
    Matter.Body.applyForce( window.box, {x: window.box.position.x, y: window.box.position.y}, force);

    this.xCoord = window.box.position.x;
    this.yCoord = window.box.position.y;

    // var newAcceleration = this.acceleration.clone().add(new Vector2D(x, y));
    // if (!(newAcceleration.magnitude() > 0.1)) {
    //     this.acceleration = newAcceleration;
    // }
});

const world = new World({
    /**
     * Plano para usar no final com 75 de rotateX
     * rotateX : 75,
     */
    rotateX : 75,
    translateZ : 170,
    xCoord : -125,
    yCoord : 0,
    translateX:50,
    translateY: 0,
    dimensions: [ WORLD_WIDTH, WORLD_HEIGHT ], 
    entities: [
        block
    ]
});
world.setBeforeUpdate(function() {
    if ( Input.areBothKeysPressed('w', 's') ) {
        // Faz na por hora
    } else if (Input.isKeyPressed('w')) {
        this.yCoord += 4;
    } else if (Input.isKeyPressed('s')) {
        this.yCoord -= 4;
    }
    if ( Input.areBothKeysPressed('a', 'd') ) {
        // Faz na por hora
    } else if (Input.isKeyPressed('a')) {
        this.xCoord += 4;
    } else if (Input.isKeyPressed('d')) {
        this.xCoord -= 4;
    }

    if ( Input.areBothKeysPressed('q', 'e') ) {
        // Faz na por hora
    } else if (Input.isKeyPressed('q')) {
        this.rotateZ += 1.5;
    } else if (Input.isKeyPressed('e')) {
        this.rotateZ -= 1.5;
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
