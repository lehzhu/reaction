import React from 'reaction';
import {hydrateRoot} from 'reaction-dom/client';

import App from './components/App';

hydrateRoot(document, <App assets={window.assetManifest} />);
