import Input from './libs/input';

const WIDTH = 800;
const HEIGHT = 500;
const PERSPECTIVE = 1000;

var divWindow = document.querySelector('.window');

divWindow.setAttribute('style', `    width: ${WIDTH}px;
height: ${HEIGHT}px;
perspective: ${PERSPECTIVE}px;
top: calc(50vh - ${Math.floor(HEIGHT/2)}px);
left: calc(50vw - ${Math.floor(WIDTH/2)}px);`)


var translateX = 0;


var elementoPlano = document.createElement('div');
var elementoCamera = document.createElement('div');
var elementoBloco = document.createElement('div');


elementoPlano.setAttribute('class', 'plano');

elementoCamera.setAttribute('class', 'camera');
elementoBloco.setAttribute('class', 'bloco');

elementoPlano.appendChild(elementoBloco);
elementoCamera.appendChild(elementoPlano);

divWindow.appendChild(elementoCamera);

var rotationValue = 0;
var blocoPos01 = 0;
var blocoPos02 = 0;
var xPlano = 0;
var yPlano = 0;
elementoCamera.style.transform = `rotateX(75deg) translateZ(147px) rotateZ(${rotationValue}deg)`;
elementoPlano.style.transform = `rotateX(75deg) translateX(${xPlano}px) translateY(${yPlano}px) translateZ(147px)`;
elementoBloco.style.transform = `translate(${blocoPos02}px, ${blocoPos01}px)`;


Input.setKeyIsPressedListenner('w');
Input.setKeyIsPressedListenner('s');
Input.setKeyIsPressedListenner('a');
Input.setKeyIsPressedListenner('d');


Input.setKeyIsPressedListenner('u');
Input.setKeyIsPressedListenner('j');
Input.setKeyIsPressedListenner('h');
Input.setKeyIsPressedListenner('k');


Input.setKeyIsPressedListenner('q');
Input.setKeyIsPressedListenner('e');


// Desenvolver uma lib para captura os  inputs do teclado e sincronizar

function main() {
    // mantem o loop de animação executando
    //rotationValue += 1;


    if (Input.isKeyPressed('u') && Input.isKeyPressed('j')){
        // Faz na por hora
    } else if (Input.isKeyPressed('u')) {
        yPlano -= 1;
    } else if (Input.isKeyPressed('j')) {
        yPlano += 1;
    }

    if (Input.isKeyPressed('h') && Input.isKeyPressed('k')){
        // Faz na por hora
    } else if (Input.isKeyPressed('h')) {
        xPlano -= 1;
    } else if (Input.isKeyPressed('k')) {
        xPlano += 1;
    }



    if (Input.isKeyPressed('a') && Input.isKeyPressed('d')){
        // Faz na por hora
    } else if (Input.isKeyPressed('a')) {
        blocoPos02 -= 1;
    } else if (Input.isKeyPressed('d')) {
        blocoPos02 += 1;
    }


    if (Input.isKeyPressed('w') && Input.isKeyPressed('s')){
        // Faz na por hora
    } else if (Input.isKeyPressed('w')) {
        blocoPos01 -= 1;
    } else if (Input.isKeyPressed('s')) {
        blocoPos01 += 1;
    }


    if (Input.isKeyPressed('q') && Input.isKeyPressed('e')){
        // Faz na por hora
    } else if (Input.isKeyPressed('q')) {
        rotationValue -= 1;
    } else if (Input.isKeyPressed('e')) {
        rotationValue += 1;
    }


    elementoCamera.style.transform = `rotateX(75deg) translateZ(147px) rotateZ(${rotationValue}deg)`;
    elementoPlano.style.transform = `rotateX(75deg) translateX(${xPlano}px) translateY(${yPlano}px) translateZ(147px)`;
    elementoBloco.style.transform = `translate(${blocoPos02}px, ${blocoPos01}px)`;
    window.requestAnimationFrame(main);
}

main();
// var i = 10;
// var times = [];

// while(i--) {
//     (() => {
//         // Start
//         var time  = Date.now();
//         fetch('http://localhost:3001/')
//             .then(response => {
//                 times.push(Date.now() - time);
//                 response.text()
//             })
//             .then(
//                 //value => console.log(value)
//             )
//             .catch(
//                 //error => console.log('error', error)
//             )
//             .finally(
//                 //console.log.bind(console, 'finally')
//             )
//     })()
// }

// times.reduce(function(a,b) { return a + b})/(times.length - 1)

function * fetchRotation() {
    while(true) {
        yield fetch('http://localhost:3001/')
            .then(response => {
                return response.text()
            })
            .then(value => {
                console.log(value);
                rotationValue = +value;
                elementoPlano.style.transform = `rotateX(75deg) translateZ(147px) rotateZ(${value}deg)`;
            })
            .catch(
                //error => console.log('error', error)
            )
            .finally(
                () => (window.fetcher.next())
            )
    }
}

var fetcher = fetchRotation();

//fetcher.next();