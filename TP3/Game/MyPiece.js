class MyPiece extends CGFobject {
constructor(scene, nodeId, material) {
    super(scene);
    this.holdingCell=null;
    this.nodeId = nodeId;
    this.node= new Node(nodeId);
    this.scene.graph.graph.addNode(this.node);
    this.node.changeMaterial(scene.graph.materialList.getMaterial(material));
    this.node.addEdge(new Leaf(this.scene,"piece",[],1.0,1.0));
}

setholdingCell(tile){
    this.holdingCell=tile;
    this.node.addTransformation("translation",[this.holdingCell.x,0,this.holdingCell.z]);
}
unsetholdingCell(){
    this.holdingCell = null;
}

getholdingCell(){
    return this.holdingCell;
}


display(){
    this.node.display(this.scene,[],[]);
}
}