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

        if (currentFrame==-1)
            return;
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

class MySpriteSheet{
    constructor(scene,appearance,sizeM,sizeN){
        this.appearance=appearance; //should have texture loaded
        this.sizeM=sizeM;
        this.sizeN=sizeN;
        this.scene=scene;
        this.shader = new CGFshader(this.scene.gl, 'shaders/spritesheet.vert', 'shaders/spritesheet.frag');
        this.shader.setUniformsValues({ uSampler: 1 });
        this.shader.setUniformsValues({ 'sizeSpriteSheet': [sizeM,sizeN] });
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
        let appearance = new CGFappearance(scene);
        let texture = new CGFtexture(scene, 'spritesheets/textsheet.png');
        appearance.setAmbient(1, 1, 1, 1.0);
        appearance.setTexture(texture);
        appearance.setTextureWrap('REPEAT', 'REPEAT');

        super(scene,appearance,16,16);
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
        this.scene.setActiveShader(this.shader);

        let start = -this.text.length/2 - 0.5;
        this.scene.translate(start,0,0);
        this.appearance.apply();

        for(let i=0;i<this.text.length;i++){
            this.scene.translate(1,0,0);
            let pos=this.getCharacterPosition(this.text[i]);
            this.activateCellP(pos);
            this.geometry.display();
        }
    
        this.scene.setActiveShader(this.scene.defaultShader);
    }
}

class MySpriteAnimation extends Animation{
    //Dada uma spritesheet, uma célula de início e de fim, e um período de tempo para a animação,
    constructor(scene,spritesheet,startCell,endCell,timeAnim){
        super(scene);
        this.spritesheet=spritesheet;
        this.startCell=startCell;
        this.endCell=endCell;
        this.timeAnim=timeAnim
    }

    update(t){
        print('todo\n');
    }

    apply(){
        print('todo\n');
    }

    //<leaf type=”spriteanim” ssid=”ss” duration=”ff” startCell=”ii” endCell=”ii” />

}
