class MyPiece extends CGFobject {
constructor(scene, nodeId, material) {
    super(scene);
    this.holdingCell=null;
    this.nodeId = nodeId;
    this.node= new Node(nodeId);
    this.material= this.scene.graph.materialList.getMaterial(material);
    this.obj=new Piece(scene);
}

setholdingCell(tile){
    this.holdingCell=tile;
}

unsetholdingCell(){
   this.holdingCell = null;
}

getholdingCell(){
    return this.holdingCell;
}


display(){
    this.scene.pushMatrix();
    this.material.apply();
    this.scene.translate(this.holdingCell.x,this.holdingCell.y+0.15,this.holdingCell.z);
    this.obj.display();
    this.scene.popMatrix();
    
}
}