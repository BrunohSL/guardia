'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('ocorrencias_historico', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      codigo_ocorrencia: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: 'ocorrencias',
          key: 'codigo_ocorrencia'
        },
        onDelete: 'CASCADE'
      },
      status_anterior: {
        type: Sequelize.STRING
      },
      status_atual: {
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

    await queryInterface.addIndex('ocorrencias_historico', ['codigo_ocorrencia'], {
      name: 'idx_ocorrencias_historico_codigo'
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('ocorrencias_historico');
  }
};
