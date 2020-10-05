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
            console.log("ERROR - ROOT NODE ALREADY SET");
    }

    /**
     * @param {Node} node 
     */
    findNode(nodeID){
        for(let x of this.nodes){
            if(x instanceof Node && x.id == nodeID)
                return x;
        }
        
        return null;
    }

    isEmpty(){
        return this.nodes.length>0;
    }

    /**
     * @param {Node} startingNode - if null starts dfs on root node by default 
     */
    dfs(startingNode){
        let start = startingNode == null ? this.rootNode : startingNode;
        let desc = start.descendants;

        for(var i=0; i<desc.length; i++){
            if(desc[i] instanceof Node){
                // console.log("AM NODE: " + desc[i].getID());
                let matrix= desc[i].getTransformations();

                //UNCOMMENT TO TEST TRANSFORMATIONS
                this.scene.pushMatrix();
                this.scene.multMatrix(matrix);
                this.dfs(desc[i]);
                this.scene.popMatrix();
            }
            else if(desc[i] instanceof Leaf){
                // console.log("AM LEAF: " + desc[i].type);
                desc[i].render();
            }
        }
    }

    
}

class Leaf{
    constructor(scene,type,args){
        this.leaf = this.createPrimitive(scene,type,args);
        this.args = args;
        this.type = type;
    }

    createPrimitive(scene,type,args){
        switch(type){
            case "rectangle":
                return new MyRectangle(scene,args[0],args[1],args[2],args[3]);
            case "triangle":
                return new MyTriangle(scene,args[0],args[1],args[2],args[3],args[4],args[5]);
              
            case "sphere":
                return new MySphere(scene,args[0],args[1],args[2]);
            case "torus":
                return new MyTorus(scene,args[0],args[1],args[2],args[3]);
            case "cylinder":
                return new MyCylinder(scene,args[0],args[1],args[2],args[3],args[4]);
                
        }

    }

    render(){
        if(this.leaf!=null)
            this.leaf.display();
            //console.log("RENDER: "+ this.type);
    }

    isSet(){
        return this.leaf!=null;
    }
}

class Node{
    constructor(id){
        this.id=id;
        this.material=null;
        this.texture=null;
        this.amplification=1; 
        this.transformations=[]; //final transformation matrix after all multiplications
        this.descendants=[];
        this.visited = false;
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

    /**
     * @param {Leaf} leaf 
     */
    addLeaf(leaf){
        this.descendants.push(leaf);
    }

    //changeTexture(texture);
    //changeAmplification(amplification);

    addTransformation(name,args){
        switch(name){
            case "translation":
                mat4.translate(this.transformations,this.transformations,vec3.fromValues(args[0],args[1],args[2]));
            case "scale":
                mat4.scale(this.transformations,this.transformations,vec3.fromValues(args[0],args[1],args[2]));

            case "rotation":
                let angleRad = args[1]*Math.PI/180;

                switch(args[0]){
                    case "x":
                        mat4.rotateX(this.transformations,this.transformations,angleRad);
                    case "y":
                        mat4.rotateY(this.transformations,this.transformations,angleRad);
                    case "z":
                        mat4.rotateZ(this.transformations,this.transformations,angleRad);
                }
        }
    }

    /**
     * return mat4 representing the node's transformations
     */
    getTransformations(){
        return this.transformations;
    }

}
