console.log("🚀 Extension RoboMaster chargée !");

(function(Scratch) {
    'use strict';

    const extensionId = 'robomaster';
    const socket = new WebSocket("ws://localhost:8765");

    socket.onopen = function() {
        console.log("Connexion WebSocket établie avec le serveur RoboMaster");
    };

    socket.onerror = function(error) {
        console.error("Erreur WebSocket:", error);
    };

    class RoboMasterExtension {
        constructor(runtime) {
            this.runtime = runtime;
        }

        getInfo() {
            return {
                id: extensionId,
                name: 'RoboMaster EP Core',
                blocks: [
                    {
                        opcode: 'move_forward',
                        blockType: Scratch.BlockType.COMMAND,
                        text: 'Avancer de [DISTANCE] mètre(s)',
                        arguments: {
                            DISTANCE: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 1
                            }
                        }
                    }
                ],
                menus: {},
            };
        }

        move_forward(args) {
            const distance = args.DISTANCE;
            if (socket.readyState === WebSocket.OPEN) {
                socket.send(`move_forward:${distance}`);
                console.log(`Commande envoyée : move_forward:${distance}`);
            } else {
                console.error("WebSocket non connecté !");
            }
        }
    }

    Scratch.extensions.register(new RoboMasterExtension());
})(Scratch);

