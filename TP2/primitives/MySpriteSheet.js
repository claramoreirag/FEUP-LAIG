
class MySpriteSheet{
    constructor(scene,texture,sizeM,sizeN){
        this.texture=texture;
        this.sizeM=sizeM;
        this.sizeN=sizeN;
        this.scene=scene;
        
        this.shader = new CGFshader(this.scene.gl, './shaders/spritesheet.vert', './shaders/spritesheet.frag');
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
        let m = (p%this.sizeM);
        let n = Math.floor(p/this.sizeM);

        if(n<this.sizeN)
            this.activateCellMN(m,n);
        else
            console.log('Cell '+ p + " doesn't exist");

    }
}