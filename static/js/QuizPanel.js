/*export default class QuizPanel {
    constructor(scene, config) {
        this.scene = scene;
        this.config = config;

        // Create plane for the quiz
        this.plane = BABYLON.MeshBuilder.CreatePlane("quizPlane", { size: 7 }, scene);
        this.ui = BABYLON.GUI.AdvancedDynamicTexture.CreateForMesh(this.plane);

        this._buildUI();
    }

    _buildUI() {
        const { question, options, onProceed, onRetry } = this.config;

        // Root container
        this.root = new BABYLON.GUI.StackPanel();
        const root = this.root;
        root.width = "100%";
        root.height = "100%";
        root.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
        root.spacing = 30;
        this.ui.addControl(root);

        // Status area
        const statusBox = new BABYLON.GUI.Rectangle();
        statusBox.width = "100%";
        statusBox.height = "50px";
        statusBox.thickness = 0;
        statusBox.background = "";
        statusBox.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
        root.addControl(statusBox);

        this.questionStatus = new BABYLON.GUI.TextBlock();
        this.questionStatus.text = "";
        this.questionStatus.color = "white";
        this.questionStatus.fontSize = 30;
        statusBox.addControl(this.questionStatus);

        // Question box
        const questionBox = new BABYLON.GUI.Rectangle();
        questionBox.width = "80%";
        questionBox.height = "120px";
        questionBox.cornerRadius = 20;
        questionBox.color = "white";
        questionBox.thickness = 3;
        questionBox.background = "rgba(30,30,30,0.85)";
        root.addControl(questionBox);

        this.questionText = new BABYLON.GUI.TextBlock();
        this.questionText.text = question;
        this.questionText.color = "white";
        this.questionText.fontSize = 28;
        this.questionText.fontWeight = "bold";
        this.questionText.textWrapping = true;
        this.questionText.textHorizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
        this.questionText.textVerticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_CENTER;
        questionBox.addControl(this.questionText);

        // Options grid
        const grid = new BABYLON.GUI.Grid();
        grid.width = "80%";
        grid.height = "300px";
        grid.addColumnDefinition(0.5);
        grid.addColumnDefinition(0.5);
        grid.addRowDefinition(0.5);
        grid.addRowDefinition(0.5);
        root.addControl(grid);

        // Helper: option button
        const createOption = (text, correct = false) => {
            const button = BABYLON.GUI.Button.CreateSimpleButton("opt", text);
            button.width = "90%";
            button.height = "90%";
            button.color = "white";
            button.fontSize = 22;
            button.fontWeight = "bold";
            button.cornerRadius = 15;
            button.thickness = 2;
            button.background = "rgba(30,30,30,0.85)";
            button.hoverCursor = "pointer";

            button.onPointerEnterObservable.add(() => {
                button.background = "rgba(25,25,25,0.85)";
                button.scaleX = 1.05;
                button.scaleY = 1.05;
            });
            button.onPointerOutObservable.add(() => {
                button.background = "rgba(30,30,30,0.85)";
                button.scaleX = 1.0;
                button.scaleY = 1.0;
            });

            // Handle click
            button.onPointerClickObservable.add(() => {
                if (correct) {
                    this.questionStatus.text = "✅ Correct!";

                    this.bottomPanel.isVisible = true;
                } else {
                    this.questionStatus.text = "❌ Wrong! Try again.";
                }
            });

            return button;
        };

        // Add options to grid
        options.forEach((opt, i) => {
            const row = Math.floor(i / 2);
            const col = i % 2;
            grid.addControl(createOption(opt.text, opt.correct), row, col);
        });

        // Bottom panel
        this.bottomPanel = new BABYLON.GUI.Rectangle();
        this.bottomPanel.width = "100%";
        this.bottomPanel.height = "100px";
        this.bottomPanel.color = "white";
        this.bottomPanel.thickness = 0;

        this.bottomPanel.isVisible = false;
        root.addControl(this.bottomPanel);

        const bottomStack = new BABYLON.GUI.StackPanel();
        bottomStack.isVertical = false;
        bottomStack.spacing = 20;
        bottomStack.height = "100%";
        bottomStack.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
        this.bottomPanel.addControl(bottomStack);

        const createBottomButton = (text, bg, cb) => {
            const btn = BABYLON.GUI.Button.CreateSimpleButton("btn", text);
            btn.width = "150px";
            btn.height = "60px";
            btn.color = "white";
            btn.fontSize = 22;
            btn.cornerRadius = 15;
            btn.thickness = 0;
            btn.background = bg;
            btn.hoverCursor = "pointer";
            btn.onPointerClickObservable.add(cb);
            return btn;
        };

        const proceedBtn = createBottomButton("Proceed", "green", () => {
            this.questionStatus.text = "🚀 Proceeding...";
            if (onProceed) onProceed();
        });
        const retryBtn = createBottomButton("Retry", "red", () => {
            this.questionStatus.text = "🔄 Try again!";
            this.bottomPanel.isVisible = false;
            if (onRetry) onRetry();
        });

        bottomStack.addControl(proceedBtn);
        bottomStack.addControl(retryBtn);
    }

    getRoot() {
        return this.plane;
    }

    setScale(scale) {
        this.plane.scaling = new BABYLON.Vector3(scale, scale, scale);
    }


}*/


class AnswerButton{
    static instances = [];
    
    constructor(text, color = "#1f3b4d"){
        const btn = BABYLON.GUI.Button.CreateSimpleButton("btn", text);
        this.btn = btn;
        btn.width = 1;
        btn.height = "60px";
        btn.color = "white";
        btn.fontSize = 13;
        btn.cornerRadius = 10;
        btn.thickness = 0;
        btn.background = color;
        btn.fontFamily = "Poppins";
        btn.paddingTop = "10px";
        btn.hoverCursor = "pointer";

        AnswerButton.instances.push(this);
    }

