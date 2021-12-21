
console.log("IDE_Morph: ", IDE_Morph);


IDE_Morph.prototype.resetCorral = function () {
    var frame, padding = 5, myself = this;

    this.corral.frame.contents.wantsDropOf = false;

    this.corral.setTop(0);
    this.corral.setLeft(0);
    this.corral.setExtent(new Point(
        this.stage.left(),
        100
    ));
};




WorldMorph.prototype.fillContainer = function (clientWidth, clientHeight) {

    let needsFill = false;

    if (this.worldCanvas.width !== clientWidth) {
        console.log("this.worldCanvas.width !== clientWidth", this.worldCanvas.width, clientWidth);
        this.worldCanvas.width = clientWidth;
        this.setWidth(clientWidth);
        needsFill = true;
    }
    if (this.worldCanvas.height !== clientHeight) {
        this.worldCanvas.height = clientHeight;
        this.setHeight(clientHeight);
        needsFill = true;
    }
    return needsFill;
};

WorldMorph.prototype.initLayout = function(width, height) {
    this.worldCanvas.style.position = "absolute";
    this.worldCanvas.style.left = "0px";
    this.worldCanvas.style.right = "0px";
    this.worldCanvas.style.width = "100%";
    this.worldCanvas.style.height = "100%";

    this.fillContainer(width, height);
    this.resize();
}

WorldMorph.prototype.resize = function(width, height) {
    this.children.forEach(child => {
        if (child.reactToWorldResize) {
            child.reactToWorldResize(this.bounds.copy());
        }
    });
}

IDE_Morph.prototype.fixLayout = function() {
    // console.log('ExampleIDE_Morph.prototype.fixLayout');
    let padding = 5;
    let myself = this;
    this.controlBar.fixLayout = function () {
        const unusedButtons = [this.pauseButton, this.steppingSlider,
            this.stageSizeButton, this.appModeButton,
            this.steppingButton, this.settingsButton, this.cloudButton, this.projectButton,
            this.stopButton, this.startButton];
        for (let button of unusedButtons){
            button.hide();
        }
        x = this.right() - padding;
        [this.stopButton, this.startButton].forEach(button => {
                button.setCenter(myself.controlBar.center());
                button.setRight(x);
                x -= button.width();
                x -= padding;
                button.show()
            }
        );
    };
    this.controlBar.refreshResumeSymbol = function (){};
    this.controlBar.updateLabel = function (){};

    this.stage.setScale(1);
    // this.stage.setExtent(new Point(300, 300));
    // const stageLeft =
    this.stage.setLeft(this.world().worldCanvas.clientWidth- 480);
    this.controlBar.setLeft(0);
    this.controlBar.setRight(this.stage.right());
    this.controlBar.fixLayout();
    this.stage.setTop(this.controlBar.bottom());
    this.resetCorral();

    this.spriteEditorGroup.fixLayout(this);
    // var testScroller = new ScrollFrameMorph();
    // testScroller.setLeft(0);
    // testScroller.setTop(0);
    // testScroller.setExtent(new Point(200, 400));
    // ide.add(testScroller)
    // this.spriteEditor.setExtent(new Point(300, 300));
    let needHide = [this.logo, this.categories, this.palette, this.spriteBar,
        this.corralBar,  this.stageHandle, this.paletteHandle];
    for (let ele of needHide){
        ele.hide();
    }

};






