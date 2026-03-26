---
description: "Fase 2 - Especificação: Criação do plano técnico detalhado (SPEC)"
argument-hint: "<caminho do PRD>"
allowed-tools:
  - task
  - todowrite
  - read
---

**FASE 2 DO VIBE CODING (SDD)**

Cria a especificação tática baseada no PRD gerado na Fase 1. Delega para o @vibe-planner criar:
- Lista exata de arquivos a **criar**
- Lista exata de arquivos a **modificar**
- Descrição precisa do que fazer em cada arquivo
- Code snippets de referência
- Ordem de implementação

## Como Usar

**IMPORTANTE:** Use apenas DEPOIS de ter gerado um PRD na Fase 1!

1. **Informe o caminho do PRD:** `tracking/plans/PRD-YYYY-MM-DD-...`
2. **O planner vai gerar** uma SPEC.md completa em `tracking/specs/`
3. **Após gerar a SPEC:**
   - ✅ Feche este chat
   - 🔄 Inicie novo chat com: *"Implemente seguindo SPEC: tracking/specs/SPEC-..."*

## Exemplos
- `/spec tracking/plans/PRD-2026-03-11-auth.md`
- `/spec tracking/plans/PRD-2026-03-10-servicos.md`

## Formato da SPEC

```markdown
## Arquivos a Criar
1. `src/components/Componente.tsx`
   - Descrição do componente
   - Props necessárias

## Arquivos a Modificar
1. `src/App.tsx`
   - Adicionar import
   - Configurar rota
```

## Arquivo Gerado
- `tracking/specs/SPEC-YYYY-MM-DD-feature-name.md`

Execute:
Delegar para @vibe-planner criar especificação técnica detalhada.