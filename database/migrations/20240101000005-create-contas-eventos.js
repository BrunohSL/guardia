'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('contas_eventos', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      conta_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'contas',
          key: 'conta_id'
        },
        onDelete: 'CASCADE'
      },
      codigo_evento: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: 'eventos',
          key: 'codigo_evento'
        },
        onDelete: 'CASCADE'
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

    await queryInterface.addIndex('contas_eventos', ['conta_id', 'codigo_evento'], {
      unique: true,
      name: 'unique_conta_evento'
    });

    await queryInterface.addIndex('contas_eventos', ['conta_id'], {
      name: 'idx_contas_eventos_conta'
    });

    await queryInterface.addIndex('contas_eventos', ['codigo_evento'], {
      name: 'idx_contas_eventos_evento'
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('contas_eventos');
  }
};
