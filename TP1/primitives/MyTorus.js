

 class MyTorus extends CGFobject
 {
     constructor(scene, inner, outer, slices, loops)
     {
        super(scene);
        this.inner = inner;
        this.outer = outer;
        this.slices = slices;
        this.loops = loops;
        
        this.initBuffers();
     };
 
     initBuffers() 
     {
         this.vertices = [];
         this.indices = [];
         this.normals = [];
         this.texCoords = [];
 
         var thetaInc = 2*Math.PI / this.slices;
         var phiInc= 2*Math.PI / this.loops;
 
     var phi=0;
     var theta=0;
   
     
     for(let slice = 0; slice <= this.slices; slice++) {
       
       theta=0;
        for(let loop = 0; loop <= this.loops; loop++) {
             
                 this.vertices.push((this.outer+this.inner*Math.cos(theta))*Math.cos(phi),(this.outer+this.inner*Math.cos(theta))*Math.sin(phi),this.inner*Math.sin(theta));
 
                 this.normals.push(Math.cos(theta)*Math.cos(phi), Math.cos(theta)*Math.sin(phi),Math.sin(theta));
 
         this.texCoords.push(slice/this.slices, 1-loop/this.loops);					
         theta+=thetaInc;
         
       }
       phi+=phiInc;
        }
 
     // indexes
         for (let slice = 0; slice < this.slices; slice++) {
             for(let loop = 0; loop < this.loops; loop++) {
     
                 this.indices.push((slice+1)*(this.loops+1) + loop, slice*(this.loops+1) + loop+1, slice*(this.loops+1) + loop,slice*(this.loops+1) + loop+1, (slice+1)*(this.loops+1) + loop, (slice+1)*(this.loops+1) + loop+1);
             }
         }	
 
         this.primitiveType = this.scene.gl.TRIANGLES;
         this.initGLBuffers();
     }
 
     

     
 };
 