/**
 * Plane
 */
class Plane extends CGFobject {
	constructor(scene, uDivs, vDivs) {
        super(scene);
        this.uDivs = uDivs;
        this.vDivs = vDivs;
        this.surface = new CGFnurbsSurface(1, 1, [ [ [-0.5, 0, 0.5, 1], [-0.5, 0, -0.5, 1] ], [ [0.5, 0, 0.5, 1], [0.5, 0, -0.5, 1] ] ]);
        this.object = new CGFnurbsObject(scene, uDivs, vDivs, this.surface);
        
	}

    changeTexCoords(length_s, length_t){};
    
    display(){
        this.object.display();
    }
}