// src/search/searchIndex.js
import { PEDIDOS } from "../data/mockPedidos";

// ====== Copiados dos componentes (mock) ======
const ESTOQUE = [
  { id: 1, codigo: "PEC-001", descricao: "Motor de tração", local: "SP - Matriz" },
  { id: 2, codigo: "PEC-002", descricao: "Placa de controle", local: "RJ - Filial" },
  { id: 3, codigo: "PEC-003", descricao: "Cabos de aço", local: "SP - Matriz" },
  { id: 4, codigo: "PEC-004", descricao: "Painel de botões", local: "BH - Filial" },
  { id: 5, codigo: "PEC-005", descricao: "Amortecedor hidráulico", local: "SP - Matriz" },
  { id: 6, codigo: "PEC-006", descricao: "Sistema de freio", local: "RJ - Filial" },
  { id: 7, codigo: "PEC-007", descricao: "Contrapeso de segurança", local: "BH - Filial" },
  { id: 8, codigo: "PEC-008", descricao: "Sensor de movimento", local: "SP - Matriz" },
  { id: 9, codigo: "PEC-009", descricao: "Roda de tração", local: "RJ - Filial" },
  { id: 10, codigo: "PEC-010", descricao: "Porta automática", local: "BH - Filial" },
];

const CLIENTES = [
  { id: 1, nome: "Shopping Paulista", contato: "Fernanda Ribeiro", telefone: "(11) 4002-8922" },
  { id: 2, nome: "Hospital Santa Casa", contato: "Dr. João Alves", telefone: "(11) 3333-4444" },
  { id: 3, nome: "Condomínio Azul", contato: "Marcos Silva", telefone: "(11) 95555-1111" },
  { id: 4, nome: "Escritório Central", contato: "Patrícia Gomes", telefone: "(21) 92222-3333" },
  { id: 5, nome: "Hotel Copacabana", contato: "Ricardo Torres", telefone: "(21) 93333-2222" },
];

const FILIAIS = [
  { id: 1, nome: "Filial São Paulo", endereco: "Av. Paulista, 1000" },
  { id: 2, nome: "Filial Rio de Janeiro", endereco: "Rua das Laranjeiras, 500" },
  { id: 3, nome: "Filial Belo Horizonte", endereco: "Av. Afonso Pena, 1200" },
  { id: 4, nome: "Filial Curitiba", endereco: "Rua XV de Novembro, 900" },
  { id: 5, nome: "Filial Porto Alegre", endereco: "Av. Borges de Medeiros, 700" },
];

const FORNECEDORES = [
  { id: 1, nome: "Metalúrgica Silva", email: "contato@metalurgicasilva.com", categoria: "Estruturas" },
  { id: 2, nome: "Elétrica Luz Forte", email: "vendas@luzforte.com", categoria: "Elétrica" },
  { id: 3, nome: "Vidraçaria Cristal", email: "atendimento@cristal.com", categoria: "Vidros" },
  { id: 4, nome: "Hidráulica Aqua", email: "suporte@aqua.com", categoria: "Hidráulica" },
  { id: 5, nome: "Pinturas Premium", email: "orcamento@premium.com", categoria: "Pintura" },
];

const ORDENS_CORRETIVAS = [
  { id: 1, cliente: "Shopping Paulista", elevador: "ELEV-101", status: "Aberta" },
  { id: 2, cliente: "Hospital Santa Casa", elevador: "ELEV-202", status: "Em andamento" },
  { id: 3, cliente: "Condomínio Azul", elevador: "ELEV-303", status: "Concluída" },
  { id: 4, cliente: "Escritório Central", elevador: "ELEV-404", status: "Aberta" },
];

const ORDENS_INSTALACAO = [
  { id: 1, cliente: "Shopping Iguatemi", elevador: "ELEV-901", status: "Planejada" },
  { id: 2, cliente: "Hospital Sírio-Libanês", elevador: "ELEV-902", status: "Em andamento" },
  { id: 3, cliente: "Condomínio Panorama", elevador: "ELEV-903", status: "Concluída" },
  { id: 4, cliente: "Estação Metro SP", elevador: "ELEV-904", status: "Planejada" },
];

