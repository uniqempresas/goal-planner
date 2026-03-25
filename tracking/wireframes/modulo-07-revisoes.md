# Módulo 7 - Revisões

Este módulo contempla as funcionalidades de revisão periódica (semanal e mensal) para acompanhamento do progresso nas metas e áreas de vida.

---

## Revisão Semanal

**Rota:** `/revisoes/semanal`

### Layout

O layout segue o padrão de **questionário guiado em etapas**, com navegação lateral indicando o progresso atual. A tela possui header com título e data da revisão, área central para conteúdo das perguntas, e footer com botões de navegação.

O questionário é apresentado em formato de **stepper** com 4 etapas sequenciais, onde cada etapa contém uma pergunta principal com campo de resposta expandido. O usuário pode navegar entre as etapas através dos botões "Anterior" e "Próximo", com validação de preenchimento antes de avançar.

### Etapas do Questionário

1. **O que foi concluído?** - Reflexão sobre as tarefas e metas finalizadas na semana
2. **O que ficou pendente?** - Identificação de pendências e motivos
3. **Lições aprendidas** - Aprendizados полученные durante a semana
4. **ONE Thing** - Definição da prioridade principal para a próxima semana

### Campos

- **período_semana**: Período da revisão (date range)
  - Tipo: `DateRangePicker`
  - Obrigatório: sim
  - Padrão: semana atual
- **concluidos**: Itens concluídos
  - Tipo: `Textarea` com suporte a lista
  - Obrigatório: sim
  - Placeholder: "Liste o que você conseguiu completar..."
- **pendentes**: Itens pendentes
  - Tipo: `Textarea` com suporte a lista
  - Obrigatório: sim
  - Placeholder: "O que ficou para trás?"
- **licoes_aprendidas**: Lições aprendidas
  - Tipo: `Textarea`
  - Obrigatório: sim
  - Placeholder: "O que você aprendeu?"
- **one_thing**: ONE Thing da próxima semana
  - Tipo: `Input` (texto curto)
  - Obrigatório: sim
  - Placeholder: "Qual é a única coisa mais importante?"
- **tags**: Tags de categorização
  - Tipo: `MultiSelect`
  - Obrigatório: não

### Ações

- **Nova Revisão**: Abre o formulário de revisão semanal
  - Tipo: `Button` (primário)
  - Localização: Header da página
- **Próximo**: Avança para próxima etapa
  - Tipo: `Button` (primário)
  - Localização: Footer do questionário
- **Anterior**: Retorna para etapa anterior
  - Tipo: `Button` (secundário)
  - Localização: Footer do questionário
- **Salvar Rascunho**: Salva sem finalizar
  - Tipo: `Button` (ghost)
  - Localização: Footer do questionário
- **Finalizar**: Conclui a revisão
  - Tipo: `Button` (primário)
  - Localização: Última etapa do questionário

---

## Revisão Mensal

**Rota:** `/revisoes/mensal`

### Layout

O layout segue o padrão de **questionário guiado em etapas**, similar à revisão semanal, porém com campos mais elaborados para reflexão profunda. A tela possui header com título, mês em revisão e navegação para meses anteriores.

O questionário é apresentado em formato de **stepper** com 4 etapas sequenciais, com visualização de progresso através de indicador visual (barra de progresso ou step dots).

### Etapas do Questionário

1. **Progresso das Metas Mensais** - Avaliação do cumprimento das metas do mês
2. **Métricas Atingidas** - Números e resultados obtidos
3. **Ajustes Necessários** - Mudanças para o próximo mês
4. **ONE Thing do Próximo Mês** - Principal foco para o mês seguinte

### Campos

- **periodo_mes**: Mês da revisão
  - Tipo: `MonthPicker`
  - Obrigatório: sim
  - Padrão: mês atual
- **metas_progresso**: Progresso de cada meta
  - Tipo: `Array` de objetos com campos:
    - `meta_id`: Referência à meta
    - `status`: Select (Concluída / Parcial / Não Iniciada / Cancelada)
    - `nota`: Textarea com observação
  - Obrigatório: sim
- **metricas**: Métricas atingidas
  - Tipo: `Textarea` com suporte a lista de números
  - Obrigatório: sim
  - Placeholder: "Liste suas métricas e resultados..."
- **ajustes**: Ajustes necessários
  - Tipo: `Textarea`
  - Obrigatório: sim
  - Placeholder: "O que precisa mudar?"
- **one_thing**: ONE Thing do próximo mês
  - Tipo: `Input` (texto curto)
  - Obrigatório: sim
  - Placeholder: "Qual é o foco principal?"
- **avaliacao_geral**: Avaliação geral do mês
  - Tipo: `Select` (Escala 1-5)
  - Obrigatório: não

### Ações

- **Nova Revisão**: Abre o formulário de revisão mensal
  - Tipo: `Button` (primário)
  - Localização: Header da página
- **Próximo**: Avança para próxima etapa
  - Tipo: `Button` (primário)
  - Localização: Footer do questionário
- **Anterior**: Retorna para etapa anterior
  - Tipo: `Button` (secundário)
  - Localização: Footer do questionário
- **Salvar Rascunho**: Salva sem finalizar
  - Tipo: `Button` (ghost)
  - Localização: Footer do questionário
