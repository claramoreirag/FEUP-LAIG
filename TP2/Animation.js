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
        this.keyframes=keyframeList;
        this.initialT=0;
        this.previousT=0;
        this.isActive=false;
        this.matrix=mat4.create();

        //object invisible until first declared keyframe
        if(this.keyframes[0].instant != 0)
           this.keyframes.push(new Keyframe(0,[0,0,0],0,0,0,[0,0,0])); 
    
        this.keyframes.sort((a, b) => (a.instant > b.instant) ? 1 : -1);
        
        
    }
    

    update(t){

        if (this.initialT==0){
            this.initialT=t;
            this.previousT=t;
            this.isActive=true;
        }

        //elapsedTime is the time since t0
        let elapsedTime=t-this.initialT;
        let currentFrame=-1;
        for (let i=0; i<this.keyframes.length; i++){
            if (this.keyframes[i].instant > elapsedTime){
                currentFrame=i;
                break;
            }
        }

        //to finish the last animation
        if (currentFrame==-1){
            if(this.isActive==false)return;
            else{
                this.matrix=mat4.create();
                mat4.translate(this.matrix, this.matrix, this.keyframes[this.keyframes.length-1].translate);
                mat4.scale(this.matrix, this.matrix, this.keyframes[this.keyframes.length-1].scale);   
                mat4.rotateX( this.matrix, this.matrix, this.keyframes[this.keyframes.length-1].rotateX);
                mat4.rotateY( this.matrix, this.matrix,this.keyframes[this.keyframes.length-1].rotateY);
                mat4.rotateZ( this.matrix, this.matrix,this.keyframes[this.keyframes.length-1].rotateZ);
                this.isActive=false;
                return;
            }
        }
           
        let frame1 = this.keyframes[currentFrame-1];
        let frame2 = this.keyframes[currentFrame];

        
        //linear interpolation of transformations
        let tx=frame1.translate[0] + (frame2.translate[0] - frame1.translate[0])*(elapsedTime-frame1.instant)/(frame2.instant-frame1.instant);
        let ty=frame1.translate[1] + (frame2.translate[1] - frame1.translate[1])*(elapsedTime-frame1.instant)/(frame2.instant-frame1.instant);
        let tz=frame1.translate[2] + (frame2.translate[2] - frame1.translate[2])*(elapsedTime-frame1.instant)/(frame2.instant-frame1.instant);
        
        let rx=frame1.rotateX*Math.PI/180 + (frame2.rotateX - frame1.rotateX)*Math.PI/180*(elapsedTime-frame1.instant)/(frame2.instant-frame1.instant);
        let ry=frame1.rotateY*Math.PI/180 + (frame2.rotateY - frame1.rotateY)*Math.PI/180*(elapsedTime-frame1.instant)/(frame2.instant-frame1.instant);
        let rz=frame1.rotateZ*Math.PI/180 + (frame2.rotateZ - frame1.rotateZ)*Math.PI/180*(elapsedTime-frame1.instant)/(frame2.instant-frame1.instant);
       
        let sx=frame1.scale[0]+(frame2.scale[0]-frame1.scale[0])*(elapsedTime-frame1.instant)/(frame2.instant-frame1.instant);
        let sy=frame1.scale[1]+(frame2.scale[1]-frame1.scale[1])*(elapsedTime-frame1.instant)/(frame2.instant-frame1.instant);
        let sz=frame1.scale[2]+(frame2.scale[2]-frame1.scale[2])*(elapsedTime-frame1.instant)/(frame2.instant-frame1.instant);
    
        
        this.matrix=mat4.create();
        mat4.translate(this.matrix, this.matrix, [tx, ty, tz]);
        mat4.scale(this.matrix, this.matrix, [sx, sy, sz]);   
        mat4.rotateX( this.matrix, this.matrix, rx);
        mat4.rotateY( this.matrix, this.matrix, ry);
        mat4.rotateZ( this.matrix, this.matrix, rz);
        this.previousT=t;

    }

    apply(){
        this.scene.multMatrix(this.matrix);
    }
}
