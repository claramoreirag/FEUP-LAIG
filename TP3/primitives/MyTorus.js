
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

     
	 let theta = 0;  //angle between slices
	 let phi = 0; //angle between each loop
	 
	 let thetaInc = 2*Math.PI / this.slices; //theta increment 
	 let phiInc = 2*Math.PI / this.loops; //phi increment

	 for (let loop = 0; loop <= this.loops; loop++) {
		 
		theta = 0;
		for (let slice = 0; slice <= this.slices; slice++) {

		this.vertices.push((this.outer+this.inner*Math.cos(theta))*Math.cos(phi),(this.outer+this.inner*Math.cos(theta))*Math.sin(phi),this.inner*Math.sin(theta));

		this.normals.push(Math.cos(theta)*Math.cos(phi), Math.cos(theta)*Math.sin(phi),Math.sin(theta));

		this.texCoords.push(slice / this.slices, loop / this.loops);

		theta += thetaInc;

		}
		
		phi += phiInc;
	 }

	 //indexes
	 for (let loop = 0; loop < this.loops; loop++) {
		 for (let slice = 0; slice < this.slices; slice++) {
			 
			 let i1 = (this.slices + 1) * loop + slice;         
			 let i3 = (this.slices + 1) * (loop + 1) + slice;  
			 
			 this.indices.push(i3 + 1, i1, i3);
			 this.indices.push(i1 + 1, i1, i3 + 1);
			 
		 }
	 }

	 this.primitiveType = this.scene.gl.TRIANGLES;
	 this.initGLBuffers();
    }
    
 };