/**
 * @param {mat4} matrix
 */
class Animation{
    constructor(scene){
        this.scene=scene;
    }

    update(t){}
    apply(){}

}

class Keyframe{
    constructor(instant,translate,rotateX,rotateY,rotateZ,scale){
        this.instant=instant; 
        this.translate=translate; //vec3
        this.rotateX=rotateX;//angle
        this.rotateY=rotateY;//angle
        this.rotateZ=rotateZ;//angle
        this.scale=scale;//vec3
    }
}

class KeyframeAnimation extends Animation{
    constructor(scene,keyframeList){
        super(scene);
        this.keyframeList=keyframeList;
        this.currentKeyFrame=null;
    }
    
    

    update(t){


        for(let keyframe of this.keyframeList){
            if(keyframe.instant<t);
        }

        let totalT = this.keyframeList[i];

    }

    apply(){
        let matrix = mat4.create();
        mat4.identity(matrix);

        mat4.translate(matrix,matrix,translate);
        mat4.rotateX(matrix,matrix,rotateX);
        mat4.rotateY(matrix,matrix,rotateY);
        mat4.rotateZ(matrix,matrix,rotateZ);
        mat4.scale(matrix,matrix,scale);

        this.scene.multMatrix(matrix);
    }
}
