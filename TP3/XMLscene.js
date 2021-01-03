/**
 * XMLscene class, representing the scene that is to be rendered.
 */
class XMLscene extends CGFscene {
    /**
     * @constructor
     * @param {MyInterface} myinterface 
     */
    constructor(myinterface) {
        super();
        this.hasChangedgraph=false;
        this.interface = myinterface;
    }

    /**
     * Initializes the scene, setting some WebGL defaults, initializing the camera and the axis.
     * @param {CGFApplication} application
     */
    init(application) {
        super.init(application);
        this.gameOrchestrator= new MyGameOrchestrator(this);
        this.sceneInited = false;

       
        this.interfaceViews= new Object();
        this.lightsInterface = {};
        this.initCameras();
        this.selectedCamera=0;
        
        this.enableTextures(true);

        this.gl.clearDepth(100.0);
        this.gl.enable(this.gl.DEPTH_TEST);
        this.gl.enable(this.gl.CULL_FACE);
        this.gl.depthFunc(this.gl.LEQUAL);

        this.axis = new CGFaxis(this);
        this.setUpdatePeriod(100);

        this.loadingProgressObject=new MyRectangle(this, -1, -.1, 1, .1);
        this.loadingProgress=0;

        this.defaultAppearance=new CGFappearance(this);
        this.camerasID = {};
        this.cameras = [];
        this.setPickEnabled(true);

    }

    logPicking() {
		if (this.pickMode == false) {
			if (this.pickResults != null && this.pickResults.length > 0) {
				for (var i = 0; i < this.pickResults.length; i++) {
					var obj = this.pickResults[i][0];
					if (obj) {
						var customId = this.pickResults[i][1];
						console.log("Picked object: " + obj + ", with pick id " + customId);						
					}
				}
				this.pickResults.splice(0, this.pickResults.length);
			}
		}
	}

    
    /**
     * Initializes the scene lights with the values read from the XML file.
     */
    initLights() {
        var i = 0;
        // Lights index.

        // Reads the lights from the scene graph.
        for (var key in this.graph.lights) {
            if (i >= 8)
                break;              // Only eight lights allowed by WebCGF on default shaders.

            if (this.graph.lights.hasOwnProperty(key)) {
                var graphLight = this.graph.lights[key];

                this.lights[i].setPosition(...graphLight[1]);
                this.lights[i].setAmbient(...graphLight[2]);
                this.lights[i].setDiffuse(...graphLight[3]);
                this.lights[i].setSpecular(...graphLight[4]);
        
               // this.lights[i].setSpotCutOff(0);
                this.lights[i].setVisible(false); // disable light geometry
                if (graphLight[i]){
                    this.lights[i].enable();
                    this.lightsInterface[key]=true;
                }
                else{
                    this.lights[i].disable();
                    this.lightsInterface[key]=false;
                }
                this.lights[i].update();
                
                i++;
            }
        }
    }

    initCameras() {
       
        
            this.camera = new CGFcamera(0.8, 0.1, 500, vec3.fromValues(15,15, 15), vec3.fromValues(0, 0, 0));
}



initsceneCameras() {
    var i=0;
    

    // Reads the cameras from the scene graph.
    for (var key in this.gameOrchestrator.graph.views) {
        var view = this.gameOrchestrator.graph.views[key];
        this.cameras[i] = view;
        this.camerasID[key] = i;
        i++;
    }
    this.selectedCamera = this.gameOrchestrator.graph.defaultView;
    this.camera = this.cameras[this.camerasID[this.gameOrchestrator.graph.defaultView]];
    this.interface.setActiveCamera(this.camera);
   
}

getCameraKey(id){
    for(let key in this.camerasID )
        {
            if(this.camerasID[key]==id)return key;
        }
}


    /** Handler called when the graph is finally loaded. 
     * As loading is asynchronous, this may be called already after the application has started the run loop
     */
    onGraphLoaded() {
        this.axis = new CGFaxis(this, this.graph.referenceLength);

        this.gl.clearColor(...this.graph.background);

        this.setGlobalAmbientLight(...this.graph.ambient);
        this.sceneInited = true;
        if(!this.hasChangedgraph){
          this.interface.addCamerasFolder();
          this.interface.addLightsFolder();
          this.interface.addOptionsFolder();
        }
        this.initLights();
        this.initsceneCameras();
        console.log(this.gameOrchestrator);
        if(!this.hasChangedgraph)this.gameOrchestrator.load();
       
    }

    /**
     * Displays the scene.
     */
    display() {
        
        // Clear image and depth buffer everytime we update the scene
        this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

        // Initialize Model-View matrix as identity (no transformation
        this.updateProjectionMatrix();
        this.loadIdentity();

        // Apply transformations corresponding to the camera position relative to the origin
        this.applyViewMatrix();

        this.pushMatrix();

        if (this.sceneInited) {
            // Draw axis
            //this.axis.display();
         
            this.defaultAppearance.apply();
            //this.updateCameras();
            this.updateLights();

            this.gameOrchestrator.display();
         
        }
        else
        {
            // Show some "loading" visuals
            this.defaultAppearance.apply();

            this.rotate(-this.loadingProgress/10.0,0,0,1);
            
            this.loadingProgressObject.display();
            this.loadingProgress++;
        }

        this.popMatrix();
        // ---- END Background, camera and axis setup
    }

    
    updateLights() {
        let i = 0;
        for (let key in this.lightsInterface) {
            if (this.lightsInterface.hasOwnProperty(key)) {
                if (this.lightsInterface[key]) {
                    this.lights[i].enable();
                }
                else {
                    this.lights[i].disable();
                }
                this.lights[i++].update();
            }
        }
    }

    update(t){
        this.gameOrchestrator.update(t);
        this.updateAnimations(t/1000);
    }

    updateAnimations(t){
        for(let key in this.graph.animations){
            this.graph.animations[key].update(t);
        }

        for(let spriteanim of this.graph.spriteAnimations){
            spriteanim.update(t);
        }
    }

    updateCameras(){
        this.camera = this.graph.views[this.selectedCamera];
        this.interface.setActiveCamera(this.camera);
    }
   
}
