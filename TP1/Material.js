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

    getId(){
        return this.id;
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
            if(x.getId()==id)
                return x;
        }
        return null;
    }
}