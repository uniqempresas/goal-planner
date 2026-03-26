# Roadmap - Goal Planner

## Visão Geral

**Goal Planner** é uma aplicação pessoal de planejamento estratégico baseada no método "A Única Coisa" de Gary Keller. O aplicativo ajuda usuários a definirem e alcançarem suas metas através de uma estrutura hierárquica rigorosa (G → A → M → S → D), time blocking para produtividade diária, e sistemas de revisão periódica.

**Abordagem:** Primeiro todo o frontend com dados mockados, depois integração com Supabase.

**Objetivo Principal:** Criar uma aplicação web completa que permita aos usuários organizar suas vidas em áreas, definir metas hierárquicas, priorizar atividades diárias (ONE Thing), visualizar conexões entre metas (Domino Effect), e acompanhar seu progresso através de dashboards e gamificação.

**Público-Alvo:** Profissionais, estudantes e qualquer pessoa que busca produtividade pessoal através de planejamento estratégico estruturado.

**Stack Tecnológico:**

- Frontend: React 19 + TypeScript + Vite
- Styling: Tailwind CSS + shadcn/ui
- Backend: Supabase (Auth, DB, Storage) - será integrado no final
- Database: PostgreSQL (via Supabase)
- Hosting: Vercel
- Routing: React Router v7
- Dados: Mockados inicialmente, Supabase depois

---

## Milestones

| Milestone              | Descrição                              | Sprint  | Entrega Estimada |
| ---------------------- | -------------------------------------- | ------- | ---------------- |
| M1: Setup              | Configuração inicial do projeto        | S1      | Semana 1         |
| M2: Frontend Core      | Autenticação, Layout base, Menu Mobile | S2-S3   | Semana 3         |
| M3: Módulos Principal  | Áreas, Metas, Agenda, Dashboard        | S4-S9   | Semana 9         |
| M4: Features Avançadas | Templates, Revisões, Conquistas        | S10-S11 | Semana 11        |
| M5: Configurações      | Perfil, Temas, Preferências            | S11     | Semana 11        |
| M6: Integração         | Supabase Backend                       | S12     | Semana 12        |
| M7: Qualidade          | Testes, Segurança, Otimização          | S13-S14 | Semana 14        |
| M8: Launch             | Deploy em Produção                     | S15     | Semana 15        |

---

## Sprint 1: Setup do Projeto

**Objetivo:** Configurar a estrutura base do projeto frontend, sem dependências de backend.

### Tasks

- [x] Inicializar projeto Vite com React 19 + TypeScript
- [x] Configurar ESLint e Prettier para código padronizado
- [x] Configurar Tailwind CSS com design system (cores, tipografia, radius)
- [x] Configurar shadcn/ui e instalar componentes base
- [x] Configurar React Router v7 com estrutura de rotas
- [x] Criar estrutura de pastas (components, pages, hooks, lib, types)
- [x] Configurar variáveis de ambiente (.env.example)
- [ ] Configurar script de deploy para Vercel
- [x] Configurar GitHub Actions para CI/CD básico (lint + build)
- [x] Criar layout base (Header, Sidebar, Main Content)

### Critérios de Aceite

- [x] Projeto compila sem erros com `npm run build`
- [x] Servidor de desenvolvimento inicia com `npm run dev`
- [x] Tailwind CSS configurado com design system definido
- [x] shadcn/ui instalado e funcionando
- [x] Rotas básicas configuradas (home, login, dashboard placeholder)
- [x] Estrutura de pastas criada

### Dependências

- Nenhuma (início do projeto)

---

## Sprint 2: Autenticação (Mockada)

**Objetivo:** Implementar interface de autenticação com dados mockados para desenvolvimento offline.

### Tasks

- [x] Criar contexto de Auth mockado (useAuth)
- [x] Criar página de Login com design system
- [x] Criar página de Registro com validação de campos
- [x] Criar página de Recuperação de Senha
- [x] Implementar proteção de rotas (Private Routes)
- [x] Implementar logout com redirect para login
- [x] Adicionar validação de formulários (Zod + React Hook Form)
- [x] Criar componente de Toast para notificações (sonner)
- [x] Criar dados mockados de usuário (faker ou JSON estático)
- [x] Criar página de perfil do usuário (após login)

### Critérios de Aceite

