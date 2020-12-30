/**
 * MyGameOrchestrator
 */
class MyGameOrchestrator extends CGFobject {
    constructor(scene) {
        super(scene);
        var filename = getUrlVars()['file'] || "LAIG_TP1_T3_G03.xml";
        this.graph = new MySceneGraph(filename, scene);
        this.gameboard = new MyGameboard(scene);
        this.gameSequence= new MyGameSequence(scene);
        this.state = "choose piece human";
        this.player = 1;
        this.movetomake = [];
        //TODO scoreBoard
        //this.scoreboard=


    }


    displayButtons(numberPickedObjects) {
        this.scene.pushMatrix();
        this.scene.scale(0.5, 0.5, 0.5);
        this.scene.translate(15.5, 5.001, 6);
        this.scene.registerForPick(numberPickedObjects++, this.undoButton);
        this.undoButton.display();
        this.scene.translate(1.5, 0, 0);
        this.scene.registerForPick(numberPickedObjects++, this.removeButton);
        this.removeButton.display();
        this.scene.translate(1.5, 0, 0);
        this.scene.registerForPick(numberPickedObjects++, this.confirmButton);
        this.confirmButton.display();
        this.scene.translate(-3, 0, 1);
        this.scene.registerForPick(numberPickedObjects++, this.movieButton);
        this.movieButton.display();
        this.scene.translate(1.5, 0, 0);
        this.scene.registerForPick(numberPickedObjects++, this.exitButton);
        this.exitButton.display();
        this.scene.translate(1.5, 0, 0);
        //this.scene.registerForPick(numberPickedObjects++, this.cameraButton);
        // this.cameraButton.display();
        this.scene.popMatrix();
    }


    orquestrate() {
        // console.log("state: " + this.state);
        switch (this.state) {
            case "make player move":
                this.makeMove();
                break;

            default:
                break;
        }
    }

    changeTheme() {

        this.graph = new MySceneGraph("park.xml", this.scene);
        this.scene.sceneInited = false;
    }

    load() {

        this.undoButton = new MyButton(this.scene, "Undo", "purple", "rug");
        this.exitButton = new MyButton(this.scene, "Exit", "orange", "lampshade");
        this.movieButton = new MyButton(this.scene, "Movie", "orange", "poster");
        this.confirmButton = new MyButton(this.scene, "Confirm", "orange", "curtains");
        this.removeButton = new MyButton(this.scene, "Remove", "orange", "grass");

        this.gameboard.load();
    }

    display() {
        this.orquestrate();
        this.managePick();

        let numberpicked = this.gameboard.display();
        this.displayButtons(numberpicked);
        this.graph.displayScene();

        //example of request to prolog
        let prolog = new MyPrologInterface();

        let gamestate = [[[0,0],[0,0,0],[0,0,0,0],[0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0],[0,0,0,0],[0,0,0],[0,0]],[42,42,42],[['P','G','O'],['G','O','P']],[-1,0,-1],['Player1','Player2'],1];

        prolog.requestInitial();
    }

    managePick() {
        if (this.scene.pickMode == false /* && some other game conditions */) {
            if (this.scene.pickResults != null && this.scene.pickResults.length > 0) { // any results?
                for (var i = 0; i < this.scene.pickResults.length; i++) {
                    var obj = this.scene.pickResults[i][0]; // get object from result
                    if (obj) { // exists?

                        var uniqueId = this.scene.pickResults[i][1] // get id
                        this.onObjectSelected(obj, uniqueId);
                    }
                }
                // clear results
                this.scene.pickResults.splice(0, this.scene.pickResults.length);
            }
        }
    }

    onObjectSelected(obj, id) {
        if (obj instanceof MyTile) {
            // obj.selected=true;
            if (this.state == "choose tile human") {
                console.log("picked tile " + obj.id);
                this.movetomake.push(obj);
                obj.selected=true;
                this.state = "wait confirm";
            }
        }
        if (obj instanceof MyStack) {
            if (this.state == "choose piece human") {
                console.log("picked stack " + obj.nodeId);
                this.movetomake.push(obj);
                this.state = "choose tile human";
            }

        }
        if (obj instanceof MyButton) {
            console.log("picked button " + obj.id);
            if (obj.id == "Confirm") {
                if (this.state == "wait confirm") {
                    this.state = "make player move";
                }
            }else if (obj.id=="Remove"){
                if (this.state == "wait confirm" || this.state == "choose tile human"){
                    if(this.movetomake[1]!=null)this.movetomake[1].selected=false;
                    this.moveToExecute = [];
                    this.state = "choose piece human";
                }
            }
        }
    }



    makeMove() {

        let destTile = this.movetomake[1];
        destTile.selected=false; 
        destTile.selectable = false;
        let pieceToMove = this.movetomake[0].getTopPiece();
        let originTile = pieceToMove.getholdingCell();
        this.gameboard.movePiece(pieceToMove, destTile);
        
        let move = new MyGameMove(this.scene, pieceToMove, originTile, destTile, this.gameboard);
        this.gameSequence.addGameMove(move);

        this.currentPlayer = (this.currentPlayer % 2) + 1;
        this.movetomake = [];

        //TODO animation
        
        this.state = "choose piece human";
    }

}
