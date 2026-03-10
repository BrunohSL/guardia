const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const WebhookHistory = sequelize.define('WebhookHistory', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  account_id: {
    type: DataTypes.INTEGER
  },
  company_id: {
    type: DataTypes.INTEGER
  },
  address: {
    type: DataTypes.STRING
  },
  event_description: {
    type: DataTypes.TEXT
  },
  webhook_id: {
    type: DataTypes.STRING
  },
  occurrence_id: {
    type: DataTypes.STRING
  }
}, {
  tableName: 'webhook_history',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

module.exports = WebhookHistory;
