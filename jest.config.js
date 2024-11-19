const config = {
  preset: 'ts-jest',
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  testEnvironment: 'jsdom',

  modulePathIgnorePatterns: ['<rootDir>/dist/', '<rootDir>/example/'],
  // Setting the root will also effectively exclude the dist folder.
  roots: ['<rootDir>/src'],
  // collectCoverage: true,
  coverageDirectory: 'coverage',
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/src/__mocks__/fileMock.js',
    '\\.(css|scss|less)$': 'identity-obj-proxy'
  }
}

export default config
