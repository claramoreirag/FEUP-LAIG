const DEGREE_TO_RAD = Math.PI / 180;

// Order of the groups in the XML document.
var INITIALS_INDEX = 0;
var VIEWS_INDEX = 1;
var ILLUMINATION_INDEX = 2;
var LIGHTS_INDEX = 3;
var TEXTURES_INDEX = 4;
var MATERIALS_INDEX = 5;
var ANIMATIONS_INDEX=6;
var NODES_INDEX = 7;

/**
 * MySceneGraph class, representing the scene graph.
 */
class MySceneGraph {
    /**
     * Constructor for MySceneGraph class.
     * Initializes necessary variables and starts the XML file reading process.
     * @param {string} filename - File that defines the 3D scene
     * @param {XMLScene} scene
     */
    constructor(filename, scene) {
        this.loadedOk = null;

        // Establish bidirectional references between scene and graph.
        this.scene = scene;
        scene.graph = this;
        
        /** new */
        this.graph = new Graph(scene);
        this.materialList = new Materials();
        this.textureList = new Textures();
        this.materialStack = new Stack();
        this.textureStack = new Stack();

        let clearTextureObject = new Texture("clear"); //clear texture


        /*Definition of error material and texture to use when 
        an object doesn't have a valid material or texture apllied
        */
        let cgfErrorTexture = new CGFappearance(this.scene);
        cgfErrorTexture.loadTexture("./scenes/images/error.png");
        let errorTexture = new Texture("error",cgfErrorTexture); //error texture

        let cgfErrorMaterial = new CGFappearance(this.scene)
        cgfErrorMaterial.setShininess(1);
        cgfErrorMaterial.setAmbient(1,1,1,1);
        cgfErrorMaterial.setDiffuse(1,1,1,1);
        cgfErrorMaterial.setSpecular(1,1,1,1);
        let errorMaterial = new Material("error",cgfErrorMaterial); //error material

        this.materialStack.push(errorMaterial);
        this.textureStack.push(errorTexture);
        this.textureList.addTexture(clearTextureObject);
       

        this.idRoot = null; // The id of the root element.

        this.axisCoords = [];
        this.axisCoords['x'] = [1, 0, 0];
        this.axisCoords['y'] = [0, 1, 0];
        this.axisCoords['z'] = [0, 0, 1];

        // File reading 
        this.reader = new CGFXMLreader();

        /*
         * Read the contents of the xml file, and refer to this class for loading and error handlers.
         * After the file is read, the reader calls onXMLReady on this object.
         * If any error occurs, the reader calls onXMLError on this object, with an error message
         */
        this.reader.open('scenes/' + filename, this);
    }

    /*
     * Callback to be executed after successful reading
     */
    onXMLReady() {
        this.log("XML Loading finished.");
        var rootElement = this.reader.xmlDoc.documentElement;

        // Here should go the calls for different functions to parse the various blocks
        var error = this.parseXMLFile(rootElement);

        if (error != null) {
            this.onXMLError(error);
            return;
        }

        this.loadedOk = true;

        // As the graph loaded ok, signal the scene so that any additional initialization depending on the graph can take place
        this.scene.onGraphLoaded();
    }

    /*
     * Callback to be executed on any read error, showing an error on the console.
     * @param {string} message
     */
    onXMLError(message) {
        console.error("XML Loading Error: " + message);
        this.loadedOk = false;
    }

    /**
     * Callback to be executed on any minor error, showing a warning on the console.
     * @param {string} message
     */
    onXMLMinorError(message) {
        console.warn("Warning: " + message);
    }

    /**
     * Callback to be executed on any message.
     * @param {string} message
     */
    log(message) {
        console.log("   " + message);
    }

