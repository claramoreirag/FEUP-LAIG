attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;

uniform vec2 spriteCoords;
uniform vec2 sizeSpriteSheet;
uniform sampler2D uSampler;

varying vec2 vTextureCoord;
varying vec3 vVertexPosition;

void main() {
	gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);

	vTextureCoord = aTextureCoord/sizeSpriteSheet;
}

