class MyScoreBoard{
    constructor(scene,gamestate,timeout){
        this.scene=scene;
        this.gamestate=gamestate;
        this.surface=new MyCube(scene);
        this.material= this.scene.graph.materialList.getMaterial("cinza");
        this.orangeButton = new MyButton(this.scene, "Orange", "orange");
        this.purpleButton = new MyButton(this.scene, "Purple", "purple");
        this.greenButton = new MyButton(this.scene, "Green", "green");
        this.orangewinner = new MyButton(this.scene, "No one", "cinza");
        this.purplewinner = new MyButton(this.scene, "No One", "cinza");
        this.greenwinner = new MyButton(this.scene, "No One", "cinza");
    }
  
   /** Update scoreboard */
   update(players,wins){
       if(wins[0]!=-1) this.orangewinner = new MyButton(this.scene, players[wins[0]], "cinza");
       if(wins[1]!=-1) this.purplewinner = new MyButton(this.scene, players[wins[1]], "cinza");
       if(wins[2]!=-1) this.greenwinner = new MyButton(this.scene, players[wins[2]], "cinza");
   }
  
   /** Display scoreboard */
    display(){
      this.scene.pushMatrix();
      this.scene.translate(1.7,3.4,5);
      this.scene.pushMatrix();
      this.scene.rotate(Math.PI/8,0,0,1);
      this.scene.scale(0.4,2.2,4.5);

      this.material.apply();
      this.surface.display();
      this.scene.popMatrix();
      this.scene.translate(0.13,0.4,2.15);
      this.scene.rotate(-3*Math.PI/8,0,0,1);
      this.scene.rotate(Math.PI/2,0,1,0);
      this.scene.scale(0.7,0.9,0.9);
      this.scene.pushMatrix();
      this.orangeButton.display(); 
      this.scene.translate(2.2,0,0);
      this.purpleButton.display(); 
      this.scene.translate(2.2,0,0);
      this.greenButton.display(); 
      this.scene.popMatrix();
      this.scene.translate(0,-0.05,0.6);
      this.orangewinner.display();
      this.scene.translate(2.2,0,0);
      this.purplewinner.display();
      this.scene.translate(2.2,0,0);
      this.greenwinner.display();
      this.scene.popMatrix();
    }
  
  }
  
