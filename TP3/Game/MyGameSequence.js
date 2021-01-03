/**
 * MyGameSequence
 */
class MyGameSequence extends CGFobject {
        constructor(scene) {
        super(scene);
        this.gameMoves = []; //MyGameMove objects
    }

    /** Add a move to the stack of moves */
    addGameMove(gameMove){
      this.gameMoves.push(gameMove);
    }

    /** Undo last move */
    undo(gameboard){
      let lastMove = this.gameMoves[this.gameMoves.length-1];
      let reverseMove = new MyGameMove(this.scene, lastMove.movedPiece, lastMove.destTile, lastMove.originTile, gameboard);
      lastMove.destTile.selectable=true;
      gameboard.movePiece(lastMove.movedPiece, lastMove.originTile);
      this.gameMoves.pop();
      return reverseMove;
  }
    
}
