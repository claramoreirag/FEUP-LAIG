/**
 * MyTriangle
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyTriangle extends CGFobject {

    constructor(scene, x1,y1, x2, y2 ,x3, y3, afs, aft) {
        super(scene);
        this.x1 = x1;
        this.x2 = x2;
        this.x3 = x3;
        this.y1 = y1;
        this.y2 = y2;
        this.y3 = y3;
        this.afs = afs == null ? 1 : afs;
		this.aft = aft == null ? 1 : aft;

        this.initBuffers();
    }
    
    initBuffers() {
        this.vertices = [
            this.x1, this.y1, 0,
            this.x2, this.y2, 0,
            this.x3, this.y3, 0,
        ];

        this.indices = [
            0, 1,2
        ];


        //Facing Z positive
        this.normals = [
            0,0,1,
            0,0,1,
            0,0,1
        ];

        

    this.a = Math.sqrt((this.x2 - this.x1) * (this.x2 - this.x1) + (this.y2 - this.y1) * (this.y2 - this.y1) ); // dist p1 -> p2
    this.b = Math.sqrt((this.x3 - this.x2) * (this.x3 - this.x2) + (this.y3 - this.y2) * (this.y3 - this.y2) ); // dist p2 -> p3
    this.c = Math.sqrt((this.x1 - this.x3) * (this.x1 - this.x3) + (this.y1 - this.y3) * (this.y1 - this.y3) ); // dist p1 -> p3

    this.cos = (this.a * this.a - this.b * this.b + this.c * this.c) / (2 * this.a * this.c);
    this.sin = Math.sqrt(1 - this.cos * this.cos);

    let dist_s = this.a;
    let dist_t =- this.c*this.sin;
    let dist_ss = this.c*this.cos;

    let s = dist_s/this.afs;
    let t = dist_t/this.aft;
    let ss = dist_ss/this.afs;

    this.texCoords = [
        0, 0,
        s, 0,
        ss, t
    ];
        
        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }

    




};
	

	
