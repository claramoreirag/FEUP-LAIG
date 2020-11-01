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

        this.interface = myinterface;
    }

    /**
     * Initializes the scene, setting some WebGL defaults, initializing the camera and the axis.
     * @param {CGFApplication} application
     */
    init(application) {
        super.init(application);

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

initsceneCameras(){
    this.selectedCamera=this.graph.defaultView;
    this.camera = this.graph.views[this.graph.defaultView];
    this.interface.setActiveCamera(this.camera);
}

    /** Handler called when the graph is finally loaded. 
     * As loading is asynchronous, this may be called already after the application has started the run loop
     */
    onGraphLoaded() {
        this.axis = new CGFaxis(this, this.graph.referenceLength);

        this.gl.clearColor(...this.graph.background);

        this.setGlobalAmbientLight(...this.graph.ambient);
        this.sceneInited = true;
        
        
        this.interface.addCamerasFolder();
        this.interface.addLightsFolder();
        
        this.initLights();
        this.initsceneCameras();
    }

    /**
     * Displays the scene.
     */
    display() {
        // ---- BEGIN Background, camera and axis setup

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
            this.axis.display();
         
            this.defaultAppearance.apply();
            this.updateCameras();
            this.updateLights();


            // Displays the scene (MySceneGraph function).
            this.graph.displayScene();
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
        if(this.tInit == null)
            this.tInit = t;
        
        let instant = (t - this.tInit) / 1000;

        this.updateAnimations(t/1000);
    }

    updateAnimations(t){
        for(let key in this.graph.animations){
            this.graph.animations[key].update(t);
        }
    }

    updateCameras(){
        this.camera = this.graph.views[this.selectedCamera];
        this.interface.setActiveCamera(this.camera);
    }

   
}