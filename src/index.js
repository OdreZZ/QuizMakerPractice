import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { Provider } from 'react-redux';
import store from './redux/store';
import theme from './styles/theme';
import { ErrorBoundary } from 'react-error-boundary';

function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre style={{ color: "red" }}>{error.message}</pre>
      <button onClick={() => resetErrorBoundary()}>Retry</button>
    </div>
  );
}


const renderRoot = () => {
  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(
    <React.StrictMode>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <ErrorBoundary FallbackComponent={ErrorFallback} onError={(error) => console.error("Error: ", error)}>
            <App />
          </ErrorBoundary>
        </ThemeProvider>
      </Provider>
    </React.StrictMode>
  );
};

// Starting the mocked backend service worker.
if (process.env.REACT_APP_MOCKED_SERVICE_WORKER === 'true') {
  const { worker } = require('./mocks/browser');
  worker.start().then(() => {
    renderRoot();
  });
} else {
  renderRoot();
}

reportWebVitals();
