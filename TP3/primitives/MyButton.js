/**
 * MyButton
 */
class MyButton extends CGFobject {
	constructor(scene,text,materialId, textureId) {
        super(scene);
        this.scene=scene;
        this.id=text;
        this.materialId = materialId;
        this.textureId = textureId;
        this.material = new CGFappearance(this.scene);
        this.setTexture();
        this.text = new MySpriteText(scene,text);
      
        this.rectangle = new MyRectangle(scene, 0, -0.5, 1, 0,1,0.5);
    }

    setTexture(){
        this.material = this.scene.graph.materialList.getMaterial(this.materialId);
        this.material.texture=this.scene.graph.textureList.getTexture(this.textureId);
      
        this.material.textureWrap=('REPEAT', 'REPEAT');          
    }

    display(){
        this.scene.pushMatrix();
        this.scene.rotate(-Math.PI/2,1,0,0);
        this.material.apply();
        this.rectangle.display();
        this.scene.popMatrix();
        this.scene.pushMatrix();
        this.scene.translate(0.75,0.01,0.25);
        this.scene.rotate(-Math.PI/2,1,0,0);
        this.scene.scale(0.20,0.4,0.35);
        this.text.display();
        this.scene.popMatrix();
    }
}