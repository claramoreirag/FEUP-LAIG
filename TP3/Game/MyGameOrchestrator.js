/**
 * MyGameOrchestrator
 */
class MyGameOrchestrator extends CGFobject {
	constructor(scene) {
        super(scene);
        var filename=getUrlVars()['file'] ||"LAIG_TP1_T3_G03.xml";
        this.graph = new MySceneGraph(filename, scene);
        this.gameboard = new MyGameboard(scene);
        this.idforpick=1;
        //TODO scoreBoard
        //this.scoreboard=

    }
    changeTheme(){
        
        this.graph = new MySceneGraph("park.xml", this.scene);
        this.scene.sceneInited=false;
    }

    load(){
        this.gameboard.load();
    }

    display(){
        this.managePick();

        this.gameboard.display();
       
        this.graph.displayScene();
        
        //example of request to prolog
        let prolog = new MyPrologInterface();
        //prolog.requestCheckConnection();
    }
    
    managePick() {
        if (this.scene.pickMode == false /* && some other game conditions */){
            if (this.scene.pickResults != null && this.scene.pickResults.length > 0) { // any results?
                for (var i=0; i< this.scene.pickResults.length; i++) {
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
        if(obj instanceof MyTile){
           // obj.selected=true;
           console.log("picked tile "+obj.id);
        }
        if(obj instanceof MyStack){
            console.log("picked stack "+obj.nodeId);
        }
    }
}
