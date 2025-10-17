import SceneObject from "./SceneObject.js";
import TopMenu from "./TopMenu.js";
import DialogScreen from "./DialogScreen.js";
import XRChangeManager from "./XRChangeManager.js";
import BlobShadow from "./BlobShadow.js";
import DustEmitter from "./DustEmitter.js";
import QuizPanel from "./QuizPanel.js";
import BaseState from "./FlowEngine/BaseState.js";
import FlowEngine from "./FlowEngine/FlowEngine.js";


var canvas = document.getElementById("renderCanvas");

var startRenderLoop = function (engine, canvas) {
    engine.runRenderLoop(function () {
        if (sceneToRender && sceneToRender.activeCamera) {
            sceneToRender.render();
        }
    });
}

var engine = null;
var scene = null;
var sceneToRender = null;
var createDefaultEngine = function () { return new BABYLON.Engine(canvas, true, { preserveDrawingBuffer: true, stencil: true, disableWebGL2Support: false }); };


// States
class IntroScene extends BaseState {
    constructor() {
        super('Introduction');
        this.rootLayout = null;
    }

    async enter(engine) {

        const introScreen = new DialogScreen("assets/media/overview-image.png", "sanlam", "sanlam is a purpose-led organisation, with all our efforts centred on helping our clients live with confidence. We promote financial inclusion, transformation and empowerment through our broad product and financial advice offering, inclusive culture and partnership approach.", "START EXPERIENCE");

        introScreen.attachEvent(() => {
            engine.goTo("Overview");
        });

        this.introScreenObj = introScreen.get();

        engine.context.advancedTexture.addControl(this.introScreenObj);

        const xrManager = new XRChangeManager(engine.context.xr);
        xrManager.inAR = () => {
            introScreen.setScale(3);
        }
        xrManager.onExitAR = () => {
            introScreen.setScale(1);
        }

        xrManager.processCheck();


    }

    async exit() {
        this.introScreenObj.dispose();
    }
}

class OverviewScene extends BaseState {
    constructor() {
        super('Overview');
    }

    async enter(engine, payload) {

        engine.context.topMenu.setVisible(true);
        engine.context.topMenu.setCaption("Sometimes life changes in an instant. A family’s peace can turn into struggle overnight. With protection in place, even in the hardest storms, hope doesn’t have to fade. Insurance helps you stand strong when life brings the unexpected.");
        engine.context.topMenu.disableAdditionalButtons(true);

        engine.context.topMenu.minimizeCaption();

        const xrManager = new XRChangeManager(engine.context.xr);
        const x3dscale = 0.6;
        const arScale = x3dscale / 14;

        // rotation object 90 degrees
        engine.context.mainObject.getRoot().rotationQuaternion = BABYLON.Quaternion.FromEulerAngles(0, -Math.PI / 2, 0);

        xrManager.inAR = () => {
            engine.context.isARPlaced = true;

            engine.context.topMenu.setScale(3);

            const object = engine.context.mainObject;

            engine.context.dot.isVisible = false;

            object.getRoot().parent = engine.context.root;
            object.setVisible(true);
            object.getRoot().position.set(0, 0, 0);

            //object.setScaling(1);
            engine.context.root.scaling = new BABYLON.Vector3(arScale, arScale, arScale);


            // changing topmenu icon
            engine.context.topMenu.arButton.image.source = "https://i.imgur.com/fUOPUfW.png";

        }

        xrManager.in3D = () => {
            engine.context.skybox.isVisible = true;

            // Scaling UI
            engine.context.topMenu.setScale(1);


            const object = engine.context.mainObject;
            object.refresh();
            object.setVisible(true);

            engine.context.root.scaling = new BABYLON.Vector3(x3dscale, x3dscale, x3dscale);
            engine.context.root.position.y = -1.5;

            // changing topmenu icon
            engine.context.topMenu.arButton.image.source = "https://i.imgur.com/ugjxybx.png";

        }

        xrManager.onExitAR = () => {
            engine.context.isARPlaced = false;
        }


        xrManager.processCheck();


    }

