/**
 * MyMoveAnimator
 */
class MyMoveAnimator extends MyAnimator{
	constructor(scene, gameMove) {
        super(scene);
        this.gameMove = gameMove; 
        this.orig=gameMove.originTile;
        this.dest=gameMove.destTile;
        let tx=this.dest.x-this.orig.x;
        let ty=this.dest.y-this.orig.y;
        let tz=this.dest.z-this.orig.z;
        this.dist=Math.sqrt(tx*tx+ty*ty+tz*tz);
        this.pieces=[];
        this.over=false; 
        this.keyframes=[new Keyframe(0,[0,0.15,0],0,0,0,[1,1,1]),new Keyframe(this.dist/6,[tx/2,(ty+0.15)/2,tz/2],0,0,0,[1,1,1])];

        this.animation = new MyCurvedAnimation(scene,this.keyframes);
        this.pieces.push(gameMove.movedPiece);

        this.animation.started=true;
    }

   

    update(t){
       
        if(this.animation.isdone)
            this.over=true;  
        
        this.animation.update(t/1000);
    }

    display(){
        let mat = mat4.create();
        this.animation.apply(mat);
        mat4.scale(mat, mat, [0.5, 0.5, 0.5]);   
        mat4.translate(mat, mat, [10+this.orig.x, 5+this.orig.y, 10+this.orig.z]);
       
      
      
        mat4.rotateX( mat, mat, Math.PI/2);
        //mat4.rotateY( this.matrix, this.matrix, ry);
       // mat4.rotateZ( this.matrix, this.matrix, rz);
        this.gameMove.movedPiece.display(mat);
       
    }
}