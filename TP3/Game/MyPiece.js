class MyPiece extends CGFobject {
  constructor(scene, nodeId, material,stack) {
      super(scene);
      this.holdingCell=null;
      this.nodeId = nodeId;
      this.node= new Node(nodeId);
      this.scene.graph.graph.addNode(this.node);
      this.stack=stack;
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


  /** Display piece */
  display(anim){
      this.scene.pushMatrix();
      this.material.apply();

      if (anim == undefined) 
        this.scene.translate(this.holdingCell.x,this.holdingCell.y+0.15,this.holdingCell.z);
      
      this.obj.display(anim);
      this.scene.popMatrix();
      
  }
}