    async exit(engine) {
        engine.context.topMenu.setVisible(false);
        engine.context.topMenu.minimizeCaption();
        engine.context.mainObject.setVisible(false);

        // Disabling the additonal options.
        engine.context.topMenu.disableAdditionalButtons(true);
        engine.context.mainObject.refresh();
    }
}

class Slide1Scene extends BaseState {
    constructor() {
        super("Slide1");
    }

    async enter(engine) {
        engine.context.topMenu.setVisible(true);
        engine.context.topMenu.minimizeCaption(true);

        const xrManager = new XRChangeManager(engine.context.xr);
        const x3dscale = 0.6;
        const arScale = x3dscale / 14;

        // rotation object 90 degrees
        engine.context.mainObject2.getRoot().rotationQuaternion = BABYLON.Quaternion.FromEulerAngles(0, -Math.PI / 2, 0);


        xrManager.inAR = () => {
            engine.context.isARPlaced = true;


            const object = engine.context.mainObject2;

            object.getRoot().parent = engine.context.root;
            object.setVisible(true);
            object.getRoot().position.set(0, 0, 0);

            engine.context.root.scaling = new BABYLON.Vector3(arScale, arScale, arScale);


        }

        xrManager.in3D = () => {
            engine.context.skybox.isVisible = true;


            const object = engine.context.mainObject2;
            object.setVisible(true);

            engine.context.root.scaling = new BABYLON.Vector3(x3dscale, x3dscale, x3dscale);
            engine.context.root.position.y = -1.5;

        }

        xrManager.onExitAR = () => {
            engine.context.isARPlaced = false;
        }


        xrManager.processCheck();

        

    }

    async exit(engine) {
        //this._arrowRoot.dispose();

        engine.context.topMenu.setVisible(false);
        engine.context.topMenu.minimizeCaption();
        engine.context.mainObject2.setVisible(false);

        // Disabling the additonal options.
        engine.context.topMenu.disableAdditionalButtons(true);

    }

}

class Slide2Scene extends BaseState {
    constructor() {
        super("Slide2");
    }

    async enter(engine) {
        
        engine.context.topMenu.setVisible(false);

        const xrManager = new XRChangeManager(engine.context.xr);
        const x3dscale = 0.6;
        const arScale = x3dscale / 14;

        // rotation object 90 degrees
        
        

        let data = {
            question: "What is Sanlam's motto and promise?",
            correct: "Live with confidence" ,
            wrong: [
                "Keeping moving forward",
                "Stay covered and Live free"
            ]
        };

        engine.context.mainObject3.getRoot().rotationQuaternion = BABYLON.Quaternion.FromEulerAngles(0, Math.PI / 2, 0);

        const quiz = new QuizPanel(engine.context.scene, data);
        this.quiz = quiz;
        quiz.getRoot().parent = engine.context.mainObject3.getRoot();
        quiz.getRoot().rotation.y = Math.PI;

        quiz.setNextButton(() => {
            const current = engine.current?.name;
            const stateNames = Array.from(engine.states.keys());
            let index = stateNames.indexOf(current);
            if (index >= 0 && index < stateNames.length - 1) {
                engine.goTo(stateNames[index + 1]);
            }
        });

        xrManager.inAR = () => {
            engine.context.isARPlaced = true;


            const object = engine.context.mainObject3;

            object.getRoot().parent = engine.context.root;
            object.setVisible(true);
            object.getRoot().position.set(0, 0, 0);

            engine.context.root.scaling = new BABYLON.Vector3(arScale, arScale, arScale);

            // setting quiz scale
            quiz.setScale(1.5 / 14);


        }

        xrManager.in3D = () => {
            engine.context.skybox.isVisible = true;


            const object = engine.context.mainObject3;
            object.setVisible(true);

            engine.context.root.scaling = new BABYLON.Vector3(x3dscale, x3dscale, x3dscale);
            engine.context.root.position.y = -1.5;

            // setting quiz scale
            quiz.setScale(1.5);

        }

        xrManager.onExitAR = () => {
            engine.context.isARPlaced = false;
        }


        xrManager.processCheck();

    }

