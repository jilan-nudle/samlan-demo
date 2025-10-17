export default class DialogScreen {
    constructor(imageLink, titleText, captionText, buttonText) {
        this.rootLayout = new BABYLON.GUI.StackPanel();
        this.rootLayout.height = "500px"
        this.rootLayout.width = "300px"


        //const panel = new GradientRectangle();
        const panel = new BABYLON.GUI.Rectangle();
        panel.width = "300px";
        panel.height = "350px";
        panel.thickness = 0;
        panel.cornerRadius = "10";
        panel.background = "rgb(26,27,25)";

        this.rootLayout.addControl(panel);

        const layout = new BABYLON.GUI.StackPanel();
        layout.isVertical = true;
        layout.width = "100%";
        layout.height = "100%";
        layout.setPadding("15px");
        panel.addControl(layout);

        const image = new BABYLON.GUI.Image("img", imageLink);
        image.height = "130px";
        image.width = "130px"
        layout.addControl(image);

        // newly added code
        this.image = image;

        const title = new BABYLON.GUI.TextBlock();
        title.text = titleText;
        title.color = "white";
        title.fontSize = 17;
        title.fontFamily = "Poppins";
        title.fontWeight = "bold";
        title.height = "20px";
        layout.addControl(title);

        const caption = new BABYLON.GUI.TextBlock();
        caption.text = captionText;
        caption.fontSize = 13;
        caption.color = "white";
        caption.textHorizontalAlignment = "left";
        caption.fontFamily = "Poppins";
        caption.textWrapping = true;
        caption.height = "200px";
        layout.addControl(caption);

        this.button = BABYLON.GUI.Button.CreateSimpleButton("Button", buttonText);
        this.button.height = "50px";
        this.button.width = 1;
        this.button.color = 'white';
        this.button.thickness = 0;
        this.button.fontSize = 13;
        this.button.background = '#5170ff';
        this.button.cornerRadius = "8";
        this.button.fontWeight = "bold";

        // Adding gap between panel and button
        const buttonContainer = new BABYLON.GUI.Rectangle();
        buttonContainer.height = "60px";
        buttonContainer.addControl(this.button);
        buttonContainer.paddingTop = "10px";
        buttonContainer.thickness = 0;

        this.rootLayout.addControl(buttonContainer);
    }

    get() {
        return this.rootLayout;
    }

    attachEvent(func) {
        this.button.onPointerUpObservable.add(func);
    }

    setScale(scale) {
        this.rootLayout.scaleX = scale;
        this.rootLayout.scaleY = scale;
    }

}
