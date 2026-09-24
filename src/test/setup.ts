import { cleanup } from '@testing-library/react'
import { afterEach } from 'vitest'
import '@testing-library/jest-dom/vitest'

// Mock ResizeObserver
globalThis.ResizeObserver = class ResizeObserver {
  observe() {
    // mock
  }

  unobserve() {
    // mock
  }

  disconnect() {
    // mock
  }
}

// Mock PointerEvent methods for jsdom
if (typeof Element !== 'undefined') {
  Element.prototype.setPointerCapture = function () {
    /* mock */
  }
  Element.prototype.releasePointerCapture = function () {
    /* mock */
  }
  Element.prototype.hasPointerCapture = function () {
    return false
  }
}

afterEach(() => {
  cleanup()
})
