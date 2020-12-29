/**
 * MyButton
 */
class MyButton extends CGFobject {
	constructor(scene,text,materialId, textureId) {
        super(scene);
        this.scene=scene;
        this.materialId = materialId;
        this.textureId = textureId;
        this.material = new CGFappearance(this.scene);
        this.setTexture();
        this.text = new MySpriteText(scene,text);
        console.log(this.text);
        this.rectangle = new MyRectangle(scene, 0, -2, 5, 0,5,2);
    }

    setTexture(){
        this.material = this.scene.graph.materialList.getMaterial(this.materialId);
        this.material.texture=this.scene.graph.textureList.getTexture(this.textureId);
        console.log(this.material);
        this.material.textureWrap=('REPEAT', 'REPEAT');          
    }

    display(){
        this.scene.pushMatrix();
        this.scene.rotate(-Math.PI/2,1,0,0);
        this.material.texture.apply();
        this.rectangle.display();
        this.scene.popMatrix();
        this.text.display();
    }
}