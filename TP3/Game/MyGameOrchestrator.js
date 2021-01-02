/**
 * MyGameOrchestrator
 */
class MyGameOrchestrator extends CGFobject {
    constructor(scene) {
        super(scene);
        this.themes=["LAIG_TP1_T3_G03.xml","park.xml"];
        this.currentTheme=0;
        var filename = getUrlVars()['file'] ||this.themes[0];
        this.graph = new MySceneGraph(filename, scene);
        this.gameboard = new MyGameboard(scene);
        this.gameSequence= new MyGameSequence(scene);
        //this.state = "choose piece human";
        this.state="main menu";
        this.player = 1;
        this.movetomake = [];
        //TODO scoreBoard
        //this.scoreboard=

        this.currentPlayer = null;
        this.mode = null;
        this.wins = null;
        this.difficulty = null;
        this.valueInterface=[];
        this.valueInterface['check win']=true;

        this.prolog = new MyPrologInterface();

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
        this.scene.registerForPick(numberPickedObjects++, this.cameraButton);
        this.cameraButton.display();
        this.scene.translate(1.5, 0, 0);
        this.scene.registerForPick(numberPickedObjects++, this.exitButton);
        this.exitButton.display();
        this.scene.translate(1.5, 0, 0);
        this.scene.registerForPick(numberPickedObjects++, this.themeButton);
        this.themeButton.display();
        this.scene.clearPickRegistration();
        this.scene.translate(1.5, 0, 0);
        this.scene.popMatrix();
    }


    orquestrate() {
        switch (this.state) {
            case "make player move":
                this.state = "request update move";
                this.makeMove();
                console.log(this.lastMove);
                break;

            case "make bot move":
                this.reply = this.prolog.popReply();
                if(this.reply != null){
                  console.log(this.reply);
                  this.makeBotMove(this.reply);
                  this.lastMove = this.reply;
                  console.log(this.lastMove);
                  this.state = "request update move";
                }
                break;
            
            case "request update move":
                this.prolog.requestMove(this.gamestate,this.lastMove);
                this.state = "get gamestate";
                break;

            case "get gamestate":
                this.reply = this.prolog.popReply();
                if(this.reply != null){
                  this.gamestate = this.reply.gamestate;
                  console.log(this.gamestate);
                  console.log(this.valueInterface['check win']);

                  if(this.valueInterface['check win'])
                    this.state = 'request value';
                  else 
                    this.state = 'switch player';
                }
                break;

            case "choose bot move":
                this.prolog.requestMoveBot(this.gamestate,this.difficulty);
                this.state = "make bot move"; 
                break;

            case "start game":
                this.state = "next player";
                break;

            case "request value":
                console.log("current player: " + this.currentPlayer);
                this.prolog.requestValue(this.gamestate,this.currentPlayer);
                this.state = "get value";
                break;

            case "get value":
                this.reply = this.prolog.popReply();
                if(this.reply!=null){
                  this.wins = this.reply; 
                  console.log("wins : " + this.wins);
                  console.log("gs wins: " + this.gamestate.wins);
                  if(this.wins.toString() != this.gamestate.wins.toString()){
                    //TODO
                    alert(this.currentPlayer + "won");
                    this.gameBoard.reset();
                    this.state = "request gamestate"; 
                  }
                  else this.state = "switch player";
                }
                break;

            case "switch player":
                this.switchPlayers(); 
                this.state = "next player";
                break;

            case "next player":
                if(this.currentPlayer.includes("Bot"))
                  this.state = "choose bot move";
                else
                  this.state = "choose piece human";
                break;

            case "request gamestate":
                this.prolog.requestInitial(this.mode);
                this.state = "get initial gamestate";
                break;

            case "get initial gamestate":
                this.reply = this.prolog.popReply();
                if(this.reply!=null){
                  this.gamestate = this.reply.gamestate; 
                  if(this.wins == null){
                    this.currentPlayer = this.gamestate.players[0];
                    this.wins = this.gamestate.wins;
                  }
                  console.log(this.currentPlayer);
                  this.state = "start game";
                }
                break;

            case "animation":
                this.scene.setPickEnabled(false);
               
                if (this.animator.over){
                    if(this.animator instanceof MyUndoAnimator)this.animator.finish();
                    this.animator=null;
                    this.scene.setPickEnabled(true);
                    this.state =this.prevState;       
                }
                break;
            case "camera animation":
                this.scene.setPickEnabled(false);
                if (this.animator.over){
                    this.animator=null;
                    this.state = this.prevState;
                    this.scene.setPickEnabled(true);
                    this.scene.camera = this.scene.cameras[this.scene.camerasID[this.scene.selectedCamera]];
                    this.scene.interface.setActiveCamera(this.scene.camera);
                }
                break;
            default:
                break;
        }

        console.log(this.state);
    }

