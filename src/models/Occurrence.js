const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const Occurrence = sequelize.define('Occurrence', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  occurrence_id: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  status: {
    type: DataTypes.STRING
  }
}, {
  tableName: 'occurrences',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

module.exports = Occurrence;
