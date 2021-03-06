/**
 * Piece
 */
class Piece extends CGFobject {
	constructor(scene) {
        super(scene);
        this.cilinder= new MyCylinder(scene,0.15,0.25,0.25,4,16);
        
	}
   
    display(anim){
        this.scene.pushMatrix();
     
        if (anim != undefined)this.scene.multMatrix(anim);
        else{   this.scene.rotate(Math.PI/2,1,0,0);}
        this.cilinder.display();
        this.scene.popMatrix();
    }
}