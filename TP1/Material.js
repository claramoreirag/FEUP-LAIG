/**
 * @param {CGFappearance} appearance
 */
class Material{
    constructor(id,appearance){
        this.id=id;
        this.appearance=appearance;
    }

    getMaterial(){
        return this.appearance;
    }

    getID(){
        return this.id;
    }

    apply(){
        this.appearance.apply();
    }
}


class Materials{
    constructor(){
        this.materials = [];
    }

    /**
     * @param {Material} material
     */
    addMaterial(material){
        this.materials.push(material);
    }

    getMaterials(){
        return this.materials;
    }

    getMaterial(id){
        for(var x of this.materials){
            if(x.getID()==id)
                return x;
        }
        return null;
    }
}