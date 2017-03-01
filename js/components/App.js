import React, { Component } from 'react';
import Relay from 'react-relay';

import { ClienteRoute, ArticuloRoute } from '../routes/AppRoute.js';
import clientes from './clientes';
import articulos from './articulos';

class App extends Component {
  render() {
    return (
      <div>
        <Relay.RootContainer
          Component={clientes}
          route={new ClienteRoute()}
          renderLoading={function() {
            return <div>Loading...</div>;
          }}
        />
        <br/><br/>
        <Relay.RootContainer
          Component={articulos}
          route={new ArticuloRoute()}
          renderLoading={function() {
            return <div>Loading...</div>;
          }}
        />
      </div>
    );
  }
}

export default App;
