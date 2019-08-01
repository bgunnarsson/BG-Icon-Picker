module.exports = {
	env: {
		'es6': true,
		'node': true,
		'browser': true,
	},
	parser: '@typescript-eslint/parser',
	extends: [
		"airbnb",
		'plugin:@typescript-eslint/recommended',
		"plugin:jsx-a11y/recommended",
	],
	"plugins": ["@typescript-eslint"],
	parserOptions: {
		ecmaVersion: 2018,
		sourceType: 'module',  // Allows for the use of imports
	},
	settings: {
		react: {
			version: 'latest',  // Tells eslint-plugin-react to automatically detect the version of React to use
		},
	},
	rules: {
		"@typescript-eslint/explicit-function-return-type": "off",
		"@typescript-eslint/explicit-member-accessibility": "off",
		"@typescript-eslint/indent": "off",
		"@typescript-eslint/interface-name-prefix": "off",
		"@typescript-eslint/no-empty-interface": "off",
		"@typescript-eslint/no-explicit-any": "off",
		"@typescript-eslint/no-var-requires": "off",
		"class-methods-use-this": "off",
		"comma-dangle": ["error", "always-multiline"],
		"import/no-unresolved": "off",
		"import/no-webpack-loader-syntax": "off",
		"import/prefer-default-export": "off",
		"indent": ["error", 2],
		"jsx-a11y/accessible-emoji": "off",
		"jsx-a11y/label-has-associated-control": "off",
		"linebreak-style": ["error", "windows"],
		"lines-between-class-members": ["error", "always", { exceptAfterSingleLine: true }],
		"no-confusing-arrow": "off",
		"no-plusplus": "off",
		"object-curly-newline": "off",
		"padded-blocks": "off",
		"react/button-has-type": "off",
		"react/destructuring-assignment": "off",
		"react/jsx-filename-extension": "off",
		"react/jsx-one-expression-per-line": ["on", { "allow": "none" | "literal" | "single-child" }],
		"react/no-array-index-key": "off",
		"react/prefer-stateless-function": "off",
		"react/prop-types": [2, { ignore: ['children'] }],
		"semi": ["error", "always"],
	},
};
