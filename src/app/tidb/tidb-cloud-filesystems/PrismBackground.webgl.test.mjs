import assert from 'node:assert/strict'
import test from 'node:test'

import { disposePrismWebGL } from './PrismBackground.webgl.ts'

test('cleanup releases owned resources without losing the reusable canvas context', () => {
  const calls = []
  const buffer = {}
  const program = {}
  const vertexShader = {}
  const fragmentShader = {}

  const gl = {
    deleteBuffer(resource) {
      calls.push(['buffer', resource])
    },
    deleteProgram(resource) {
      calls.push(['program', resource])
    },
    deleteShader(resource) {
      calls.push(['shader', resource])
    },
    getExtension(name) {
      calls.push(['extension', name])
      return {
        loseContext() {
          calls.push(['lose-context'])
        },
      }
    },
  }

  disposePrismWebGL(gl, {
    buffer,
    program,
    shaders: [vertexShader, fragmentShader],
  })

  assert.deepEqual(calls, [
    ['buffer', buffer],
    ['program', program],
    ['shader', vertexShader],
    ['shader', fragmentShader],
  ])
})