    changeTheme() {
        this.currentTheme=((this.currentTheme+1) % 2) ;
        this.scene.sceneInited = false;
        this.graph = new MySceneGraph(this.themes[this.currentTheme], this.scene);
    }

    load() {

        this.undoButton = new MyButton(this.scene, "Undo", "purple");
        this.exitButton = new MyButton(this.scene, "Exit", "orange");
        this.movieButton = new MyButton(this.scene, "Movie", "orange");
        this.confirmButton = new MyButton(this.scene, "Confirm", "orange");
        this.removeButton = new MyButton(this.scene, "Remove", "orange");
        this.cameraButton = new MyButton(this.scene, "Camera","purple");
        this.undoButton = new MyButton(this.scene, "Undo", "purple");
        this.themeButton = new MyButton(this.scene, "Change Theme", "purple");
        this.playButton = new MyButton(this.scene,"Play","orange");
        this.playerVSplayer= new MyButton(this.scene,"Player VS Player","purple");
        this.playerVSbot = new MyButton(this.scene,"Player VS Bot","purple");
        this.botVSbot = new MyButton(this.scene,"Bot VS Bot","purple");
        this.easyButton= new MyButton(this.scene,"Easy","orange");
        this.hardButton= new MyButton(this.scene,"Hard","orange");

        this.gameboard.load();
    }

    display() {
        this.orquestrate();
        this.managePick();

        //this.graph.displayScene();
        let numberPickedObjects=1;
        // if(this.state == "animation"){
        //     this.gameboard.display(false, this.animator.pieces);
        //     this.animator.display();
        //     numberPickedObjects++;
        //     this.displayButtons(numberPickedObjects);
        // }
        // else{
        // let numberpicked = this.gameboard.display();
        // this.displayButtons(numberpicked);
        // }
        // //example of request to prolog
        // let prolog = new MyPrologInterface();

        switch(this.state){
          case "main menu":
            this.scene.pushMatrix();
            this.scene.scale(6,6,6);
            this.scene.registerForPick(1,this.playButton);
            this.playButton.display();
            this.scene.clearPickRegistration();
            this.scene.popMatrix();
            break;
          case "choose mode":
            this.scene.pushMatrix();
            this.scene.scale(6,6,6);
            this.scene.registerForPick(1,this.playerVSplayer);
            this.playerVSplayer.display();
            this.scene.clearPickRegistration();
            this.scene.translate(0,0,0.5);
            this.scene.registerForPick(2,this.playerVSbot);
            this.playerVSbot.display();
            this.scene.clearPickRegistration();
            this.scene.translate(0,0,0.5);
            this.scene.registerForPick(3,this.botVSbot);
            this.botVSbot.display();
            this.scene.clearPickRegistration();
            this.scene.popMatrix();
            break;
          case "choose difficulty":
            this.scene.pushMatrix();
            this.scene.scale(6,6,6);
            this.scene.registerForPick(1,this.easyButton);
            this.easyButton.display();
            this.scene.clearPickRegistration();
            this.scene.translate(0,0,0.5);
            this.scene.registerForPick(2,this.hardButton);
            this.hardButton.display();
            this.scene.clearPickRegistration();
            this.scene.popMatrix();
            break;
         case "animation":
            this.gameboard.display(false, this.animator.pieces);
            this.animator.display();
            this.graph.displayScene();
            numberPickedObjects++;
            this.displayButtons(numberPickedObjects);
            break;
          default:
            let numberpicked = this.gameboard.display();
            this.displayButtons(numberpicked);
            this.graph.displayScene();
        }

        //example of request to prolog
        /*let prolog = new MyPrologInterface();

        // let gamestate = [[[0,0],[0,0,0],[0,0,0,0],[0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0],[0,0,0,0],[0,0,0],[0,0]],[42,42,42],[['P','G','O'],['G','O','P']],[-1,0,-1],['Player1','Player2'],1];

        prolog.requestInitial();*/
    }


