const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const Event = sequelize.define('Event', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  integration_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'integrations',
      key: 'id'
    }
  },
  event_contact_id: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  cuc: {
    type: DataTypes.STRING
  },
  name: {
    type: DataTypes.STRING
  },
  event_type: {
    type: DataTypes.TEXT
  }
}, {
  tableName: 'events',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

module.exports = Event;
