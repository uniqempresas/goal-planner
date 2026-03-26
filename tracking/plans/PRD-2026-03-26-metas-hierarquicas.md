---
date: 2026-03-26T10:00:00Z
researcher: Vibe Researcher
git_commit: feature/goal-planner-mockup-v1
branch: main
repository: goal-planner-uat2
topic: 'PRD - Sprint 5: Metas Hierárquicas (Hierarchical Goals)'
tags: [prd, product-management, sprint-5, hierarchical-goals, g-a-m-s-d]
status: complete
last_updated: 2026-03-26
last_updated_by: Vibe Researcher
---

# PRD - Sprint 5: Metas Hierárquicas (Hierarchical Goals)

**Date**: 2026-03-26  
**Researcher**: Vibe Researcher  
**Context**: Goal Planner (React + TypeScript + Tailwind) - Sprint 5 Planning

---

## 1. Problem Statement

Users need to break down their life dreams (Grand Goals) into actionable steps to prevent feeling overwhelmed and ensure progress. Currently, the app manages "Goals" as a flat list within "Areas of Life". Users lack the hierarchical structure provided by "The One Thing" methodology (G → A → M → S → D).

**Why do we need this?**

- **Clarity**: Users need to see the "Domino Effect" of their goals (how completing a daily task contributes to a yearly goal).
- **Focus**: The hierarchy enforces the "One Thing" principle at each level.
- **Motification**: Visualizing progress at higher levels (Annual/Monthly) provides more context than just daily tasks.

---

## 2. Goals & Non-Goals

### Goals (In Scope)

1.  **Hierarchical Structure**: Implement G (Grand) → A (Annual) → M (Monthly) → S (Weekly) → D (Daily Task) hierarchy.
2.  **Mock Data**: Populate mock data with a complete hierarchy (at least 1 complete chain) for demonstration.
3.  **CRUD Operations**: Allow creating, editing, and viewing goals at all levels.
4.  **Navigation**: Implement breadcrumb-style navigation and "Drill down" flow (Grand Goal → Annual → Monthly...).
5.  **Progress Calculation**: Implement automatic progress calculation based on child node status.
6.  **ONE Thing**: Allow users to select ONE focus item per level (visual indicator).

### Non-Goals (Out of Scope)

- **Time Blocking / Agenda**: Scheduling D-tasks into a calendar (Sprint 7).
- **Domino Effect Connection**: Connecting goals from different branches (Sprint 6).
- **Real-time Sync**: Using real backend (Sprint 12).
- **Detailed SMART Fields**: Advanced metric tracking (Sprint 6).
- **Drag & Drop Reordering**: Ordering goals within a level (Sprint 6).

---

## 3. User Stories

| ID      | Role      | Action                                                                                                                                         | Benefit                                              |
| :------ | :-------- | :--------------------------------------------------------------------------------------------------------------------------------------------- | :--------------------------------------------------- |
| **US1** | As a user | I want to create a **Grand Goal** (G) and link it to a **Life Area**                                                                           | So that I can define my big picture vision.          |
| **US2** | As a user | I want to create an **Annual Goal** (A) linked to a **Grand Goal** (G)                                                                         | So that I can break down my yearly intentions.       |
| **US3** | As a user | I want to see a visual **Tree/Hierarchy** of my goals (e.g., A shows its parent G and children M)                                              | So that I understand how parts connect to the whole. |
| **US4** | As a user | I want to **mark a Daily Task (D) as done** and see the progress bar update automatically on the Weekly (S), Monthly (M), and Annual (A) goals | So that I see the impact of my daily work.           |
| **US5** | As a user | I want to select a **"ONE Thing"** for the week                                                                                                | So that I have a single focus priority.              |

---

## 4. Functional Requirements

### 4.1 Data Model (Mock)

We need a recursive-like structure. However, to keep types simple in this sprint, we might flatten relationships but filter/query them, or use a `type` discriminator.

**Proposed Type Structure:**

```typescript
type GoalLevel = 'grand' | 'annual' | 'monthly' | 'weekly' | 'daily';

interface Goal {
  id: string;
  title: string;
  level: GoalLevel; // The type of goal
  parentId: string | null; // ID of the parent goal (e.g. Annual's parent is Grand)
  areaId: string; // Link to Life Area

  // Properties
  description?: string;
  focusingQuestion?: string; // "The One Thing" question text

  // SMART / Metrics
  metrics?: {
    indicator: string;
    current: number;
    target: number;
    unit: string;
  }[];

  // Dates
  startDate?: string; // Optional for Weekly/Daily
  dueDate: string;
  completedAt?: string;

  // Status
  status: 'pending' | 'in_progress' | 'completed' | 'overdue';

  // Priority & ONE Thing
  priority: 'low' | 'medium' | 'high';
  isOneThing: boolean; // Is this the ONE Thing for this period?

  // Hierarchy Metadata
  progress: number; // 0-100% (calculated automatically)

  createdAt: string;
  updatedAt: string;
}
```

