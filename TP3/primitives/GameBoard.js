/**
 * GameBoard
 */
class GameBoard extends CGFobject {
	constructor(scene) {
        super(scene);
        
        this.surface = new CGFnurbsSurface(1, 1, [ [ [-0.5, 0, 0.5, 1], [-0.5, 0, -0.5, 1] ], [ [0.5, 0, 0.5, 1], [0.5, 0, -0.5, 1] ] ]);
        this.object = new CGFnurbsObject(scene, 10, 10, this.surface);
        
	}

    display(){
        this.scene.pushMatrix();
        this.scene.scale(10,1,10);
        this.object.display();
        this.scene.popMatrix();
    }
}