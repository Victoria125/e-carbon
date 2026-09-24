import antfu from '@antfu/eslint-config'

export default antfu(
  {
    react: true,
    typescript: true,

    stylistic: {
      indent: 2,
      quotes: 'single',
      semi: false,
      jsx: true
    },

    formatters: {
      css: true,
      html: true,
      markdown: 'prettier'
    },

    ignores: ['dist/', 'build/', 'public/', '.next/', 'node_modules/', '*.min.js', 'docs/**/*.md', '**/*.md', 'docs/files/**/*']
  },
  {
    rules: {
      // ============================================
      // React Rules
      // ============================================
      'react-hooks/exhaustive-deps': 'error',
      'react/prop-types': 'off',

      // ============================================
      // TypeScript Rules - Type Safety (sem type information)
      // ============================================
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-non-null-assertion': 'error',
      '@typescript-eslint/array-type': ['error', { default: 'array-simple' }],

      // ============================================
      // General Code Quality
      // ============================================
      'no-console': ['warn', { allow: ['warn', 'error'] }],

      // ============================================
      // Antfu Config Overrides
      // ============================================
      'antfu/consistent-list-newline': 'off',
      'antfu/if-newline': 'off',
      'antfu/no-import-dist': 'off',
      'antfu/import-dedupe': 'error',

      'no-useless-return': 'off',

      // ============================================
      // Import Rules - Preferir imports absolutos (@/) ao invés de relativos (../)
      // ============================================
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['../*', '../../*', '../../../*', './*'],
              message: 'Use absolute imports with @ alias (e.g., @/hooks/useLanguage) instead of relative imports (e.g., ../hooks/useLanguage or ./component)'
            }
          ]
        }
      ],

      // ============================================
      // Style Rules - General
      // ============================================
      'style/arrow-parens': ['error', 'always'],
      'style/array-bracket-spacing': ['error', 'never'],
      'style/brace-style': ['error', '1tbs', { allowSingleLine: true }],
      'style/linebreak-style': ['error', 'unix'],
      'style/object-curly-spacing': ['error', 'always'],
      'style/quote-props': ['error', 'consistent'],
      'style/semi': ['error', 'never'],
      'style/comma-dangle': ['error', 'never'],

      // ============================================
      // Style Rules - JSX Specific
      // ============================================
      'style/jsx-quotes': ['error', 'prefer-double'],
      'style/jsx-first-prop-new-line': ['error', 'multiline'],
      'style/jsx-indent-props': ['error', 2],
      'style/no-multi-spaces': 'error',
      'style/jsx-max-props-per-line': ['error', { maximum: 1, when: 'multiline' }],
      'style/jsx-closing-tag-location': 'error',
      'style/jsx-closing-bracket-location': ['error', 'after-props'],
      'style/jsx-tag-spacing': [
        'error',
        {
          closingSlash: 'never',
          beforeSelfClosing: 'always',
          afterOpening: 'never',
          beforeClosing: 'never'
        }
      ],

      // ============================================
      // Style Rules - Line Length & Formatting
      // ============================================
      'style/max-len': [
        'error',
        {
          code: 150,
          tabWidth: 2,
          ignoreUrls: true,
          ignoreStrings: true,
          ignoreTemplateLiterals: true,
          ignoreRegExpLiterals: true
        }
      ],

      'style/quotes': [
        'error',
        'single',
        {
          avoidEscape: true,
          allowTemplateLiterals: 'always'
        }
      ],

      'style/indent': [
        'error',
        2,
        {
          SwitchCase: 1,
          VariableDeclarator: 1,
          outerIIFEBody: 1,
          MemberExpression: 1,
          FunctionDeclaration: { parameters: 1, body: 1 },
          FunctionExpression: { parameters: 1, body: 1 },
          CallExpression: { arguments: 1 },
          ArrayExpression: 1,
          ObjectExpression: 1,
          ImportDeclaration: 1,
          flatTernaryExpressions: false,
          ignoreComments: false,
          ignoredNodes: ['TemplateLiteral *'],
          offsetTernaryExpressions: true
        }
      ],

      // ============================================
      // Style Rules - Object & Operator Formatting
      // ============================================
      'style/object-curly-newline': [
        'error',
        {
          ObjectExpression: { consistent: true },
          ObjectPattern: { consistent: true },
          ImportDeclaration: { consistent: true },
          ExportDeclaration: { consistent: true }
        }
      ],

      'style/operator-linebreak': [
        'error',
        'before',
        {
          overrides: {
            '=': 'after',
            '+=': 'after',
            '-=': 'after',
            '*=': 'after',
            '/=': 'after',
            '%=': 'after',
            '**=': 'after',
            '<<=': 'after',
            '>>=': 'after',
            '>>>=': 'after',
            '&=': 'after',
            '^=': 'after',
            '|=': 'after'
          }
        }
      ],

      // ============================================
      // Unicorn Overrides - Compatibilidade com lib target
      // ============================================
      'unicorn/prefer-at': 'off'
    }
  }
)
