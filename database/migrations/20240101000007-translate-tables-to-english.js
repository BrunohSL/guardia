'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Renomear tabela integracoes para integrations
    await queryInterface.renameTable('integracoes', 'integrations');
    
    // Renomear tabela eventos para events
    await queryInterface.renameTable('eventos', 'events');
    
    // Renomear colunas da tabela events
    await queryInterface.renameColumn('events', 'codigo_evento', 'event_contact_id');
    await queryInterface.renameColumn('events', 'nome', 'name');
    await queryInterface.renameColumn('events', 'descricao', 'event_type');
    
    // Adicionar coluna cuc
    await queryInterface.addColumn('events', 'cuc', {
      type: Sequelize.STRING,
      after: 'event_contact_id'
    });
    
    // Adicionar coluna integration_id
    await queryInterface.addColumn('events', 'integration_id', {
      type: Sequelize.INTEGER,
      references: {
        model: 'integrations',
        key: 'id'
      },
      onDelete: 'CASCADE',
      after: 'id'
    });
    
    // Renomear tabela ocorrencias para occurrences
    await queryInterface.renameTable('ocorrencias', 'occurrences');
    await queryInterface.renameColumn('occurrences', 'codigo_ocorrencia', 'occurrence_code');
    await queryInterface.renameColumn('occurrences', 'tratativa', 'treatment');
    
    // Renomear tabela contas para accounts
    await queryInterface.renameTable('contas', 'accounts');
    await queryInterface.renameColumn('accounts', 'conta_id', 'account_id');
    
    // Renomear tabela contas_eventos para accounts_events
    await queryInterface.renameTable('contas_eventos', 'accounts_events');
    await queryInterface.renameColumn('accounts_events', 'conta_id', 'account_id');
    await queryInterface.renameColumn('accounts_events', 'codigo_evento', 'event_contact_id');
    
    // Renomear tabela ocorrencias_historico para occurrences_history
    await queryInterface.renameTable('ocorrencias_historico', 'occurrences_history');
    await queryInterface.renameColumn('occurrences_history', 'codigo_ocorrencia', 'occurrence_code');
    await queryInterface.renameColumn('occurrences_history', 'status_anterior', 'previous_status');
    await queryInterface.renameColumn('occurrences_history', 'status_atual', 'current_status');
  },

  down: async (queryInterface, Sequelize) => {
    // Reverter todas as alterações
    await queryInterface.renameColumn('occurrences_history', 'current_status', 'status_atual');
    await queryInterface.renameColumn('occurrences_history', 'previous_status', 'status_anterior');
    await queryInterface.renameColumn('occurrences_history', 'occurrence_code', 'codigo_ocorrencia');
    await queryInterface.renameTable('occurrences_history', 'ocorrencias_historico');
    
    await queryInterface.renameColumn('accounts_events', 'event_contact_id', 'codigo_evento');
    await queryInterface.renameColumn('accounts_events', 'account_id', 'conta_id');
    await queryInterface.renameTable('accounts_events', 'contas_eventos');
    
    await queryInterface.renameColumn('accounts', 'account_id', 'conta_id');
    await queryInterface.renameTable('accounts', 'contas');
    
    await queryInterface.renameColumn('occurrences', 'treatment', 'tratativa');
    await queryInterface.renameColumn('occurrences', 'occurrence_code', 'codigo_ocorrencia');
    await queryInterface.renameTable('occurrences', 'ocorrencias');
    
    await queryInterface.removeColumn('events', 'integration_id');
    await queryInterface.removeColumn('events', 'cuc');
    await queryInterface.renameColumn('events', 'event_type', 'descricao');
    await queryInterface.renameColumn('events', 'name', 'nome');
    await queryInterface.renameColumn('events', 'event_contact_id', 'codigo_evento');
    await queryInterface.renameTable('events', 'eventos');
    
    await queryInterface.renameTable('integrations', 'integracoes');
  }
};
