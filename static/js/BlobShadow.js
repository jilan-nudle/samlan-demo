export default class BlobShadow {
    constructor(scene, options = {}) {
        this.scene = scene;

        // Default options (can be overridden)
        this.options = Object.assign({
            radius: 1,
            opacity: 0.3,
            resolution: 512,
            darkRadius: 15,   // solid inner radius
            fadeRadius: 30,  // soft fade out
            offsetY: 0.01     // lift off ground to avoid z-fighting
        }, options);

        // Create disc
        this.disc = BABYLON.MeshBuilder.CreateDisc("blobShadow", {
            radius: this.options.radius,
            tessellation: 48
        }, this.scene);
        this.disc.rotation.x = Math.PI / 2;
        this.disc.position.y = this.options.offsetY;
        this.disc.isPickable = false;

        // Create material with radial gradient
        const shadowMat = new BABYLON.StandardMaterial("shadowMat", this.scene);
        const dynTex = new BABYLON.DynamicTexture(
            "shadowTex",
            { width: this.options.resolution, height: this.options.resolution },
            this.scene,
            true
        );
        const ctx = dynTex.getContext();

        // Radial gradient
        const grd = ctx.createRadialGradient(
            this.options.resolution / 2, this.options.resolution / 2, this.options.darkRadius,
            this.options.resolution / 2, this.options.resolution / 2, this.options.fadeRadius
        );
        grd.addColorStop(0, `rgba(0,0,0,${this.options.opacity})`);
        grd.addColorStop(1, "rgba(0,0,0,0)");

        ctx.fillStyle = grd;
        ctx.fillRect(0, 0, this.options.resolution, this.options.resolution);
        dynTex.update();

        shadowMat.diffuseTexture = dynTex;
        shadowMat.opacityTexture = dynTex;
        shadowMat.specularColor = BABYLON.Color3.Black();

        this.disc.material = shadowMat;
    }

    /** Attach shadow under a mesh/transform node */
    attachTo(mesh) {
        this.disc.parent = mesh;
        this.disc.position.y = this.options.offsetY;
    }

    /** Manually set position */
    setPosition(x, y, z) {
        this.disc.position.set(x, y + this.options.offsetY, z);
    }

    /** Scale shadow */
    setScale(scale) {
        this.disc.scaling.set(scale, scale, scale);
    }

    /** Hide/Show */
    setVisible(visible) {
        this.disc.isVisible = visible;
    }
}
