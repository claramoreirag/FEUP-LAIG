class Graph{
    constructor(scene){
        this.rootNode=null;
        this.nodes=[];
        this.rootIsSet=false;
        this.scene=scene;
    }

    /**
     * @param {Node} node 
     */
    addNode(node){
        if(this.findNode(node.getID())==null)
            this.nodes.push(node);

        //should return true of false
    }

    /**
     * 
     * @param {Node} rootNode 
     */
    setRootNode(rootNode){
        if(!this.rootIsSet){
            this.rootNode=rootNode;
            this.rootIsSet=true;
        }
        else
            return "COULD NOT SET ROOT NODE";
    }

    /**
     * @param {Node} node 
     */
    findNode(nodeID){
        for(let x of this.nodes){
            if(x.id == nodeID)
                return x;
        }
        
        return null;
    }

    isEmpty(){
        return this.nodes.length==0;
    }

    getRootNode(){
        return this.rootIsSet ? this.rootNode : null;
    }

    checkMissingNodes(){
        let missing=false;

        for(let node of this.nodes){
            if(!node.isSet()){
                missing=true;
                console.log("Node '" + node.getID() + "' not found in <nodes> tag.");
            }
        }
        
        return missing;
    }
    
}

class Node{
    constructor(id){
        this.id=id;
        this.material=null;
        this.texture=null;
        this.transformations=mat4.create(); //final transformation matrix after all multiplications
        this.descendants=[];
        this.visited = false;
        this.animation=null;
        mat4.identity(this.transformations);
    }

    getID(){
        return this.id;
    }

    /**
     * @param node - node or leaf 
     */
    addEdge(node){
        this.descendants.push(node);
    }

    /**
     * @param {Material} material 
     */
    changeMaterial(material){
        this.material=material;
    }

    setAnimation(animation){
        this.animation=animation;
    }

    changeTexture(texture){
        this.texture=texture;
    }
    
    addTransformation(name,args){
        switch(name){
            case "translation":
                this.transformations=mat4.translate(this.transformations,this.transformations,vec3.fromValues(args[0],args[1],args[2]));
                break;
            case "scale":
                this.transformations= mat4.scale(this.transformations,this.transformations,vec3.fromValues(args[0],args[1],args[2]));
                break;
            case "rotation":
                let angleRad = args[1]*Math.PI/180;

                switch(args[0]){
                    case "x":
                        this.transformations= mat4.rotateX(this.transformations,this.transformations,angleRad);
                        break;
                    case "y":
                        this.transformations=mat4.rotateY(this.transformations,this.transformations,angleRad);
                        break;
                    case "z":
                        this.transformations=mat4.rotateZ(this.transformations,this.transformations,angleRad);
                        break;
                    }
                break;
        }
    }

    /**
     * return mat4 representing the node's transformations
     */
    getTransformations(){
        return this.transformations;
    }

    /**
     * @param {XMLscene} scene
     */
    display(scene,materialStack,textureStack){
        scene.pushMatrix();
        if(this.animation!=null){
        
        scene.multMatrix(this.transformations); //adicionar animação
        this.animation.apply();  //scene.multMatrix(this.animation)
        }
        else{
            scene.multMatrix(this.transformations);
        }

        let material = this.material; 
        if(material == null){
            material = materialStack.pop();
            materialStack.push(material);
        }
        materialStack.push(material);

        let texture = this.texture;
        if(texture == null){
            texture = textureStack.pop();
            textureStack.push(texture);
        }
        textureStack.push(texture);

        let desc = this.descendants;

        for(var i=0; i<desc.length; i++){
            desc[i].display(scene,materialStack,textureStack);
        }

        materialStack.pop();
        textureStack.pop();
        scene.popMatrix();
    }

    isSet(){
        return this.descendants.length!=0;
    }

}

class Leaf extends Node{
    constructor(scene,type,args,afs,aft){
        super();
        this.afs = afs;
        this.aft = aft;
        this.args = args;
        this.type = type;
        this.leaf = this.createPrimitive(scene,type,args);
    }

    createPrimitive(scene,type,args){
        switch(type){
            case "rectangle":
                return new MyRectangle(scene,args[0],args[1],args[2],args[3],this.afs,this.aft);
            case "triangle":
                return new MyTriangle(scene,args[0],args[1],args[2],args[3],args[4],args[5],this.afs,this.aft);
            case "sphere":
                return new MySphere(scene,args[0],args[1],args[2]);
            case "torus":
                return new MyTorus(scene,args[0],args[1],args[2],args[3]);
            case "cylinder":
                return new MyCylinder(scene,args[0],args[1],args[2],args[3],args[4]);
                
        }

    }

    display(scene,materialStack,textureStack){
        if(this.isSet()){
            let material = materialStack.pop();
            let texture = textureStack.pop();

            if(texture.getID()!="clear")
                texture.apply();
            else
                material.apply();

            this.leaf.display();

            materialStack.push(material);
            textureStack.push(texture);
        }
    }

    isSet(){
        return this.leaf!=null;
    }
}
