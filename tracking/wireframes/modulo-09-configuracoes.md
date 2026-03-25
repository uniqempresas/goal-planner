# Módulo 9 - Configurações

Este módulo contempla todas as funcionalidades de configuração e personalização da conta do usuário no Goal Planner, incluindo gerenciamento de perfil, segurança, preferências gerais e notificações.

---

## Configurações - Perfil

**Rota:** `/configuracoes/perfil`

### Layout

O layout segue o padrão de **página de configurações de perfil** com visualização de formulário em coluna única. A tela possui header com título "Perfil" e navegação por abas laterais para diferentes categorias de configurações.

A página é organizada em um design de **formulário de edição de perfil** com:
- Header com título e descrição
- Seção de avatar com opção de upload
- Formulário de informações pessoais
- Visualização de informações da conta

### Componentes

- **PageHeader**: Título "Editar Perfil" com breadcrumbs
- **AvatarUpload**: Área de upload de foto de perfil com preview
- **ProfileForm**: Formulário de informações pessoais
- **AccountInfo**: Informações da conta (data de criação, plano)
- **SaveButton**: Botão de salvar alterações
- **AvatarPreview**: Preview circular do avatar
- **FormField**: Campos de entrada com labels e validações
- **ErrorMessage**: Mensagens de erro de validação

### Campos

- **nome**: Nome completo do usuário
  - Tipo: `Text` (input)
  - Obrigatório: Sim
  - Maxlength: 100 caracteres
- **avatar**: Foto de perfil
  - Tipo: `File` (upload de imagem)
  - Formatos aceitos: JPG, PNG, GIF
  - Tamanho máx: 5MB
  - Preview: Circular 120x120px
- **bio**: Biografia curta
  - Tipo: `Textarea`
  - Obrigatório: Não
  - Maxlength: 500 caracteres
- **email**: Endereço de email
  - Tipo: `Email` (input)
  - Obrigatório: Sim
  - Validar formato de email
  - Apenas leitura (não editável)

### Ações

- **Salvar Alterações**: Salva as informações do perfil
  - Tipo: `Button` (primário)
  - Localização: Footer da página
  - Estado: Loading durante envio
- **Cancelar**: Descarta alterações e retorna
  - Tipo: `Button` (texto)
  - Localização: Footer da página
- **Alterar Avatar**: Abre seletor de arquivo
  - Tipo: `Button` (ícone de câmera)
  - Localização: Sobre o avatar
- **Remover Avatar**: Remove foto de perfil atual
  - Tipo: `Button` (ícone de lixeira)
  - Localização: Sobre o avatar (quando há avatar)
- **Alterar Email**: Solicita mudança de email
  - Tipo: `Link`
  - Localização: Campo de email
  - Abre modal de verificação

### Fluxo de Navegação

```
Dashboard
    │
    ├── Menu Lateral → Configurações (/configuracoes)
    │       │
    │       ├── Aba Perfil (/configuracoes/perfil) - ATIVA
    │       │       │
    │       │       ├── Seção Avatar
    │       │       │       ├── [Upload Avatar] → File Picker
    │       │       │       └── [Remover Avatar] → Confirmação
    │       │       │
    │       │       ├── Seção Informações Pessoais
    │       │       │       ├── Campo Nome
    │       │       │       ├── Campo Bio
    │       │       │       └── Campo Email (leitura)
    │       │       │
    │       │       └── [Salvar] → POST /api/user/profile
    │       │               │
    │       │               └── Sucesso: Toast "Perfil atualizado"
    │       │               └── Erro: Mensagem de erro
    │       │
    │       ├── Aba Segurança (/configuracoes/seguranca)
    │       │
    │       ├── Aba Geral (/configuracoes/geral)
    │       │
    │       └── Aba Notificações (/configuracoes/notificacoes)
```

---

## Configurações - Segurança

**Rota:** `/configuracoes/seguranca`

### Layout

O layout segue o padrão de **página de configurações de segurança** com visualização de seções distintas. A tela possui header com título "Segurança" e três seções principais: alteração de senha, gerenciamento de sessões e exclusão de conta.

A página é organizada em um design de **painel de segurança** com:
- Header com título e descrição breve
- Cards de configuração de segurança
- Lista de sessões ativas
- Seção de danger zone para exclusão

### Componentes

- **PageHeader**: Título "Segurança" com descrição
- **PasswordCard**: Card para alteração de senha
- **SessionsList**: Lista de sessões ativas
- **SessionItem**: Item individual de sessão
- **DangerZone**: Seção de ações perigosas
- **DeleteAccountModal**: Modal de confirmação de exclusão
- **CurrentDeviceBadge**: Indicador de dispositivo atual
- **RevokeSessionButton**: Botão de revogar sessão

