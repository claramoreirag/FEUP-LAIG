/** * MyTile
 */
class MyTile extends CGFobject {
	constructor(scene, line,column,x,y,z, aux,nodeId) {
        super(scene);
        this.piece = null;
        this.id=nodeId;
        this.selected=false;
        this.mat = new CGFappearance(this.scene);
        this.selectmat= this.scene.graph.materialList.getMaterial("materialBranco");
        this.obj=new Plane(this.scene,1,1);
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

    /** Sets piece to tile */
    setPiece(piece){
        this.piece=piece;
        this.selectable = false;
    }

    /** Unsets piece from tile */
    unsetPiece(){
        this.piece=null;
        if (!this.aux)
            this.selectable = true;
    }

    /** Get piece on current tile */
    getPiece(){
        return this.piece;
    }

    /** Display tile */
    display(){
        this.scene.pushMatrix();
        this.scene.translate(this.x,this.y,this.z);
        this.scene.scale(0.5,1,0.5);
        if(this.selected)this.selectmat.apply();
        else this.mat.apply();
        this.obj.display();
        this.scene.popMatrix();
    }

    /** Set current tile coordinates */
    setCoordinates(line,column){
      this.line = line; 
      this.column = column;
    }
}
