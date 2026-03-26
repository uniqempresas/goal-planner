# Auditoria de Rotas e Navegação do Goal Planner

## 1. Resumo Executivo

Esta auditoria analisou o código-fonte para mapear as rotas disponíveis (`src/routes.tsx`) versus os botões de navegação disponíveis na interface (`Sidebar.tsx` e `MobileNav.tsx`). O objetivo era identificar rotas que existem no código mas não são acessíveis pelo menu (Rotas Mortas) e botões que levam a destinos incorretos (Links Quebrados).

---

## 2. Rotas Funcionais (Working Routes)

Lista de rotas que existem E têm um botão de navegação correspondente.

| Rota             | Gatilho (Sidebar)  | Gatilho (MobileNav)   |
| :--------------- | :----------------- | :-------------------- |
| `/dashboard`     | Dashboard (Início) | Início                |
| `/areas`         | Áreas de Vida      | Áreas                 |
| `/metas/grandes` | Metas              | Metas                 |
| `/agenda`        | Agenda             | Agenda                |
| `/reviews`       | Revisões           | Mais -> Revisões      |
| `/achievements`  | Conquistas         | Mais -> Conquistas    |
| `/templates`     | Templates          | Mais -> Templates     |
| `/settings`      | Configurações      | Mais -> Configurações |
| `/weekly`        | Plano Semanal      | Mais -> Semanal       |

---

## 3. Links Quebrados ou Inconsistentes (Broken Links)

### 3.1. Botão "Sair" no MobileNav

**Problema:** O botão "Sair" (Logout) no menu MobileNav (`MobileNav.tsx`:43) está com a propriedade `href="/logout"` incorreta.

- **Rota real:** A rota `/logout` não existe no `routes.tsx` (causa um 404 se accedida diretamente).
- **Funcionamento:** O código em `MobileNav.tsx` (linha 123) faz um override via JavaScript: `navigate('/login')`, então o botão funciona e redireciona para o Login.
- ** Recomendação:** Corrigir o `href` para `/login` ou criar uma rota `/logout` dedicada se houver lógica de server-side logout no futuro. O `href="#"` ou `/logout` sem rota é enganoso.

### 3.2. Plano Semanal vs. Metas Semanais

**Problema:** Existe uma confusão entre o conceito de "Planejamento Semanal" e "Metas Semanais".

- **Botão "Plano Semanal" (Sidebar):** Liga para `/weekly`.
  - **Destino real:** Uma página genérica de "Planejamento Semanal" (`src/routes.tsx`:202).
  - **Problema:** A rota `/metas/semanal` (Lista de Metas Semanais) existe no código, mas o botão da Sidebar NÃO vai para ela. O botão leva para uma página de "Planejamento" genérica.
- **Botão "Semanal" (MobileNav):** Liga para `/weekly`.
  - **Mesma inconsistência.**

**Análise:** O botão existe, mas vai para a rota errada (ou para uma rota diferente da lista de metas). O usuário que deseja ver a lista de "Metas Semanais" (`/metas/semanal`) não consegue acessar via botão.

### 3.2. Navegação de Metas (Falta de Abas)

**Problema:** O botão "Metas" (tanto na Sidebar quanto MobileNav) leva exclusivamente para `/metas/grandes` (Metas Grandes).

- **Rotas órfãs:** As rotas `/metas/anual`, `/metas/mensal`, `/metas/diarias` existem no código, mas **não há nenhum botão ou aba** na interface para alternar entre esses níveis de meta.
- **Impacto:** O usuário precisa digitar a URL manualmente (ex: `.../metas/mensal`) para acessar essas listas.

---

## 4. Botões Faltantes (Missing Buttons)

Rotas que existem no `src/routes.tsx` mas NÃO têm um botão de navegação na Sidebar ou MobileNav.

### 4.1. Metas Hierárquicas

Mesmo através do botão "Metas", não é possível acessar os outros níveis:

- `/metas/anual` (Metas Anuais)
- `/metas/mensal` (Metas Mensais)
- `/metas/semanal` (Lista de Metas Semanais - ver nota em Links Quebrados)
- `/metas/diarias` (Tarefas Diárias)

### 4.2. Perfil do Usuário

- `/profile`: Rota existente, mas sem botão na barra de navegação. Geralmente esperado em "Configurações" ou no menu do usuário, mas não encontrado.

### 4.3. Criação e Edição de Metas

- `/metas/:level/criar`: Embora essas rotas sejam acionadas por botões dentro das páginas de lista (botão "Nova Meta"), elas não são consideradas "navegação principal".

---

## 5. Problemas Gerais (General Issues)

### 5.1. UI do Seletor de Nível de Meta

A aplicação trata Metas como uma hierarquia (`grandes` -> `anual` -> `mensal` -> `semanal` -> `diarias`), mas a UI não reflete essa estrutura de forma navegável. O usuário visualiza apenas "Metas" (Grandes) ao clicar no menu.

### 5.2. Códigos de Rota Hardcoded

Em `GoalCreate.tsx` e `GoalsList.tsx`, há uma lógica de fallback para extrair o nível da URL (`levelFromUrl`), o que indica que o sistema está preparado para receber esses parâmetros, faltando apenas a linkação na UI.

### 5.3. Rotas de Área

As rotas de área (`/areas/:id`, `/areas/:id/edit`) estão acessíveis a partir da lista de áreas, mas não têm um item fixo na barra lateral (o que é correto para visualização de detalhes), porém, não há botão "Voltar" garantido em todos os fluxos (verificar `AreaDetail.tsx` se necessário).

---

## 6. Recomendações de Correção

1.  **Adicionar navegação entre metas:** Adicionar abas ou um submenu em "Metas" na Sidebar para permitir alternar entre Grand, Annual, Monthly, Weekly e Daily.
2.  **Corrigir "Plano Semanal":** Decidir se o botão "Plano Semanal" deve ir para a página de planejamento (`/weekly`) ou para a lista de metas semanais (`/metas/semanal`). Se a intenção for ter ambos, considerar renomear o botão para "Planejamento" e adicionar um botão "Metas Semanais" na sessão de Metas.
3.  **Acessibilidade do Perfil:** Adicionar link para `/profile` no menu do usuário ou nas Configurações.
