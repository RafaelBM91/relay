import React, { Component } from 'react';
import Relay from 'react-relay';

class ArticuloMutation extends Relay.Mutation {
  static fragments = {
    articulos: () => Relay.QL`
      fragment on ArticuloType { codigo }
    `,
  };
  getMutation() {
    return Relay.QL`
      mutation{ ArticuloMutation }
    `;
  }
  getFatQuery() {
    return Relay.QL`
      fragment on ArticuloMutationPayload { 
        articulos {
          id,
          descripcion,
          precio,
          stock,
        },
      }
    `;
  }
  getConfigs() {
    return [{
      type: 'FIELDS_CHANGE',
      fieldIDs: { articulos: this.props.articulos.codigo },
    }];
  }
  getVariables() {
    return {
      id: this.props.id,
      descripcion: this.props.descripcion,
      precio: this.props.precio,
      stock: this.props.stock,
    };
  }
}

class ArticuloModel extends React.Component {
  render() {
    let {id,descripcion,precio,stock} = this.props.articulo;
    return (
      <tr>
        <td style={{paddingRight:'15px',borderRight:'1px solid'}}>{id}</td>
        <td style={{paddingRight:'15px',borderRight:'1px solid'}}>{descripcion}</td>
        <td style={{paddingRight:'15px',borderRight:'1px solid'}}>{precio}</td>
        <td style={{paddingRight:'15px',borderRight:'1px solid'}}>{stock}</td>
        <td>
          <button
            type="button"
            value={JSON.stringify(this.props.articulo)}
            onClick={this.props._handleSeleccino} >
            Seleccionar
          </button>
        </td>
      </tr>
    );
  }
}

ArticuloModel = Relay.createContainer(ArticuloModel, {
  fragments: {
    articulo: () => Relay.QL`
      fragment on ArticuloModel {
        id,
        descripcion,
        precio,
        stock,
      }
    `,
  },
});

class ArticuloType extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      articulo: {
        id: '',
        descripcion: '',
        precio: 0.0,
        stock: 0,
      },
    };
    this._handleSeleccino = this._handleSeleccino.bind(this);
    this._handleInputText = this._handleInputText.bind(this);
    this._handleGuardar = this._handleGuardar.bind(this);
    this._handleBuscar = this._handleBuscar.bind(this);
  }
  _handleGuardar() {
    let operacion = Relay.Store.applyUpdate(
      new ArticuloMutation({
        articulos: this.props.articulos,
        id: this.state.articulo.id,
        descripcion: this.state.articulo.descripcion,
        precio: this.state.articulo.precio,
        stock: this.state.articulo.stock,
      })
    );
    operacion.commit();
  }
  _handleSeleccino(e) {
    let {id,descripcion,precio,stock} = JSON.parse(e.target.value);
    let articulo = {id,descripcion,precio,stock};
    this.setState({articulo});
  }
  _handleInputText(e) {
    let {articulo} = this.state;
    articulo[e.target.name] = e.target.value;
    this.setState({articulo});
  }
  _handleBuscar(e) {
    let descripcion = this.refs.busca.value;
    this.props.relay.setVariables({ descripcion });
  }
  render() {
    return (
      <div>
        <h1>Articulos</h1>
        <input
          name="descripcion"
          type="text"
          placeholder="Descripcion"
          value={this.state.articulo.descripcion}
          onChange={this._handleInputText} />
        <br/><br/>
        <input
          name="precio"
          type="text"
          placeholder="Precio"
          value={this.state.articulo.precio}
          onChange={this._handleInputText} />
        <br/><br/>
        <input
          name="stock"
          type="text"
          placeholder="Stock"
          value={this.state.articulo.stock}
          onChange={this._handleInputText} />
        <br/><br/>
        <input type="button" value="Guardar" onClick={this._handleGuardar} />
        <br/><br/>
        <input
          ref="busca"
          type="text"
          placeholder="Buscar Articulo"
          onKeyUp={this._handleBuscar} />
        <br/><br/>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>DESCRIPCION</th>
              <th>PRECIO</th>
              <th>STOCK</th>
              <th>SELECCIONAR</th>
            </tr>
          </thead>
          <tbody>
            {
              this.props.articulos.articulos.map((articulo,index) =>
                <ArticuloModel
                  key={index}
                  articulo={articulo}
                  _handleSeleccino={this._handleSeleccino} />
              )
            }
          </tbody>
        </table>
      </div>
    );
  }
}

ArticuloType = Relay.createContainer(ArticuloType, {
  initialVariables: {
    descripcion: '',
  },
  fragments: {
    articulos: () => Relay.QL`
      fragment on ArticuloType {
        articulos(descripcion:$descripcion) {
          ${ArticuloModel.getFragment('articulo')},
        },
        ${ArticuloMutation.getFragment('articulos')},
      }
    `,
  },
});

export default ArticuloType;

/*

*/
