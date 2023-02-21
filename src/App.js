import React from "react";
import './styles/index.css';
import { SnackbarProvider } from "notistack";
import { store } from './store'
import { Provider } from 'react-redux'

import Router from "./Router";

function App() {
  return (
    <SnackbarProvider maxSnack={3}>
      <Provider store={store}>
        <div className="App">
            <Router />
        </div>
      </Provider>
    </SnackbarProvider>
  );
}

export default App;
