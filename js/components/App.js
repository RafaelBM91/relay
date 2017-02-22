import React, { Component } from 'react';
import Relay from 'react-relay';

import AppHomeRoute from '../routes/AppHomeRoute.js';
import clientes from './clientes';
import articulos from './articulos';

class App extends Component {
  render() {
    return (
      <div>
        <Relay.RootContainer
          Component={clientes}
          route={new AppHomeRoute()}
          renderLoading={function() {
            return <div>Loading...</div>;
          }}
        />
        <br/><br/>
        {/*{<Relay.RootContainer
          Component={articulos}
          route={new AppHomeRoute1()}
          renderLoading={function() {
            return <div>Loading...</div>;
          }}
        />}*/}
      </div>
    );
  }
}

export default App;

/*
<Relay.Renderer
          environment={Relay.Store}
          Container={clientes}
          queryConfig={new AppHomeRoute()}
        />
*/