    update(t) {
        if (this.animator != undefined)
            this.animator.update(t);
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
                obj.selected=true;
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
                    this.movetomake[0].selected=false;
                    this.movetomake = [];
                    this.state = "choose piece human";
                }
            }
            else if (obj.id=="Change Theme"){
                //if (this.state == "wait confirm" || this.state == "choose tile human"){
                this.scene.hasChangedgraph=true;
                   this.changeTheme();
                
            }
            else if(obj.id == "Camera"){
                this.prevState=this.state;
                this.state="camera animation";
                this.changeCamera();
            }
            else if (obj.id == "Undo"){
                if (this.state == "wait confirm" || this.state == "choose tile human"){
                    if(this.movetomake[1]!=null)this.movetomake[1].selected=false;
                    this.movetomake[0].selected=false;
                    this.movetomake = [];
                    this.state = "choose piece human";
                }
                this.state="choose piece human";
                if (this.gameSequence.gameMoves.length != 0){
                    this.undo();
                }
                
            }
            else if(obj.id == "Movie"){
                if (this.state == "wait confirm" || this.state == "choose tile human"){
                    if(this.movetomake[1]!=null)this.movetomake[1].selected=false;
                    this.movetomake[0].selected=false;
                    this.movetomake = [];
                    this.prevState = "choose piece human";
                }
                else{this.prevState=this.state;}
                if (this.gameSequence.gameMoves.length != 0){
                    this.state="movie";
                    this.movie();
                }
            
            }else if (obj.id=="Play"){
                this.state="choose mode";
            }
            else if(obj.id =="Player VS Player"){
                this.mode=1;
                this.state="request gamestate";
            }
            else if(obj.id =="Player VS Bot"){
                this.mode=2;
                this.state="choose difficulty";
            }
            else if(obj.id =="Bot VS Bot"){
                this.mode=3;
                this.state="choose difficulty";
            }
            else if(obj.id == "Easy"){
                this.difficulty=0;
                this.state = "request gamestate";
            }
            else if(obj.id =="Hard"){
                this.difficulty=1; 
                this.state = "request gamestate";
            }
            else if(obj.id == "Exit"){
                this.state="main menu";
                this.gameboard.reset();
            }

        }
    }

    makeBotMove(move){
      let colors = ['orange', 'purple', 'green'];
      let line = move[0];
      let column = move[1];
      let colorCode = move[2];
      let color = colors[colorCode-1]

      let tile = this.gameboard.findTile(line,column);
      let stack = this.gameboard.findStack(color);

      this.movetomake[0] = stack;
      this.movetomake[1] = tile;

      this.makeMove(); 
    }



    makeMove() {
        let color = ['orange', 'purple', 'green'].indexOf(this.movetomake[0].color) + 1;
        let line = this.movetomake[1].line;
        let column = this.movetomake[1].column;
        this.lastMove = [line,column,color];

        let destTile = this.movetomake[1];
        destTile.selected=false; 
        destTile.selectable = false;
        this.movetomake[0].selected=false;
        let pieceToMove = this.movetomake[0].getTopPiece();
        let originTile = pieceToMove.getholdingCell();
        this.gameboard.movePiece(pieceToMove, destTile);
        
        let move = new MyGameMove(this.scene, pieceToMove, originTile, destTile, this.gameboard);
        this.gameSequence.addGameMove(move);

        //this.currentPlayer = (this.currentPlayer % 2) + 1;
        this.movetomake = [];

        this.animator = new MyMoveAnimator(this.scene, move);
        this.prevState=this.state;
        this.state = "animation";
        //this.state = "choose piece human";
    }


    undo(){
        let reverseMove = this.gameSequence.undo(this.gameboard);
        this.currentPlayer = (this.currentPlayer % 2) + 1;
        
        //activate animation 
        this.animator = new MyUndoAnimator(this.scene, reverseMove);
        this.state="animation";
    }

    movie(){
        this.animator = new MyMovieAnimator(this.scene, this.gameSequence.gameMoves);
        this.state="animation";
    }

    changeCamera(){
        let origCamID=this.scene.camerasID[this.scene.selectedCamera];
        let originCamera = this.scene.cameras[origCamID];
        let destCamID =(origCamID+1)%this.scene.cameras.length;

        this.scene.selectedCamera = this.scene.getCameraKey(destCamID);
        let destination = this.scene.cameras[destCamID];
        this.animator = new MyCameraAnimator(this.scene, originCamera, destination, 3);

    }


    switchPlayers(){
        if(this.gamestate.players[0] == this.currentPlayer)
          this.currentPlayer = this.gamestate.players[0];
        else
          this.currentPlayer = this.gamestate.players[1];
    }

}