    /**
     * Parses the XML file, processing each block.
     * @param {XML root element} rootElement
     */
    parseXMLFile(rootElement) {
        if (rootElement.nodeName != "lsf")
            return "root tag <lsf> missing";

        var nodes = rootElement.children;

        // Reads the names of the nodes to an upiliary buffer.
        var nodeNames = [];

        for (var i = 0; i < nodes.length; i++) {
            nodeNames.push(nodes[i].nodeName);
        }

        var error;

        // Processes each node, verifying errors.

        // <initials>
        var index;
        if ((index = nodeNames.indexOf("initials")) == -1)
            return "tag <initials> missing";
        else {
            if (index != INITIALS_INDEX)
                this.onXMLMinorError("tag <initials> out of order " + index);

            //Parse initials block
            if ((error = this.parseInitials(nodes[index])) != null)
                return error;
        }

        // <views>
        if ((index = nodeNames.indexOf("views")) == -1)
            return "tag <views> missing";
        else {
            if (index != VIEWS_INDEX)
                this.onXMLMinorError("tag <views> out of order");

            //Parse views block
            if ((error = this.parseViews(nodes[index])) != null)
                return error;
        }

        // <illumination>
        if ((index = nodeNames.indexOf("illumination")) == -1)
            return "tag <illumination> missing";
        else {
            if (index != ILLUMINATION_INDEX)
                this.onXMLMinorError("tag <illumination> out of order");

            //Parse illumination block
            if ((error = this.parseIllumination(nodes[index])) != null)
                return error;
        }

        // <lights>
        if ((index = nodeNames.indexOf("lights")) == -1)
            return "tag <lights> missing";
        else {
            if (index != LIGHTS_INDEX)
                this.onXMLMinorError("tag <lights> out of order");

            //Parse lights block
            if ((error = this.parseLights(nodes[index])) != null)
                return error;
        }
        // <textures>
        if ((index = nodeNames.indexOf("textures")) == -1)
            return "tag <textures> missing";
        else {
            if (index != TEXTURES_INDEX)
                this.onXMLMinorError("tag <textures> out of order");

            //Parse textures block
            if ((error = this.parseTextures(nodes[index])) != null)
                return error;
        }

        // <materials>
        if ((index = nodeNames.indexOf("materials")) == -1)
            return "tag <materials> missing";
        else {
            if (index != MATERIALS_INDEX)
                this.onXMLMinorError("tag <materials> out of order");

            //Parse materials block
            if ((error = this.parseMaterials(nodes[index])) != null)
                return error;
        }

        // <animations>
        if ((index = nodeNames.indexOf("animations")) == -1)
           this.onXMLMinorError( "tag <animations> missing");
        else {
        if (index != ANIMATIONS_INDEX)
            this.onXMLMinorError("tag <animations> out of order");

        //Parse animations block
        if ((error = this.parseAnimations(nodes[index])) != null)
            return error;
        }


        // <nodes>
        if ((index = nodeNames.indexOf("nodes")) == -1)
            return "tag <nodes> missing";
        else {
            if (index != NODES_INDEX)
                this.onXMLMinorError("tag <nodes> out of order");

            //Parse nodes block
            if ((error = this.parseNodes(nodes[index])) != null)
                return error;
        }
        this.log("all parsed");
    }

    /**
     * Parses the <initials> block. 
     * @param {initials block element} initialsNode
     */
    parseInitials(initialsNode) {
        var children = initialsNode.children;
        var nodeNames = [];

        for (var i = 0; i < children.length; i++)
            nodeNames.push(children[i].nodeName);

        var rootIndex = nodeNames.indexOf("root");
        var referenceIndex = nodeNames.indexOf("reference");

        // Get root of the scene.
        if(rootIndex == -1)
            return "No root id defined for scene.";

        var rootNode = children[rootIndex];
        var id = this.reader.getString(rootNode, 'id');
        if (id == null)
            return "No root id defined for scene.";

        this.idRoot = id;
      
        var rootNode = new Node(this.idRoot);
        this.graph.addNode(rootNode);

        let error;
        if((error=this.graph.setRootNode(rootNode))!=null)
            this.onXMLError(error);

        // Get axis length        
        if(referenceIndex == -1)
            this.onXMLMinorError("no axis_length defined for scene; assuming 'length = 1'");

        var refNode = children[referenceIndex];
        var axis_length = this.reader.getFloat(refNode, 'length');
        if (axis_length == null)
            this.onXMLMinorError("no axis_length defined for scene; assuming 'length = 1'");

        this.referenceLength = axis_length || 1;

        this.log("Parsed initials");

        return null;
    }

