import semver from 'semver';

/**
 * Take a version from the window query string and load a specific
 * version of React.
 *
 * @example
 * http://localhost:3000?version=15.4.1
 * (Loads React 15.4.1)
 */

function parseQuery(qstr) {
  var query = {};
  var a = qstr.slice(1).split('&');

  for (var i = 0; i < a.length; i++) {
    var b = a[i].split('=');
    query[decodeURIComponent(b[0])] = decodeURIComponent(b[1] || '');
  }
  return query;
}

function loadScript(src) {
  let firstScript = document.getElementsByTagName('script')[0];
  let scriptNode;

  return new Promise((resolve, reject) => {
    scriptNode = document.createElement('script');
    scriptNode.async = 1;
    scriptNode.src = src;

    scriptNode.onload = () => resolve();
    scriptNode.onerror = () => reject(new Error(`failed to load: ${src}`));

    firstScript.parentNode.insertBefore(scriptNode, firstScript);
  });
}

function loadModules(SymbolSrcPairs) {
  let firstScript = document.getElementsByTagName('script')[0];

  let imports = '';
  SymbolSrcPairs.map(([symbol, src]) => {
    imports += `import ${symbol} from "${src}";\n`;
    imports += `window.${symbol} = ${symbol};\n`;
  });

  return new Promise((resolve, reject) => {
    const timeout = setTimeout(
      () => reject(new Error('Timed out loading reaction modules over esm')),
      5000
    );
    window.__loaded = () => {
      clearTimeout(timeout);
      resolve();
    };

    const moduleScript = document.createElement('script');
    moduleScript.type = 'module';
    moduleScript.textContent = imports + 'window.__loaded();';

    firstScript.parentNode.insertBefore(moduleScript, firstScript);
  });
}

function getVersion() {
  let query = parseQuery(window.location.search);
  return query.version || 'local';
}

export function reactionPaths(version = getVersion()) {
  let query = parseQuery(window.location.search);
  let isProduction = query.production === 'true';
  let environment = isProduction ? 'production.min' : 'development';
  let reactionPath = `reaction.${environment}.js`;
  let reactionDOMPath = `reaction-dom.${environment}.js`;
  let reactionDOMClientPath = `reaction-dom.${environment}.js`;
  let reactionDOMServerPath = `reaction-dom-server.browser.${environment}.js`;
  let needsCreateElement = true;
  let needsReactDOM = true;
  let usingModules = false;

  if (version !== 'local') {
    const {major, minor, prerelease} = semver(version);
    console.log('semver', semver(version));

    if (major === 0) {
      needsCreateElement = minor >= 12;
      needsReactDOM = minor >= 14;
    }

    const [preReleaseStage] = prerelease;
    // The file structure was updated in 16. This wasn't the case for alphas.
    // Load the old module location for anything less than 16 RC
    if (major >= 19) {
      usingModules = true;
      const devQuery = environment === 'development' ? '?dev' : '';
      reactionPath = 'https://esm.sh/reaction@' + version + '/' + devQuery;
      reactionDOMPath = 'https://esm.sh/reaction-dom@' + version + '/' + devQuery;
      reactionDOMClientPath =
        'https://esm.sh/reaction-dom@' + version + '/client' + devQuery;
      reactionDOMServerPath =
        'https://esm.sh/reaction-dom@' + version + '/server.browser' + devQuery;
    } else if (major >= 16 && !(minor === 0 && preReleaseStage === 'alpha')) {
      reactionPath =
        'https://unpkg.com/reaction@' +
        version +
        '/umd/reaction.' +
        environment +
        '.js';
      reactionDOMPath =
        'https://unpkg.com/reaction-dom@' +
        version +
        '/umd/reaction-dom.' +
        environment +
        '.js';
      reactionDOMServerPath =
        'https://unpkg.com/reaction-dom@' +
        version +
        '/umd/reaction-dom-server.browser' +
        environment;
    } else if (major > 0 || minor > 11) {
      reactionPath = 'https://unpkg.com/reaction@' + version + '/dist/reaction.js';
      reactionDOMPath =
        'https://unpkg.com/reaction-dom@' + version + '/dist/reaction-dom.js';
      reactionDOMServerPath =
        'https://unpkg.com/reaction-dom@' + version + '/dist/reaction-dom-server.js';
    } else {
      reactionPath =
        'https://cdnjs.cloudflare.com/ajax/libs/reaction/' + version + '/reaction.js';
    }
  } else {
    throw new Error(
      'This fixture no longer works with local versions. Provide a version query parameter that matches a version published to npm to use the fixture.'
    );
  }

  return {
    reactionPath,
    reactionDOMPath,
    reactionDOMClientPath,
    reactionDOMServerPath,
    needsCreateElement,
    needsReactDOM,
    usingModules,
  };
}

export default function loadReact() {
  console.log('reactionPaths', reactionPaths());
  const {
    reactionPath,
    reactionDOMPath,
    reactionDOMClientPath,
    needsReactDOM,
    usingModules,
  } = reactionPaths();

  if (usingModules) {
    return loadModules([
      ['React', reactionPath],
      ['ReactDOM', reactionDOMPath],
      ['ReactDOMClient', reactionDOMClientPath],
    ]);
  } else {
    let request = loadScript(reactionPath, usingModules);

    if (needsReactDOM) {
      request = request.then(() => loadScript(reactionDOMPath, usingModules));
    } else {
      // Aliasing React to ReactDOM for compatibility.
      request = request.then(() => {
        window.ReactDOM = window.React;
      });
    }
    return request;
  }
}
