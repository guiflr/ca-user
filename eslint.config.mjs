import js from '@eslint/js'
import { FlatCompat } from '@eslint/eslintrc'

const compat = new FlatCompat({  
  baseDirectory: import.meta.dirname,
  recommendedConfig: js.configs.recommended
})

const eslintConfig = [
  ...compat.config({
    ignorePatterns: ['src/types/**'],
    extends: ['eslint:recommended', 'prettier'],
    rules: {
      '@typescript-eslint/explit-module-boundary-types': 'off'
    },
  })
]

export default eslintConfig