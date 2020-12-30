
class MySpriteText extends MySpriteSheet{
    constructor(scene, text){ 
        let texture = new CGFtexture(scene, './spritesheets/textsheet.png');
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
            return 32;
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
            this.scene.translate(0.75,0,0);
            let pos=this.getCharacterPosition(this.text[i]);
            this.activateCellP(pos);
            this.geometry.display();
        }
    
        this.scene.setActiveShaderSimple(this.scene.defaultShader);
    }
}