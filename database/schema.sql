CREATE DATABASE IF NOT EXISTS guardia CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE guardia;

CREATE TABLE integracoes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    url VARCHAR(255) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE eventos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    codigo_evento VARCHAR(255) NOT NULL UNIQUE,
    nome VARCHAR(255),
    descricao TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE ocorrencias (
    id INT AUTO_INCREMENT PRIMARY KEY,
    codigo_ocorrencia VARCHAR(255) NOT NULL UNIQUE,
    status VARCHAR(255),
    tratativa TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE contas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    conta_id INT NOT NULL UNIQUE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE contas_eventos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    conta_id INT NOT NULL,
    codigo_evento VARCHAR(255) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (conta_id) REFERENCES contas(conta_id) ON DELETE CASCADE,
    FOREIGN KEY (codigo_evento) REFERENCES eventos(codigo_evento) ON DELETE CASCADE,
    UNIQUE KEY unique_conta_evento (conta_id, codigo_evento)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE ocorrencias_historico (
    id INT AUTO_INCREMENT PRIMARY KEY,
    codigo_ocorrencia VARCHAR(255) NOT NULL,
    status_anterior VARCHAR(255),
    status_atual VARCHAR(255),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (codigo_ocorrencia) REFERENCES ocorrencias(codigo_ocorrencia) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Índices para melhor performance
CREATE INDEX idx_eventos_codigo ON eventos(codigo_evento);
CREATE INDEX idx_ocorrencias_codigo ON ocorrencias(codigo_ocorrencia);
CREATE INDEX idx_contas_eventos_conta ON contas_eventos(conta_id);
CREATE INDEX idx_contas_eventos_evento ON contas_eventos(codigo_evento);
CREATE INDEX idx_ocorrencias_historico_codigo ON ocorrencias_historico(codigo_ocorrencia);
