class MyStack extends CGFobject {
    constructor(scene, nodeId, material,x,y,z) {
        super(scene);
        this.holdingCell=null;
        this.nodeId = nodeId;
        this.node= new Node(nodeId);
        this.selected=false;
        this.color = material;
        
        this.x=x;
        this.y=y;
        this.z=z;
    //    this.node.addTransformation("translation",[this.x,this.y+0.15,this.z]);
        this.pieces=[];
        this.node.changeMaterial(scene.graph.materialList.getMaterial(material));
        this.node.changeTexture(new Texture("clear"));
        this.node.addEdge(new Leaf(this.scene,"cylinder",[0.15,0.25,0.25,4,16],1.0,1.0));
    }
    
    getTopPiece(){
        return this.pieces.pop();
    }
    

    putPieceBack(piece){
         this.pieces.push(piece);
    }
    
    display(){
        
        this.scene.pushMatrix();this.scene.translate(this.x,this.y,this.z);
        if(!this.selected)this.scene.scale(1.05,this.pieces.length*1.05,1.05);
        else this.scene.scale(1.2,this.pieces.length*1.2,1.2);
        this.scene.rotate(-Math.PI/2,1,0,0);
        this.node.display(this.scene,[],[]);
        this.scene.popMatrix();
        
    }
    }
