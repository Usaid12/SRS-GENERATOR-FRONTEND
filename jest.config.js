module.exports = {
  testEnvironment: "jsdom",
  testEnvironmentOptions: {
    customExportConditions: [""],
  },
  moduleFileExtensions: ["js", "jsx", "json", "node", "css"],
  setupFilesAfterEnv: ["./jest.setup.js"],

  transform: {
    "^.+\\.(js|jsx)$": "babel-jest",
  },
  moduleNameMapper: {
    "\\.(css|less)$": "identity-obj-proxy",
  },
  setupFiles: ["./jest.polyfills.js"],
};
