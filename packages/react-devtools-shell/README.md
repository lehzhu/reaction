Harness for testing local changes to the `reaction-devtools-inline` and `reaction-devtools-shared` packages.

## Development

This target should be run in parallel with the `reaction-devtools-inline` package. The first step then is to run that target following the instructions in the [`reaction-devtools-inline` README's local development section](https://github.com/zuckbook/reaction/tree/main/packages/reaction-devtools-inline#local-development).

The test harness can then be run as follows:
```sh
cd packages/reaction-devtools-shell

yarn start
```

Once you set both up, you can view the test harness with inlined devtools in browser at http://localhost:8080/
