/**
 * MyGameboard
 */
class MyGameboard extends CGFobject {
	constructor(scene) {
        super(scene);
        
        this.boardNode=null;
        this.cells=[];

        //TODO make cells

        //cells that are not part of the boardGame, are just for holding pieces that are yet not on the board
        this.auxBoard=[];
        


        //pieces creation - 40 of each color
        this.pieces=[];
        
        
    }
    
    load(){
        this.boardNode=this.scene.graph.graph.findNode("board");
        //let cell =new MyCell(this.scene,2,2,3,5);
        for(let i=0; i<40;i++){
            let pieceOrange= new MyPiece(this.scene,'OrangePiece'+i.toString(),'orange');
            //pieceOrange.setholdingCell(cell);
            this.boardNode.addEdge(pieceOrange.node);
            
            let piecePurple= new MyPiece(this.scene,'PurplePiece'+i.toString(),'purple');
            this.boardNode.addEdge(piecePurple.node);
            let pieceGreen= new MyPiece(this.scene,'GreenPiece'+i.toString(),'green');
            this.boardNode.addEdge(pieceGreen.node);
            this.pieces.push(pieceOrange);
            this.pieces.push(piecePurple);
            this.pieces.push(pieceGreen);
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
