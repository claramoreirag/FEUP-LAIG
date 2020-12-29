/**
 * MyAnimator
 */
class MyAnimator extends CGFobject{
  constructor(scene,orchestrator,gameSequence){
    super(scene);
    this.gameSequence = gameSequence; //MyGameSequence object
    this.orchestrator = orchestrator; //MyGameOrchestrator
  }

  setGameSequence(gameSequence){
    this.gameSequence = gameSequence;
  }

  setGameOrchestrator(orchestrator){
    this.orchestrator = orchestrator;
  }
  
  start(){
    //TODO
  }

  reset(){
    //TODO
  }

  update(time){
    //TODO  
  }

  display(){
    //TODO
  }

}
