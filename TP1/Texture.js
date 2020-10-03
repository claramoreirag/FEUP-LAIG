/**
 * @param {CGFtexture} texture
 */
class Texture{
    constructor(id,texture){
        this.id=id;
        this.texture=texture;
    }

    getID(){
        return this.id;
    }

    getTexture(){
        return this.texture;
    }


}

class Textures{
    constructor(){
        this.textures = [];
    }

    /**
     * 
     * @param {Texture} texture 
     */
    addTexture(texture){
        this.textures.push(texture);
    }

    getTextures(){
        return this.textures;
    }

    getTexture(id){
        for(let x of this.textures){
            if(x.getID==id)
                return x;
        }

        return null;
    }
}