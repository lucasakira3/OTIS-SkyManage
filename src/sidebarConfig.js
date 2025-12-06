// src/sidebarConfig.js

export const MENU_ITEMS = [
    // LINKS GERAIS
    { 
        label: 'Home', 
        path: '/'
    },
    { 
        label: 'Rastreamento', 
        path: '/rastreamento', 
        requiredPermission: 'VISUALIZAR_RASTREAMENTO' 
    },
    
    // LINKS DE FLUXO (Fabricação / Instalação)
    { 
        label: 'Estoque', 
        path: '/estoque',
        requiredPermission: 'VISUALIZAR_ESTOQUE' 
    },
    { 
        label: 'Fornecedores', 
        path: '/fornecedores',
        requiredPermission: 'VISUALIZAR_FORNECEDORES' 
    },
    { 
        label: 'Instalação', 
        path: '/instalacao' // Não protegemos esta rota, mas podemos proteger as ações dentro dela
    },

    // LINKS DE VENDAS/GERAL
    { 
        label: 'Clientes', 
        path: '/clientes',
        requiredPermission: 'VISUALIZAR_CLIENTES' 
    },
    { 
        label: 'Catálogo', 
        path: '/catalogo',
        requiredPermission: 'VISUALIZAR_CATALOGO' 
    },
    
    // LINKS DE MANUTENÇÃO
    { 
        label: 'Corretiva', 
        path: '/corretiva',
        requiredPermission: 'VISUALIZAR_CORRETIVA' 
    },
    { 
        label: 'Preventiva', 
        path: '/preventiva',
        requiredPermission: 'VISUALIZAR_PREVENTIVA' 
    },

    // LINKS DE ADMINISTRAÇÃO
    { 
        label: 'Usuários', 
        path: '/usuarios',
        requiredPermission: 'GERENCIAR_USUARIOS' 
    },
    { 
        label: 'Filiais', 
        path: '/filiais',
        requiredPermission: 'GERENCIAR_FILIAIS' 
    },
];