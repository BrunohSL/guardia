'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('webhook_history', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      account_id: {
        type: Sequelize.INTEGER
      },
      company_id: {
        type: Sequelize.INTEGER
      },
      address: {
        type: Sequelize.STRING
      },
      event_description: {
        type: Sequelize.TEXT
      },
      webhook_id: {
        type: Sequelize.STRING
      },
      occurrence_id: {
        type: Sequelize.STRING
      },
      created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updated_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')
      }
    });

    await queryInterface.addIndex('webhook_history', ['occurrence_id'], {
      name: 'idx_webhook_history_occurrence'
    });

    await queryInterface.addIndex('webhook_history', ['webhook_id'], {
      name: 'idx_webhook_history_webhook'
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('webhook_history');
  }
};
