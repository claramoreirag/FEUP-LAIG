/**
 * MyTile
 */
class MyCell extends CGFobject {
	constructor(scene, line,column,x,y,z, aux) {
        super(scene);
        this.piece = null;
        this.line=line;
        this.column=column;
        this.aux=aux;
        this.x=x;
        this.z=z;
        this.y=y;
        if (aux)
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
        //TODO
    }
}