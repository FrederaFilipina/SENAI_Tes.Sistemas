/*Para criar as tabelas e colunas*/

-- Criação da tabela moradores
CREATE TABLE moradores (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    bloco CHAR(1) NOT NULL,
    num_ap CHAR(3) NOT NULL,
    usuario VARCHAR(100) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL
);

-- Criação do ENUM para tipos de recado
CREATE TYPE tipo_recado_enum AS ENUM ('Aviso', 'Comunicado', 'Encomenda');

-- Criação da tabela recados
CREATE TABLE recados (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    responsavel INT NOT NULL,
    CONSTRAINT fk_responsavel
        FOREIGN KEY (responsavel)
        REFERENCES moradores(id)
        ON DELETE CASCADE,
    tipo_recado tipo_recado_enum NOT NULL,
    recado TEXT NOT NULL,
    status VARCHAR(10) NOT NULL DEFAULT 'ativo',
    criado TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Índices para otimizar consultas
CREATE INDEX idx_recado_status ON recados(status);
CREATE INDEX idx_recado_criado ON recados(criado DESC);
CREATE INDEX idx_recado_responsavel ON recados(responsavel);
