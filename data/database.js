import Sequelize from 'sequelize';

const sequelize = new Sequelize(
  'prueba',
  'dev',
  'sistema',
  {
    dialect: 'mysql',
  }
);

const Cliente = sequelize.define('cliente',{
  cedula: {
    primaryKey: true,
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  nombre: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  telefono: {
    type: Sequelize.STRING,
    allowNull: true,
  },
});

const Articulo = sequelize.define('articulo',{
  descripcion: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  precio: {
    type: Sequelize.FLOAT(8,2),
    allowNull: false,
  },
  stock: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

const Detalle = sequelize.define('detalle',{
  cantidad: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

Cliente.hasMany(Detalle);

Articulo.hasMany(Detalle);

sequelize.sync();

export default sequelize.models;