// src/rbacConfig.js

// 1. Definição das Permissões (O que cada papel pode fazer)
export const PERMISSIONS_MAP = {
  // Papéis de Responsáveis Internos
  RESP_VENDA: [
    'VISUALIZAR_CONTRATO',
    'CRIAR_CONTRATO',
    'MARCAR_VENDA_CONCLUIDA',
    'VISUALIZAR_CLIENTES',
    'VISUALIZAR_CATALOGO',
  ],
  
  RESP_FABRICACAO: [
    'VISUALIZAR_CONTRATO',
    'VISUALIZAR_ESTOQUE',
    'VISUALIZAR_FORNECEDORES',
    'INICIAR_FABRICACAO',
    'VISUALIZAR_RASTREAMENTO', 
  ],

  RESP_INSTALACAO: [
    'VISUALIZAR_CONTRATO',
    'CONCLUIR_INSTALACAO',
    'VISUALIZAR_CORRETIVA',
    'VISUALIZAR_PREVENTIVA',
    'VISUALIZAR_RASTREAMENTO',
  ],
  
  // Papel Geral (Acesso total)
  RESP_GERAL: [
    'EDITAR_TUDO', // Permissão Coringa: dá acesso a tudo no AuthContext
    'VISUALIZAR_CONTRATO',
    'CRIAR_CONTRATO',
    'MARCAR_VENDA_CONCLUIDA',
    'VISUALIZAR_ESTOQUE',
    'VISUALIZAR_FORNECEDORES',
    'INICIAR_FABRICACAO',
    'CONCLUIR_INSTALACAO',
    'VISUALIZAR_RASTREAMENTO',
    'GERENCIAR_USUARIOS', 
    'GERENCIAR_FILIAIS', 
    'VISUALIZAR_CLIENTES',
    'VISUALIZAR_CATALOGO',
    'VISUALIZAR_CORRETIVA',
    'VISUALIZAR_PREVENTIVA',
  ],

  // Papel de Cliente (Visão limitada)
  CLIENTE: [
    'VISUALIZAR_CONTRATO',
    'VISUALIZAR_RASTREAMENTO',
  ],
};

// 2. Usuários Fictícios (Simulação do Banco de Dados de Usuários)
export const FAKE_USERS = [
  { id: 1, name: 'João Vendas', role: 'RESP_VENDA', credential: 'VENDAS_01', username: 'joao.vendas', password: '123' },
  { id: 2, name: 'Maria Fabricação', role: 'RESP_FABRICACAO', credential: 'FAB_02', username: 'maria.fab', password: '123' },
  { id: 3, name: 'Pedro Instalação', role: 'RESP_INSTALACAO', credential: 'INSTAL_03', username: 'pedro.inst', password: '123' },
  { id: 4, name: 'Ana Geral', role: 'RESP_GERAL', credential: 'ADMIN_00', username: 'ana.geral', password: '123' },
  { id: 5, name: 'Empresa Alfa (Cliente)', role: 'CLIENTE', credential: 'CLIENTE_10', username: 'alfa.client', password: '123' },
];

// 3. Mapeamento de Rotas para Permissões (Usado para proteger o acesso à URL)
export const ROUTE_PERMISSIONS = {
  '/estoque': 'VISUALIZAR_ESTOQUE',
  '/fornecedores': 'VISUALIZAR_FORNECEDORES',
  '/rastreamento': 'VISUALIZAR_RASTREAMENTO',
  '/usuarios': 'GERENCIAR_USUARIOS',
  '/filiais': 'GERENCIAR_FILIAIS',
  '/clientes': 'VISUALIZAR_CLIENTES',
  '/catalogo': 'VISUALIZAR_CATALOGO',
  '/corretiva': 'VISUALIZAR_CORRETIVA',
  '/preventiva': 'VISUALIZAR_PREVENTIVA',
  // Note: /home, /login, /recuperar-senha não precisam estar aqui.
};