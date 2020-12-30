/**
 * MyTile
 */
class MyTile extends CGFobject {
	constructor(scene, line,column,x,y,z, aux,nodeId) {
        super(scene);
        this.piece = null;
        this.id=nodeId;
        this.selected=false;
        //this.node= new Node(nodeId);
        this.mat = new CGFappearance(this.scene);
        this.selectmat= this.scene.graph.materialList.getMaterial("materialBranco");
        this.obj=new Plane(this.scene,1,1);
        //this.node.addEdge(new Leaf(this.scene,"plane",[1,1],1.0,1.0));
       // this.node.changeMaterial(scene.graph.materialList.getMaterial("materialBranco"));
        //this.node.changeTexture(new Texture("clear"));
        this.line=line;
        this.column=column;
        this.aux=aux;
        this.x=x;
        this.z=z;
        this.y=y;
        if (!aux)
            this.selectable=false;
        else
            this.selectable=true;
        
    }

    setPiece(piece){
        this.piece=piece;
        this.selectable = false;
    }

    unsetPiece(){
        this.piece=null;
        if (!this.aux)
            this.selectable = true;
    }

    getPiece(){
        return this.piece;
    }

    display(){
        
        this.scene.pushMatrix();
        this.scene.translate(this.x,this.y,this.z);
        this.scene.scale(0.5,1,0.5);
        if(this.selected)this.selectmat.apply();
        else this.mat.apply();
        this.obj.display();
        //this.node.display(this.scene,[],[]);
        this.scene.popMatrix();
    }
}