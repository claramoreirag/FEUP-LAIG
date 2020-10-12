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
       
        this.addCameras();
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
    
        var lightsFolder = this.gui.addFolder('Lights');
        

        for(let i=0; i<this.scene.graph.numLights;i++)
          lightsFolder.add(this.scene, 'displayLight'+i).name("Display "+i);      
    }

    addCameras(cameras){
       // this.gui.add(this.scene, 'selectedCamera', cameras).name('Selected Camera').onChange(this.scene.updateCamera.bind(this.scene));
      // this.gui.add(this.scene,'selectedCamera',this.scene.textureList).onChange(this.scene.updateTexture.bind(this.scene)).name('Texture');
    }
}