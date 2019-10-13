<?php

use Psr\Http\Message\ServerRequestInterface;
use React\EventLoop\Factory;
use React\Http\Response;
use React\Http\Server;
//use Clue\React\Stdio;

require __DIR__ . '/vendor/autoload.php';

$loop = Factory::create();
$i = 0;

$server = new Server(function (ServerRequestInterface $request) use (&$i) {
    $i++;
    if ($i > 360) {
        $i = 1;
    }
    //echo 'respondendo', "\n";
    return new Response(
        200,
        [
            'Content-Type' => 'text/plain'
        ],
        "$i"
    );
});
$socket = new \React\Socket\Server(isset($argv[1]) ? $argv[1] : '0.0.0.0:3001', $loop);
$server->listen($socket);
echo 'Listening on ', str_replace('tcp:', 'http:', $socket->getAddress()), PHP_EOL;
$loop->run();
echo 'iniciado';


// $loop2 = React\EventLoop\Factory::create();
// $stdio = new Stdio($loop2);

// $stdio->setPrompt('Input > ');

// $stdio->on('data', function ($line) use ($stdio) {
//     $line = rtrim($line, "\r\n");
//     $stdio->write('Your input: ' . $line . PHP_EOL);

//     if ($line === 'quit') {
//         $stdio->end();
//     }
// });

// $loop2->run();