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

        this.tiles=[];

        //cells that are not part of the boardGame, are just for holding pieces that are yet not on the board
        this.auxBoard=[];

        this.pieces=[];
        this.stacks=[];

    }
    
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

        for(let i=0;i<5;i++){
        this.tiles.push(new MyTile(this.scene,line,i,beginx+xInc*i,0.02,beginz,1,"tile"+id.toString()));id++;
        }
        beginx-=1*xInc;
        for(let len of lineLengths){
            line++;
            beginx-=xInc/2;
            beginz+=zInc;
            for(let i=0;i<len;i++){
                this.tiles.push(new MyTile(this.scene,line,i,beginx+xInc*i,0.02,beginz,1,"tile"+id.toString()));id++;
            }
        }
        line++;
        beginx+=0.5*xInc;beginz+=zInc;
        for(let i=0;i<11;i++){
            this.tiles.push(new MyTile(this.scene,line,i,beginx+xInc*i,0.02,beginz,1,"tile"+id.toString()));id++;
        }	
        beginx-=1*xInc;
        for(let len of lineLengths.reverse()){
            line++;
            beginz+=zInc-0.01;
            beginx+=xInc/2;
            for(let i=0;i<len;i++){
                this.tiles.push(new MyTile(this.scene,line,i,beginx+xInc*i,0.02,beginz,1,"tile"+id.toString()));id++;
            }
        }
        beginx+=1.5*xInc;
        beginz+=zInc;
        line++;
        for(let i=0;i<5;i++){
            this.tiles.push(new MyTile(this.scene,line,i,beginx+xInc*i,0.02,beginz,1,"tile"+id.toString()));id++;
        }
        
        console.log(this.tiles);

        for(let j=1;j<5;j++){
                this.stacks.push(new MyStack(this.scene, "stackOrange"+j.toString(), "orange",this.x+this.xInc*j,0,-this.z*1/3));
                this.stacks.push(new MyStack(this.scene, "stackPurple"+j.toString(), "purple",this.x+this.xInc*j,0,0));
                this.stacks.push(new MyStack(this.scene, "stackGreen"+j.toString(), "green",this.x+this.xInc*j,0,this.z*1/3));
               
        } 
  

        let cell=0;
        for(let i=0; i<40;i++){
            let stackIndex=Math.floor(i/10);
            let pieceOrange= new MyPiece(this.scene,'OrangePiece'+i.toString(),'orange');
            pieceOrange.setholdingCell(this.auxBoard[cell++]);
            this.stacks[stackIndex*3].pieces.push(pieceOrange);
            let piecePurple= new MyPiece(this.scene,'PurplePiece'+i.toString(),'purple');
            piecePurple.setholdingCell(this.auxBoard[cell++]);
            this.stacks[stackIndex*3+1].pieces.push(piecePurple);
            let pieceGreen= new MyPiece(this.scene,'GreenPiece'+i.toString(),'green');
            pieceGreen.setholdingCell(this.auxBoard[cell++]);
            this.stacks[stackIndex*3+2].pieces.push(pieceGreen);
            //pieceGreen.setholdingCell(this.tiles[0]);
            this.pieces.push(pieceOrange,piecePurple,pieceGreen);
        }
          
        console.log(this.pieces);
    }



    addPieceToCell(piece, cell){
        cell.setPiece(piece);
        piece.setHoldingCell(cell);
    }

    removePieceFromCell(cell){
        cell.unsetPiece();

    }

    removeCellFromPiece(piece){
        piece.unsetHoldingCell();
        
    }

    getPieceOnCell(cell){
        return cell.getPiece();
    }

    getCellHoldingPiece(piece){
        return piece.getHoldingCell();
    }


    movePiece(piece, destinationCell){
        let fromCell = this.getCellHoldingPiece(piece);
        this.removePieceFromCell(fromCell);
        this.addPieceToCell(piece, destinationCell);
    }

    

    display(){
        this.scene.pushMatrix();
        this.scene.scale(0.5,0.5,0.5);
        this.scene.translate(10,5,10);
        for(let i=0;i<this.pieces.length;i++){
            this.pieces[i].display();
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
            this.scene.registerForPick(numberRegistered + 1, this.stacks[i]);
            this.stacks[i].display();
            numberRegistered++;
            this.scene.clearPickRegistration();
        }
        this.scene.popMatrix();
    }
}
