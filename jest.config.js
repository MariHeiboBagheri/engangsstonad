module.exports = {
	roots: ['<rootDir>/src'],
	transform: {
        '^.+\\.tsx?$': 'ts-jest',
        "^.+\\.jsx$": 'babel-jest',
        "^.+\\.js$": 'babel-jest'
    },
    testEnvironment: "node",
	testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$',
	moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
	testPathIgnorePatterns: ['/node_modules/'],
	moduleNameMapper: {
		'\\.(css|less|scss|sass|less)$': '<rootDir>/node_modules/jest-css-modules',
        '\\-style$': '<rootDir>/node_modules/jest-css-modules',
        '\\.svg$': '<rootDir>/src/test/fileTransform.js',
        '^components[/](.+)': '<rootDir>/src/app/components/$1',
        '^intl[/](.+)': '<rootDir>/src/app/intl/$1',
        '^util[/](.+)': '<rootDir>/src/app/util/$1',
        '^assets[/](.+)': '<rootDir>/src/app/assets/$1',
	},
    setupFiles: [
        '<rootDir>/src/test/adapter.js',
        '<rootDir>/src/test/helpers.js',
        '<rootDir>/src/test/setup.js',        
    ]
};
