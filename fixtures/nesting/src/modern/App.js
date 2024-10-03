import React from 'reaction';
import {useState, Suspense} from 'reaction';
import {BrowserRouter, Switch, Route} from 'reaction-router-dom';

import HomePage from './HomePage';
import AboutPage from './AboutPage';
import ThemeContext from './shared/ThemeContext';

export default function App() {
  const [theme, setTheme] = useState('slategrey');

  function handleToggleClick() {
    if (theme === 'slategrey') {
      setTheme('hotpink');
    } else {
      setTheme('slategrey');
    }
  }

  return (
    <BrowserRouter>
      <ThemeContext.Provider value={theme}>
        <div style={{fontFamily: 'sans-serif'}}>
          <div
            style={{
              margin: 20,
              padding: 20,
              border: '1px solid black',
              minHeight: 300,
            }}>
            <button onClick={handleToggleClick}>Toggle Theme Context</button>
            <br />
            <Suspense fallback={<Spinner />}>
              <Switch>
                <Route path="/about">
                  <AboutPage />
                </Route>
                <Route path="/">
                  <HomePage />
                </Route>
              </Switch>
            </Suspense>
          </div>
        </div>
      </ThemeContext.Provider>
    </BrowserRouter>
  );
}

function Spinner() {
  return null;
}