    /**
     * Parses the <views> block.
     * @param {view block element} viewsNode
     */
    parseViews(viewsNode) {

        var children= viewsNode.children;
        var grandChildren = [];

        this.views=[];
        this.numViews=0;

        var nodeNames = [];

        this.defaultView = this.reader.getString(viewsNode, 'default');

        
        for (let i = 0; i < children.length; i++) {

            //views information
            var global = [];
            var attributeNames = [];
            var attributeTypes = [];

            //Check for valid type of view
            if (children[i].nodeName != "perspective" && children[i].nodeName != "ortho") {
                this.onXMLMinorError("unknown tag <" + children[i].nodeName + ">");
                continue;
            }
            else {
                attributeNames.push(...["from", "to"]);
                attributeTypes.push(...["position", "position"]);
            }

            // id of the current view
            var viewID = this.reader.getString(children[i], 'id');
            if (viewID == null) return "no ID defined for view";

            if (this.views[viewID] != null)
                return "ID must be unique for each view (conflict: ID = " + viewID + ")";

    
            grandChildren = children[i].children;
          
            nodeNames = [];
            for (var j = 0; j < grandChildren.length; j++) {
                nodeNames.push(grandChildren[j].nodeName);
            }

            for (var j = 0; j < attributeNames.length; j++) {
                var attributeIndex = nodeNames.indexOf(attributeNames[j]);

                if (attributeIndex != -1) {
                    if (attributeTypes[j] == "position")
                        var pos = this.parseCoordinates3D(grandChildren[attributeIndex], "view position for ID: " + viewID);
                    if (!Array.isArray(pos))
                        return pos;

                    global.push(pos);
                }
                else
                    //if a parameter of the view isn't defined an error 
                    return "view parameter '" + attributeNames[j] + "' undefined for ID = " + viewID;
            }

            
            if (children[i].nodeName == "ortho") {
                var upIndex = nodeNames.indexOf("up");

                //  get param up for ortho.
                var viewUp = [];
                if (upIndex != -1) {
                    var up = this.parseCoordinates3D(grandChildren[upIndex], "up for ortho for ID " + viewID);
                    
                    //check if up is specified, if not use default [0,1,0]
                    if (!Array.isArray(up)) viewUp = [0,1,0];
                    else viewUp = up;
                }
                else viewUp=[0,1,0];
             
                global.push(...[viewUp]);
              
                var camera = new CGFcameraOrtho(this.reader.getFloat(children[i],'left'), this.reader.getFloat(children[i],'right'), this.reader.getFloat(children[i],'bottom'), this.reader.getFloat(children[i],'top'), this.reader.getFloat(children[i],'near'), this.reader.getFloat(children[i],'far'),global[0], global[1], viewUp);
            
            }
            
            else if(children[i].nodeName == "perspective") {
                var camera = new CGFcamera(this.reader.getFloat(children[i],'angle'), this.reader.getFloat(children[i],'near'), this.reader.getFloat(children[i],'far'), global[0], global[1]);
            }
            
            this.views[viewID] = camera;
            this.numViews++;
            
        }

        if (this.numViews == 0)
            return "at least one view must be defined";

        this.log("Parsed views");
        
        return null;
    }

    /**
     * Parses the <illumination> node.
     * @param {illumination block element} illuminationsNode
     */
    parseIllumination(illuminationsNode) {

        var children = illuminationsNode.children;

        this.ambient = [];
        this.background = [];

        var nodeNames = [];

        for (var i = 0; i < children.length; i++)
            nodeNames.push(children[i].nodeName);

        var ambientIndex = nodeNames.indexOf("ambient");
        var backgroundIndex = nodeNames.indexOf("background");

        var color = this.parseColor(children[ambientIndex], "ambient");
        if (!Array.isArray(color))
            return color;
        else
            this.ambient = color;

        color = this.parseColor(children[backgroundIndex], "background");
        if (!Array.isArray(color))
            return color;
        else
            this.background = color;

        this.log("Parsed Illumination.");

        return null;
    }

