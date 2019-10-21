import { Scene } from './scene-builder';


export default class Renderer {
    /**
     * 
     * @param {Node} node 
     * @param {Scene} scene 
     */
    static render(windowNode, scene) {



        // Seta a altura, largura e perspectiva no elemento selecionado
        windowNode.setAttribute('style', `width: ${scene.width}px;
        height: ${scene.height}px;
        perspective: ${scene.perspective}px;
        top: calc(50vh - ${Math.floor(scene.height/2)}px);
        left: calc(50vw - ${Math.floor(scene.width/2)}px);`
        );

        const elementoMundo = scene.world.getNode();
        const elementoCamera = scene.camera.getNode();

        elementoCamera.appendChild(elementoMundo);

        scene.update();
        // Faz os elementos serem finalmente renderizados
        windowNode.appendChild(elementoCamera);

        const update  = function update() {
            if (!window.stopLoop) {

                scene.update();
                window.requestAnimationFrame(update);
            }
        };

        window.requestAnimationFrame(update);
    }
}