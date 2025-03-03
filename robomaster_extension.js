console.log("🚀 Extension RoboMaster chargée !");

(function(Scratch) {
    'use strict';

    const extensionId = 'robomaster';
    let socket = null; // Initialisation du WebSocket

    function connectWebSocket() {
        console.log("🔄 Tentative de connexion WebSocket...");
        socket = new WebSocket("ws://localhost:8765");

        socket.onopen = function() {
            console.log("✅ Connexion WebSocket établie avec le serveur RoboMaster");
        };

        socket.onerror = function(error) {
            console.error("❌ Erreur WebSocket:", error);
        };

        socket.onclose = function() {
            console.warn("⚠️ WebSocket fermé. Nouvelle tentative de connexion dans 5s...");
            setTimeout(connectWebSocket, 5000); // Reconnexion automatique après 5 secondes
        };
    }

    class RoboMasterExtension {
        constructor(runtime) {
            this.runtime = runtime;
            connectWebSocket(); // Démarrer la connexion WebSocket lors de l'initialisation
        }

        getInfo() {
            console.log("📢 Fonction getInfo() appelée !");
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
            if (socket && socket.readyState === WebSocket.OPEN) {
                socket.send(`move_forward:${distance}`);
                console.log(`🚀 Commande envoyée : move_forward:${distance}`);
            } else {
                console.error("❌ WebSocket non connecté !");
            }
        }
    }

    Scratch.extensions.register(new RoboMasterExtension());
    console.log("✅ Extension enregistrée !");
})(Scratch);
