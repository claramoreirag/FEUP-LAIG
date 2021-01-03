/**
 * MyAnimator
 @ abstract
 */
class MyAnimator extends CGFobject {
	constructor(scene) {
      if (this.constructor === MyAnimator) {
        throw new Error("MyAnimator is an abstract class!");
      }
    }

    update(t){
      throw new Error("This method should be overridden!");
    }

    display(){
      throw new Error("This method should be overridden!");
    }
}
