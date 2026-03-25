# Módulo 8 - Conquistas

Este módulo contempla as funcionalidades de visualização de conquistas, badges, marcos atingidos e estatísticas de progresso do usuário no Goal Planner.

---

## Conquistas

**Rota:** `/conquistas`

### Layout

O layout segue o padrão de **página de perfil de conquistas** com visualização de cards em grid. A tela possui header com título "Minhas Conquistas" e estatísticas gerais, seguida de seções organizadas por categoria.

A página é organizada em um design de **dashboard de conquistas** com:
- Header fixo com estatísticas gerais e progresso
- Seções organizadas em tabs ou cards para cada categoria
- Layout responsivo com grid de cards

### Componentes

- **HeaderStats**: Cartões de estatísticas gerais no topo
- **BadgeGrid**: Grid de badges conquistados
- **MilestoneTimeline**: Linha do tempo de marcos atingidos
- **CelebrationFeed**: Feed de celebrações recentes
- **ProgressRing**: Anéis de progresso por categoria
- **AchievementCard**: Card individual de conquista
- **CategoryTabs**: Abas de categorização (Geral, Metas, Hábitos, Streaks)

### Seções

1. **Estatísticas Gerais**
   - Total de badges conquistados
   - Marcos atingidos
   - Sequência atual de dias
   - Nível de usuário

2. **Badges Conquistados**
   - Grid de badges com icones e nomes
   - Badges organizados por categoria
   - Indicador de recentes
   - Badges ainda não desbloqueados (grisados)

3. **Marcos Atingidos**
   - Lista cronológica de marcos
   - Data de conquista
   - Descrição do marco
   - Meta associada (se aplicável)

4. **Histórico de Celebrações**
   - Feed de conquistas recentes
   - Data e descrição de cada celebração
   - Compartilhamento opcional

5. **Progresso por Categoria**
   - Anéis de progresso por área de vida
   - Porcentagem de completion
   - Próximo marco em cada categoria

### Campos

- **filtro_categoria**: Filtrar conquistas por categoria
  - Tipo: `Select` (Todas / Metas / Hábitos / Revisões / Streaks)
  - Padrão: Todas
- **periodo**: Período de visualização
  - Tipo: `Select` (Todos os tempos / Este ano / Este mês / Esta semana)
  - Padrão: Todos os tempos

### Ações

- **Ver Detalhes**: Abre modal de detalhes da conquista
  - Tipo: `Card` clicável
  - Localização: Badge ou marco
- **Compartilhar**: Compartilha conquista em redes sociais
  - Tipo: `IconButton` (share)
  - Localização: Modal de detalhes
- **Filtrar por Categoria**: Filtra visualização
  - Tipo: `Select`
  - Localização: Header da página
- **Alternar Período**: Muda período de visualização
  - Tipo: `Select`
  - Localização: Header da página
- **Ver Todas**: Expande lista de conquistas
  - Tipo: `Button` (link)
  - Localização: Seção de cada categoria

---

## Modal de Detalhes da Conquista

### Layout

Modal de tamanho médio (max-width: 600px) com header contendo ícone grande do badge/marco, corpo com detalhes completos, e footer com ações.

### Componentes

- **AchievementIcon**: Ícone grande e animado da conquista
- **AchievementTitle**: Nome da conquista
- **AchievementDescription**: Descrição completa
- **AchievementDate**: Data de conquista
- **AchievementRarity**: Indicador de raridade (Comum / Raro / Épico / Lendário)
- **RelatedGoal**: Meta ou objetivo relacionado (se aplicável)
- **ShareButtons**: Botões de compartilhamento

### Campos

- **nome**: Nome da conquista
  - Tipo: `Text` estático
- **descricao**: Descrição completa
  - Tipo: `Text` estático
- **data_conquista**: Data em que foi conquistada
  - Tipo: `Date` estático
  - Formato: "DD de MMMM de YYYY"
- **categoria**: Categoria da conquista
  - Tipo: `Tag`
- **raridade**: Nível de dificuldade/raridade
  - Tipo: `Badge` colorido
- **meta_relacionada**: Meta associada (se aplicável)
  - Tipo: `Link` para a meta

### Ações

- **Fechar**: Fecha o modal
  - Tipo: `IconButton` (X)
  - Localização: Header do modal
- **Compartilhar**: Abre opções de compartilhamento
  - Tipo: `Button` (secundário)
  - Localização: Footer do modal
- **Ver Meta**: Navega para a meta relacionada
  - Tipo: `Button` (link)
  - Localização: Corpo do modal (se aplicável)

---

## Fluxo de Navegação

```
Página Inicial (Dashboard)
    │
    ├── Menu Lateral → Conquistas (/conquistas)
    │       │
    │       ├── Seção de Estatísticas Gerais
    │       │       └── Visualização de números gerais
    │       │
    │       ├── Aba Badges
    │       │       └── Grid de badges conquistados
    │       │               │
    │       │               └── [Clicar em Badge] → Modal de Detalhes
    │       │
    │       ├── Aba Marcos
    │       │       └── Timeline de marcos atingidos
    │       │               │
    │       │               └── [Clicar em Marco] → Modal de Detalhes
    │       │
    │       ├── Aba Histórico
    │       │       └── Feed de celebrações
    │       │
    │       └── Aba Progresso
    │               └── Anéis de progresso por categoria
    │
    └── Notificação de Nova Conquista (toast)
            │
            └── [Clicar no Toast] → /conquistas
```

---

## Tipos de Conquistas

### Badges

| Categoria | Exemplos |
|-----------|----------|
| **Metas** | Primeira Meta Concluída, Meta de Longo Prazo, 10 Metas Concluídas |
| **Hábitos** | Primeiro Hábito Criado, 7 Dias de Sequência, 30 Dias de Sequência |
| **Revisões** | Primeira Revisão, 10 Revisões Semanais, Revisão Mensal Concluída |
| **Streaks** | Sequência de 7 Dias, Sequência de 30 Dias, Sequência de 100 Dias |
| **Especial** | Primeiro Passo, Explorador, Mestre do Planejamento |

### Marcos

| Tipo | Descrição |
|------|------------|
| **Metas** | Conclusão de meta em cada área de vida |
| **Hábitos** | Criação e manutenção de hábitos |
| **Tempo** | Usuário ativo por X dias consecutivos |
| **Volume** | X tarefas concluídas no total |

---

## Validações

- Badges e marcos são desbloqueados automaticamente pelo sistema
- Feed de celebrações é atualizado em tempo real
- Compartilhamento requer consentimento do usuário
- Dados de progresso são calculados dinamicamente

---

## Componentes Reutilizáveis

- **BadgeCard**: Card de badge no grid
- **MilestoneItem**: Item de marco na timeline
- **CelebrationItem**: Item no feed de celebrações
- **ProgressRing**: Anel de progresso circular
- **AchievementModal**: Modal de detalhes
- **ShareButton**: Botão de compartilhamento
- **RarityBadge**: Badge de raridade

---

## Considerações de UX

- Animações de celebração ao desbloquear nova conquista
- Toast notification ao atingir nova conquista
- Efeitos visuais para conquistas raras/exclusivas
- Gamificação com níveis e progressão
- Integração com redes sociais para compartilhamento
- Feedback imediato ao atingir marcos
- Visualização de progresso faltante para próximas conquistas
