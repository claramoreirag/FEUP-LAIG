/**
* MyInterface class, creating a GUI interface.
*/
class MyInterface extends CGFinterface {
    /**
     * @constructor
     */
    constructor() {
        super();
    }

    /**
     * Initializes the interface.
     * @param {CGFapplication} application
     */
    init(application) {
        super.init(application);
        // init GUI. For more information on the methods, check:
        //  http://workshop.chromeexperiments.com/examples/gui

        this.gui = new dat.GUI();

        // add a group of controls (and open/expand by defult)

        this.initKeys();
       
       
        return true;
    }

    /**
     * initKeys
     */
    initKeys() {
        this.scene.gui=this;
        this.processKeyboard=function(){};
        this.activeKeys={};
    }

    processKeyDown(event) {
        this.activeKeys[event.code]=true;
    };

    processKeyUp(event) {
        this.activeKeys[event.code]=false;
    };

    isKeyPressed(keyCode) {
        return this.activeKeys[keyCode] || false;
    }



    addLightsFolder() {
    
        var folder = this.gui.addFolder("Lights");

        for(let key in this.scene.graph.lights){
            folder.add(this.scene.graph.lights[key], "0").name(key);
        }
    }

    addCamerasFolder(cameras){
        var camerasFolder = this.gui.addFolder("Cameras");

        this.gui.add(this.scene, 'selectedCamera', cameras).name('Selected Camera').onChange(this.scene.updateCameras.bind(this.scene));
    
    }
}