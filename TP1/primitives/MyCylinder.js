class MyCylinder extends CGFobject {
    /**
     * @method constructor
     * @param  {CGFscene} scene - MyScene object
     * @param  {integer} slices - number of slices around Y axis
     * @param  {integer} height - number of stacks along Y axis, from the center to the poles (half of sphere)
       @param  {integer} radius
     */
    constructor(scene, height,topradius,bottomradius,stacks, slices) {
      super(scene);
      this.height=height;
      this.topradius=topradius;
      this.bottomradius=bottomradius;
      this.stacks=stacks;
      this.slices=slices;
      this.initBuffers();
    }
    
    /**
     * @method initBuffers
     * Initializes the cylinder buffers
     * TODO: DEFINE TEXTURE COORDINATES
     */
    initBuffers() {
      this.vertices = [];
      this.indices = [];
      this.normals = [];
      this.texCoords = [];
  
     
      var phi = 0;  //angle of each slice
      var phiInc =2* Math.PI / this.slices; //increment between slices
  
      var heightInc=this.height/this.stacks; //height increment between stacks
  
      var radiusInc=(this.topradius-this.bottomradius)/this.stacks; //radius increment between stacks
  
      var radius=this.bottomradius;
      var currentHeight=0;
  
      

      for (let stack= 0; stack <= this.stacks; stack++) {
  
        //resets the angle after each stack is built
        phi=0;
        for(let slice=0;slice<=this.slices;slice++){
  
          var xcord =- Math.sin(phi)*radius;
          var ycord= Math.cos(phi)*radius;
        
          this.vertices.push(xcord, ycord,currentHeight);
         
  
          this.normals.push(xcord, ycord, 0);
          this.texCoords.push(slice/this.slices, 1-stack/this.stacks);
          phi += phiInc;
          }
  
          //updates radius and height
          currentHeight+=heightInc;
          radius+=radiusInc;
         
        }
      
        //adding indexes
        for(let stack = 0; stack < this.stacks; stack++){
          for(let slice = 0; slice < this.slices; slice++){   
              let index = (stack * (this.slices + 1)) + slice;
              
              this.indices.push(index, index + 1, index + this.slices + 2);
              this.indices.push(index, index + this.slices + 2, index + this.slices + 1);
              
              
          }
      }
       
   
     //to draw the top
     let pivot = this.vertices.length / 3; //index of vertice from the bottom that will be part of all the triangles of the top
     phi = 0;

     for (let slice = 0; slice <= this.slices; slice++) {
         this.vertices.push( Math.cos(phi) * this.topradius,Math.sin(phi) * this.topradius,this.height);

         if (slice !=0) this.indices.push(pivot, pivot + slice - 1, pivot + slice);

         this.normals.push(0, 0, 1);

         this.texCoords.push((Math.cos(phi) + 1) / 2, (Math.sin(phi) + 1) / 2);

         phi += phiInc;
     }


     //to draw the bottom
     pivot = this.vertices.length / 3; //index of vertice from the bottom that will be part of all the triangles of the base
     phi = 0;

     for (let slice = 0; slice <= this.slices; slice++) {
         this.vertices.push( Math.cos(phi) * this.bottomradius,Math.sin(phi) * this.bottomradius,0);

         if (slice !=0) this.indices.push(pivot+slice, pivot + slice - 1, pivot);

         this.normals.push(0, 0, -1);

         this.texCoords.push((Math.cos(phi) + 1) / 2, (Math.sin(phi) + 1) / 2);

         phi += phiInc;
     }

  
      this.primitiveType = this.scene.gl.TRIANGLES;
      this.initGLBuffers();
      
     
    }
    
  }