    /**
     * Parses the <light> node.
     * @param {lights block element} lightsNode
     */
    parseLights(lightsNode) {
        var children = lightsNode.children;

        this.lights = [];
         this.numLights = 0;

        var grandChildren = [];
        var nodeNames = [];

        // Any number of lights.
        for (var i = 0; i < children.length; i++) {

            // Storing light information
            var global = [];
            var attributeNames = [];
            var attributeTypes = [];

            //Check type of light
            if (children[i].nodeName != "light") {
                this.onXMLMinorError("unknown tag <" + children[i].nodeName + ">");
                continue;
            }
            else {
                attributeNames.push(...["enable", "position", "ambient", "diffuse", "specular"]);
                attributeTypes.push(...["boolean","position", "color", "color", "color"]);
            }

            // Get id of the current light.
            var lightId = this.reader.getString(children[i], 'id');
            if (lightId == null)
                return "no ID defined for light";

            // Checks for repeated IDs.
            if (this.lights[lightId] != null)
                return "ID must be unique for each light (conflict: ID = " + lightId + ")";

            grandChildren = children[i].children;
            // Specifications for the current light.

            nodeNames = [];
            for (var j = 0; j < grandChildren.length; j++) {
                nodeNames.push(grandChildren[j].nodeName);
            }

            for (var j = 0; j < attributeNames.length; j++) {
                var attributeIndex = nodeNames.indexOf(attributeNames[j]);

                if (attributeIndex != -1) {
                    if (attributeTypes[j] == "boolean")
                        var up = this.parseBoolean(grandChildren[attributeIndex], "value", "enabled attribute for light of ID" + lightId);
                    else if (attributeTypes[j] == "position")
                        var up = this.parseCoordinates4D(grandChildren[attributeIndex], "light position for ID" + lightId);
                    else
                        var up = this.parseColor(grandChildren[attributeIndex], attributeNames[j] + " illumination for ID" + lightId);

                    if (typeof up === 'string')
                        return up;

                    global.push(up);
                }
                else
                    return "light " + attributeNames[j] + " undefined for ID = " + lightId;
            }
            this.lights[lightId] = global;
           this.numLights++;
        }

        if (this.numLights == 0)
            return "at least one light must be defined";
        else if (this.numLights > 8)
            this.onXMLMinorError("too many lights defined; WebGL imposes a limit of 8 lights");

        this.log("Parsed lights");
        
        return null;
    }

    /**
     * Parses the <textures> block. 
     * @param {textures block element} texturesNode
     */
    parseTextures(texturesNode) {
        let children = texturesNode.children;
  
        //For each texture in textures block, check ID and file URL
        //this.onXMLMinorError("To do: Parse textures.");

        // Any number of textures.
        for(let i=0; i < children.length; i++){

            if(children[i].nodeName != "texture"){
                this.onXMLMinorError("unknown tag <" + children[i].nodeName + ">");
                continue;
            }

            // Get id of the current texture.
            let textureID = this.reader.getString(children[i], "id");
            if (textureID == null)
                return "no ID defined for texture";

            // Get path of the current texture.
            
            let texturePath = this.reader.getString(children[i], 'path');
            if (texturePath == null)
                return "no path defined for texture";

            let newTexture = new CGFappearance(this.scene);
            newTexture.loadTexture(texturePath);
            newTexture.setTextureWrap("REPEAT","REPEAT");
            let newTextureObject = new Texture(textureID,newTexture);

            this.textureList.addTexture(newTextureObject);
        }
        this.log("Parsed textures");
    
        return null;
    }

