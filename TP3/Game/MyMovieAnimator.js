/**
 * MyMovieAnimator
 */
class MyMovieAnimator extends MyAnimator {
	constructor(scene, gameMoves) {
        super(scene);
        this.over=false;
        this.pieces = [];
        this.animations = [];
        for (let i=0; i<gameMoves.length; i++){
            this.animations.push(new MyMoveAnimator(scene, gameMoves[i]));
            this.pieces.push(gameMoves[i].movedPiece);
        }
    }

    /** Update movie */
    update(t){
        for (let i=0; i<this.animations.length; i++){
            if(!this.animations[i].over){
                this.animations[i].update(t);
                break;
            }
        }
        if (this.animations[this.animations.length-1].over)
            this.over=true;
    }

    /** Display movie */
    display(){
        for (let i=0; i<this.animations.length; i++)
            this.animations[i].display();
    }
}
