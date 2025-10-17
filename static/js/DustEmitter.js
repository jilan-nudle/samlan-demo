export default class DustEmitter {
    constructor(scene, position = BABYLON.Vector3.Zero(), spawnSize = 0.05) {
        this.scene = scene;

        // Create emitter node
        this.emitter = new BABYLON.TransformNode("dustEmitter", scene);
        this.emitter.position = position.clone();

        // Particle system
        this.ps = new BABYLON.ParticleSystem("dust", 200, scene);
        this.ps.particleTexture = new BABYLON.Texture("https://playground.babylonjs.com/textures/flare.png", scene);

        this.ps.emitter = this.emitter;

        // Default look
        this.ps.color1 = new BABYLON.Color4(0.28, 0.62, 0.76, 0.9);
        this.ps.color2 = new BABYLON.Color4(0.28, 0.62, 0.76, 0.9);
        this.ps.colorDead = new BABYLON.Color4(0, 0, 0, 0);

        this.ps.minSize = 0.05;
        this.ps.maxSize = 0.2;
        this.ps.minLifeTime = 0.5;
        this.ps.maxLifeTime = 1.5;

        this.ps.emitRate = 50;

        // Direction straight down
        this.setDirection(new BABYLON.Vector3(0, -1, 0));

        this.ps.minEmitPower = 0.5;
        this.ps.maxEmitPower = 1.5;
        this.ps.gravity = new BABYLON.Vector3(0, -0.5, 0);

        // Initial spawn area
        this.setSpawnArea(spawnSize);

        this.ps.start();
    }

    // 🔹 Move emitter dynamically
    setPosition(pos) {
        this.emitter.position.copyFrom(pos);
    }

    // 🔹 Attach emitter directly to a mesh/node
    setParent(parentNode, offset = BABYLON.Vector3.Zero()) {
        this.emitter.parent = parentNode;
        this.emitter.position = offset.clone();
    }

    // 🔹 Scale particle size and strength
    setScale(scale) {
        this.ps.minSize = 0.05 * scale;
        this.ps.maxSize = 0.2 * scale;
        this.ps.minEmitPower = 0.2 * scale;
        this.ps.maxEmitPower = 0.8 * scale;
    }

    // 🔹 Control how wide/narrow the spawn area is
    setSpawnArea(size) {
        const emitter = new BABYLON.BoxParticleEmitter();
        emitter.minEmitBox = new BABYLON.Vector3(-size, 0, -size);
        emitter.maxEmitBox = new BABYLON.Vector3(size, 0, size);
        this.ps.particleEmitterType = emitter;

    }

    // 🔹 Control direction (straight up, straight down, tilted)
    setDirection(vec3, spread = 0.05) {
        this.ps.direction1 = new BABYLON.Vector3(vec3.x - spread, vec3.y, vec3.z - spread);
        this.ps.direction2 = new BABYLON.Vector3(vec3.x + spread, vec3.y, vec3.z + spread);
    }

    // 🔹 Show/Hide
    setVisible(isVisible) {
        if (isVisible) {
            this.ps.start();
        } else {
            this.ps.stop();
        }
    }

    // 🔹 Dispose when not needed
    dispose() {
        this.ps.dispose();
        this.emitter.dispose();
    }
}