    async exit(engine) {
        engine.context.topMenu.setVisible(false);
        engine.context.topMenu.minimizeCaption();
        engine.context.mainObject3.setVisible(false);

        // Disabling the additonal options.
        engine.context.topMenu.disableAdditionalButtons(true);
        this.quiz.getRoot().dispose();
    }
}

class Slide3Scene extends BaseState {
    constructor() {
        super("Slide4");
    }

    async enter(engine) {
        
        engine.context.topMenu.setVisible(false);

        const xrManager = new XRChangeManager(engine.context.xr);
        const x3dscale = 0.6;
        const arScale = x3dscale / 14;

        // rotation object 90 degrees
        engine.context.mainObject3.getRoot().rotationQuaternion = BABYLON.Quaternion.FromEulerAngles(0, -Math.PI / 2, 0);

        let data = {
            question: "What else does Sanlam offer?",
            correct: "All of the mentioned" ,
            wrong: [
                "Personal Loans and Retirement Annuity",
                "Tax-free savings and Unit Trusts"
            ]
        };

        const quiz = new QuizPanel(engine.context.scene, data);
        this.quiz = quiz;
        quiz.getRoot().parent = engine.context.mainObject3.getRoot();

        engine.context.mainObject3.getRoot().rotationQuaternion = BABYLON.Quaternion.FromEulerAngles(0, Math.PI / 2, 0);
        quiz.getRoot().rotation.y = Math.PI;


        quiz.setNextButton(() => {
            const current = engine.current?.name;
            const stateNames = Array.from(engine.states.keys());
            let index = stateNames.indexOf(current);
            if (index >= 0 && index < stateNames.length - 1) {
                engine.goTo(stateNames[index + 1]);
            }
        });

        xrManager.inAR = () => {
            engine.context.isARPlaced = true;


            const object = engine.context.mainObject3;

            object.getRoot().parent = engine.context.root;
            object.setVisible(true);
            object.getRoot().position.set(0, 0, 0);

            engine.context.root.scaling = new BABYLON.Vector3(arScale, arScale, arScale);

            // setting quiz scale
            quiz.setScale(1.5 / 14);


        }

        xrManager.in3D = () => {
            engine.context.skybox.isVisible = true;


            const object = engine.context.mainObject3;
            object.setVisible(true);

            engine.context.root.scaling = new BABYLON.Vector3(x3dscale, x3dscale, x3dscale);
            engine.context.root.position.y = -1.5;

            // setting quiz scale
            quiz.setScale(1.5);

        }

        xrManager.onExitAR = () => {
            engine.context.isARPlaced = false;
        }


        xrManager.processCheck();

    }

    async exit(engine) {
        engine.context.topMenu.setVisible(false);
        engine.context.topMenu.minimizeCaption();
        engine.context.mainObject3.setVisible(false);

        // Disabling the additonal options.
        engine.context.topMenu.disableAdditionalButtons(true);
        this.quiz.getRoot().dispose();
    }
}

class Slide4Scene extends BaseState {
    constructor() {
        super("Slide5");
    }

    async enter(engine) {
        
        engine.context.topMenu.setVisible(false);

        const xrManager = new XRChangeManager(engine.context.xr);
        const x3dscale = 0.6;
        const arScale = x3dscale / 14;

        // rotation object 90 degrees
        //engine.context.mainObject3.getRoot().rotationQuaternion = BABYLON.Quaternion.FromEulerAngles(0, -Math.PI / 2, 0);

        let data = {
            question: "With Sanlam what can you expect?",
            correct: "Affordable Rate and Trusted Advisors" ,
            wrong: [
                "Limited Protection and Coverage",
                "Long waits for service and payouts"
            ]
        };

        const quiz = new QuizPanel(engine.context.scene, data);
        this.quiz = quiz;
        quiz.getRoot().parent = engine.context.mainObject3.getRoot();
        
        engine.context.mainObject3.getRoot().rotationQuaternion = BABYLON.Quaternion.FromEulerAngles(0, Math.PI / 2, 0);
        quiz.getRoot().rotation.y = Math.PI;

        quiz.setNextButton(() => {
            const current = engine.current?.name;
            const stateNames = Array.from(engine.states.keys());
            let index = stateNames.indexOf(current);
            if (index >= 0 && index < stateNames.length - 1) {
                engine.goTo(stateNames[index + 1]);
            }
        });

        xrManager.inAR = () => {
            engine.context.isARPlaced = true;


            const object = engine.context.mainObject3;

            object.getRoot().parent = engine.context.root;
            object.setVisible(true);
            object.getRoot().position.set(0, 0, 0);

            engine.context.root.scaling = new BABYLON.Vector3(arScale, arScale, arScale);

            // setting quiz scale
            quiz.setScale(1.5 / 14);


        }

        xrManager.in3D = () => {
            engine.context.skybox.isVisible = true;


            const object = engine.context.mainObject3;
            object.setVisible(true);

            engine.context.root.scaling = new BABYLON.Vector3(x3dscale, x3dscale, x3dscale);
            engine.context.root.position.y = -1.5;

            // setting quiz scale
            quiz.setScale(1.5);

        }

        xrManager.onExitAR = () => {
            engine.context.isARPlaced = false;
        }


        xrManager.processCheck();

    }

