const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const OccurrenceHistory = sequelize.define('OccurrenceHistory', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  occurrence_id: {
    type: DataTypes.STRING,
    allowNull: false
  },
  previous_status: {
    type: DataTypes.STRING
  },
  current_status: {
    type: DataTypes.STRING
  },
  message: {
    type: DataTypes.TEXT
  }
}, {
  tableName: 'occurrences_history',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

module.exports = OccurrenceHistory;
