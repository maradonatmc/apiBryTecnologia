# apiBryTecnologia

Desafio de programação Back-end (Pleno)

# Criação do banco de dados e estrutura das tabelas:
CREATE DATABASE bry
    WITH 
    OWNER = postgres
    ENCODING = 'UTF8'
    CONNECTION LIMIT = -1;
COMMIT;

CREATE TABLE EMPRESA (
    SEQ_EMPRESA SERIAL PRIMARY KEY,
    NOME_EMPRESA VARCHAR(255) NOT NULL,
	COD_CNPJ VARCHAR(20) NOT NULL,
    DSC_ENDERECO VARCHAR(255) NOT NULL
);
COMMIT;

CREATE TABLE FUNCIONARIO (
	SEQ_FUNCIONARIO SERIAL PRIMARY KEY,
	NOME_FUNCIONARIO VARCHAR(255) NOT NULL,
	COD_CPF VARCHAR(20) NOT NULL, 
	DSC_EMAIL VARCHAR(100), 
	DSC_ENDERECO VARCHAR(255)
);
COMMIT;

CREATE TABLE ASSOC_FUNCIONARIO_EMPRESA (
	SEQ_ASSOC_FUNCIONARIO_EMPRESA SERIAL PRIMARY KEY,
	SEQ_FUNCIONARIO INT NOT NULL, 
	SEQ_EMPRESA INT NOT NULL
);
COMMIT;

# Informações gerais sobre os métodos da API
Nos métodos tipo POST, utilizar BODY parametrizado como: 'x-www-form-urlencoded'

# Métodos para empresas
Inserir Empresa: POST / localhost:3000/api/inserirEmpresa
Campos necessários para inserir empresa
campo 'nome_empresa': string (obrigatório)
campo 'cod_cnpj': string (obrigatório)
campo 'dsc_endereco': string (obrigatório)

Listar Empresas: GET / localhost:3000/api/listarEmpresas
Este lista apenas as informações relacionadas às empresas

Pesquisar Empresa por id: GET / localhost:3000/api/pesquisarEmpresaId/:id
":id" parâmetro number relativo ao campo seq_empresa da tabela empresa no banco de dados (valor pode ser visualizado no retorno no método GET/ ../api/listarEmpresas
Este retorna os dados de uma empresa e funcionários relacionados (caso exista)

Atualizar Empresa por id: PUT / localhost:3000/api/updateEmpresaId/:id
":id" parâmetro number relativo ao campo seq_empresa da tabela empresa no banco de dados (valor pode ser visualizado no retorno no método GET/ ../api/listarEmpresas
Campos disponíveis para atualizar empresa
campo 'nome_empresa': string (não obrigatório)
campo 'cod_cnpj': string (não obrigatório)
campo 'dsc_endereco': string (não obrigatório)
Obs: É necessário pelo menos um dos campos para efetuar uma atualização nos dados da empresa

Deletar Empresa por id: DELETE / localhost:3000/api/deleteEmpresaId/:id
":id" parâmetro number relativo ao campo seq_empresa da tabela empresa no banco de dados (valor pode ser visualizado no retorno no método GET/ ../api/listarEmpresas
Obs: Ao deletar a empresa, os funcionários serão automaticamente desassociados da mesma

# Métodos para funcionários
Inserir Funcionário: POST / localhost:3000/api/inserirFuncionario
Campos necessários para inserir funcionario
campo 'nome_funcionario': string (obrigatório)
campo 'cod_cpf': string (obrigatório)
campo 'dsc_email': string (obrigatório)
campo 'dsc_endereco': string (obrigatório)

Listar Funcionários: GET / localhost:3000/api/listarfuncionarios
Este lista apenas as informações relacionadas às funcionários

Pesquisar Funcionário por id: GET / localhost:3000/api/pesquisarfuncionarioId/:id
":id" parâmetro number relativo ao campo seq_funcionario da tabela funcionario no banco de dados (valor pode ser visualizado no retorno no método GET/ ../api/listarfuncionarios
Este retorna os dados de um funcionário e empresas relacionadas (caso exista)

Atualizar Funcionário por id: PUT / localhost:3000/api/updatefuncionarioId/:id
":id" parâmetro number relativo ao campo seq_funcionario da tabela funcionario no banco de dados (valor pode ser visualizado no retorno no método GET/ ../api/listarfuncionarios
Campos disponíveis para atualizar funcionario
campo 'nome_funcionario': string (não obrigatório)
campo 'cod_cpf': string (não obrigatório)
campo 'dsc_email': string (não obrigatório)
campo 'dsc_endereco': string (não obrigatório)
Obs: É necessário pelo menos um dos campos para efetuar uma atualização nos dados do funcionário

Deletar Funcionário por id: DELETE / localhost:3000/api/deletefuncionarioId/:id
":id" parâmetro number relativo ao campo seq_funcionario da tabela funcionario no banco de dados (valor pode ser visualizado no retorno no método GET/ ../api/listarfuncionarios

# Associar e desassociar funcionários à empresas
Associar Funcionário à Empresa: POST / localhost:3000/api/associarFuncionarioEmpresa
Campos necessários para associar funcionário à empresa
campo 'seq_funcionario': number (obrigatório)
campo 'seq_empresa': number (obrigatório)

Desassociar Funcionário de Empresa: DELETE / localhost:3000/api/desassociarFuncionarioEmpresa/:idFunc/:idEmp
":idFunc" parâmetro number relativo ao campo seq_funcionario da tabela funcionario no banco de dados (valor pode ser visualizado no retorno no método GET/ ../api/listarfuncionarios
":idEmp" parâmetro number relativo ao campo seq_empresa da tabela empresa no banco de dados (valor pode ser visualizado no retorno no método GET/ ../api/listarEmpresas