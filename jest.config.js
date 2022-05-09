module.exports = {
	preset: 'jest-preset-angular',
	setupFilesAfterEnv: [ '<rootDir>/setup-jest.ts' ],
	moduleDirectories: ['.', 'node_modules'],
	// moduleNameMapper: {
	// 	"@core/(.*)": ["<rootDir>/projects/core/$1"]
	// },
	modulePathIgnorePatterns: [
		"dist"
	],
	testRunner: 'jest-jasmine2',
	transform: {
		// "\\.(css|scss)$": "<rootDir>/jest-style-mocks.js"
	}
};
