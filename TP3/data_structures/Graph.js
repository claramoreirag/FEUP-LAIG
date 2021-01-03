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
        scene.multMatrix(this.transformations); //adiciona animação

        if(this.animation!=null)this.animation.apply();  //scene.multMatrix(this.animation)
        
        
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
            case "plane":
                return new Plane(scene,args[0],args[1]);   
            case "patch":
                return new Patch(scene,args[0],args[1],args[2],args[3],args[4]);
            case "spritetext":
                return new MySpriteText(scene,args);
            case "spriteanim":
                return new MySpriteAnimation(scene,args[0],args[1],args[2],args[3]);
            case "defbarrel":
                return new Defbarrel(scene,args[0],args[1],args[2], args[3], args[4]);
            case "piece":
                return new Piece(scene);
            }

    }


    display(scene,materialStack,textureStack){
        if(this.isSet()){
            let material = materialStack.pop();
            let texture = textureStack.pop();
            
			//picking for each hexagon in board
			// if(this.type=="plane"){
			// 	let d = -1/12; //space between 2 hexagons
			// 	let h = d+0.02; //space between 2 lines
			// 	let square = new Plane(scene,1,1);
			// 	let lineLengths = [8,9,10,11,12]; //[5,8,9,10,11,12,11,12,11,10,9,8,5];
			// 	let k=1;

			// 	scene.pushMatrix();
			// 	scene.translate(0.5,0,0.5); //translate to 0,0
			// 	scene.translate(4*d,0.001,d-0.033); //translate to first hexagon

			// 	scene.pushMatrix();
			// 	scene.scale(0.05,0.05,0.05);
			// 	scene.registerForPick(k,square);
			// 	square.display();
			// 	scene.popMatrix();

			// 	//line1
			// 	for(let i=1;i<5;i++){
			// 		scene.translate(d,0,0);
			// 		scene.pushMatrix();
			// 		scene.scale(0.05,0.05,0.05);
			// 		scene.registerForPick(i+k,square);
			// 		square.display();
			// 		scene.popMatrix();
			// 	}
			// 	k+=5;

			// 	//lines 2 to 6
			// 	scene.translate(0,0,h);
			// 	scene.translate(-5*d-d/2,0,0);

			// 	for(let len of lineLengths){
			// 		scene.pushMatrix();
			// 		scene.scale(0.05,0.05,0.05);
			// 		scene.registerForPick(k,square);
			// 		square.display();
			// 		scene.popMatrix();

			// 		for(let i=1;i<len;i++){
			// 			scene.translate(d,0,0);
			// 			scene.pushMatrix();
			// 			scene.scale(0.05,0.05,0.05);
			// 			scene.registerForPick(k+i,square);
			// 			square.display();
			// 			scene.popMatrix();
			// 		}

			// 		k+=len;
			// 		if(len!=12){
			// 			scene.translate(0,0,h);
			// 			scene.translate(-len*d+d/2,0,0);
			// 		}
			// 	}	

			// 	//line 7
			// 	scene.translate(0,0,h);
			// 	scene.translate(-11*d+d/2,0,0);

			// 	scene.pushMatrix();
			// 	scene.scale(0.05,0.05,0.05);
			// 	scene.registerForPick(k,square);
			// 	square.display();
			// 	scene.popMatrix();
			// 	k++;
				

			// 	for(let i=1;i<11;i++){
			// 		scene.translate(d,0,0);
			// 		scene.pushMatrix();
			// 		scene.scale(0.05,0.05,0.05);
			// 		scene.registerForPick(i+k,square);
			// 		square.display();
			// 		scene.popMatrix();
			// 	}
			// 	k+=11;


			// 	//line 8 to 12
			// 	scene.translate(0,0,h);
			// 	scene.translate(-10*d-d/2,0,0);

			// 	for(let len of lineLengths.reverse()){
			// 		scene.pushMatrix();
			// 		scene.scale(0.05,0.05,0.05);
			// 		scene.registerForPick(k,square);
			// 		square.display();
			// 		scene.popMatrix();

			// 		for(let i=1;i<len;i++){
			// 			scene.translate(d,0,0);
			// 			scene.pushMatrix();
			// 			scene.scale(0.05,0.05,0.05);
			// 			scene.registerForPick(k+i,square);
			// 			square.display();
			// 			scene.popMatrix();
			// 		}

			// 		k+=len;
			// 		if(len!=8){
			// 			scene.translate(0,0,h);
			// 			scene.translate(-len*d+d+d/2,0,0);
			// 		}
			// 	}


			// 	//line 13
			// 	scene.translate(0,0,h);
			// 	scene.translate(-5*d-d/2,0,0);

			// 	scene.pushMatrix();
			// 	scene.scale(0.05,0.05,0.05);
			// 	scene.registerForPick(k,square);
			// 	square.display();
			// 	scene.popMatrix();

				
			// 	for(let i=1;i<5;i++){
			// 		scene.translate(d,0,0);
			// 		scene.pushMatrix();
			// 		scene.scale(0.05,0.05,0.05);
			// 		scene.registerForPick(i+k,square);
			// 		square.display();
			// 		scene.popMatrix();
			// 	}

			// 	scene.clearPickRegistration();

			// 	scene.popMatrix();
			// }
            
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