// ===== NOVO: Usuários =====
const USUARIOS = [
  { id: 1, nome: "Alan Carlos", cargo: "Técnico de Manutenção", email: "alan.carlos@otis.com" },
  { id: 2, nome: "Akira Teruya", cargo: "Engenheiro de Projetos", email: "akira.teruya@otis.com" },
  { id: 3, nome: "Pedro Dalmas", cargo: "Supervisor de Fabricação", email: "pedro.dalmas@otis.com" },
  { id: 4, nome: "João Benedet", cargo: "Supervisor de Instalações", email: "joao.benedet@otis.com" },
  { id: 5, nome: "Fabrício Magoga", cargo: "Atendimento ao Cliente", email: "fabricio.magoga@otis.com" },
  { id: 6, nome: "Mariana Silva", cargo: "Técnico de Manutenção", email: "mariana.silva@otis.com" },
  { id: 7, nome: "Lucas Pereira", cargo: "Engenheiro de Projetos", email: "lucas.pereira@otis.com" },
  { id: 8, nome: "Carla Souza", cargo: "Supervisor de Instalações", email: "carla.souza@otis.com" },
  { id: 9, nome: "Rafael Costa", cargo: "Atendimento ao Cliente", email: "rafael.costa@otis.com" },
  { id: 10, nome: "Juliana Lima", cargo: "Técnico de Manutenção", email: "juliana.lima@otis.com" },
  { id: 11, nome: "Thiago Almeida", cargo: "Engenheiro de Projetos", email: "thiago.almeida@otis.com" },
  { id: 12, nome: "Fernanda Oliveira", cargo: "Supervisor de Fabricação", email: "fernanda.oliveira@otis.com" },
  { id: 13, nome: "Gustavo Mendes", cargo: "Atendimento ao Cliente", email: "gustavo.mendes@otis.com" },
  { id: 14, nome: "Beatriz Santos", cargo: "Técnico de Manutenção", email: "beatriz.santos@otis.com" },
  { id: 15, nome: "Ricardo Ferreira", cargo: "Supervisor de Instalações", email: "ricardo.ferreira@otis.com" },
  { id: 16, nome: "Camila Rocha", cargo: "Engenheiro de Projetos", email: "camila.rocha@otis.com" },
  { id: 17, nome: "Diego Barbosa", cargo: "Técnico de Manutenção", email: "diego.barbosa@otis.com" },
  { id: 18, nome: "Larissa Gomes", cargo: "Atendimento ao Cliente", email: "larissa.gomes@otis.com" },
  { id: 19, nome: "Vinicius Ramos", cargo: "Supervisor de Fabricação", email: "vinicius.ramos@otis.com" },
  { id: 20, nome: "Patrícia Dias", cargo: "Engenheiro de Projetos", email: "patricia.dias@otis.com" },
  { id: 21, nome: "Eduardo Nogueira", cargo: "Técnico de Manutenção", email: "eduardo.nogueira@otis.com" },
];

// ====== util ======
const normalize = (s) =>
  (s || "").toString().normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

export function buildIndex() {
  const items = [];

  // Pedidos (Rastreamento)
  PEDIDOS.forEach((p) => {
    items.push({
      type: "pedido",
      title: `Pedido #${p.id}`,
      subtitle: `${p.descricao || p.obra} — ${p.cliente}`,
      keywords: [p.id, p.descricao, p.obra, p.cliente, p.modelo, p.status].join(" "),
      route: `/rastreamento?id=${encodeURIComponent(p.id)}`,
    });
  });

  // Estoque
  ESTOQUE.forEach((e) => {
    items.push({
      type: "estoque",
      title: `${e.codigo} — ${e.descricao}`,
      subtitle: e.local,
      keywords: [e.codigo, e.descricao, e.local].join(" "),
      route: `/estoque?query=${encodeURIComponent(e.codigo)}`,
    });
  });

  // Clientes
  CLIENTES.forEach((c) => {
    items.push({
      type: "cliente",
      title: c.nome,
      subtitle: `${c.contato || ""} ${c.telefone || ""}`.trim(),
      keywords: [c.nome, c.contato, c.telefone].join(" "),
      route: `/clientes?focus=${encodeURIComponent(c.nome)}`,
    });
  });

  // Filiais
  FILIAIS.forEach((f) => {
    items.push({
      type: "filial",
      title: f.nome,
      subtitle: f.endereco,
      keywords: [f.nome, f.endereco].join(" "),
      route: `/filiais?focus=${encodeURIComponent(f.nome)}`,
    });
  });

  // Fornecedores
  FORNECEDORES.forEach((f) => {
    items.push({
      type: "fornecedor",
      title: f.nome,
      subtitle: `${f.categoria} — ${f.email}`,
      keywords: [f.nome, f.email, f.categoria].join(" "),
      route: `/fornecedores?focus=${encodeURIComponent(f.nome)}`,
    });
  });

  // Ordens corretivas
  ORDENS_CORRETIVAS.forEach((o) => {
    items.push({
      type: "ordem_corretiva",
      title: `Corretiva — ${o.cliente}`,
      subtitle: `${o.elevador} — ${o.status}`,
      keywords: [o.cliente, o.elevador, o.status].join(" "),
      route: `/corretiva?query=${encodeURIComponent(o.cliente)}`,
    });
  });

  // Ordens instalação
  ORDENS_INSTALACAO.forEach((o) => {
    items.push({
      type: "ordem_instalacao",
      title: `Instalação — ${o.cliente}`,
      subtitle: `${o.elevador} — ${o.status}`,
      keywords: [o.cliente, o.elevador, o.status].join(" "),
      route: `/instalacao?query=${encodeURIComponent(o.cliente)}`,
    });
  });

  // ===== NOVO: Usuários
  USUARIOS.forEach((u) => {
    items.push({
      type: "usuario",
      title: u.nome,
      subtitle: `${u.cargo} — ${u.email}`,
      keywords: [u.nome, u.cargo, u.email].join(" "),
      route: `/usuarios?focus=${encodeURIComponent(u.nome)}`,
    });
  });

  return items;
}

export function searchAll(q) {
  const nQ = normalize(q);
  if (!nQ) return [];
  const db = buildIndex();
  const scored = db
    .map((item) => {
      const hay = normalize(`${item.title} ${item.subtitle} ${item.keywords}`);
      const match = hay.includes(nQ)
        ? 3
        : nQ
            .split(/\s+/)
            .filter(Boolean)
            .reduce((acc, t) => acc + (hay.includes(t) ? 1 : 0), 0);
      return { ...item, _score: match };
    })
    .filter((r) => r._score > 0)
    .sort((a, b) => b._score - a._score || a.title.localeCompare(b.title));

  return scored;
}
