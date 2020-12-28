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

    undo(){
      gameMoves.pop();
    }

    feedMoveReplay(){
      //TODO
    }

    
}
