class MyGameTimer{
  constructor(scene,timeout){
    this.scene=scene;
    this.timeout = timeout == undefined ? 30 : timeout;
    this.start = 0;
    this.on = false;
    this.seconds = 0;
    this.timeSprite = new MySpriteText(scene,"00:00");
  }

  setTimeout(s){
    this.timeout = s;
  }

  turnOn(){
    this.on=true;
  }

  turnOff(){
    this.on=false;
    this.seconds = 0;
    this.start = 0;
  }
   
  update(t){
    if(this.on){
      if(this.start == 0)
        this.start = t;

      this.seconds = Math.floor((t-this.start)/1000);
      this.updateSprites();
    }
  }

  timeoutOcurred(){
    return this.timeout <= this.seconds;
  }

  reset(){
    this.seconds = 0;
  }

  updateSprites(){
    let seconds = ("0" + (this.seconds%60).toString()).slice(-2);
    let remainder = Math.floor(this.seconds/60);
    let minutes = ("0" + remainder.toString()).slice(-2);
    this.timeSprite.setText(minutes + ":" + seconds);
  }

  display(){
    this.scene.pushMatrix();
    this.scene.translate(1.64,4.2,6.25);
    this.scene.rotate(Math.PI/8,0,0,1);
    this.scene.rotate(Math.PI/2,0,1,0);
    this.scene.scale(0.6,0.8,0.8);
    this.timeSprite.display();
    this.scene.popMatrix();
  }

}