- [x] Usuário consegue criar conta (mock)
- [x] Usuário consegue fazer login (mock)
- [x] Usuário consegue recuperar senha (mock)
- [x] Rota protegida redireciona para login se não autenticado
- [x] State de autenticação persiste entre reloads (localStorage)
- [x] Design responsivo e acessível

### Dependências

- [x] Sprint 1 concluída

---

## Sprint 3: Layout Base e Menu Mobile

**Objetivo:** Finalizar layout responsivo com menu mobile inferior e estrutura de navegação.

### Tasks

- [x] Implementar Header com logo, busca, toggle tema, avatar
- [x] Implementar Sidebar desktop com navegação completa
- [x] Implementar Menu Mobile Inferior com 5 módulos
- [x] Implementar scroll horizontal no menu mobile (2 esquerda, 2 direita, centro)
- [x] Criar sub-menu "Mais" com Sheet (shadcn)
- [x] Implementar tema escuro (Dark Mode) base
- [x] Criar componente de Loading/Skeleton
- [x] Implementar transição entre páginas
- [x] Criar 404 Page e Error Boundary
- [ ] Adicionar animações de transição (Framer Motion)

### Critérios de Aceite

- [x] Layout responsivo (desktop e mobile)
- [x] Menu inferior funcional com scroll horizontal
- [x] Dark Mode toggle funcionando
- [x] Transições suaves entre páginas
- [x] 404 e error handling funcionando

### Dependências

- [x] Sprint 2 concluída

---

## Sprint 4: Áreas de Vida (CRUD Mockado)

**Objetivo:** Implementar módulo de Áreas de Vida com CRUD completo usando dados mockados.

### Tasks

- [x] Criar mock data para Áreas de Vida
- [x] Criar hook customizado useAreas (mock)
- [x] Criar página de listagem de Áreas de Vida
- [x] Criar componente de Card para cada Área
- [x] Implementar modal de criação de nova Área
- [x] Implementar modal de edição de Área
- [x] Implementar exclusão de Área com confirmação
- [x] Criar página de detalhes de uma Área
- [ ] Implementar ordenação de Áreas (drag & drop)
- [x] Adicionar cor personalizada para cada Área
- [x] Implementar seleção de ícones para Áreas
- [ ] Criar estado vazio (empty state)

### Critérios de Aceite

- [x] Usuário consegue criar uma nova Área
- [x] Usuário consegue editar uma Área existente
- [x] Usuário consegue excluir uma Área
- [ ] Áreas aparecem em ordem de prioridade
- [x] Cada Área tem cor e ícone distintos
- [ ] Interface responsiva e fluida

### Dependências

- [x] Sprint 3 concluída

---

## Sprint 5: Metas Hierárquicas - Estrutura G→A→M→S→D

**Objetivo:** Implementar a hierarquia completa de metas com dados mockados.

### Tasks

- [ ] Criar mock data para Metas (todas hierarquias)
- [ ] Criar hook customizado useMetas (mock)
- [ ] Criar página de listagem de Metas por nível
- [ ] Implementar criação de Grand Goal (nível G)
- [ ] Implementar criação de Metas Anuais (nível A) vinculadas a GG
- [ ] Implementar criação de Metas Mensais (nível M) vinculadas a A
- [ ] Implementar criação de Metas Semanais (nível S) vinculadas a M
- [ ] Implementar criação de Tarefas Diárias (nível D) vinculadas a S
- [ ] Criar visualização de hierarquia em árvore (tree view)
- [ ] Implementar navegação entre níveis de meta
- [ ] Criar breadcrumbs para navegação hierárquica

### Critérios de Aceite

- [ ] Hierarquia completa visível e navegável
- [ ] Cada meta mostra suas sub-metas
- [ ] Navegação entre níveis funciona corretamente
- [ ] Breadcrumbs mostram caminho completo
- [ ] Criação de meta em qualquer nível funciona

### Dependências

- [ ] Sprint 4 concluída

---

## Sprint 6: Metas - Features Avançadas

**Objetivo:** Adicionar recursos avançados às metas: ONE Thing, SMART, prazo, progresso.

### Tasks

- [ ] Implementar seleção de ONE Thing por nível hierárquico
- [ ] Adicionar campos SMART às metas
- [ ] Implementar sistema de progresso automático (% completada)
- [ ] Adicionar campo de prazo (due date) com validação
- [ ] Implementar sistema de Domino Effect (metas conectadas)
- [ ] Criar visualização de dependências entre metas
- [ ] Implementar marcação de meta como concluída
- [ ] Adicionar notas/descrição às metas (markdown)
- [ ] Implementar busca e filtro de metas
- [ ] Criar atalhos de teclado para navegação

