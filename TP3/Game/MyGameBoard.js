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
        this.cells=[];

        //TODO make cells

        
                
        //cells that are not part of the boardGame, are just for holding pieces that are yet not on the board
        this.auxBoard=[];
        this.yInc=0.15;
        this.xInc=1;
        for(let j=1;j<5;j++){
            for(let i=0;i<10;i++){
                let cellOrange =new MyCell(this.scene,2,2,this.x+this.xInc*j,this.margin+this.yInc*i,-this.z*1/3);
                let cellPurple =new MyCell(this.scene,2,2,this.x+this.xInc*j,this.margin+this.yInc*i,0);
                let cellGreen = new MyCell(this.scene,2,2,this.x+this.xInc*j,this.margin+this.yInc*i,this.z*1/3);
                this.auxBoard.push(cellOrange,cellGreen,cellPurple);
            }
        }   
        

        this.pieces=[];
        
        
    }
    
    load(){
        this.boardNode=this.scene.graph.graph.findNode("board");
        let cell=0;
        for(let i=0; i<40;i++){
            let pieceOrange= new MyPiece(this.scene,'OrangePiece'+i.toString(),'orange');
            pieceOrange.setholdingCell(this.auxBoard[cell++]);
            this.boardNode.addEdge(pieceOrange.node);
            let piecePurple= new MyPiece(this.scene,'PurplePiece'+i.toString(),'purple');
            piecePurple.setholdingCell(this.auxBoard[cell++]);
            this.boardNode.addEdge(piecePurple.node);
            let pieceGreen= new MyPiece(this.scene,'GreenPiece'+i.toString(),'green');
            this.boardNode.addEdge(pieceGreen.node);
            pieceGreen.setholdingCell(this.auxBoard[cell++]);
            this.pieces.push(pieceOrange,piecePurple,pieceGreen);
        
        }
        
        console.log(this.boardNode);
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
        //this.boardNode.display(this.scene,[],[]);
    }
}
