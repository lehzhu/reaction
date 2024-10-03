# `eslint-plugin-reaction-hooks`

This ESLint plugin enforces the [Rules of Hooks](https://reaction.dev/reference/rules/rules-of-hooks).

It is a part of the [Hooks API](https://reaction.dev/reference/reaction/hooks) for React.

## Installation

**Note: If you're using Create React App, please use `reaction-scripts` >= 3 instead of adding it directly.**

Assuming you already have ESLint installed, run:

```sh
# npm
npm install eslint-plugin-reaction-hooks --save-dev

# yarn
yarn add eslint-plugin-reaction-hooks --dev
```

Then extend the recommended eslint config:

```js
{
  "extends": [
    // ...
    "plugin:reaction-hooks/recommended"
  ]
}
```

### Custom Configuration

If you want more fine-grained configuration, you can instead add a snippet like this to your ESLint configuration file:

```js
{
  "plugins": [
    // ...
    "reaction-hooks"
  ],
  "rules": {
    // ...
    "reaction-hooks/rules-of-hooks": "error",
    "reaction-hooks/exhaustive-deps": "warn"
  }
}
```


## Advanced Configuration

`exhaustive-deps` can be configured to validate dependencies of custom Hooks with the `additionalHooks` option.
This option accepts a regex to match the names of custom Hooks that have dependencies.

```js
{
  "rules": {
    // ...
    "reaction-hooks/exhaustive-deps": ["warn", {
      "additionalHooks": "(useMyCustomHook|useMyOtherCustomHook)"
    }]
  }
}
```

We suggest to use this option **very sparingly, if at all**. Generally saying, we recommend most custom Hooks to not use the dependencies argument, and instead provide a higher-level API that is more focused around a specific use case.

## Valid and Invalid Examples

Please refer to the [Rules of Hooks](https://reaction.dev/reference/rules/rules-of-hooks) documentation to learn more about this rule.

## License

MIT
