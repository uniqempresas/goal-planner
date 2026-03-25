# Wireframes - Goal Planner

**Projeto:** Goal Planner  
**Versão:** 1.0  
**Data:** 24/03/2026

---

## Índice de Documentos

### 📁 Arquitetura
| # | Arquivo | Descrição |
|---|---------|-----------|
| 1 | [00-navegacao-general.md](./00-navegacao-general.md) | Diagrama geral de rotas e navegação |

### 🎨 Design System
| # | Arquivo | Descrição |
|---|---------|-----------|
| 2 | [layout-mobile-menu.md](./layout-mobile-menu.md) | Especificação do Menu Mobile Inferior |

### Módulo 1 - Autenticação
| # | Arquivo | Descrição |
|---|---------|-----------|
| 3 | [modulo-01-autenticacao.md](./modulo-01-autenticacao.md) | Landing, Login, Registro, Recuperação de Senha |

### Módulo 2 - Dashboard
| # | Arquivo | Descrição |
|---|---------|-----------|
| 4 | [modulo-02-dashboard.md](./modulo-02-dashboard.md) | Dashboard principal, ONE Thing, Métricas |

### Módulo 3 - Áreas de Vida
| # | Arquivo | Descrição |
|---|---------|-----------|
| 5 | [modulo-03-areas-de-vida.md](./modulo-03-areas-de-vida.md) | CRUD completo de Áreas |

### Módulo 4 - Metas Hierárquicas
| # | Arquivo | Descrição |
|---|---------|-----------|
| 6 | [modulo-04-metas-hierarquicas.md](./modulo-04-metas-hierarquicas.md) | G → A → M → S com framework SMART |

### Módulo 5 - Agenda
| # | Arquivo | Descrição |
|---|---------|-----------|
| 7 | [modulo-05-agenda.md](./modulo-05-agenda.md) | Today View, Time Blocking, Tarefas |

### Módulo 6 - Templates
| # | Arquivo | Descrição |
|---|---------|-----------|
| 8 | [modulo-06-templates.md](./modulo-06-templates.md) | Biblioteca de templates |

### Módulo 7 - Revisões
| # | Arquivo | Descrição |
|---|---------|-----------|
| 9 | [modulo-07-revisoes.md](./modulo-07-revisoes.md) | Revisão Semanal e Mensal |

### Módulo 8 - Conquistas
| # | Arquivo | Descrição |
|---|---------|-----------|
| 10 | [modulo-08-conquistas.md](./modulo-08-conquistas.md) | Badges, Marcos, Gamificação |

### Módulo 9 - Configurações
| # | Arquivo | Descrição |
|---|---------|-----------|
| 11 | [modulo-09-configuracoes.md](./modulo-09-configuracoes.md) | Perfil, Segurança, Notificações |

---

## Referências de Design

### Cores
- **Primary:** Blue Baby (#3B82F6)
- **Accent:** Amber (#F59E0B) - para ONE Thing
- **Neutras:** Slate
- **Dark Mode:** Slate escuro

### Tipografia
- **Família:** Poppins
- **Pesos:** 300, 400, 500, 600, 700

### Componentes
- **Biblioteca:** shadcn/ui
- **Radius:** 8px (suave)
- **Sombras:** Sutis

### Layout
- **Desktop:** Sidebar 240px + Content
- **Mobile:** Menu inferior fixo (5 itens, scroll horizontal)

---

## Estrutura de Arquivos

```
tracking/
├── DESIGN_SYSTEM.md           # Especificações de design
├── wireframes/
│   ├── README.md               # Este arquivo
│   ├── 00-navegacao-general.md
│   ├── layout-mobile-menu.md
│   ├── modulo-01-autenticacao.md
│   ├── modulo-02-dashboard.md
│   ├── modulo-03-areas-de-vida.md
│   ├── modulo-04-metas-hierarquicas.md
│   ├── modulo-05-agenda.md
│   ├── modulo-06-templates.md
│   ├── modulo-07-revisoes.md
│   ├── modulo-08-conquistas.md
│   └── modulo-09-configuracoes.md
```

---

## Próximos Passos

1. Revisar todos os wireframes
2. Implementar Design System no código
3. Criar componentes base
4. Desenvolver telas do MVP

---

**Última atualização:** 24/03/2026
