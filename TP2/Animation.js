/**
 * @param {mat4} matrix
 */
class Animation{
    constructor(scene){
        this.scene=scene;
    }

    update();
    apply();

}

class KeyframeAnimation extends Animation{
    constructor(scene){
        super(scene);
        this.keyframeList=[];
        this.currentKeyFrame=null;
    }
    
    //translate e scale vec3
    //rotationX,Y,Z só o angulo
    addKeyframe(instant,translate,rotateX,rotateY,rotateZ,scale){
        let frame = new Keyframe(instant,translate,rotateX,rotateY,rotateZ,scale);
        this.keyframeList.push(frame);
    }

    update(t){


        for(let keyframe of this.keyframeList){
            if(keyframe.instant<t)
        }

        let totalT = this.keyframeList[i]

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

class Keyframe{
    constructor(instant,translate,rotateX,rotateY,rotateZ,scale){
        this.instant=instant;
        this.translate=translate;
        this.rotateX=rotateX;
        this.rotateY=rotateY;
        this.rotateZ=rotateZ;
        this.scale=scale;
    }
}