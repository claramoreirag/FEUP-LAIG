/**
 * MyGameSequence
 */
class MyGameSequence extends CGFobject {
        constructor(scene) {
        super(scene);
        this.gameMoves = []; //MyGameMove objects
    }

    addGameMove(gameMove){
      this.gameMoves.push(gameMove);
    }


    feedMoveReplay(){
      //TODO
    }

    undo(gameboard){
      let lastMove = this.gameMoves[this.gameMoves.length-1];
      let reverseMove = new MyGameMove(this.scene, lastMove.movedPiece, lastMove.destTile, lastMove.originTile, gameboard);
      lastMove.destTile.selectable=true;
      gameboard.movePiece(lastMove.movedPiece, lastMove.originTile);
      this.gameMoves.pop();
      return reverseMove;
  }
    
}
