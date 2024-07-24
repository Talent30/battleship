/// <reference types="./types.d.ts" />

import eslint from "@eslint/js";
import reactPlugin from "eslint-plugin-react";
import reactComplierPlugin from "eslint-plugin-react-compiler";
import hooksPlugin from "eslint-plugin-react-hooks";
import eslintPluginUnicorn from "eslint-plugin-unicorn";
import tseslint from "typescript-eslint";

const base = tseslint.config(
  {
    // Globally ignored files
    ignores: ["**/*.config.*"],
  },
  {
    files: ["**/*.js", "**/*.ts", "**/*.tsx", "*.ts"],
    plugins: {},
    extends: [
      eslint.configs.recommended,
      ...tseslint.configs.strict,
      ...tseslint.configs.strictTypeChecked,
      ...tseslint.configs.stylisticTypeChecked,
      eslintPluginUnicorn.configs["flat/recommended"],
    ],
    rules: {
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
      "@typescript-eslint/consistent-type-imports": [
        "warn",
        { prefer: "type-imports", fixStyle: "separate-type-imports" },
      ],
      "@typescript-eslint/no-misused-promises": [
        2,
        { checksVoidReturn: { attributes: false } },
      ],
      "@typescript-eslint/no-unnecessary-condition": [
        "error",
        {
          allowConstantLoopConditions: true,
        },
      ],
      "unicorn/prevent-abbreviations": [
        "error",
        {
          allowList: {
            props: true,
            ref: true,
          },
        },
      ],
      "@typescript-eslint/consistent-type-definitions": ["error", "type"],
      "@typescript-eslint/no-non-null-assertion": "error",
    },
  },
  {
    linterOptions: { reportUnusedDisableDirectives: true },
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
);

const react = [
  {
    files: ["**/*.ts", "**/*.tsx"],
    plugins: {
      react: reactPlugin,
      "react-hooks": hooksPlugin,
      "react-compiler": reactComplierPlugin,
    },
    rules: {
      ...reactPlugin.configs["jsx-runtime"].rules,
      ...reactPlugin.configs.recommended.rules,
      ...hooksPlugin.configs.recommended.rules,
      "react-compiler/react-compiler": "error",
      /**
       * Require an explicit type when using button elements.
       *
       * 🚫 Not fixable - https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/button-has-type.md
       */
      "react/button-has-type": "warn",
      /**
       * Require consistent function type for function components.
       *
       * 🔧 Fixable - https://github.com/jsx-eslint/eslint-plugin-react/blob/HEAD/docs/rules/function-component-definition.md
       */
      "react/function-component-definition": "warn",
      /**
       * Require destructuring and symmetric naming of `useState` hook value and setter variables.
       *
       * 🚫 Not fixable - https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/hook-use-state.md
       */
      "react/hook-use-state": "warn",
      /**
       * Require consistent boolean attributes notation in JSX.
       *
       * 🔧 Fixable - https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-boolean-value.md
       */
      "react/jsx-boolean-value": "warn",
      /**
       * Disallow unnecessary curly braces in JSX props and children.
       *
       * 🔧 Fixable - https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-curly-brace-presence.md
       */
      "react/jsx-curly-brace-presence": "warn",
      /**
       * Require using shorthand form for React fragments, unless required.
       *
       * 🔧 Fixable - https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-fragments.md
       */
      "react/jsx-fragments": "warn",
      /**
       * Prevent problematic leaked values from being rendered.
       *
       * 🔧 Fixable - https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-no-leaked-render.md
       */
      "react/jsx-no-leaked-render": "warn",
      /**
       * Prevents usage of unsafe `target='_blank'`.
       *
       * This rule is a part of `react/recommended`, but we've modified it to
       * allow referrer.
       *
       * 🔧 Fixable - https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-no-target-blank.md
       */
      "react/jsx-no-target-blank": [
        "error",
        {
          allowReferrer: true,
        },
      ],
      /**
       * Disallow empty React fragments.
       *
       * 🔧 Fixable - https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-no-useless-fragment.md
       */
      "react/jsx-no-useless-fragment": ["warn", { allowExpressions: true }],
      /**
       * Require the use of PascalCase for user-defined JSX components.
       *
       * 🚫 Not fixable - https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-pascal-case.md
       */
      "react/jsx-pascal-case": "warn",
      /**
       * Disallow usage of Array index in keys.
       *
       * 🚫 Not fixable - https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/no-array-index-key.md
       */
      "react/no-array-index-key": "warn",
      /**
       * Disallow creating unstable components inside components.
       *
       * 🚫 Not fixable - https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/no-unstable-nested-components.md
       */
      "react/no-unstable-nested-components": "error",
      /**
       * Disallow closing tags for components without children.
       *
       * 🔧 Fixable - https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/self-closing-comp.md
       */
      "react/self-closing-comp": "warn",
    },
    languageOptions: {
      globals: {
        React: "writable",
      },
    },
  },
];

export default [...base, ...react];