### Campos

- **senha_atual**: Senha atual do usuário
  - Tipo: `Password` (input)
  - Obrigatório: Sim
  - Minlength: 8 caracteres
- **nova_senha**: Nova senha
  - Tipo: `Password` (input)
  - Obrigatório: Sim
  - Minlength: 8 caracteres
  - Requisitos: 1 letra maiúscula, 1 número, 1 caractere especial
- **confirmar_senha**: Confirmação da nova senha
  - Tipo: `Password` (input)
  - Obrigatório: Sim
  - Deve ser igual a nova_senha
- **motivo_exclusao**: Reason for account deletion
  - Tipo: `Textarea`
  - Obrigatório: Sim (para exclusão)
  - Minlength: 20 caracteres

### Ações

- **Alterar Senha**: Atualiza a senha do usuário
  - Tipo: `Button` (primário)
  - Localização: Card de senha
  - Valida senha atual antes de mudar
- **Ver Detalhes da Sessão**: Expande informações da sessão
  - Tipo: `IconButton` (chevron)
  - Localização: Cada item de sessão
- **Encerrar Sessão**: Revoga uma sessão específica
  - Tipo: `Button` (secundário)
  - Localização: Cada item de sessão
  - Requer confirmação
- **Encerrar Todas as Sessões**: Revoga todas exceto a atual
  - Tipo: `Button` (secundário)
  - Localização: Cabeça da lista de sessões
  - Requer confirmação
- **Excluir Conta**: Inicia processo de exclusão
  - Tipo: `Button` (destructive)
  - Localização: Seção Danger Zone
  - Abre modal de confirmação

### Fluxo de Navegação

```
Configurações
    │
    ├── Aba Segurança (/configuracoes/seguranca) - ATIVA
    │       │
    │       ├── Seção Alterar Senha
    │       │       ├── Campo Senha Atual
    │       │       ├── Campo Nova Senha
    │       │       ├── Campo Confirmar Senha
    │       │       └── [Alterar Senha] → POST /api/user/password
    │       │
    │       ├── Seção Sessões Ativas
    │       │       ├── Lista de Dispositivos
    │       │       │       ├── [Dispositivo Atual] → Badge "Este dispositivo"
    │       │       │       └── [Encerrar Sessão] → POST /api/sessions/:id/revoke
    │       │       │
    │       │       └── [Encerrar Todas] → POST /api/sessions/revoke-all
    │       │
    │       └── Seção Danger Zone
    │               └── [Excluir Conta] → Modal de Confirmação
    │                       │
    │                       ├── Step 1: Confirmar email
    │                       ├── Step 2: Inserir senha
    │                       ├── Step 3: Motivo da exclusão
    │                       └── [Confirmar Exclusão] → DELETE /api/user/account
```

---

## Configurações Gerais

**Rota:** `/configuracoes/geral`

### Layout

O layout segue o padrão de **página de preferências gerais** com visualização de cards para cada categoria de configuração. A tela possui header com título "Geral" e seções para tema, idioma e fuso horário.

A página é organizada em um design de **painel de preferências** com:
- Header com título e descrição
- Cards de configurações agrupados por categoria
- Visualização em tempo real das alterações
- Reset de preferências

### Componentes

- **PageHeader**: Título "Preferências" com descrição
- **ThemeSelector**: Seletor de tema (claro/escuro)
- **LanguageSelector**: Seletor de idioma
- **TimezoneSelector**: Seletor de fuso horário
- **PreferenceCard**: Card individual de preferência
- **PreviewPanel**: Painel de preview das alterações
- **ResetButton**: Botão de resetar preferências

### Campos

- **tema**: Tema visual da aplicação
  - Tipo: `Select` / `Radio Group`
  - Opções: Claro, Escuro, Sistema
  - Padrão: Sistema
- **idioma**: Idioma da interface
  - Tipo: `Select` (dropdown)
  - Opções: Português (BR), English, Español
  - Padrão: Português (BR)
- **fuso_horario**: Fuso horário do usuário
  - Tipo: `Select` (searchable)
  - Opções: Lista de fusos horários (IANA)
  - Padrão: America/Sao_Paulo

### Ações

- **Salvar Alterações**: Salva as preferências
  - Tipo: `Button` (primário)
  - Localização: Footer da página
- **Cancelar**: Descarta alterações
  - Tipo: `Button` (texto)
  - Localização: Footer da página
- **Resetar Preferências**: Restaura padrões
  - Tipo: `Button` (secundário)
  - Localização: Footer da página
  - Requer confirmação
