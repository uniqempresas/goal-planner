---
description: "Fase 1 - Pesquisa: Análise profunda do codebase e geração de PRD"
argument-hint: "<descrição da funcionalidade>"
allowed-tools:
  - task
  - todowrite
---

**FASE 1 DO VIBE CODING (SDD)**

Inicia o processo de Spec Driven Development com pesquisa profunda. Delega para o @vibe-researcher analisar:
- Arquivos existentes que serão afetados
- Padrões de implementação já usados
- Componentes reutilizáveis disponíveis
- Convenções do projeto

## Como Usar

1. **Forneça a descrição** da funcionalidade que quer implementar
2. **O researcher vai gerar** um PRD.md completo em `tracking/plans/`
3. **Após gerar o PRD:**
   - ✅ Feche este chat
   - 🔄 Inicie novo chat com: *"Continue com SPEC para PRD: tracking/plans/PRD-..."*

## Exemplos
- `/research "Implementar sistema de autenticação completo"`
- `/research "Criar cadastro de serviços com upload de imagens"`
- `/research "Dashboard de métricas com gráficos"`

## Fluxo Completo SDD

```
Fase 1: /research → Gera PRD
    ↓ (novo chat)
Fase 2: /spec → Gera SPEC
    ↓ (novo chat)
Fase 3: /implement → Código pronto
```

## Arquivo Gerado
- `tracking/plans/PRD-YYYY-MM-DD-feature-name.md`

Execute:
Delegar para @vibe-researcher iniciar pesquisa profunda e gerar PRD.