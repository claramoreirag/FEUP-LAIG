/**
 * MyGameOrchestrator
 */
class MyGameOrchestrator extends CGFobject {
	constructor(scene) {
        super(scene);
        var filename=getUrlVars()['file'] ||"park.xml";
        this.graph = new MySceneGraph(filename, scene);
        this.gameboard = new MyGameboard(scene);

    // get file name provided in URL, e.g. http://localhost/myproj/?file=myfile.xml
	// or use "demo.xml" as default (assumes files in subfolder "scenes", check MySceneGraph constructor)
	// create and load graph, and associate it to scene.
	// Check console for loading errors

    }
    load(){
        this.gameboard.load();
    }

    display(){
        this.graph.displayScene();
        
        //example of request to prolog
        let prolog = new MyPrologInterface();

        let gamestate = [[[0,0],[0,0,0],[0,0,0,0],[0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0],[0,0,0,0],[0,0,0],[0,0]],[42,42,42],[['P','G','O'],['G','O','P']],[-1,0,-1],['Player1','Player2'],1];

        prolog.requestInitial();
    }
    
   

}
