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
        mat4.rotateX( this.matrix, this.matrix, rx);
        mat4.rotateY( this.matrix, this.matrix, ry);
        mat4.rotateZ( this.matrix, this.matrix, rz);
        mat4.scale(this.matrix, this.matrix, [sx, sy, sz]);   
        this.previousT=t;

    }

    apply(){
        this.scene.multMatrix(this.matrix);
    }
}

class MySpriteSheet{
    constructor(scene,texture,sizeM,sizeN){
        this.texture=texture;
        this.sizeM=sizeM;
        this.sizeN=sizeN;
        this.scene=scene;
        
        this.shader = new CGFshader(this.scene.gl, 'shaders/spritesheet.vert', 'shaders/spritesheet.frag');
        this.shader.setUniformsValues({ uSampler: 1 });
        this.shader.setUniformsValues({ 'sizeSpriteSheet': [sizeM,sizeN] });

        let appearance = new CGFappearance(scene);
        appearance.setAmbient(1, 1, 1, 1.0);
        appearance.setTexture(texture);
        appearance.setTextureWrap('REPEAT', 'REPEAT');
        this.appearance=appearance;
    }

    activateCellMN(m, n){ //m - coluna  n - linha
        this.shader.setUniformsValues({'spriteCoords': [m,n]});
    }

    activateCellP(p){
        let m = p%this.sizeM;
        let n = Math.floor(p/this.sizeM);

        if(n<=this.sizeN)
            this.activateCellMN(m,n);
        else
            console.log('Cell '+ p + " doesn't exist");

        //chamar activateCell(m,n) depois de calcular 'm' e 'n'
    }
}

class MySpriteText extends MySpriteSheet{
    constructor(scene, text){ 
        let texture = new CGFtexture(scene, 'spritesheets/textsheet.png');

        super(scene,texture,16,16);
        this.text=text;
        this.texture = texture;
        this.geometry = new MyRectangle(scene,-0.5,-0.5,0.5,0.5);
    }

    getCharacterPosition(character){
        // valor de '!' = valor ascii (ascii=33)
        // ate '~' (ascii = 126) 

        let asciiValue = character.charCodeAt(0);
        if(asciiValue > 31 && asciiValue < 127)
            return asciiValue;
        else
            console.log("todo more characters\n");
        //devolve a posição do character na spritesheet
    }

    //chamar durante o desenho do grafo
    display(){
        //Cada caracter será mapeado na geometria utilizando a função MySpritesheet.activateCellP().
        //<leaf type=”spritetext” text=”ss” />

        this.texture.bind(1);
        this.scene.setActiveShaderSimple(this.shader);

        let start = -this.text.length/2 - 0.5;
        this.scene.translate(start,0,0);
        this.appearance.apply();

        for(let i=0;i<this.text.length;i++){
            this.scene.translate(1,0,0);
            let pos=this.getCharacterPosition(this.text[i]);
            this.activateCellP(pos);
            this.geometry.display();
        }
    
        this.scene.setActiveShaderSimple(this.scene.defaultShader);
    }
}

class MySpriteAnimation extends Animation{
    //Dada uma spritesheet, uma célula de início e de fim, e um período de tempo para a animação,
    constructor(scene,spritesheet,startCell,endCell,timeAnim){
        super(scene);
        this.spritesheet=spritesheet;
        this.startCell=startCell;
        this.endCell=endCell;
        this.timeAnim=timeAnim;


        this.geometry = new MyRectangle(scene,-0.5,-0.5,0.5,0.5);
        this.currentCell=null;
        this.initialTime=0;
        this.previousTime=0;
        this.initCellIntervals();
    }

    initCellIntervals(){
        this.cellIntervals=[];
        let size = this.endCell - this.startCell;
        let interval = this.timeAnim/size;
        
        for(let i=0;i<size;i++){
            this.cellIntervals[this.startCell+i] = i*interval;
        }
        
    }

    update(t){
        if(this.initialTime==0)
            this.initialTime=t;

        let elapsedTime = t - this.initialTime;

        for(let i=0;i<this.cellIntervals.length;i++){
            let indice = this.startCell+i;
            if(this.cellIntervals[indice]>elapsedTime || indice==this.endCell){
                this.currentCell=indice;
                break;
            }
        }

        if(elapsedTime>this.timeAnim)
            this.initialTime=0;
    }

    //should be apply?
    display(){
        this.spritesheet.texture.bind(1);
        this.scene.setActiveShaderSimple(this.spritesheet.shader);

        this.spritesheet.appearance.apply();
        this.spritesheet.activateCellP(this.currentCell);
        this.geometry.display();

        this.scene.setActiveShaderSimple(this.scene.defaultShader);
    }

    //<leaf type=”spriteanim” ssid=”ss” duration=”ff” startCell=”ii” endCell=”ii” />

}