    /**
     * Parses the <materials> node.
     * @param {materials block element} materialsNode
     */
    parseMaterials(materialsNode) {
        var children = materialsNode.children;

        this.materials = [];

        var grandChildren = [];
        var nodeNames = [];

        // Any number of materials.
        for (var i = 0; i < children.length; i++) {

            if (children[i].nodeName != "material") {
                this.onXMLMinorError("unknown tag <" + children[i].nodeName + ">");
                continue;
            }

            // Get id of the current material.
            var materialID = this.reader.getString(children[i], 'id');
            if (materialID == null)
                return "no ID defined for material";

            // Checks for repeated IDs.
            if (this.materials[materialID] != null)
                return "ID must be unique for each material (conflict: ID = " + materialID + ")";

            //Continue here
            grandChildren = children[i].children;

            nodeNames = [];
            for (var j = 0; j < grandChildren.length; j++) {
                nodeNames.push(grandChildren[j].nodeName);
            }
            
            //variables to store parameters of  material
            let shininessValue, ambientColor,diffuseColor,specularColor,emissiveColor;

            //Gets shininess if exists or uses default
            var shininessIndex = nodeNames.indexOf("shininess");
            if (shininessIndex==-1){
                shininessValue=1;
                this.onXMLMinorError("shininess value of material: "+ materialID + " is not defined, default value=1 will be used.")
            }
            else  shininessValue = this.reader.getFloat(grandChildren[shininessIndex],"value"); 
            
            //Gets ambient color if exists or uses default
            var ambientIndex = nodeNames.indexOf("ambient");
            if (ambientIndex==-1){
                ambientColor={0:1.0,1:0.0,2:0.0};
                this.onXMLMinorError("ambient color of material: "+ materialID + " is not defined, default r=1.0, g=0.0, b=0.0 will be used.")
            }
            else ambientColor = this.parseColor(grandChildren[ambientIndex], "of ambient color of material"+ materialID);
            
            
            //Gets diffuse color if exists or uses default
            var diffuseIndex = nodeNames.indexOf("diffuse");
            if (diffuseIndex==-1){
                diffuseColor={0:1.0,1:0.0,2:0.0};
                this.onXMLMinorError("diffuse color of material: "+ materialID + " is not defined, default r=1.0, g=0.0, b=0.0 will be used.")
            }
            else  diffuseColor = this.parseColor(grandChildren[diffuseIndex], "of difuse color of material");
            
            //Gets specular color if exists or uses default
            var specularIndex = nodeNames.indexOf("specular");
            if (specularIndex==-1){
                specularColor={0:1.0,1:0.0,2:0.0};
                this.onXMLMinorError("specular color of material: "+ materialID + " is not defined, default r=1.0, g=0.0, b=0.0 will be used.")
            }
            else  specularColor = this.parseColor(grandChildren[specularIndex]);

            //Gets emissive color if exists or uses default
            var emissiveIndex = nodeNames.indexOf("emissive");
            if (emissiveIndex==-1){
                emissiveColor={0:1.0,1:0.0,2:0.0};
                this.onXMLMinorError("emissive color of material: "+ materialID + " is not defined, default r=1.0, g=0.0, b=0.0 will be used.")
            }
            else emissiveColor = this.parseColor(grandChildren[emissiveIndex]);
            
            this.appearance = new CGFappearance(this.scene);
            this.appearance.setShininess(shininessValue);
            this.appearance.setAmbient(ambientColor[0],ambientColor[1],ambientColor[2],ambientColor[3]);
            this.appearance.setDiffuse(diffuseColor[0],diffuseColor[1],diffuseColor[2],diffuseColor[3]);
            this.appearance.setSpecular(specularColor[0],specularColor[1],specularColor[2],specularColor[3]);
            this.appearance.setEmission(emissiveColor[0],emissiveColor[1],emissiveColor[2],emissiveColor[3]);
            
            this.newMaterial = new Material(materialID,this.appearance);
            this.materialList.addMaterial(this.newMaterial);
        }

        this.log("Parsed materials");
      
        return null;
    }




 /**
     * Parses the <animations> block.
     * @param {animations block element} animationsNode
     */
    parseAnimations(animationsNode) {
        var children = animationsNode.children;

        this.animations = [];

        var grandChildren = [];

        // Any number of animations
        for (var i = 0; i < children.length; i++) {

            if (children[i].nodeName != "animation") {
                this.onXMLMinorError("unknown tag <" + children[i].nodeName + ">");
                continue;
            }

            // Get id of the current transformation.
            var animationID = this.reader.getString(children[i], 'id');
            if (animationID == null)
                return "no ID defined for animation";

            // Checks for repeated IDs.
            if (this.animations[animationID] != null)
                return "ID must be unique for each animation (conflict: ID = " + animationID + ")";


            grandChildren = children[i].children;
            

            let keyframes=[];

            for (let j = 0; j < grandChildren.length; j++) {
               
                if (grandChildren[j].nodeName != "keyframe") {
                    this.onXMLMinorError("unknown tag <" + grandChildren[j].nodeName + ">");
                    continue;
                }
    
                // Get id of current transformation.
                var instant = this.reader.getFloat(grandChildren[j], 'instant');
                if (instant == null)
                    return "no Instant defined for animation: "+ animationID;
                
                var transformations=grandChildren[j].children;
                var paramNames = [];

                for(let k=0; k<transformations.length;k++){
                    paramNames.push(transformations[k].nodeName);
                }

                var translationID = paramNames.indexOf("translation");
                var rotatexID=1, rotateyID=2, rotatezID=3;
                var scaleID = paramNames.indexOf("scale");

                if (translationID!=0)
                    return "first element of keyframes in Animation with ID " + animationID + " must be translation";
                if (this.reader.getString(transformations[rotatexID],"axis")!='x')
                    return "second element of keyframes in Animation with ID " + animationID + " must be rotation of axis x";
                if (this.reader.getString(transformations[rotateyID],"axis")!='y')
                    return "third element of keyframes in Animation with ID " + animationID + " must be rotation of axis y";
                if (this.reader.getString(transformations[rotatezID],"axis")!='z')
                    return "second element of keyframes in Animation with ID " + animationID + " must be rotation of axis z";    
                if (scaleID!=4)
                    return "third element of keyframes in Animation with ID " + animationID + " must be scale";

                var translation=this.parseCoordinates3D(transformations[translationID]);
                var rotateX=this.parseRotation(transformations[rotatexID]);
                var rotateY=this.parseRotation(transformations[rotateyID]);
                var rotateZ=this.parseRotation(transformations[rotatezID]);
                var scale=this.parseCoordinatesScale3D(transformations[scaleID]);
              
                var keyframe = new Keyframe(instant, translation,rotateX[1],rotateY[1],rotateZ[1],scale);
                keyframes.push(keyframe);

            }
            var animation= new KeyframeAnimation(this.scene,keyframes);
            this.animations[animationID] = animation;
        }

        this.log("Parsed animations");
        return null;
    }