- **Finalizar**: Conclui a revisão
  - Tipo: `Button` (primário)
  - Localização: Última etapa do questionário

---

## Histórico de Revisões

### Layout

O histórico é apresentado em formato de **lista filtrável** com Cards de resumo para cada revisão. A tela possui sidebar com filtros por tipo de revisão (semanal/mensal) e período, e área principal com a lista de revisões.

Cada card de revisão mostra: data, tipo (semanal/mensal), título resumido, e indicadores de status (rascunho/finalizada). Os cards são clicáveis para visualização completa.

### Filtros

- **tipo**: Tipo de revisão
  - Tipo: `RadioGroup` (Todas / Semanal / Mensal)
  - Padrão: Todas
- **periodo**: Período de tempo
  - Tipo: `Select` (Últimas 4 semanas / Últimos 3 meses / Este ano / Personalizado)
  - Padrão: Últimas 4 semanas
- **status**: Status da revisão
  - Tipo: `MultiSelect` (Rascunho / Finalizada)

### Ações por Item

- **Visualizar**: Abre modal de visualização da revisão
  - Tipo: `IconButton` (olho)
  - Localização: Card de revisão
- **Editar**: Abre formulário de edição
  - Tipo: `IconButton` (lápis)
  - Localização: Card de revisão
- **Duplicar**: Cria cópia da revisão
  - Tipo: `IconButton` (copy)
  - Localização: Card de revisão
- **Excluir**: Remove revisão
  - Tipo: `IconButton` (lixeira)
  - Localização: Card de revisão
  - Ação: Abre modal de confirmação

---

## Modal de Visualização de Revisão

### Layout

Modal de tamanho grande (max-width: 800px) com header fixo contendo título e data, corpo com scroll para conteúdo da revisão, e footer com ações.

### Conteúdo

- **Header**: Título da revisão + data + tipo (semanal/mensal) + status
- **Body**: Exibição de todos os campos preenchidos em formato de leitura
- **Footer**: Botões de editar, duplicar e fechar

---

## Modal de Confirmação de Exclusão

### Layout

Modal de tamanho pequeno (max-width: 400px) com mensagem de alerta e botões de confirmação.

### Campos

- **mensagem**: Texto de confirmação
  - Tipo: `Text` estático
  - Conteúdo: "Tem certeza que deseja excluir esta revisão? Esta ação não pode ser desfeita."

### Ações

- **Cancelar**: Fecha o modal
  - Tipo: `Button` (secundário)
- **Excluir**: Confirma a exclusão
  - Tipo: `Button` (destructive)
  - Cor: Vermelho

---

## Fluxo de Navegação

```
Página Inicial (Dashboard)
    │
    ├── Menu Lateral → Revisões
    │       │
    │       ├── Aba Semanal (/revisoes/semanal)
    │       │       │
    │       │       ├── Ver Histórico de Revisões Semanais
    │       │       │
    │       │       └── Criar Nova Revisão Semanal
    │       │               │
    │       │               ├── Etapa 1: O que foi concluído?
    │       │               ├── Etapa 2: O que ficou pendente?
    │       │               ├── Etapa 3: Lições aprendidas
    │       │               ├── Etapa 4: ONE Thing
    │       │               │
    │       │               └── [Salvar] ou [Finalizar]
    │       │
    │       └── Aba Mensal (/revisoes/mensal)
    │               │
    │               ├── Ver Histórico de Revisões Mensais
    │               │
    │               └── Criar Nova Revisão Mensal
    │                       │
    │                       ├── Etapa 1: Progresso das metas
    │                       ├── Etapa 2: Métricas atingidas
    │                       ├── Etapa 3: Ajustes necessários
    │                       ├── Etapa 4: ONE Thing do próximo mês
    │                       │
    │                       └── [Salvar] ou [Finalizar]
```

---

## Validações

- Todos os campos obrigatórios devem ser preenchidos para avançar entre as etapas
- Campos de texto devem ter comprimento mínimo de 10 caracteres
- ONE Thing deve ter no máximo 100 caracteres
- Não é possível criar duas revisões do mesmo tipo para o mesmo período
- Exclusão requer confirmação explícita do usuário

---

## Componentes Reutilizáveis

- **Stepper**: Indicador de progresso entre etapas
- **DateRangePicker**: Seleção de período para revisão semanal
- **MonthPicker**: Seleção de mês para revisão mensal
- **ReviewCard**: Card de resumo no histórico
- **ReviewForm**: Formulário base com etapas
- **ConfirmDialog**: Modal de confirmação de exclusão

---

## States dos Formulários

- **Vazio**: Campos limpos, ready para preenchimento
- **Preenchendo**: Usuário editando campos
- **Validação**: Exibição de erros nos campos inválidos
- **Enviando**: Loading state durante salvamento
- **Sucesso**: Feedback visual após finalização
- **Erro**: Mensagem de erro com opção de retry

---

## Considerações de UX

- O questionário deve permitir navegação não-linear (voltar para editar respostas anteriores)
- Salvar rascunho automaticamente a cada 30 segundos
- Exibir sugestões baseadas em revisões anteriores (para ONE Thing)
- Permitir anexar arquivos ou links relevantes nas lições aprendidas
- Histórico deve permitir comparação entre revisões consecutivas
