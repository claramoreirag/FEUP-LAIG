//From https://github.com/EvanHahn/ScriptInclude
include=function(){function f(){var a=this.readyState;(!a||/ded|te/.test(a))&&(c--,!c&&e&&d())}var a=arguments,b=document,c=a.length,d=a[c-1],e=d.call;e&&c--;for(var g,h=0;c>h;h++)g=b.createElement("script"),g.src=arguments[h],g.async=!0,g.onload=g.onerror=g.onreadystatechange=f,(b.head||b.getElementsByTagName("head")[0]).appendChild(g)};
serialInclude=function(a){var b=console,c=serialInclude.l;if(a.length>0)c.splice(0,0,a);else b.log("Done!");if(c.length>0){if(c[0].length>1){var d=c[0].splice(0,1);b.log("Loading "+d+"...");include(d,function(){serialInclude([]);});}else{var e=c[0][0];c.splice(0,1);e.call();};}else b.log("Finished.");};serialInclude.l=new Array();

function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi,    
    function(m,key,value) {
      vars[decodeURIComponent(key)] = decodeURIComponent(value);
    });
    return vars;
}	 
//Include additional files here
serialInclude(['../lib/CGF.js', 'XMLscene.js', 'MySceneGraph.js', 'MyInterface.js', 'primitives/MyRectangle.js','primitives/MyCube.js','primitives/MyQuad.js',
'data_structures/Material.js','data_structures/Stack.js','data_structures/Graph.js','data_structures/Texture.js','Game/MyScoreBoard.js',
'primitives/MySphere.js','primitives/MyCylinder.js','primitives/MyTorus.js','primitives/MyTriangle.js', 'animations/Animation.js','primitives/Plane.js','primitives/Patch.js','primitives/Defbarrel.js'
,'animations/KeyframeAnimation.js','animations/MySpriteAnimation.js','primitives/MySpriteSheet.js','primitives/MySpriteText.js',
'Game/MyTile.js','Game/MyAnimator.js','Game/MyMoveAnimator.js','animations/MyCurvedAnimation.js','Game/MyCameraAnimator.js','Game/MyUndoAnimator.js','Game/MyMovieAnimator.js',
'Game/MyStack.js','Game/MyGameBoard.js','Game/MyGameOrchestrator.js','Game/MyPiece.js','primitives/GameBoard.js','primitives/Piece.js','primitives/MyButton.js','server/MyPrologInterface.js','Game/MyGameMove.js','Game/MyGameSequence.js','Game/MyGameTimer.js',

main=function()
{
	// Standard application, scene and interface setup
    var app = new CGFapplication(document.body);
    var myInterface = new MyInterface();
    var myScene = new XMLscene(myInterface);

    app.init();

    app.setScene(myScene);
    app.setInterface(myInterface);

    myInterface.setActiveCamera(myScene.camera);

	
	
	// start
    app.run();
}

]);
