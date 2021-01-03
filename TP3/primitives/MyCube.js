/**
 * MyObject
 * @constructor
 * @param scene - Reference to MyScene object
 */


class MyCube extends CGFobject {

    constructor(scene){
        super(scene);
        this.down=new MyQuad(scene);
        this.up=new MyQuad(scene);
        this.front=new MyQuad(scene);
        this.back=new MyQuad(scene);
        this.left=new MyQuad(scene);
        this.right=new MyQuad(scene);
    }

    display(){

        this.scene.pushMatrix();
        this.scene.translate(0,-0.5,0);
        this.scene.rotate(Math.PI/2,1,0,0);
        this.down.display();
        this.scene.popMatrix();


        this.scene.pushMatrix();
        this.scene.translate(0,0.5,0);
        this.scene.rotate(-Math.PI/2,1,0,0);
        this.up.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-0.5,0,0);
        this.scene.rotate(-Math.PI/2,0,1,0);
        this.left.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0.5,0,0);
        this.scene.rotate(Math.PI/2,0,1,0);
        this.right.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0,0,-0.5);
        this.scene.rotate(Math.PI, 0, 1, 0);
        this.back.display();
        this.scene.popMatrix();
        
        this.scene.pushMatrix();
        this.scene.translate(0,0,0.5);
        this.front.display();
        this.scene.popMatrix();

    }

}