    get(){
        return this.btn;
    }

    setBackground(color){
        this.btn.background = color;
    }

    static refresh(){
        AnswerButton.instances.forEach(btn => {
            console.log(AnswerButton.instances);
            btn.setBackground("#1f3b4d");
        });
    }

    setType(type){
        if(type == 0){
            this.btn.onPointerUpObservable.add(() => {
                AnswerButton.refresh();
                this.setBackground("#b00020");

                if(AnswerButton.quiz){
                    AnswerButton.quiz.nextButton.isVisible = false;
                    AnswerButton.quiz.retryButton.isVisible = true;
                }

            });
        }else if(type == 1){
            this.btn.onPointerUpObservable.add(() => {
                AnswerButton.refresh();
                this.setBackground("#4CAF50");

                if(AnswerButton.quiz){
                    AnswerButton.quiz.nextButton.isVisible = true;
                    AnswerButton.quiz.retryButton.isVisible = true;
                }
            });
        }
    }

    setScale(scale){
        this.scale = scale;

        this.btn.height = (60 * this.scale) + "px";
        this.btn.fontSize = 18 * this.scale;
        this.btn.cornerRadius = 10 * this.scale;

    }

    static setQuiz(quiz){
        AnswerButton.quiz = quiz;
    }
}

export default class QuizPanel{
    constructor(scene, data){

        const plane = BABYLON.MeshBuilder.CreatePlane("quizPlane", { width: 10, height: 10}, scene);
        this.plane = plane;
        plane.position = new BABYLON.Vector3(0, 1, 0); 

        const planeUI = BABYLON.GUI.AdvancedDynamicTexture.CreateForMesh(plane);

        const panel = new BABYLON.GUI.StackPanel();
        panel.width = "430px";
        panel.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
        panel.paddingRight = "30px";
        this.panel = panel;
        planeUI.addControl(panel);

        // Question box
        const questionBox = new BABYLON.GUI.Rectangle();
        questionBox.width = 1;
        questionBox.height = "70px";
        questionBox.cornerRadius = 10;
        questionBox.color = "white";
        questionBox.thickness = 0;
        questionBox.background = "#2c93b0";
        this.questionBox = questionBox;
        panel.addControl(questionBox);

        const questionText = new BABYLON.GUI.TextBlock();
        questionText.text = data.question;
        questionText.color = "white";
        questionText.fontSize = 15;
        questionText.fontFamily = "Poppins";
        this.questionText = questionText;
        questionBox.addControl(questionText);

        // Buttons
        const wrongs = [];
        const correct = new AnswerButton(data.correct);
        correct.setType(1);


        data.wrong.forEach(text => {
            let tmp = new AnswerButton(text);
            tmp.setType(0);
            wrongs.push(tmp);
        });


        let allbtns_us = [correct, ...wrongs];
        const allbtns = allbtns_us.sort(() => Math.random() - 0.5);
        allbtns.forEach(btn => {
            panel.addControl(btn.get());
        });

        this.allbtns = allbtns;

        const btnPanel = new BABYLON.GUI.StackPanel();
        btnPanel.isVertical = false; // arrange side-by-side
        btnPanel.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
        btnPanel.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_CENTER;
        btnPanel.height = "70px";
        this.btnPanel = btnPanel;
        panel.addControl(btnPanel);

        // retry button
        const retryButton = BABYLON.GUI.Button.CreateImageOnlyButton("imgBtn", "./assets/media/3dicons-play-front-gradient.png");
        retryButton.width = "50px";
        retryButton.height = "50px";
        retryButton.cornerRadius = 10;
        retryButton.thickness = 0;
        retryButton.hoverCursor = "pointer";
        retryButton.isVisible = false;
        this.retryButton = retryButton;
        btnPanel.addControl(retryButton);
        

        retryButton.onPointerEnterObservable.add(() => {
            retryButton.scaleX = retryButton.scaleX * 1.1;
            retryButton.scaleY = retryButton.scaleY * 1.1;
        });

        retryButton.onPointerOutObservable.add(() => {
            retryButton.scaleX = retryButton.scaleX / 1.1;
            retryButton.scaleY = retryButton.scaleY / 1.1;
        });


        // adding next buttons
        const nextButton = BABYLON.GUI.Button.CreateImageOnlyButton("imgBtn", "./assets/media/3dicons-forward-front-gradient.png");
        nextButton.width = "50px";
        nextButton.height = "50px";
        nextButton.cornerRadius = 10;
        nextButton.thickness = 0;
        nextButton.hoverCursor = "pointer";
        nextButton.isVisible = false;
        this.nextButton = nextButton;
        btnPanel.addControl(nextButton);
        

        nextButton.onPointerEnterObservable.add(() => {
            nextButton.scaleX = nextButton.scaleX * 1.1;
            nextButton.scaleY = nextButton.scaleY * 1.1;
        });

        nextButton.onPointerOutObservable.add(() => {
            nextButton.scaleX = nextButton.scaleX / 1.1;
            nextButton.scaleY = nextButton.scaleY / 1.1;
        });

        // setting retry button function
        this.retryButton.onPointerUpObservable.add(() => {
            AnswerButton.refresh();
        });

        AnswerButton.setQuiz(this);

    }

    getRoot(){
        return this.plane;
    }

    showButtonPanel(isShow){
        if(isShow)
            this.btnPanel.isVisible = true;
        else
            this.btnPanel.isVisible = false;
    }

    setScale(scale){
        this.scale = scale;
        this.plane.scaling = new BABYLON.Vector3(scale, scale, scale);

    }

    setNextButton(func){
        this.nextButton.onPointerUpObservable.add(() => {
            func();
        });  
    }

}
