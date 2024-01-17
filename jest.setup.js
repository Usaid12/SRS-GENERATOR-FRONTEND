// Polyfill "window.fetch" used in the React component.
import 'whatwg-fetch'

// Extend Jest "expect" functionality with Testing Library assertions.
import '@testing-library/jest-dom'

import { server } from './src/mocks/server'

// jest.useFakeTimers();

beforeAll(() => {
    console.log("Server is listening")
  server.listen()
})

afterEach(() => {
    
  server.resetHandlers()
})

afterAll(() => {
  server.close()
})