### 4.2 Hierarchy Rules

- **Grand Goal (G)**: Parent = `null`. Must belong to a **Life Area**.
- **Annual Goal (A)**: Parent = **Grand Goal (G)**. Must belong to the _same_ Life Area.
- **Monthly Goal (M)**: Parent = **Annual Goal (A)**.
- **Weekly Goal (S)**: Parent = **Monthly Goal (M)**.
- **Daily Task (D)**: Parent = **Weekly Goal (S)**.

### 4.3 Progress Calculation Logic

**Automatic Roll-up**:

1.  Recursively calculate progress based on children.
2.  If a node has NO children (leaf), progress is `0%` (pending), `100%` (completed), or `50%` (in_progress).
3.  If a node HAS children, progress is the average of children's progress.

**Example**:

- Daily Task 1: 100%
- Daily Task 2: 0%
- **Weekly Goal**: Average = 50%

### 4.4 ONE Thing Logic

- A parent can only have ONE active "One Thing" at a time.
- If a Weekly Goal is marked "One Thing", its status propagates as high priority visually.

---

## 5. UI/UX Requirements

_Based on `tracking/wireframes/modulo-04-metas-hierarquicas.md`_

### 5.1 Navigation

- **Breadcrumbs**: Essential for navigating back up the hierarchy. E.g., `Home > Metas > Metas Grandes > 2026 > Fevereiro`.
- **Drill-down**: Clicking a goal card takes you to its detail view.

### 5.2 Views

1.  **Dashboard/List View**:
    - Filter by Year/Month/Week based on the view level.
    - Visual Progress Bar for each goal.
    - Badge for "ONE Thing".
    - "Create" button at the top.

2.  **Detail View**:
    - Header: Title, Description, Dates, Area Badge.
    - Stats: Viability, Relevance, Progress %.
    - **Cascade Section**: Shows the _children_ of the current goal.
      - E.g., Grand Goal detail shows list of Annual Goals.
    - Quick Actions: Edit, Delete.

3.  **Create/Edit Form**:
    - Fields: Title, Description, Dates, Priority.
    - **Link Selection**: Dropdown to select Parent (e.g., when creating Annual, select which Grand Goal).
    - **ONE Thing Toggle**: Checkbox "Is this the ONE Thing?".

### 5.3 Empty States

- If no Annual Goals exist, show "Start by creating your first Annual Goal".

---

## 6. Mock Data Generation Strategy

We need `mockGoals.ts` with the following chain to demonstrate the hierarchy:

1.  **Grand Goal**: "Tornar-se referência em React" (Carreira)
2.  **Annual Goal 2026**: "Dominar React 19 e Server Components"
    - **Monthly Goal (March 2026)**: "Estudar Server Actions e Form Actions"
      - **Weekly Goal (Week 1)**: "Criar projeto teste com Server Actions"
        - **Daily Task 1**: "Setup Vite project"
        - **Daily Task 2**: "Implement form"

This will ensure the UI has data to display immediately.

---

## 7. Technical Dependencies

- **Types**: Update `src/types/index.ts` to include the new `Goal` interface (or replace existing simple Goal).
- **Routing**: Add routes for:
  - `/metas/grandes` (List G)
  - `/metas/grandes/:id` (Detail G)
  - `/metas/anual` (List A)
  - `/metas/mensal` (List M)
  - `/metas/semanal` (List S)
  - `/agenda` (List D - _optional, may be part of agenda module, but for now use `/metas/diarias`_)
- **Components**: Reuse `GoalCard`, `ProgressBar`, `Badge` from previous sprints.

---

## 8. Acceptance Criteria

- [ ] User can view a list of Grand Goals.
- [ ] User can create a Grand Goal and link to an Area.
- [ ] User can click a Grand Goal and see its Annual Goals.
- [ ] User can click an Annual Goal and see its Monthly Goals.
- [ ] Completing a Daily Task updates the progress bar of the parent Weekly, Monthly, and Annual goals.
- [ ] Breadcrumbs allow navigation back to the top level.
- [ ] UI matches the wireframes in `tracking/wireframes/modulo-04-metas-hierarquicas.md`.

---

## Appendix: Previous Sprint Context

**Sprint 4 (Áreas de Vida)**:

- Implemented `Area` CRUD.
- Implemented `Goal` (flat) inside Areas.
- Next step is to extract `Goal` into a standalone hierarchical module.

**Roadmap**:

- Sprint 5: Hierarchical Goals (G->A->M->S->D).
- Sprint 6: Advanced Goal Features (ONE Thing, SMART).
- Sprint 7: Agenda (Time Blocking).
