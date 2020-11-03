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

        //time since the function was  called
        let deltaT = t - this.previousT;

        //times the function is called betwen frames
        let n = (frame2.instant-frame1.instant)/(deltaT);

        // times the function was already called
        let current_n = (elapsedTime-frame1.instant)/deltaT;
        
        //linear interpolation of transformation components
        let tx=frame1.translate[0] + (frame2.translate[0] - frame1.translate[0])*(elapsedTime-frame1.instant)/(frame2.instant-frame1.instant);
        let ty=frame1.translate[1] + (frame2.translate[1] - frame1.translate[1])*(elapsedTime-frame1.instant)/(frame2.instant-frame1.instant);
        let tz=frame1.translate[2] + (frame2.translate[2] - frame1.translate[2])*(elapsedTime-frame1.instant)/(frame2.instant-frame1.instant);
        
        let rx=frame1.rotateX*Math.PI/180 + (frame2.rotateX - frame1.rotateX)*Math.PI/180*(elapsedTime-frame1.instant)/(frame2.instant-frame1.instant);
        let ry=frame1.rotateY*Math.PI/180 + (frame2.rotateY - frame1.rotateY)*Math.PI/180*(elapsedTime-frame1.instant)/(frame2.instant-frame1.instant);
        let rz=frame1.rotateZ*Math.PI/180 + (frame2.rotateZ - frame1.rotateZ)*Math.PI/180*(elapsedTime-frame1.instant)/(frame2.instant-frame1.instant);
        
        let sx, sy, sz;

        //scale sx
        if ((frame2.scale[0]*frame1.scale[0]) <= 0)
        {
            let d = 1 - Math.min(frame2.scale[0], frame1.scale[0]);
            let sx1 = frame1.scale[0] + d;
            let sx2 = frame2.scale[0] + d;
            sx = sx1 * Math.pow(Math.pow(sx2/sx1, 1/n), current_n) - d;
        }
        else
            sx=frame1.scale[0]*Math.pow(Math.pow(frame2.scale[0]/frame1.scale[0], 1/n), current_n);

        //scale sy
        if ((frame2.scale[1]*frame1.scale[1]) <= 0)
        {
            let d = 1 - Math.min(frame2.scale[1], frame1.scale[1]);
            let sy1 = frame1.scale[1] + d;
            let sy2 = frame2.scale[1] + d;
            sy = sy1 * Math.pow(Math.pow(sy2/sy1, 1/n), current_n) - d;
        }
        else
            sy=frame1.scale[1]*Math.pow(Math.pow(frame2.scale[1]/frame1.scale[1], 1/n), current_n);

        //scale sz
        if ((frame2.scale[2]*frame1.scale[2]) <= 0)
        {
            let d = 1 - Math.min(frame2.scale[2], frame1.scale[2]);
            let sz1 = frame1.scale[2] + d;
            let sz2 = frame2.scale[2] + d;
            sx = sz1 * Math.pow(Math.pow(sz2/sz1, 1/n), current_n) - d;
        }
        else
            sz=frame1.scale[2]*Math.pow(Math.pow(frame2.scale[2]/frame1.scale[2], 1/n), current_n);

        
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