    async exit(engine) {
        engine.context.topMenu.setVisible(false);
        engine.context.topMenu.minimizeCaption();
        engine.context.mainObject3.setVisible(false);

        // Disabling the additonal options.
        engine.context.topMenu.disableAdditionalButtons(true);
        this.quiz.getRoot().dispose();
    }
}

class Slide5Scene extends BaseState {
    constructor() {
        super("Slide5");
    }

    async enter(engine) {
        engine.context.mainObject.setVisible(true);

        engine.context.mainObject.highlightMesh("Object_183", true);

        engine.context.mainObject.playAnimation("hover");

        const quiz = new QuizPanel(engine.context.scene, {
            question: "Which helps a drone's camera capture smooth images and videos from the air?",
            options: [
                { text: "A. Gimbal", correct: true },
                { text: "B. Propeller" },
                { text: "C. Battery" },
                { text: "D. Storage" }
            ],
            onProceed: () => engine.goTo("Conclusion"),
            onRetry: () => console.log("Retry question...")
        });

        this.quizRoot = quiz.getRoot();
        const quizRoot = this.quizRoot;
        quizRoot.parent = engine.context.root;
        quiz.setScale(0.08);
        quizRoot.billboardMode = BABYLON.Mesh.BILLBOARDMODE_Y;

        quizRoot.position.y = -0.19;

    }

    async exit(engine) {
        engine.context.topMenu.setVisible(false);
        engine.context.topMenu.minimizeCaption();
        engine.context.mainObject.setVisible(false);

        // Disabling the additonal options.
        engine.context.topMenu.disableAdditionalButtons(true);
        engine.context.mainObject.refresh();
        engine.context.mainObject.resetHighlight();

        this.quizRoot.dispose();
    }
}



class ArIntroScene extends BaseState {
    constructor() {
        super('ArIntroduction')
    }

    async enter(engine) {
        engine.context.skybox.isVisible = false;

        engine.context.dot.isVisible = true;
        engine.context.hitTest.onHitTestResultObservable.add((results) => {
            if (engine.context.isARPlaced == false) {
                if (results.length) {
                    engine.context.dot.isVisible = true;
                    results[0].transformationMatrix.decompose(engine.context.dot.scaling, engine.context.dot.rotationQuaternion, engine.context.dot.position);
                    results[0].transformationMatrix.decompose(undefined, engine.context.root.rotationQuaternion, engine.context.root.position);
                } else {
                    engine.context.dot.isVisible = false;
                }
            }
        });

    }

    async exit(engine) {

    }

}


class ConcludeScene extends BaseState {
    constructor() {
        super('Conclusion');
        this.rootLayout = null;
    }

    async enter(engine) {
        const endScreen = new DialogScreen("assets/media/overview-image.png", "Sanlam", "Congratulations! You've completed the Sanlam Funeral Cover Story.", "END EXPERIENCE");

        endScreen.attachEvent(() => {
            window.location.href = window.location.href;
        });

        this.endScreenObj = endScreen.get();

        engine.context.advancedTexture.addControl(this.endScreenObj);

        const xrManager = new XRChangeManager(engine.context.xr);
        xrManager.inAR = () => {
            endScreen.setScale(3);
        }
        xrManager.onExitAR = () => {
            endScreen.setScale(1);
        }

        xrManager.processCheck();

    }

