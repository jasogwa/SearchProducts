module.exports = {
	globals: {
		React: true,
		JSX: true,
		TSX: true
	},
	root: true,
	env: { browser: true, es2020: true },
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:react-hooks/recommended',
		'plugin:prettier/recommended'
	],
	ignorePatterns: ['dist', '.eslintrc.cjs'],
	parser: '@typescript-eslint/parser',
	plugins: ['react-refresh', 'prettier'],
	rules: {
		'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
		'prettier/prettier': 'error',
		'@typescript-eslint/no-misused-promises': [
			'error',
			{
				checksVoidReturn: false
			}
		],
		'@typescript-eslint/no-explicit-any': 'off',
		'no-unused-vars': 0,
		'@typescript-eslint/no-unused-vars': [1, { ignoreRestSiblings: true }],
		'no-redeclare': 'off',
		'@typescript-eslint/no-redeclare': [
			'warn',
			{
				ignoreDeclarationMerge: true
			}
		],
		'@typescript-eslint/no-floating-promises': 'off',
		'@typescript-eslint/no-use-before-define': 'off',
		'no-undef': 'off',
		'no-shadow': 'off' // TS does it
	}
};
