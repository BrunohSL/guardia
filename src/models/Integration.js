const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const Integration = sequelize.define('Integration', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false
  },
  url: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'integrations',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

module.exports = Integration;