### Critérios de Aceite

- [ ] ONE Thing claramente visível em cada nível
- [ ] Campos SMART editáveis e salvos (mock)
- [ ] Progresso calculado corretamente
- [ ] Conexões entre metas visíveis (Domino Effect)
- [ ] Busca e filtros funcionando

### Dependências

- [ ] Sprint 5 concluída

---

## Sprint 7: Agenda Diária - Time Blocking

**Objetivo:** Implementar sistema de agenda com time blocking usando dados mockados.

### Tasks

- [ ] Criar mock data para Time Blocks
- [ ] Criar hook customizado useAgenda (mock)
- [ ] Criar página de Agenda Diária (Today View)
- [ ] Implementar visualização de manhã (6h-12h)
- [ ] Implementar visualização de tarde (12h-18h)
- [ ] Implementar visualização de noite (18h-22h)
- [ ] Criar modal de criação de Time Block
- [ ] Implementar arrastar e soltar para agendar tarefas
- [ ] Criar listagem de tarefas disponíveis para agendar
- [ ] Implementar edição e exclusão de Time Blocks
- [ ] Adicionar indicador de prioridade visual nos blocks
- [ ] Criar seção de Tarefas Atrasadas

### Critérios de Aceite

- [ ] Agenda mostra os três períodos do dia
- [ ] Usuário consegue criar Time Block
- [ ] Usuário consegue agendar tarefa em um bloco
- [ ] Arrastar e soltar funciona corretamente
- [ ] Visualização responsiva

### Dependências

- [ ] Sprint 6 concluída

---

## Sprint 8: Planejamento Semanal

**Objetivo:** Implementar visualização e planejamento da semana completa.

### Tasks

- [ ] Criar página de Planejamento Semanal
- [ ] Implementar visualização de 7 dias em grid
- [ ] Criar arrasto de tarefas entre dias
- [ ] Implementar visualização de ONE Thing semanal
- [ ] Adicionar indicadores de produtividade por dia
- [ ] Criar modo de edição em massa
- [ ] Implementar resumo semanal (tarefas concluídas, pendentes)
- [ ] Adicionar quick add de tarefas

### Critérios de Aceite

- [ ] Semana completa visível em uma tela
- [ ] Arrastar tarefas entre dias funciona
- [ ] ONE Thing semanal visível
- [ ] Resumo semanal preciso

### Dependências

- [ ] Sprint 7 concluída

---

## Sprint 9: Dashboard e Visualização de Progresso

**Objetivo:** Criar dashboard principal com visualização de progresso.

### Tasks

- [ ] Criar componente de widget de progresso geral
- [ ] Implementar gráfico de progresso por Área de Vida
- [ ] Implementar widget de ONE Thing do dia atual
- [ ] Criar widget de Time Blocks agendados hoje
- [ ] Implementar widget de metas próximas (próxima semana)
- [ ] Criar widget de conquistas recentes
- [ ] Adicionar atalhos rápidos (quick actions)
- [ ] Implementar filtros de período (dia, semana, mês)
- [ ] Criar animação de transição no dashboard
- [ ] Adicionar estatísticas de produtividade

### Critérios de Aceite

- [ ] Dashboard mostra visão geral completa
- [ ] Progresso de cada Área visível
- [ ] ONE Thing do dia claramente destacado
- [ ] Time Blocks do dia visíveis
- [ ] Métricas atualizadas em tempo real

### Dependências

- [ ] Sprint 8 concluída

---

## Sprint 10: Templates de Metas

**Objetivo:** Implementar sistema de templates para facilitar criação de metas.

### Tasks

- [ ] Criar mock data para Templates
- [ ] Criar hook customizado useTemplates (mock)
- [ ] Criar biblioteca de templates pré-definidos
- [ ] Implementar página de listagem de templates
- [ ] Criar modal de visualização de template
- [ ] Implementar aplicação de template a uma Área
- [ ] Implementar criação de template personalizado
- [ ] Criar categorias de templates (carreira, saúde, finanças, etc.)
- [ ] Implementar busca de templates
- [ ] Adicionar preview da estrutura do template

### Critérios de Aceite

- [ ] Templates pré-definidos disponíveis
- [ ] Usuário consegue criar meta a partir de template
- [ ] Usuário consegue criar template personalizado
- [ ] Categorização funcionando

