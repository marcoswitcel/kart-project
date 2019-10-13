const elementoPlano = document.querySelector('.window .plano');
const elementoBloco = document.querySelector('.window .plano .bloco');

var rotationValue = 0;
var blocoPos01 = 0;
var blocoPos02 = 0;
elementoPlano.style.transform = `rotateX(75deg) translateZ(147px) rotateZ(${rotationValue}deg)`;
elementoBloco.style.transform = `translate(${blocoPos02}px, ${blocoPos01}px)`;


Input.setKeyIsPressedListenner('w');
Input.setKeyIsPressedListenner('s');
Input.setKeyIsPressedListenner('a');
Input.setKeyIsPressedListenner('d');



// Desenvolver uma lib para captura os  inputs do teclado e sincronizar

function main() {
    // mantem o loop de animação executando
    //rotationValue += 1;

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

    elementoPlano.style.transform = `rotateX(75deg) translateZ(147px) rotateZ(${rotationValue}deg)`;
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