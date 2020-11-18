
/**
 * Defbarrel
 */
class Defbarrel extends CGFobject {
	constructor(scene, base,middle,height,slices,stacks) {
        super(scene);
        this.base=base;
        this.middle=middle;
        this.height=height;
        this.slices=slices;
        this.stacks=stacks;
        this.surfaceUp = new CGFnurbsSurface(3,3,this.controlpointsUp());
        this.objectUp = new CGFnurbsObject(scene, slices, stacks, this.surfaceUp);
        this.surfaceDown = new CGFnurbsSurface(3,3,this.controlpointsDown());
        this.objectDown= new CGFnurbsObject(scene,slices,stacks, this.surfaceDown);
        
	}

    controlpointsUp(){
        let h =4/3*this.base;
        let H=4/3*(this.middle-this.base);
        let angle=Math.PI/6;

        return [	// U = 3
            [ // V = 0..3
               [ this.base, 0, 0, 1 ],
               [ this.base+H, 0, H/Math.tan(angle), 1 ],
               [ this.base+H, 0, this.height-H/Math.tan(angle), 1 ],
               [ this.base, 0, this.height, 1 ]
          ], 
           
          // U = 2
          [ // V = 0..3
            [ this.base, h, 0, 1 ],
            [ this.base+H, h+H, H/Math.tan(angle), 1 ],
            [ this.base+H, h+H, this.height-H/Math.tan(angle), 1 ],
            [ this.base, h, this.height, 1 ]
        ],
        // U = 1
        [ // V = 0..3
            [ -this.base, h, 0, 1 ],
            [ -this.base -H, h+H, H/Math.tan(angle), 1 ],
            [ -this.base -H, h+H, this.height-H/Math.tan(angle), 1 ],
            [ -this.base, h, this.height, 1 ]
        ],
        // U = 0
        [ // V = 0..3;
            [ -this.base, 0, 0, 1 ],
            [ -this.base -H, 0, H/Math.tan(angle), 1 ],
            [ -this.base -H, 0, this.height-H/Math.tan(angle),1 ],
            [ -this.base, 0, this.height,1 ]
       ]
        ];
       
    }


    controlpointsDown(){
        let h =4/3*this.base;
        let H=4/3*(this.middle-this.base);
        let angle=Math.PI/6;

        return [	// U = 0
            [ // V = 0..3
                [ -this.base, 0, 0, 1 ],
                [ -this.base -H, 0, H/Math.tan(angle), 1 ],
                [ -this.base -H, 0, this.height-H/Math.tan(angle),1 ],
                [ -this.base, 0, this.height,1 ]
            ], 
    
            // U = 1
            [ // V = 0..3
                [ -this.base, -h, 0, 1 ],
                [ -this.base -H, -h, H/Math.tan(angle), 1 ],
                [ -this.base -H, -h, this.height-H/Math.tan(angle), 1 ],
                [ -this.base, -h, this.height, 1 ]
            ],
            // U = 2
            [ // V = 0..3
                [ this.base, -h, 0, 1 ],
                [ this.base+H,- h, H/Math.tan(angle), 1 ],
                [ this.base+H, -h, this.height-H/Math.tan(angle), 1 ],
                [ this.base, -h, this.height, 1 ]
        ],
        // U = 3
           [ // V = 0..3;
                [ this.base, 0, 0, 1 ],
                [ this.base+H, 0, H/Math.tan(angle), 1 ],
                [ this.base+H, 0, this.height-H/Math.tan(angle), 1 ],
                [ this.base, 0, this.height, 1 ]
            ]
        ];
       
    }
    
    display(){
        this.objectUp.display();
        this.objectDown.display();
    }
}