### Dependências

- [ ] Sprint 9 concluída

---

## Sprint 11: Revisões Semanal e Mensal

**Objetivo:** Implementar sistema de revisões periódicas.

### Tasks

- [ ] Criar mock data para Revisões
- [ ] Criar hook customizado useRevisoes (mock)
- [ ] Criar página de Revisão Semanal
- [ ] Implementar checklist de avaliação da semana
- [ ] Criar template de perguntas para reflexão semanal
- [ ] Implementar revisão de metas da semana
- [ ] Implementar planejamento da próxima semana
- [ ] Criar página de Revisão Mensal
- [ ] Criar template de perguntas para reflexão mensal
- [ ] Implementar revisão de metas do mês
- [ ] Implementar análise de progresso por Área

### Critérios de Aceite

- [ ] Revisão Semanal funcional e completa
- [ ] Revisão Mensal funcional e completa
- [ ] Dados de referência preenchidos automaticamente
- [ ] Histórico de revisões preservado (mock)

### Dependências

- [ ] Sprint 10 concluída

---

## Sprint 12: Conquistas e Configurações

**Objetivo:** Implementar sistema de gamificação e configurações personalizadas.

### Tasks

**Conquistas:**

- [ ] Criar mock data para Conquistas
- [ ] Criar hook customizado useConquistas (mock)
- [ ] Implementar sistema de pontos/XP
- [ ] Criar lógica de desbloqueio de conquistas
- [ ] Criar página de Galeria de Conquistas
- [ ] Implementar badges por categoria
- [ ] Adicionar notificação de conquista desbloqueada
- [ ] Criar ranking pessoal (progress over time)

**Configurações:**

- [ ] Criar página de Configurações
- [ ] Implementar edição de perfil (nome, avatar, bio)
- [ ] Implementar seleção de tema (cores customizáveis)
- [ ] Implementar Dark Mode toggle global
- [ ] Configurar preferências de notificação
- [ ] Implementar exportação de dados (JSON)
- [ ] Criar página de preferências de idioma
- [ ] Implementar delete de conta

### Critérios de Aceite

- [ ] Sistema de conquistas funcionando (mock)
- [ ] Conquistas desbloqueiam corretamente
- [ ] Galeria de conquistas visível
- [ ] Configurações de perfil funcionando
- [ ] Temas customizáveis funcionando
- [ ] Dark Mode persistindo

### Dependências

- [ ] Sprint 11 concluída

---

## Sprint 13: Integração com Supabase

**Objetivo:** Integrar frontend com backend Supabase, substituindo dados mockados.

### Tasks

- [ ] Criar projeto Supabase e configurar PostgreSQL
- [ ] Definir schema do banco (todas as tabelas)
- [ ] Criar políticas RLS (Row Level Security)
- [ ] Configurar storage bucket para imagens/avatares
- [ ] Configurar Supabase SDK e variáveis de ambiente
- [ ] Substituir useAuth mockado por Supabase Auth
- [ ] Substituir todos os hooks mockados por chamadas Supabase
- [ ] Implementar sincronização de dados em tempo real
- [ ] Criar funções Edge para operações complexas
- [ ] Configurar triggers para criação de dados automáticos

### Critérios de Aceite

- [ ] Todas as tabelas criadas no Supabase
- [ ] Políticas RLS aplicadas e testadas
- [ ] Autenticação funcionando com Supabase
- [ ] Dados persistindo corretamente
- [ ] Aplicação funcionando com dados reais

### Dependências

- [ ] Sprint 12 concluída

---

## Sprint 14: Testes e Qualidade

**Objetivo:** Garantir qualidade do código através de testes.

### Tasks

- [ ] Configurar Jest/Vitest para testes unitários
- [ ] Criar testes unitários para hooks customizados
- [ ] Criar testes unitários para utilitários
- [ ] Criar testes para componentes principais
- [ ] Configurar testes de integração com React Testing Library
- [ ] Criar testes de integração para fluxo de autenticação
- [ ] Criar testes de integração para CRUD de Áreas
- [ ] Configurar testes E2E com Playwright
- [ ] Criar teste E2E para jornada do usuário
- [ ] Configurar coverage report (target: 70%)

### Critérios de Aceite

- [ ] Testes unitários passando (>50% coverage)
- [ ] Testes de integração cobrindo fluxos principais
- [ ] Testes E2E passando em ambiente limpo
- [ ] CI/CD executando testes automaticamente