- **Testar Tema**: Aplica tema temporariamente
  - Tipo: `Toggle` ou `Preview`
  - Localização: Card de tema

### Fluxo de Navegação

```
Configurações
    │
    ├── Aba Geral (/configuracoes/geral) - ATIVA
    │       │
    │       ├── Seção Aparência
    │       │       ├── [Tema Claro] → Aplica tema claro
    │       │       ├── [Tema Escuro] → Aplica tema escuro
    │       │       └── [Tema Sistema] → Usa preferência do SO
    │       │
    │       ├── Seção Localização
    │       │       ├── [Selecionar Idioma] → Dropdown
    │       │       │       └── Português / English / Español
    │       │       │
    │       │       └── [Selecionar Fuso Horário] → Dropdown search
    │       │               └── America/Sao_Paulo / UTC / etc
    │       │
    │       └── [Salvar] → PUT /api/user/preferences
    │               │
    │               └── Sucesso: Atualiza UI automaticamente
```

---

## Configurações - Notificações

**Rota:** `/configuracoes/notificacoes`

### Layout

O layout segue o padrão de **página de configurações de notificações** com visualização de tabelas ou listas de preferências. A tela possui header com título "Notificações" e seções organizadas por tipo de notificação e canal de entrega.

A página é organizada em um design de **matriz de notificações** com:
- Header com título e descrição
- Seções por categoria de notificação
- Controles de canal (Email, SMS, Push)
- Preview das notificações

### Componentes

- **PageHeader**: Título "Notificações" com descrição
- **NotificationSection**: Seção de categoria de notificação
- **NotificationItem**: Item individual de notificação
- **ChannelToggle**: Toggle para cada canal (Email/SMS/Push)
- **FrequencySelector**: Seletor de frequência
- **NotificationPreview**: Preview do email/push
- **MasterToggle**: Toggle para habilitar/desabilitar todas

### Campos

- **lembretes_tarefas**: Lembretes de tarefas pendentes
  - Tipo: `Group` de toggles
  - Canais: Email, Push
  - Frequência: Diária, Semanal, Personalizado
- **revisoes_semanais**: Notificações de revisão semanal
  - Tipo: `Group` de toggles
  - Canais: Email, Push
  - Dia/Hora: Selecionável
- **revisoes_mensais**: Notificações de revisão mensal
  - Tipo: `Group` de toggles
  - Canais: Email, Push
  - Dia do mês: Selecionável
- **conquistas**: Notificações de conquistas
  - Tipo: `Group` de toggles
  - Canais: Email, Push, SMS
- **marketing**: Emails de marketing e novidades
  - Tipo: `Group` de toggles
  - Canais: Apenas Email
  - Opt-in separado (LGPD)

### Ações

- **Salvar Alterações**: Salva preferências
  - Tipo: `Button` (primário)
  - Localização: Footer da página
- **Habilitar Todas**: Ativa todas as notificações
  - Tipo: `Button` (secundário)
  - Localização: Header da seção
- **Desabilitar Todas**: Desativa todas as notificações
  - Tipo: `Button` (secundário)
  - Localização: Header da seção
- **Testar Notificação**: Envia notificação teste
  - Tipo: `Button` (ícone)
  - Localização: Cada item de notificação

### Fluxo de Navegação

```
Configurações
    │
    ├── Aba Notificações (/configuracoes/notificacoes) - ATIVA
    │       │
    │       ├── Seção Lembretes de Tarefas
    │       │       ├── [Toggle Email] → Ativa/desativa
    │       │       ├── [Toggle Push] → Ativa/desativa
    │       │       └── [Frequência] → Select
    │       │
    │       ├── Seção Revisões
    │       │       ├── Revisão Semanal
    │       │       │       ├── [Toggle Email]
    │       │       │       ├── [Toggle Push]
    │       │       │       └── [Dia/Hora]
    │       │       │
    │       │       └── Revisão Mensal
    │       │               ├── [Toggle Email]
    │       │               ├── [Toggle Push]
    │       │               └── [Dia do Mês]
    │       │
    │       ├── Seção Conquistas
    │       │       ├── [Toggle Email]
    │       │       ├── [Toggle Push]
    │       │       └── [Toggle SMS]
    │       │
    │       ├── Seção Marketing (opcional)
    │       │       └── [Toggle Email]
    │       │
    │       └── [Salvar] → PUT /api/user/notifications
```

---

## Modal de Busca Global

### Layout

Modal de busca global que permite ao usuário buscar rapidamente por qualquer item no sistema. O modal abre com atalho de teclado (Cmd/Ctrl + K) ou pelo ícone de busca no header.

