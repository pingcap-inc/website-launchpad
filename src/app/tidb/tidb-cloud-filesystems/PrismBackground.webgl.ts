export interface PrismWebGLResources {
  buffer: WebGLBuffer | null
  program: WebGLProgram
  shaders: readonly WebGLShader[]
}

export function disposePrismWebGL(
  gl: WebGLRenderingContext,
  { buffer, program, shaders }: PrismWebGLResources
) {
  gl.deleteBuffer(buffer)
  gl.deleteProgram(program)
  shaders.forEach((shader) => gl.deleteShader(shader))
}
