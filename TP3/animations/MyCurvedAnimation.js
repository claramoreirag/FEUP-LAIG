class MyCurvedAnimation extends Animation{
    constructor(scene,keyframeList,undo){
       super(scene);
       this.keyframes=keyframeList;
       this.initialT=0;
       this.previousT=0;
       this.isActive=false;
       this.isdone=false;
       this.matrix=mat4.create();
       this.isUndo=undo;
       //sorting the keyframes by instant to make sure we calculate the right animation
       this.keyframes.sort((a, b) => (a.instant > b.instant) ? 1 : -1);
       
       
   }
   

   update(t){

       if (this.initialT==0){
           this.initialT=t;
           this.previousT=t;
       }

       
       //elapsedTime is the time since t0
       let elapsedTime=t-this.initialT;
       
       
       //if the first animation instant hasn't ocurred yet the object is not visible
       if(this.keyframes[0].instant > elapsedTime){
           this.matrix=mat4.create();
           mat4.scale(this.matrix, this.matrix, [0,0,0]);   
           return;
       }
       //if elapsed time is samaller than last keyframe instant, the animation is active
       else if (this.keyframes[this.keyframes.length-1].instant > elapsedTime)this.isActive=true;
       //when animation is finished it just returns
       else if (this.keyframes[this.keyframes.length-1].instant < elapsedTime && this.isActive==false)return;
       else{
           //applies the final keyframe tranformation
           
           this.matrix=mat4.create();
           mat4.translate(this.matrix, this.matrix, this.keyframes[this.keyframes.length-1].translate);
           mat4.rotateX( this.matrix, this.matrix, this.keyframes[this.keyframes.length-1].rotateX*Math.PI/180);
           mat4.rotateY( this.matrix, this.matrix,this.keyframes[this.keyframes.length-1].rotateY*Math.PI/180);
           mat4.rotateZ( this.matrix, this.matrix,this.keyframes[this.keyframes.length-1].rotateZ*Math.PI/180);
           mat4.scale(this.matrix, this.matrix, this.keyframes[this.keyframes.length-1].scale);   
           this.isActive=false;
           this.isdone=true;
           return;
       }


       //gets the next keyframe
       let currentFrame=-1;
       for (let i=0; i<this.keyframes.length; i++){
           if (this.keyframes[i].instant > elapsedTime){
               currentFrame=i;
               break;
           }
       }
       //(Math.pow(Math.sin(Math.PI*deltaT),1)*0.8)
       let frame1 = this.keyframes[currentFrame-1];
       let frame2 = this.keyframes[currentFrame];  

       let deltaT=(elapsedTime-frame1.instant)/(frame2.instant-frame1.instant);
       let factor=-1;
       if(this.isUndo)factor=1;
      // sqrt(1 - pow(x - 1, 2))
       //linear interpolation of transformations
       let tx=frame1.translate[0] + (frame2.translate[0] - frame1.translate[0])*deltaT;
       let ty=frame1.translate[1] + (frame2.translate[0] - frame1.translate[0])*factor*(Math.pow(Math.sin(Math.PI*deltaT),1)*0.4);
       let tz=frame1.translate[2] + (frame2.translate[2] - frame1.translate[2])*deltaT;
       
       let rx=frame1.rotateX*Math.PI/180 + (frame2.rotateX - frame1.rotateX)*Math.PI/180*deltaT;
       let ry=frame1.rotateY*Math.PI/180 + (frame2.rotateY - frame1.rotateY)*Math.PI/180*deltaT;
       let rz=frame1.rotateZ*Math.PI/180 + (frame2.rotateZ - frame1.rotateZ)*Math.PI/180*deltaT;
      
       let sx=frame1.scale[0]+(frame2.scale[0]-frame1.scale[0])*deltaT;
       let sy=frame1.scale[1]+(frame2.scale[1]-frame1.scale[1])*deltaT;
       let sz=frame1.scale[2]+(frame2.scale[2]-frame1.scale[2])*deltaT;
   
       //creates the matrix to apply
       this.matrix=mat4.create();
       mat4.translate(this.matrix, this.matrix, [tx, ty, tz]);
       mat4.rotateX( this.matrix, this.matrix, rx);
       mat4.rotateY( this.matrix, this.matrix, ry);
       mat4.rotateZ( this.matrix, this.matrix, rz);
       mat4.scale(this.matrix, this.matrix, [sx, sy, sz]);   
       this.previousT=t;

   }

//    apply(){
//        this.scene.multMatrix(this.matrix);
//    }

    apply(mult){
        mat4.multiply(mult, mult, this.matrix);
    };
}



