
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
        this.initCellIntervals();
    }

    initCellIntervals(){
        this.cellIntervals=[];
        this.size = this.endCell - this.startCell + 1;
        this.interval = this.timeAnim/this.size;
        
        for(let i=0;i<this.size;i++){
            this.cellIntervals[this.startCell+i] = (i+1)*this.interval;
        }
        
    }

    update(t){
        if(this.initialTime==0)
            this.initialTime=t;

        let elapsedTime = t - this.initialTime;
        
        for(let i=0;i<this.cellIntervals.length;i++){
            let indice = this.startCell+i;
            if(elapsedTime<this.cellIntervals[indice] || indice==this.endCell){
                this.currentCell=indice;
                break;
            }
        }

        if(elapsedTime>this.cellIntervals[this.startCell+this.size-1])
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
