/**
 * MyGameboard
 */
class MyGameboard extends CGFobject {
	constructor(scene) {
        super(scene);
        // TODO make this changeable in parameters
        this.size=10;
        this.x=5;
        this.z=5;
        this.margin=0.05;
        this.boardNode=null;

        //cells that are not part of the boardGame, are just for holding pieces that are yet not on the board
        this.auxBoard=[];

        this.tiles=[];
        this.pieces=[];
        this.stacks=[];

    }

    /** Reset board to it's initial state */
    reset(){
      this.tiles=[];
      this.auxBoard=[];
      this.pieces=[];
      this.stacks=[];
      this.load();
    }
    
    /** Load board */
    load(){
        this.yInc=0.15;
        this.xInc=1;
        for(let j=1;j<5;j++){
            for(let i=0;i<10;i++){
                let cellOrange =new MyTile(this.scene,null,null,this.x+this.xInc*j,this.yInc*i,-this.z*1/3,0);
                let cellPurple =new MyTile(this.scene,null,null,this.x+this.xInc*j,this.yInc*i,0,0);
                let cellGreen = new MyTile(this.scene,null,null,this.x+this.xInc*j,this.yInc*i,this.z*1/3,0);
                this.auxBoard.push(cellOrange,cellPurple,cellGreen);
            }
        }   
        let beginx=-1.67, beginz=-3.85;
        let xInc=0.83, zInc=0.64;
        let line=0;
        let id=0;
        let lineLengths = [8,9,10,11,12];

        /** Add Tiles to board */

        for(let i=0;i<5;i++){
            this.tiles.push(new MyTile(this.scene,null,null,beginx+xInc*i,0.02,beginz,1,"tile"+id.toString()));id++;
        }
        beginx-=1*xInc;
        for(let len of lineLengths){
            beginx-=xInc/2;
            beginz+=zInc;
            for(let i=0;i<len;i++){
                this.tiles.push(new MyTile(this.scene,null,null,beginx+xInc*i,0.02,beginz,1,"tile"+id.toString()));id++;
            }
        }
        beginx+=0.5*xInc;beginz+=zInc;
        for(let i=0;i<11;i++){
            this.tiles.push(new MyTile(this.scene,null,null,beginx+xInc*i,0.02,beginz,1,"tile"+id.toString()));id++;
        }	
        beginx-=1*xInc;
        for(let len of lineLengths.reverse()){
            beginz+=zInc-0.01;
            beginx+=xInc/2;
            for(let i=0;i<len;i++){
                this.tiles.push(new MyTile(this.scene,null,null,beginx+xInc*i,0.02,beginz,1,"tile"+id.toString()));id++;
            }
        }
        beginx+=1.5*xInc;
        beginz+=zInc;
        for(let i=0;i<5;i++){
            this.tiles.push(new MyTile(this.scene,null,null,beginx+xInc*i,0.02,beginz,1,"tile"+id.toString()));id++;
        }

        /** Attribute Lines/Columns for tiles */
        let startLine;
        let aux1;
        let aux2;
        let i=0;

        startLine = 7;
        for(let a=i;a<i+5;a++){
          this.tiles[a].setCoordinates(startLine+(a-i)*2,6);
        }
        i+=5;

        startLine = 4;
        for(let a=i;a<i+8;a++){
          this.tiles[a].setCoordinates(startLine+(a-i)*2,5);
        }
        i+=8;

        startLine = 3;
        aux1 = [3,5,17,19];
        for(let a=i;a<i+9;a++){
          if(aux1.includes(startLine+(a-i)*2))
            this.tiles[a].setCoordinates(startLine+(a-i)*2,4);
          else 
            this.tiles[a].setCoordinates(startLine+(a-i)*2,5);
        }
        i+=9;

        startLine = 2;
        aux1=[2,20];
        for(let a=i;a<i+10;a++){
          if(aux1.includes(startLine+(a-i)*2))
            this.tiles[a].setCoordinates(startLine+(a-i)*2,3);
          else 
            this.tiles[a].setCoordinates(startLine+(a-i)*2,4);
        }
        i+=10;
        
        startLine = 1;
        aux1=[1,21];
        aux2=[3,5,17,19];
        for(let a=i;a<i+11;a++){
          if(aux1.includes(startLine+(a-i)*2))
            this.tiles[a].setCoordinates(startLine+(a-i)*2,2);
          else if(aux2.includes(startLine+(a-i)*2))
            this.tiles[a].setCoordinates(startLine+(a-i)*2,3);
          else
            this.tiles[a].setCoordinates(startLine+(a-i)*2,4);
        }
        i+=11;

        startLine = 0;
        aux1=[0,22];
        aux2=[2,20];
        for(let a=i;a<i+12;a++){
          if(aux1.includes(startLine+(a-i)*2))
            this.tiles[a].setCoordinates(startLine+(a-i)*2,1);
          else if(aux2.includes(startLine+(a-i)*2))
            this.tiles[a].setCoordinates(startLine+(a-i)*2,2);
          else
            this.tiles[a].setCoordinates(startLine+(a-i)*2,3);
        }
        i+=12;

        // Middle Column
        startLine = 1;
        aux1=[1,21];
        aux2=[3,5,17,19];
        for(let a=i;a<i+11;a++){
          if(aux1.includes(startLine+(a-i)*2))
            this.tiles[a].setCoordinates(startLine+(a-i)*2,1);
          else if(aux2.includes(startLine+(a-i)*2))
            this.tiles[a].setCoordinates(startLine+(a-i)*2,2);
          else
            this.tiles[a].setCoordinates(startLine+(a-i)*2,3);
        }
        i+=11;

        startLine = 0;
        aux1=[0,22];
        aux2=[2,20];
        for(let a=i;a<i+12;a++){
          if(aux1.includes(startLine+(a-i)*2))
            this.tiles[a].setCoordinates(startLine+(a-i)*2,0);
          else if(aux2.includes(startLine+(a-i)*2))
            this.tiles[a].setCoordinates(startLine+(a-i)*2,1);
          else
            this.tiles[a].setCoordinates(startLine+(a-i)*2,2);
        }
        i+=12;
        
        startLine = 1;
        aux1=[1,21];
        aux2=[3,5,17,19];
        for(let a=i;a<i+11;a++){
          if(aux1.includes(startLine+(a-i)*2))
            this.tiles[a].setCoordinates(startLine+(a-i)*2,0);
          else if(aux2.includes(startLine+(a-i)*2))
            this.tiles[a].setCoordinates(startLine+(a-i)*2,1);
          else
            this.tiles[a].setCoordinates(startLine+(a-i)*2,2);
        }
        i+=11;

        startLine = 2;
        aux1=[2,20];
        for(let a=i;a<i+10;a++){
          if(aux1.includes(startLine+(a-i)*2))
            this.tiles[a].setCoordinates(startLine+(a-i)*2,0);
          else 
            this.tiles[a].setCoordinates(startLine+(a-i)*2,1);
        }
        i+=10;
        
        startLine = 3;
        aux1 = [3,5,17,19];
        for(let a=i;a<i+9;a++){
          if(aux1.includes(startLine+(a-i)*2))
            this.tiles[a].setCoordinates(startLine+(a-i)*2,0);
          else 
            this.tiles[a].setCoordinates(startLine+(a-i)*2,1);
        }
        i+=9;

        startLine = 4;
        for(let a=i;a<i+8;a++){
          this.tiles[a].setCoordinates(startLine+(a-i)*2,0);
        }
        i+=8;

        startLine = 7;
        for(let a=i;a<i+5;a++){
          this.tiles[a].setCoordinates(startLine+(a-i)*2,0);
        }
        i+=5;

        for(let j=1;j<5;j++){
                this.stacks.push(new MyStack(this.scene, "stackOrange"+j.toString(), "orange",this.x+this.xInc*j,0,-this.z*1/3));
                this.stacks.push(new MyStack(this.scene, "stackPurple"+j.toString(), "purple",this.x+this.xInc*j,0,0));
                this.stacks.push(new MyStack(this.scene, "stackGreen"+j.toString(), "green",this.x+this.xInc*j,0,this.z*1/3));
               
        } 

      /** Stacks */
        let cell=0;
        for(let i=0; i<40;i++){
            let stackIndex=Math.floor(i/10);
            let pieceOrange= new MyPiece(this.scene,'OrangePiece'+i.toString(),'orange',this.stacks[stackIndex*3]);
            pieceOrange.setholdingCell(this.auxBoard[cell++]);
            this.stacks[stackIndex*3].pieces.push(pieceOrange);
            let piecePurple= new MyPiece(this.scene,'PurplePiece'+i.toString(),'purple',this.stacks[stackIndex*3+1]);
            piecePurple.setholdingCell(this.auxBoard[cell++]);
            this.stacks[stackIndex*3+1].pieces.push(piecePurple);
            let pieceGreen= new MyPiece(this.scene,'GreenPiece'+i.toString(),'green',this.stacks[stackIndex*3+2]);
            pieceGreen.setholdingCell(this.auxBoard[cell++]);
            this.stacks[stackIndex*3+2].pieces.push(pieceGreen);
            this.pieces.push(pieceOrange,piecePurple,pieceGreen);
        }
    }


