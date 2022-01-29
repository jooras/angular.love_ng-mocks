module.exports = {
	preset: 'jest-preset-angular',
	setupFilesAfterEnv: [ '<rootDir>/setup-jest.ts' ],
	moduleDirectories: ['.', 'node_modules'],
	modulePathIgnorePatterns: [
		"dist"
	],
	testRunner: 'jest-jasmine2'
};
