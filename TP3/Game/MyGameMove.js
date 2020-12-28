/**
 * MyGameMove
 */
class MyGameMove extends CGFObject{
  constructor(scene,piece,origin,dest,gameboard){
    super(scene);
    this.movedPiece = piece;
    this.originTile = origin;
    this.destTile = dest;
    this.gameBoardState = gameboard;
  }

  setMovedPiece(piece){
    this.movedPiece = piece;
  }

  setOriginTile(origin){
    this.originTile = origin;
  }

  setdestTile(dest){
    this.destTile = dest;
  }

  setBoardState(gameboard){
    this.gameBoardState = gameboard;
  }

  animate(){
    //TODO 
  }
  
}
