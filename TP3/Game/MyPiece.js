class MyPiece extends CGFobject {
constructor(scene, nodeId, material) {
    super(scene);
    this.holdingCell=null;
    this.nodeId = nodeId;
    this.node= new Node(nodeId);
    this.scene.graph.graph.addNode(this.node);
    //this.node.changeMaterial(scene.graph.materialList.getMaterial(material));
    //this.node.changeTexture(new Texture("clear"));
    //this.node.addEdge(new Leaf(this.scene,"piece",[],1.0,1.0));
    this.material= this.scene.graph.materialList.getMaterial(material);
    this.obj=new Piece(scene);
}

setholdingCell(tile){
    this.holdingCell=tile;
    //this.node.addTransformation("translation",[this.holdingCell.x,this.holdingCell.y+0.15,this.holdingCell.z]);
}

unsetholdingCell(){
    //this.node.addTransformation("translation",[-this.holdingCell.x,-this.holdingCell.y-0.15,-this.holdingCell.z]);
    this.holdingCell = null;
}

getholdingCell(){
    return this.holdingCell;
}


display(anim){
    this.scene.pushMatrix();
    this.material.apply();
    if (anim == undefined){ this.scene.translate(this.holdingCell.x,this.holdingCell.y+0.15,this.holdingCell.z);
    }
    //this.node.display(this.scene,[],[]);
    this.obj.display(anim);
    this.scene.popMatrix();
    
}
}