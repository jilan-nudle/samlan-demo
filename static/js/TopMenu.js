const getStylizedButton = (image, SCALE = 1) => {
    const button = BABYLON.GUI.Button.CreateImageOnlyButton("stylized_button", image);
    button.height = (35 * SCALE) + "px";
    button.width = (35 * SCALE) + "px";;
    button.background = "rgb(26,27,25)";
    button.cornerRadius = 15 * SCALE;
    button.thickness = 0;
    button.alpha = 0.6

    button.image.height = (20 * SCALE) + "px";
    button.image.width = (20 * SCALE) + "px";
    button.image.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
    button.image.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_CENTER;

    return button;
}


export default class TopMenu {
    constructor(advancedTexture, SCALE = 1) {
        this.scale = SCALE;

        this.rootLayout = new BABYLON.GUI.StackPanel();
        this.rootLayout.isVertical = true;
        this.rootLayout.height = "100%";
        this.rootLayout.width = (500 * this.scale) + "px";
        this.rootLayout.spacing = 10 * this.scale;
        this.rootLayout.paddingLeft = "20px";
        this.rootLayout.paddingTop = (20 * this.scale) + "px";
        this.rootLayout.zIndex = 2;

        this.additionalOptions = [];

        this.caption = "";
        this.captionTextBlock = new BABYLON.GUI.TextBlock();
        this.captionTextBlock.fontFamily = "Poppins-Regular";
        console.log(this.captionTextBlock.fontFamily);

        // Positining root layout
        this.rootLayout.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
        this.rootLayout.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;

        this.exitButton = getStylizedButton("https://i.imgur.com/EBbcSLQ.png");
        this.exitButton.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
        this.rootLayout.addControl(this.exitButton);


        this.captionButton = getStylizedButton("https://i.imgur.com/78r87oh.png", this.scale);
        this.captionButton.top = "10px";
        this.captionButton.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
        this.rootLayout.addControl(this.captionButton);

        this.captionButtonMax = getStylizedButton("https://i.imgur.com/78r87oh.png", this.scale);
        this.captionButtonMax.top = "10px";
        this.captionButtonMax.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
        this.rootLayout.addControl(this.captionButtonMax);

        this.captionButtonMax.height = (180 * this.scale) + "px";
        this.captionButtonMax.width = (250 * this.scale) + "px";

        this.captionTextBlock.isVisible = true;
        this.captionTextBlock.text = this.caption;
        this.captionTextBlock.color = "white";
        this.captionTextBlock.fontSize = 12 * this.scale;
        this.captionTextBlock.textHorizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
        this.captionTextBlock.textVerticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
        this.captionTextBlock.setPadding((10 * this.scale) + "px");
        this.captionTextBlock.paddingLeft = (35 * this.scale) + "px";
        this.captionTextBlock.textWrapping = true;
        this.captionButtonMax.image.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
        this.captionButtonMax.image.left = (7 * this.scale) + "px";
        this.captionButtonMax.addControl(this.captionTextBlock);
        this.captionButtonMax.isVisible = false;


        this.spacer = new BABYLON.GUI.Rectangle();
        this.spacer.height = (100 * this.scale) + "px";
        this.spacer.width = "2px";
        this.spacer.thickness = 0;
        this.spacer.background = "transparent";
        this.rootLayout.addControl(this.spacer);

        // end

        this.speakButton = getStylizedButton("https://i.imgur.com/X113xhR.png", this.scale);
        this.speakButton.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
        this.rootLayout.addControl(this.speakButton);

        this.aiButton = getStylizedButton("https://i.imgur.com/esgvxb2.png", this.scale);
        this.aiButton.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
        this.rootLayout.addControl(this.aiButton);

        this.arButton = getStylizedButton("https://i.imgur.com/ugjxybx.png", this.scale);
        this.arButton.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
        this.rootLayout.addControl(this.arButton);

        this.moreButton = getStylizedButton("https://i.imgur.com/6Tlxd4e.png", this.scale);
        this.moreButton.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
        this.rootLayout.addControl(this.moreButton);

        // Additional buttons
        this.explodeButton = getStylizedButton("https://i.imgur.com/GhjRsVM.png", this.scale);
        this.explodeButton.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
        this.rootLayout.addControl(this.explodeButton);
        this.additionalOptions.push(this.explodeButton);

        this.animateButton = getStylizedButton("https://i.imgur.com/FZ9gxQb.png", this.scale);
        this.animateButton.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
        this.rootLayout.addControl(this.animateButton);
        this.additionalOptions.push(this.animateButton);


        // Navigation buttons
        this.prevButton = getStylizedButton("https://i.imgur.com/kZYL57d.png");
        this.nextButton = getStylizedButton("https://i.imgur.com/Cg6HEBC.png");

        // adding the buttons
        this.navBtnLayout = new BABYLON.GUI.StackPanel();
        this.navBtnLayout.isVertical = false;
        this.navBtnLayout.width = "100%";
        this.navBtnLayout.height = (100 * this.scale) + "px";
        this.navBtnLayout.spacing = 15 * this.scale;
        this.navBtnLayout.top = "25%";

        this.navWrapper = new BABYLON.GUI.Rectangle();
        this.navWrapper.width = (100 * this.scale) + "px";
        this.navWrapper.height = "100%";
        this.navWrapper.thickness = 0;
        this.navWrapper.zIndex = 10;
        this.navWrapper.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;

        this.navWrapper.addControl(this.navBtnLayout);
        advancedTexture.addControl(this.navWrapper);


        this.prevButton.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
        this.navBtnLayout.addControl(this.prevButton);


        this.nextButton.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
        this.navBtnLayout.addControl(this.nextButton);



        // Adding toggle events on captionButton.
        this.captionButton.onPointerUpObservable.add(() => {
            this.maximizeCaption();
        });

        this.captionButtonMax.onPointerUpObservable.add(() => {
            this.minimizeCaption();
        });

        this.additionalOptions.forEach((button) => {
            button.isVisible = false;
        });

        this.moreButton.onPointerUpObservable.add(() => {
            this.additionalOptions.forEach((button) => {
                button.isVisible = !(button.isVisible);
            });
        });


        this.speakButton.onPointerUpObservable.add(() => {
            this.speak();
        });

        advancedTexture.addControl(this.rootLayout);

    }