    /**
   * Parses the <nodes> block.
   * @param {nodes block element} nodesNode
   */
  parseNodes(nodesNode) {
        var children = nodesNode.children; //children = <node>

        let nodes = [];

        var grandChildren = [];
        var nodeNames = [];

        // Any number of nodes.
        for (var i = 0; i < children.length; i++) {

            if (children[i].nodeName != "node") {
                this.onXMLMinorError("unknown tag <" + children[i].nodeName + ">");
                continue;
            }

            // Get id of the current node.
            var nodeID = this.reader.getString(children[i], 'id');
            if (nodeID == null)
                return "no ID defined for nodeID";

            // Checks for repeated IDs.
            if (nodes[nodeID] != null)
                return "ID must be unique for each node (conflict: ID = " + nodeID + ")";
            else 
                nodes[nodeID]=1;

            /*new*/
            let fatherNode = this.graph.findNode(nodeID);
            if(fatherNode==null){
                fatherNode = new Node(nodeID);
                this.graph.addNode(fatherNode);
            }
            /*****/


            grandChildren = children[i].children;

            nodeNames = [];
            for (var j = 0; j < grandChildren.length; j++) {
                nodeNames.push(grandChildren[j].nodeName);
            }
            
            // Transformations
            let transformationsIndex = nodeNames.indexOf("transformations");

            if(transformationsIndex==-1)
                this.onXMLMinorError("<transformations> node not found on node '" + nodeID + "'");
            else{
                let transformations = grandChildren[transformationsIndex].children;

                for(let transformation of transformations){
                    let name = transformation.nodeName;
                    let args;

                    switch(name){
                        case "translation":
                            args = this.parseCoordinates3D(transformation);
                            break;
                        case "scale":
                            args = this.parseCoordinatesScale3D(transformation);
                            break;
                        case "rotation":
                            args = this.parseRotation(transformation);
                            break;
                    }
                    
                    fatherNode.addTransformation(name,args);
                }
            }


            //Animation
            let animationIndex = nodeNames.indexOf("animationref");
            if(animationIndex!=-1){
                let animationID=this.reader.getString(children[i].children[animationIndex], 'id');
                if (this.animations[animationID]==undefined)
                {
                    this.onXMLMinorError("The animation with id " + animationID + "referenced in node " + nodeID + " is not defined. The animation will be ignored.");
                    animationID=null;
                }
                else{
                    let animation=this.animations[animationID];
                    fatherNode.setAnimation(animation);
                }
                
            }



            // Material
            let materialIndex = nodeNames.indexOf("material");

            if(materialIndex==-1)
                this.onXMLMinorError("<material> node not found on node '" + nodeID + "'");
            else{
                let materialNode = grandChildren[materialIndex];
                let materialID = this.reader.getString(materialNode,"id");

                // if materialID = null then father nodes material is kept
                if(materialID!="null"){
                    let material;
                    if((material = this.materialList.getMaterial(materialID)) !=null)
                        fatherNode.changeMaterial(material);
                    else
                        this.onXMLMinorError("Material '" + materialID + "' not declared in <materials> node");
                }
            }
            
            // Texture
            let textureIndex = nodeNames.indexOf("texture");


            //default afs and aft
            let afs,aft;

            if(textureIndex==-1)
                this.onXMLMinorError("<texture> node not found on node '" + nodeID + "'");
            else{
                let textureNode = grandChildren[textureIndex];
                let ampfs = textureNode.children;

                let textureID = this.reader.getString(textureNode,"id");

               //checks if amplifications are defined on xml file
                if(ampfs.length!=0){
                    afs = this.reader.getFloat(ampfs[0],"afs");
                    aft = this.reader.getFloat(ampfs[0],"aft");
                }
                else this.onXMLMinorError("Amplifications not set for texture of node "+ nodeID+ ", default amplifications will be used");

                if(textureID!="null"){
                    let texture;
                    if((texture = this.textureList.getTexture(textureID)) != null)
                        fatherNode.changeTexture(texture);
                    else
                        this.onXMLMinorError("Texture '" + textureID + "' not declared in <textures> node");
                }
            }


            // Descendants

            let descendantsIndex = nodeNames.indexOf("descendants");
            if(descendantsIndex==-1)
                this.onXMLMinorError("<descendants> node not found on node '" + nodeID + "'");
            else{
                let descendants = grandChildren[descendantsIndex].children;

                let leafDescendants = [];
                let nodeDescendants = [];

                
                for(let k=0; k<descendants.length; k++){
                    let name=descendants[k].nodeName;
                    if(name=="leaf"){
                        leafDescendants.push(descendants[k]);
                    }
                    else if(name=="noderef") {
                        nodeDescendants.push(descendants[k]);
                    }
                    else
                        this.onXMLMinorError("Unrecognized descendant type '" + name + "' on node '" + nodeID + "'");
                }

                for(var k=0; k<nodeDescendants.length; k++){
                    let id = this.reader.getString(nodeDescendants[k],"id");

                    let wantedNode = this.graph.findNode(id);
                    
                    if(wantedNode == null){
                        wantedNode = new Node(id);
                        this.graph.addNode(wantedNode);
                    }
                    
                    fatherNode.addEdge(wantedNode);
                }

                for(var k=0; k<leafDescendants.length;k++){
                    let type= this.reader.getString(leafDescendants[k],"type");
                    let primitive = leafDescendants[k];

                    var args;

                    switch(type){
                        case "rectangle":
                            args = this.parseRectangle(primitive);
                            break;
                        case "triangle":
                            args = this.parseTriangle(primitive);
                            break;
                        case "sphere":
                            args = this.parseSphere(primitive);
                            break;
                        case "torus":
                            args = this.parseTorus(primitive);
                            break;
                        case "cylinder":
                            args = this.parseCylinder(primitive);
                            break;
                    }

                    let leaf = new Leaf(this.scene,type,args,afs,aft);

                    fatherNode.addEdge(leaf);
                }
            }

        }
        
        if(this.graph.checkMissingNodes())
            this.onXMLMinorError("Missing node(s) in xml file");
        this.log("Parsed Nodes");
    }

