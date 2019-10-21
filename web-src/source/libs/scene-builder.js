export class Scene {
    constructor({ width,  height, perspective, camera, world }) {
        this.width = width;
        this.height = height;
        this.perspective = perspective;
        this.camera = camera;
        this.world = world;
    }
    update() {
        this.camera.update();
        this.world.update();
    }
}

export class Camera {
    constructor({ rotateX = 75, translateZ = 147, rotateZ = 0, beforeUpdate = null, noTransform = false }) {
        //  Setup
        this.cameraNode = document.createElement('div');
        this.cameraNode.setAttribute('data-camera', '')
        this.cameraNode.setAttribute('class', 'camera');

        // State
        this.rotateX = rotateX;
        this.translateZ = translateZ;
        this.rotateZ = rotateZ;
        this.beforeUpdate = beforeUpdate;
        this.noTransform = noTransform;
    }
    setBeforeUpdate(beforeUpdate) {
        
        this.beforeUpdate = beforeUpdate;
    }
    update() {
        if (typeof this.beforeUpdate === 'function') {
            this.beforeUpdate();
        }
        if (!this.noTransform) {
            this.cameraNode.style.transform = `rotateX(${this.rotateX}deg) translateZ(${this.translateZ}px) rotateZ(${this.rotateZ}deg)`;
        }
    }
    getNode() {
        return this.cameraNode;
    }
}

export class World {
    constructor({ rotateX = 75, translateZ = 147, xCoord = 0, yCoord = 0, entities = null, dimensions = null, beforeUpdate = null, noTransform = false }) {
        //  Setup
        this.worldNode = document.createElement('div');
        this.worldNode.setAttribute('data-world', '')
        this.worldNode.setAttribute('class', 'world');

        // State
        this.rotateX = rotateX;
        this.translateZ = translateZ;
        this.xCoord = xCoord;
        this.yCoord = yCoord;
        this.entities = entities;
        this.dimensions =  {};
        this.dimensions.width = dimensions[0];
        this.dimensions.height = dimensions[1];
        this.beforeUpdate = beforeUpdate;
        this.noTransform = noTransform;

        this.worldNode.style.width = `${this.dimensions.width}px`;
        this.worldNode.style.height = `${this.dimensions.height}px`;

        this.entities.forEach( entity => this.worldNode.appendChild(entity.getNode()) );
    }
    setBeforeUpdate(beforeUpdate) {
        
        this.beforeUpdate = beforeUpdate;
    }
    update() {
        if (typeof this.beforeUpdate === 'function') {
            this.beforeUpdate();
        }
        this.worldNode.style.transform = `rotateX(${this.rotateX}deg) translateX(${this.xCoord}px) translateY(${this.yCoord}px) translateZ(${this.translateZ}px)`;        
        this.entities.forEach( entity => entity.update() );
    }
    getNode() {
        return this.worldNode;
    }
}

export class Block  {
    constructor({ xCoord = 0, yCoord = 0,beforeUpdate = null, noTransform = false}) {
        //  Setup
        this.blockNode = document.createElement('div');
        this.blockNode.setAttribute('data-block', '')
        this.blockNode.setAttribute('class', 'block');




        // State
        this.xCoord = xCoord;
        this.yCoord = yCoord;
        this.beforeUpdate = beforeUpdate;
        this.noTransform = noTransform;

    }
    setBeforeUpdate(beforeUpdate) {
        
        this.beforeUpdate = beforeUpdate;
    }
    update() {
        if (typeof this.beforeUpdate === 'function') {
            this.beforeUpdate();
        }
        this.blockNode.style.transform = `translate(${this.xCoord}px, ${this.yCoord}px)`;
    }
    getNode() {
        return this.blockNode;
    }
}


export default class SceneBuilder {
    static make(obj) {
        return new Scene(obj);
    }
}