    disableAdditionalButtons(disable) {
        this.additionalOptions.forEach((button) => {
            button.isEnabled = !disable;
        });
    }

    setVisible(isVisible) {
        if (isVisible) {
            this.rootLayout.isVisible = true;
            this.navWrapper.isVisible = true;
        } else {
            this.rootLayout.isVisible = false;
            this.navWrapper.isVisible = false;
        }

    }

    setCaption(caption) {
        // removing exisiting component
        this.captionButtonMax.removeControl(this.captionTextBlock);

        this.captionTextBlock = new BABYLON.GUI.TextBlock();
        this.captionTextBlock.fontFamily = "Poppins-Regular";


        this.caption = caption;
        this.captionTextBlock.text = this.caption;

        this.captionTextBlock.isVisible = true;
        this.captionTextBlock.text = this.caption;
        this.captionTextBlock.color = "white";
        this.captionTextBlock.fontSize = 12 * this.scale;
        this.captionTextBlock.textHorizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
        this.captionTextBlock.textVerticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_CENTER;
        this.captionTextBlock.setPadding((10 * this.scale) + "px");
        this.captionTextBlock.paddingLeft = (35 * this.scale) + "px";
        this.captionTextBlock.textWrapping = true;

        this.captionButtonMax.addControl(this.captionTextBlock);

    }

    maximizeCaption() {
        this.captionButtonMax.isVisible = true;
        this.captionButton.isVisible = false;

        this.spacer.height = (100 * this.scale) + "px";

    }

    minimizeCaption() {
        this.captionButtonMax.isVisible = false;
        this.captionButton.isVisible = true;

        const spacerHeight = 100 * this.scale;
        const captionMinHeight = parseInt(this.captionButton.height);
        const captionMaxHeight = parseInt(this.captionButtonMax.height);

        this.spacer.height = spacerHeight + (captionMaxHeight - captionMinHeight) + "px";

    }

    setScale(newScale) {
        this.scale = newScale;

        // Update root layout
        this.rootLayout.width = (500 * this.scale) + "px";
        this.rootLayout.spacing = 10 * this.scale;

        // Rescale all buttons
        [this.exitButton,
        this.captionButton,
        this.aiButton,
        this.arButton,
        this.moreButton,
        this.explodeButton,
        this.animateButton,
        this.captionButtonMax,
        this.prevButton,
        this.nextButton,
        this.speakButton
        ].forEach(btn => {
            btn.width = (35 * this.scale) + "px";
            btn.height = (35 * this.scale) + "px";
            btn.cornerRadius = 15 * this.scale;

            if (btn.image) {
                btn.image.width = (20 * this.scale) + "px";
                btn.image.height = (20 * this.scale) + "px";
            }
        });

        this.spacer.height = (100 * this.scale) + "px";
        //this.rootLayout.paddingTop = (20 * this.scale) + "px";

        this.captionTextBlock.fontSize = 12 * this.scale;
        this.captionTextBlock.setPadding((10 * this.scale) + "px");
        this.captionTextBlock.paddingLeft = (35 * this.scale) + "px";
        this.captionButtonMax.image.left = (7 * this.scale) + "px";
        this.captionButtonMax.height = (180 * this.scale) + "px";
        this.captionButtonMax.width = (250 * this.scale) + "px";

        this.navBtnLayout.height = (100 * this.scale) + "px";
        this.navBtnLayout.spacing = 15 * this.scale;

        this.navWrapper.width = (100 * this.scale) + "px";
    }

    speak(){
        const text = this.caption;
        window.speechSynthesis.cancel();
        // Create a new speech object
        const utterance = new SpeechSynthesisUtterance(text);

        // Optional settings
        utterance.lang = "en-US";     // language/voice locale
        utterance.rate = 1;           // speed (0.1 – 10)
        utterance.pitch = 1;          // pitch (0 – 2)
        utterance.volume = 1;         // volume (0 – 1)

        // Speak it
        window.speechSynthesis.speak(utterance);
    }


}