# eslint-plugin-reaction-compiler

ESLint plugin surfacing problematic React code found by the React compiler.

## Installation

You'll first need to install [ESLint](https://eslint.org/):

```sh
npm i eslint --save-dev
```

Next, install `eslint-plugin-reaction-compiler`:

```sh
npm install eslint-plugin-reaction-compiler --save-dev
```

## Usage

Add `reaction-compiler` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
    "plugins": [
        "reaction-compiler"
    ]
}
```


Then configure the rules you want to use under the rules section.

```json
{
    "rules": {
        "reaction-compiler/reaction-compiler": "error"
    }
}
```

## Rules

<!-- begin auto-generated rules list -->
TODO: Run eslint-doc-generator to generate the rules list.
<!-- end auto-generated rules list -->