    /** Add a piece to a cell */
    addPieceToCell(piece, cell){
        cell.setPiece(piece);
        piece.setholdingCell(cell);
    }

    /** Remove a piece from a cell */
    removePieceFromCell(cell){
        cell.unsetPiece();
    }

    /** Stop cell from holding piece */
    removeCellFromPiece(piece){
        piece.unsetholdingCell();
    }

    /** Gets piece in a cell */
    getPieceOnCell(cell){
        return cell.getPiece();
    }

    /** moves piece to destination */
    movePiece(piece, destinationCell){
        let fromCell = piece.getholdingCell();
        this.removePieceFromCell(fromCell);
        this.addPieceToCell(piece, destinationCell);
    }

    /** Finds Tile given a line and a column */
    findTile(line,column){
      for(let tile of this.tiles){
        if(tile.line == line && tile.column == column)
          return tile;
      }
    }

    /** Finds stack given it's pieces color */
    findStack(color){
      for(let stack of this.stacks){
        if(stack.color == color && stack.pieces.length!=0)
          return stack;
      }
    }

    /** Display board */
    display(pick,animatedPieces){
        this.scene.pushMatrix();
        this.scene.scale(0.5,0.5,0.5);
        this.scene.translate(10,5,10);
        for(let i=0;i<this.pieces.length;i++){
            if((animatedPieces==undefined) || (!animatedPieces.includes(this.pieces[i])))this.pieces[i].display();
        }
        let numberRegistered=1;
        for(let i=0; i<this.tiles.length; i++){
            if (this.tiles[i].selectable ){
                this.scene.registerForPick(numberRegistered + 1, this.tiles[i]);
                this.tiles[i].display();
                numberRegistered++;
                this.scene.clearPickRegistration();
            }
            else
            this.tiles[i].display();
        }
        for(let i=0; i<this.stacks.length;i++){
            if(this.stacks[i].pieces.length!=0){
            this.scene.registerForPick(numberRegistered + 1, this.stacks[i]);
            this.stacks[i].display();
            numberRegistered++;
            this.scene.clearPickRegistration();
            }
        }
        this.scene.popMatrix();
        return numberRegistered;
    }

}