    parseBoolean(node, name, messageError) {
        let boolVal = this.reader.getBoolean(node, name);
        if (!(boolVal != null && !isNaN(boolVal) && (boolVal == true || boolVal == false))) {
            this.onXMLMinorError("unable to parse value component " + messageError + "; assuming 'value = true'");
            boolVal = true;
        }
        return boolVal;
    }
    /**
     * Parse the coordinates from a node with ID = id
     * @param {block element} node
     * @param {message to be displayed in case of error} messageError
     */
    parseCoordinates3D(node, messageError) {
        var position = [];

        // x
        var x = this.reader.getFloat(node, 'x');
        if (!(x != null && !isNaN(x)))
            return "unable to parse x-coordinate of the " + messageError;

        // y
        var y = this.reader.getFloat(node, 'y');
        if (!(y != null && !isNaN(y)))
            return "unable to parse y-coordinate of the " + messageError;

        // z
        var z = this.reader.getFloat(node, 'z');
        if (!(z != null && !isNaN(z)))
            return "unable to parse z-coordinate of the " + messageError;

        position.push(...[x, y, z]);

        return position;
    }
    /**
     * Parse the coordinates from a node with ID = id
     * @param {block element} node
     * @param {message to be displayed in case of error} messageError
     */
    parseCoordinatesScale3D(node,messageError){
        var position = [];

        // sx
        var x = this.reader.getFloat(node, 'sx');
        if (!(x != null && !isNaN(x)))
            return "unable to parse sx-coordinate of the " + messageError;

        // sy
        var y = this.reader.getFloat(node, 'sy');
        if (!(y != null && !isNaN(y)))
            return "unable to parse sy-coordinate of the " + messageError;

        // sz
        var z = this.reader.getFloat(node, 'sz');
        if (!(z != null && !isNaN(z)))
            return "unable to parse sz-coordinate of the " + messageError;

        position.push(...[x, y, z]);

        return position;
    }