### Dependências

- [ ] Sprint 13 concluída

---

## Sprint 15: Segurança e Otimização

**Objetivo:** Fortalecer segurança e otimizar performance.

### Tasks

**Segurança:**

- [ ] Auditar e corrigir vulnerabilidades (npm audit)
- [ ] Implementar headers de segurança (CSP, X-Frame-Options)
- [ ] Adicionar proteção CSRF
- [ ] Implementar rate limiting em API calls
- [ ] Revisar e fortalecer políticas RLS do Supabase
- [ ] Adicionar sanitização de inputs
- [ ] Implementar logging de segurança

**Otimização:**

- [ ] Analisar bundle size e otimizar (code splitting)
- [ ] Implementar lazy loading de rotas
- [ ] Otimizar imagens
- [ ] Implementar cache de dados (React Query)
- [ ] Monitorar Core Web Vitals
- [ ] Implementar critical CSS inline

### Critérios de Aceite

- [ ] Nenhuma vulnerabilidade crítica encontrada
- [ ] Headers de segurança aplicados
- [ ] Bundle size < 200KB (gzipped)
- [ ] LCP < 2.5s, FID < 100ms, CLS < 0.1

### Dependências

- [ ] Sprint 14 concluída

---

## Sprint 16: Launch e Deploy

**Objetivo:** Preparar e executar deploy em produção.

### Tasks

- [ ] Configurar ambiente de produção no Supabase
- [ ] Configurar variáveis de ambiente de produção
- [ ] Executar deploy para Vercel (production)
- [ ] Configurar domínio personalizado (se aplicável)
- [ ] Configurar SSL/HTTPS
- [ ] Configurar monitoramento (Sentry, Analytics)
- [ ] Configurar alertas de erro
- [ ] Criar documentação de uso (guia do usuário)
- [ ] Criar documentação técnica (README.md)
- [ ] Executar teste de carga básico
- [ ] Executar smoke tests em produção
- [ ] Preparar comunicação de launch

### Critérios de Aceite

- [ ] Aplicação online e acessível em produção
- [ ] Domínio funcionando com HTTPS
- [ ] Monitoramento configurado e ativo
- [ ] Documentação completa
- [ ] Smoke tests passando

### Dependências

- [ ] Sprint 15 concluída

---

## Resumo de Sprints

| Sprint | Nome                   | Foco Principal              | Tipo      |
| ------ | ---------------------- | --------------------------- | --------- |
| S1     | Setup do Projeto       | Infraestrutura frontend     | Setup     |
| S2     | Autenticação Mockada   | Login, Registro, Auth       | Frontend  |
| S3     | Layout e Menu Mobile   | Header, Sidebar, Mobile Nav | Frontend  |
| S4     | Áreas de Vida          | CRUD completo               | Frontend  |
| S5     | Metas Hierárquicas     | Estrutura G→A→M→S→D         | Frontend  |
| S6     | Metas Avançadas        | ONE Thing, SMART, Domino    | Frontend  |
| S7     | Agenda Diária          | Time Blocking               | Frontend  |
| S8     | Planejamento Semanal   | Semana completa             | Frontend  |
| S9     | Dashboard              | Progresso visual            | Frontend  |
| S10    | Templates              | Biblioteca de templates     | Frontend  |
| S11    | Revisões               | Semanal e Mensal            | Frontend  |
| S12    | Conquistas + Config    | Gamificação + Settings      | Frontend  |
| S13    | Integração Supabase    | Backend real                | Backend   |
| S14    | Testes                 | Unit, Integração, E2E       | Qualidade |
| S15    | Segurança + Otimização | Performance e hardening     | Qualidade |
| S16    | Launch                 | Deploy final                | Launch    |

**Total Estimado:** 16 semanas

---

## Notas Adicionais

- **Dados Mockados:** Todas as sprints de frontend (S1-S12) usam dados mockados, permitindo desenvolvimento offline e rápido.
- **Feedback Contínuo:** Ao final de cada sprint, revisar progresso com stakeholders e ajustar roadmap se necessário.
- **Feature Flags:** Para funcionalidades de risco, usar feature flags e ativar gradualmente.
- **Rollback:** Manter capacidade de rollback para cada deploy.
- **Monitoramento:** Métricas de uso e performance devem ser monitoradas continuamente após launch.
- **Technical Debt:** Reservar 20% do tempo de cada sprint para dívida técnica e refatoração.