    async exit() {
        this.endScreenObj.dispose();
    }
}



var createScene = async function () {
    var scene = new BABYLON.Scene(engine);
    scene.clearColor = new BABYLON.Color3(1, 1, 1);

    const hdrTexture = new BABYLON.HDRCubeTexture("https://raw.githubusercontent.com/jilan-nudle/JilansGlbArchive/main/qwantani_dusk_2_puresky_2k.hdr", scene, 128);

    // Create a big cube
    const skybox = BABYLON.MeshBuilder.CreateBox("skyBox", { size: 1000 }, scene);

    // Create material
    const skyboxMaterial = new BABYLON.PBRMaterial("skyBoxMat", scene);
    skyboxMaterial.backFaceCulling = false;
    skyboxMaterial.reflectionTexture = hdrTexture;
    skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
    skyboxMaterial.microSurface = 1.0;
    skyboxMaterial.disableLighting = true;
    skyboxMaterial.albedoColor = new BABYLON.Color3(0.1, 0.1, 0.1); // dark tint
    skyboxMaterial.reflectivityColor = new BABYLON.Color3(0.1, 0.1, 0.1);

    // Apply material
    skybox.material = skyboxMaterial;

    var camera = new BABYLON.ArcRotateCamera("camera1", 0, Math.PI / 2, 7, BABYLON.Vector3.Zero(), scene);
    camera.setTarget(BABYLON.Vector3.Zero());
    camera.attachControl(canvas, true);

    var light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);
    light.intensity = 3;

    const xrButton = document.querySelector(".xr-button-overlay");
    if (xrButton)
        xrButton.style.position = "";


    // GLOBAL VALUES


    // GLOBAL COMPONENTS
    const ADVANCEDTEXTURE = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI", true, scene);

    const XR = await scene.createDefaultXRExperienceAsync({
        // ask for an ar-session
        uiOptions: {
            sessionMode: "immersive-ar",
            disableDefaultUI: true,
        },
    });


    const ROOT = new BABYLON.TransformNode("ParentNode", scene);

    const TOPMENU = new TopMenu(ADVANCEDTEXTURE);
    TOPMENU.setVisible(false);
    TOPMENU.disableAdditionalButtons(true);


    const MAINOBJECT = new SceneObject("https://raw.githubusercontent.com/jilan-nudle/JilansGlbArchive/main/SanlamScene4_new.compressed.glb", scene);
    await MAINOBJECT.loadObject();
    MAINOBJECT.setVisible(false);
    MAINOBJECT.setParent(ROOT);

    const MAINOBJECT2 = new SceneObject("https://raw.githubusercontent.com/jilan-nudle/JilansGlbArchive/main/SanlamScene5.glb", scene);
    await MAINOBJECT2.loadObject();
    MAINOBJECT2.setVisible(false);
    MAINOBJECT2.setParent(ROOT);

    const MAINOBJECT3 = new SceneObject("https://raw.githubusercontent.com/jilan-nudle/JilansGlbArchive/main/SanlamScene6_new.glb", scene);
    await MAINOBJECT3.loadObject();
    MAINOBJECT3.setVisible(false);
    MAINOBJECT3.setParent(ROOT);

    MAINOBJECT3.getRoot().scaling = new BABYLON.Vector3(1.5, 1.5, 1.5);
    MAINOBJECT3.getRoot().rotationQuaternion = BABYLON.Quaternion.FromEulerAngles(0, Math.PI / 2, 0);


    // attaching virtual shadow
    const SHADOW = new BlobShadow(scene, { radius: 1, opacity: 0 });
    SHADOW.attachTo(MAINOBJECT.getRoot());

    MAINOBJECT.refresh = () => {
        // do nothing....

    }

    // Setting additonal button functions
    TOPMENU.animateButton.onPointerUpObservable.add(() => {
        MAINOBJECT.refresh()
        MAINOBJECT.playAnimation("hover");
    });

    TOPMENU.explodeButton.onPointerUpObservable.add(() => {
        MAINOBJECT.playAnimation("exploded_view");
    });

    // Defining pointer in main scene
    //const DOT = BABYLON.SphereBuilder.CreateSphere("dot",{diameter: 0.1,},scene);
    const DOT = BABYLON.MeshBuilder.CreateTorus('marker', { diameter: 0.15, thickness: 0.05, tessellation: 32 });
    DOT.isVisible = false;
    scene.onPointerObservable.add((pointerInfo) => {
        if (pointerInfo.type === BABYLON.PointerEventTypes.POINTERPICK) {
            const { hit, pickedMesh } = pointerInfo.pickInfo;
            if (hit && pickedMesh === DOT) {
                MANAGER.goTo("Overview");
            }
        }
    });

    const FEATUREMANAGER = XR.baseExperience.featuresManager;
    const HITTEST = FEATUREMANAGER.enableFeature(BABYLON.WebXRHitTest, "latest");



    // =======
    const MANAGER = new FlowEngine({
        states: [new IntroScene(), new OverviewScene(), new Slide1Scene(), new Slide2Scene(), new Slide3Scene(), new Slide4Scene(), new ConcludeScene(), new ArIntroScene()],
        initial: 'Introduction',
        context: {
            advancedTexture: ADVANCEDTEXTURE, topMenu: TOPMENU, xr: XR, babylonEngine: engine,
            root: ROOT, scene: scene, mainObject: MAINOBJECT, dot: DOT, shadow: SHADOW,
            skybox: skybox, featureManager: FEATUREMANAGER, hitTest: HITTEST, isARPlaced: false,
            uiScale: 1, mainObject2: MAINOBJECT2, mainObject3: MAINOBJECT3, camera: camera,
        }
    });


    TOPMENU.arButton.onPointerUpObservable.add(() => {
        if (XR.baseExperience.state === BABYLON.WebXRState.IN_XR) {
            XR.baseExperience.exitXRAsync();
        } else if (XR.baseExperience.state === BABYLON.WebXRState.NOT_IN_XR) {
            XR.baseExperience.enterXRAsync("immersive-ar", "local-floor");
        }
    });




    TOPMENU.nextButton.onPointerUpObservable.add(() => {
        const current = MANAGER.current?.name;
        const stateNames = Array.from(MANAGER.states.keys());
        let index = stateNames.indexOf(current);
        if (index >= 0 && index < stateNames.length - 1) {
            MANAGER.goTo(stateNames[index + 1]);
        }
    });

    TOPMENU.prevButton.onPointerUpObservable.add(() => {
        const current = MANAGER.current?.name;
        const stateNames = Array.from(MANAGER.states.keys());
        let index = stateNames.indexOf(current);
        if (index >= 1 && index < stateNames.length) {
            MANAGER.goTo(stateNames[index - 1]);
        }

    });


    // Handling XR changes
    XR.baseExperience.onStateChangedObservable.add((state) => {
        if (state === BABYLON.WebXRState.IN_XR) {
            MANAGER.goTo("ArIntroduction"); // restarting scene
        } else if (state === BABYLON.WebXRState.NOT_IN_XR) {
            MANAGER.goTo("Overview"); // restarting scene
        }
    });


    // MAIN
    await MANAGER.start();



    return scene;
};

window.initFunction = async function () {


    var asyncEngineCreation = async function () {
        try {
            return createDefaultEngine();
        } catch (e) {
            console.log("the available createEngine function failed. Creating the default engine instead");
            return createDefaultEngine();
        }
    }


    // Fixing JS module glitch.
    engine = await asyncEngineCreation();
    window.engine = window;

    const engineOptions = window.engine.getCreationOptions?.();
    if (!engineOptions || engineOptions.audioEngine !== false) {

    }
    if (!engine) throw 'engine should not be null.';
    startRenderLoop(engine, canvas);

    // Fixing JS module glitch.
    scene = createScene();
    window.scene = scene;
};
initFunction().then(() => {
    scene.then(returnedScene => { sceneToRender = returnedScene; });

});

// Resize
window.addEventListener("resize", function () {
    engine.resize();
});