    /**
     * Parse the coordinates from a node with ID = id
     * @param {block element} node
     * @param {message to be displayed in case of error} messageError
     */
    parseCoordinates4D(node, messageError) {
        var position = [];

        //Get x, y, z
        position = this.parseCoordinates3D(node, messageError);

        if (!Array.isArray(position))
            return position;


        // w
        var w = this.reader.getFloat(node, 'w');
        if (!(w != null && !isNaN(w)))
            return "unable to parse w-coordinate of the " + messageError;

        position.push(w);

        return position;
    }

    /**
     * Parse the color components from a node
     * @param {block element} node
     * @param {message to be displayed in case of error} messageError
     */
    parseColor(node, messageError) {
        var color = [];

        // R
        var r = this.reader.getFloat(node, 'r');
        if (!(r != null && !isNaN(r) && r >= 0 && r <= 1))
            return "unable to parse R component of the " + messageError;

        // G
        var g = this.reader.getFloat(node, 'g');
        if (!(g != null && !isNaN(g) && g >= 0 && g <= 1))
            return "unable to parse G component of the " + messageError;

        // B
        var b = this.reader.getFloat(node, 'b');
        if (!(b != null && !isNaN(b) && b >= 0 && b <= 1))
            return "unable to parse B component of the " + messageError;

        // A
        var a = this.reader.getFloat(node, 'a');
        if (!(a != null && !isNaN(a) && a >= 0 && a <= 1))
            return "unable to parse A component of the " + messageError;

        color.push(...[r, g, b, a]);

        return color;
    }

    parseRectangle(primitive){
        let x1 = this.reader.getFloat(primitive,"x1");
        let y1 = this.reader.getFloat(primitive,"y1");
        let x2 = this.reader.getFloat(primitive,"x2");
        let y2 = this.reader.getFloat(primitive,"y2");

        let args=[x1,y1,x2,y2];
        
        return args;
    }

    parseTriangle(primitive){
        let x1 = this.reader.getFloat(primitive,"x1");
        let y1 = this.reader.getFloat(primitive,"y1");
        let x2 = this.reader.getFloat(primitive,"x2");
        let y2 = this.reader.getFloat(primitive,"y2");
        let x3 = this.reader.getFloat(primitive,"x3");
        let y3 = this.reader.getFloat(primitive,"y3");

        let args=[x1,y1,x2,y2,x3,y3];

        return args;
    }

    parseSphere(primitive){
        let radius = this.reader.getFloat(primitive,"radius");
        let slices = this.reader.getInteger(primitive,"slices");
        let stacks = this.reader.getInteger(primitive,"stacks");

        let args=[radius,slices,stacks];

        return args;
    }

    parseTorus(primitive){
        let inner = this.reader.getFloat(primitive,"inner");
        let outer = this.reader.getFloat(primitive,"outer");
        let slices = this.reader.getInteger(primitive,"slices");
        let loops = this.reader.getInteger(primitive,"loops");

        let args=[inner,outer,slices,loops];

        return args;
    }

    parseCylinder(primitive){
        let height = this.reader.getFloat(primitive,"height");
        let topRadius = this.reader.getFloat(primitive,"topRadius");
        let bottomRadius = this.reader.getFloat(primitive,"bottomRadius");
        let stacks = this.reader.getInteger(primitive,"stacks");
        let slices = this.reader.getInteger(primitive,"slices");

        let args=[height,topRadius,bottomRadius,stacks,slices];

        return args;
    }

    parseRotation(transformation){
        let axis = this.reader.getString(transformation,"axis");
        let angle = this.reader.getFloat(transformation,"angle");

        return [axis,angle];
    }

    /**
     * Displays the scene, processing each node, starting in the root node.
     */
    displayScene() {
        let rootNode = this.graph.getRootNode();
        rootNode.display(this.scene,this.materialStack,this.textureStack);
    }
}