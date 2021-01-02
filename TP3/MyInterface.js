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
    
        let lightsFolder = this.gui.addFolder("Lights");

        

        for (let key in this.scene.graph.lights) { //key = light name 
            if (this.scene.graph.lights.hasOwnProperty(key)) {
                    this.scene.lightsInterface[key] = this.scene.graph.lights[key][0]; 
                    lightsFolder.add(this.scene.lightsInterface, key);
            }
        }
    }

    addValueToggle(){
      let valueInterface= this.scene.gameOrchestrator.valueInterface;
      let valueFolder = this.gui.addFolder('Value');

      valueFolder.add(valueInterface,'check win');
    }

    addCamerasFolder(){

        for(var key in this.scene.graph.views) {
            this.scene.interfaceViews[key] = key;
        }

        let camerasFolder = this.gui.addFolder("Cameras");

        camerasFolder.add(this.scene, 'selectedCamera', this.scene.interfaceViews).name('Selected Camera').onChange(this.scene.updateCameras.bind(this.scene));
    
    }
}