A modal é organizada em um design de **spotlight search** com:
- Campo de busca grande e central
- Resultados agrupados por tipo
- Atalhos de teclado
- Histórico de buscas recentes

### Componentes

- **SearchInput**: Campo de busca com autocomplete
- **SearchResults**: Lista de resultados
- **ResultItem**: Item individual de resultado
- **ResultGroup**: Grupo de resultados por tipo
- **EmptyState**: Estado quando não há resultados
- **KeyboardHints**: Dicas de atalhos de teclado
- **RecentSearches**: Buscas recentes

### Campos

- **query**: Texto da busca
  - Tipo: `Text` (input)
  - Obrigatório: Sim
  - Minlength: 1 caractere
  - Debounce: 300ms

### Tipos de Resultados

| Tipo | Exemplos |
|------|----------|
| **Metas** | Título, área de vida, progresso |
| **Tarefas** | Título, data, prioridade |
| **Áreas** | Nome da área |
| **Revisões** | Data, tipo |
| **Conquistas** | Nome, categoria |
| **Configurações** | Páginas de configuração |
| **Usuários** | Contatos (futuro) |

### Ações

- **Buscar**: Executa a busca
  - Tipo: `Input` (enter)
  - Dispara a cada keystroke (debounced)
- **Selecionar Resultado**: Navega para o item
  - Tipo: `Click` ou `Enter` (keyboard)
  - Fecha o modal após seleção
- **Navegar Resultados**: Move entre resultados
  - Tipo: `Arrow Keys` (keyboard)
  - Highlight do item selecionado
- **Fechar**: Fecha o modal
  - Tipo: `Escape` (keyboard) ou `Click outside`

### Fluxo de Navegação

```
Qualquer tela
    │
    ├── [Cmd/Ctrl + K] ou [Ícone de Busca]
    │       │
    │       └── Modal de Busca Global ABERTA
    │               │
    │               ├── Campo de Busca em foco
    │               │       └── [Digitar] → Busca em tempo real
    │               │
    │               ├── Seção Resultados
    │               │       ├── [Clicar em Resultado] → Navega para o item
    │               │       │       └── Fecha modal
    │               │       │
    │               │       └── [Enter no resultado] → Navega para o item
    │               │
    │               ├── Seção Buscas Recentes
    │               │       └── [Clicar em recente] → Repete busca
    │               │
    │               └── [Escape] → Fecha modal
    │
    └── Resultado selecionado → Navega para página do item
```

---

## Validações

### Perfil
- Nome é obrigatório e deve ter entre 3-100 caracteres
- Email deve ser válido e único
- Bio é opcional mas limitada a 500 caracteres
- Avatar deve ser imagem nos formatos aceitos

### Segurança
- Senha atual é obrigatória para alteração
- Nova senha deve seguir requisitos de complexidade
- Exclusão de conta requer múltiplas confirmações
- Sessões podem ser revocadas individualmente

### Geral
- Tema altera imediatamente a aparência
- Idioma altera todas as strings da interface
- Fuso horário afeta todas as datas mostradas

### Notificações
- Toggle master afeta todos os canais
- Algumas notificações não podem ser desativadas (legais)
- Teste de notificação requer configuração previa

---

## Componentes Reutilizáveis

- **SettingsPage**: Layout base de página de configurações
- **SettingsCard**: Card para cada seção
- **SettingsSection**: Agrupador de configurações
- **ToggleGroup**: Grupo de toggles por categoria
- **AvatarUpload**: Componente de upload de avatar
- **PasswordInput**: Input de senha com toggle visibility
- **SearchableSelect**: Select com busca
- **DangerZone**: Seção de ações perigosas
- **ConfirmationModal**: Modal genérico de confirmação
- **SearchModal**: Modal de busca com atalhos

---

## Considerações de UX

### Perfil
- Preview em tempo real do avatar
- Feedback visual durante upload
- Validação inline dos campos
- Confirmação ao alterar email

### Segurança
- Indicador de força de senha
- Visualização clara de sessões ativas
- Confirmacao explicita para ações destrutivas
- Feedback sobre dispositivos conectados

### Geral
- Preview do tema em tempo real
- Transicao suave entre temas
- Suggestão de fuso baseada em geolocalização
- Persistência local imediata

### Notificações
- Explicação clara de cada tipo de notificação
- Preview do email/notificação
- Categorização lógica das notificações
- Easy toggle de preferências comuns

### Busca Global
- Abreviação instantânea (Cmd/Ctrl + K)
- Busca em múltiplos tipos de conteúdo
- Histórico de buscas recentes
- Keyboard navigation completa
- Estados de loading e empty
