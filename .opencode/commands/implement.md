---
description: "Fase 3 - Implementação: Execução do código seguindo SPEC"
argument-hint: "<caminho da SPEC>"
allowed-tools:
  - task
  - todowrite
  - read
---

**FASE 3 DO VIBE CODING (SDD)**

Implementa a funcionalidade seguindo a especificação técnica. Delega para especialistas:
- @vibe-implementer - Código geral
- @frontend-specialist - UI/UX complexo
- @backend-specialist - APIs e integrações
- @database-architect - Schema de banco

## Como Usar

**IMPORTANTE:** Use apenas DEPOIS de ter gerado uma SPEC na Fase 2!

1. **Informe o caminho da SPEC:** `tracking/specs/SPEC-YYYY-MM-DD-...`
2. **O implementador vai:**
   - Ler a SPEC detalhadamente
   - Implementar todos os arquivos listados
   - Seguir os padrões identificados
   - Manter qualidade e boas práticas

## Exemplos
- `/implement tracking/specs/SPEC-2026-03-11-auth.md`
- `/implement tracking/specs/SPEC-2026-03-10-servicos.md`

## Vantagens desta Fase

✅ **Contexto 100% livre** - Chat inicia do zero
✅ **Código mais simples** - Baseado em padrões documentados
✅ **Menos erros** - Seguindo especificação clara
✅ **Melhor modularização** - Arquivos bem definidos

## Fluxo Completo SDD

```
Fase 1: /research → Gera PRD
    ↓ (novo chat)
Fase 2: /spec → Gera SPEC  
    ↓ (novo chat)
Fase 3: /implement → Código pronto ✅
```

Execute:
Delegar para agente especialista implementar seguindo a SPEC.