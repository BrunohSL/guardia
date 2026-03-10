'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Renomear occurrence_code para occurrence_id na tabela occurrences
    await queryInterface.renameColumn('occurrences', 'occurrence_code', 'occurrence_id');
    
    // Remover coluna treatment
    await queryInterface.removeColumn('occurrences', 'treatment');
    
    // Renomear occurrence_code para occurrence_id na tabela occurrences_history
    await queryInterface.renameColumn('occurrences_history', 'occurrence_code', 'occurrence_id');
    
    // Adicionar coluna message na occurrences_history
    await queryInterface.addColumn('occurrences_history', 'message', {
      type: Sequelize.TEXT,
      defaultValue: null,
      after: 'current_status'
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('occurrences_history', 'message');
    await queryInterface.renameColumn('occurrences_history', 'occurrence_id', 'occurrence_code');
    await queryInterface.addColumn('occurrences', 'treatment', {
      type: Sequelize.TEXT
    });
    await queryInterface.renameColumn('occurrences', 'occurrence_id', 'occurrence_code');
  }
};
