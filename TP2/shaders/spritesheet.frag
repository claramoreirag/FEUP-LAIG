#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;
uniform sampler2D uSampler;

varying vec3 vVertexPosition;
uniform vec2 spriteCoords;
uniform vec2 sizeSpriteSheet;

void main() {
	vec2 offset = spriteCoords / sizeSpriteSheet;
	gl_FragColor = texture2D(uSampler, vTextureCoord+offset);

	if (gl_FragColor.r <= 0.01)
  		discard;
}
