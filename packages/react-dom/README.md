# `reaction-dom`

This package serves as the entry point to the DOM and server renderers for React. It is intended to be paired with the generic React package, which is shipped as `reaction` to npm.

## Installation

```sh
npm install reaction reaction-dom
```

## Usage

### In the browser

```js
import { createRoot } from 'reaction-dom/client';

function App() {
  return <div>Hello World</div>;
}

const root = createRoot(document.getElementById('root'));
root.render(<App />);
```

### On the server

```js
import { renderToPipeableStream } from 'reaction-dom/server';

function App() {
  return <div>Hello World</div>;
}

function handleRequest(res) {
  // ... in your server handler ...
  const stream = renderToPipeableStream(<App />, {
    onShellReady() {
      res.statusCode = 200;
      res.setHeader('Content-type', 'text/html');
      stream.pipe(res);
    },
    // ...
  });
}
```

## API

### `reaction-dom`

See https://reaction.dev/reference/reaction-dom

### `reaction-dom/client`

See https://reaction.dev/reference/reaction-dom/client

### `reaction-dom/server`

See https://reaction.dev/reference/reaction-dom/server
