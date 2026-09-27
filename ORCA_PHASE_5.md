# ORCA — PHASE 5
# MULTI-ROLE MARINE INTELLIGENCE WORKSPACES
# OPERATOR + RESEARCHER + DISASTER MANAGEMENT + ENVIRONMENT

## EXECUTION MODE

This is the next controlled implementation phase for the ORCA frontend.

IMPORTANT:
- Implement ONLY this phase.
- Do NOT attempt future phases.
- Do NOT rebuild the application.
- Do NOT replace working Fisher functionality from Phases 1–4.
- Do NOT create a backend.
- Do NOT introduce fake live APIs.
- Use the existing deterministic DEMO data architecture.
- Preserve existing routes, components, design tokens, and data models unless modification is required for this phase.

The project has limited implementation credits, so work efficiently and avoid unnecessary architectural changes.

---

# 1. SOURCE OF TRUTH

Treat the existing ORCA project and the ORCA project MD/specification already present in the repository as the source of truth.

Existing completed work:

- Phase 0 — Frontend foundation / PWA / roles / routing / Leaflet foundation.
- Phase 1 — Landing / role selection / login / application shell.
- Phase 2 — Fisher Command Center + marine intelligence visualization.
- Phase 3 — Ask ORCA conversational multi-agent workspace.
- Phase 3.1 — Desktop/UI density and workspace optimization.
- Phase 4 — Mission & Route Planner + What-If Simulator.

Do not contradict existing ORCA terminology or role definitions.

---

# 2. PHASE 5 OBJECTIVE

Expand ORCA beyond the Fisher workspace.

Implement polished, role-specific operational dashboards for:

1. Maritime Operator
2. Researcher
3. Disaster Management Authority
4. Environmental Analyst

Existing Fisher functionality is already established and should remain intact.

The four new workspaces must NOT simply be copies of the Fisher dashboard with different titles.

Each role must answer a different operational question and visualize the marine data differently.

The objective is:

> One ORCA intelligence platform, multiple operational perspectives.

---

# 3. DESIGN PRINCIPLE

ORCA should feel like a single professional marine intelligence platform.

The role changes:

- priorities
- information hierarchy
- visualizations
- alerts
- workflows
- decisions

The role does NOT change:

- core ORCA identity
- application shell
- typography
- spacing system
- interaction quality
- data credibility indicators
- DEMO data labeling
- general marine intelligence visual language

---

# 4. COMMON APPLICATION SHELL

Reuse the optimized Phase 3.1 shell.

For authenticated workspaces:

- compact header
- ORCA logo
- active workspace / role indicator
- demo-data status
- profile control
- desktop navigation
- mobile bottom navigation

Do not create four separate application shells.

Use shared components.

---

# 5. ROLE 1 — MARITIME OPERATOR

Route:

`/operator/dashboard`

The Maritime Operator workspace should focus on:

> Vessel operations, route awareness, fleet status, marine conditions and operational risk.

Do NOT make it a fishing dashboard.

## Primary information hierarchy

1. Fleet status
2. Vessel positions
3. Route conditions
4. Weather/ocean conditions
5. Operational alerts
6. Mission/route exceptions

---

# 6. OPERATOR DASHBOARD

Create a modern maritime operations console.

Recommended desktop layout:

```text
┌──────────────────────────────────────────────────────────────┐
│ OPERATOR HEADER / TELEMETRY                                 │
├───────────────────────────────┬──────────────────────────────┤
│ FLEET MAP                     │ FLEET STATUS                 │
│                               │ Active / Delayed / Alert     │
│ Vessel markers                │ Vessel summaries             │
│ Routes                        │                              │
│ Hazards                       ├──────────────────────────────┤
│ Weather                       │ OPERATIONAL ALERTS            │
│                               │                              │
├───────────────────────────────┴──────────────────────────────┤
│ MARINE CONDITIONS / ROUTE INTELLIGENCE                       │
└──────────────────────────────────────────────────────────────┘
```

Use available viewport space efficiently.

---

# 7. OPERATOR DATA VISUALIZATION

Use the existing marine data sources.

Visualize:

## Vessel

- position
- speed
- heading
- status
- route

## Weather

- wind
- direction
- weather condition

## Ocean

- SST
- wave/swell

## Hazards

- hazard location
- severity
- affected route

## GIS

- boundaries
- restricted areas
- route clearance

Prefer:

- fleet map
- route lines
- status indicators
- compact telemetry
- mini trend charts
- alert severity indicators

Avoid a page made primarily from text cards.

---

# 8. OPERATOR MAP

Reuse the existing Leaflet foundation.

Provide:

- vessel markers
- route lines
- hazard overlays
- weather/ocean layer controls
- restricted zones
- selected-vessel popup

Clicking a vessel should reveal:

- Vessel name
- Status
- Speed
- Heading
- Route
- Current condition

Keep map interaction smooth.

---

# 9. OPERATOR VESSEL DETAIL

When selecting a vessel, show a compact detail drawer/panel.

Include:

- vessel identity
- current location
- speed
- heading
- route
- current marine conditions
- relevant alerts

Do not navigate away from the operational workspace unnecessarily.

---

# 10. OPERATOR ALERTS

Create operational alert visualization.

Example categories:

- Route Hazard
- Severe Swell
- Weather
- Boundary / Geofence
- Vessel Status

Use:

- severity
- location
- affected vessel/route
- timestamp
- status

Do not use alarm animations excessively.

Use subtle priority indicators.

---

# 11. ROLE 2 — RESEARCHER

Route:

`/researcher/dashboard`

Researcher workspace question:

> "What does the available ocean, weather, satellite/PFZ and spatial evidence tell us about the marine environment?"

The Researcher dashboard must prioritize analysis rather than operational alerts.

---

# 12. RESEARCHER DASHBOARD

Recommended layout:

```text
┌──────────────────────────────────────────────────────────────┐
│ RESEARCH DATA HEADER                                        │
├──────────────────────┬───────────────────────┬───────────────┤
│ OCEAN STATE          │ PFZ / CHLOROPHYLL     │ WEATHER       │
│ SST                  │ Concentration         │ Wind          │
│ Wave                 │ PFZ confidence        │ Conditions    │
├──────────────────────┴───────────────────────┴───────────────┤
│                                                             │
│                  SPATIAL ANALYSIS MAP                       │
│                                                             │
├──────────────────────────────────────┬──────────────────────┤
│ TREND / TIME SERIES                  │ EVIDENCE / SOURCES   │
└──────────────────────────────────────┴──────────────────────┘
```

---

# 13. RESEARCHER DATA VISUALIZATION

This role should have the strongest analytical visualization.

Use charts for:

## SST

Show temporal/spatial variation.

## Wave

Show trend or current profile.

## Chlorophyll / PFZ

Show concentration and PFZ confidence.

## Weather

Show wind vector / direction.

## Marine relationships

Where practical, visually connect:

`SST + Chlorophyll + Ocean + Weather → PFZ intelligence`

Do not fabricate scientific relationships beyond what the existing demo data supports.

---

# 14. RESEARCHER MAP

The map should be an analytical map.

Layers:

- SST
- PFZ
- chlorophyll
- vessel observations
- weather
- GIS boundaries

Use layer controls.

Selected regions should provide an information popup/panel.

---

# 15. RESEARCHER EVIDENCE PANEL

Create a clear evidence/source visualization.

Use the existing evidence terminology.

Clearly distinguish:

- DEMO DATA
- source category
- timestamp
- measurement
- confidence where available

Do not imply live satellite/API connectivity.

---

# 16. RESEARCHER ANALYSIS VIEW

Existing route:

`/researcher/analysis`

Make it a real analytical workspace.

Include:

- chart region
- selected variable
- time range controls
- map synchronization where practical
- evidence panel
- compact statistics

This can remain frontend/demo driven.

---

# 17. ROLE 3 — DISASTER MANAGEMENT AUTHORITY

Route:

`/disaster/dashboard`

Operational question:

> "Where are the marine hazards, what areas may be affected, and what requires attention?"

This workspace should prioritize situational awareness and hazard response.

---

# 18. DISASTER DASHBOARD

Recommended layout:

```text
┌──────────────────────────────────────────────────────────────┐
│ SITUATIONAL STATUS                                          │
├───────────────────────────────┬──────────────────────────────┤
│ HAZARD MAP                    │ ACTIVE HAZARDS               │
│                               │ Severity                     │
│ Cyclone / swell / weather     │ Location                     │
│ affected zones               │ Status                       │
├───────────────────────────────┴──────────────────────────────┤
│ AFFECTED AREA / RISK TIMELINE                               │
├──────────────────────────────────────┬───────────────────────┤
│ RESPONSE / ALERT STATUS              │ EVIDENCE              │
└──────────────────────────────────────┴───────────────────────┘
```

---

# 19. DISASTER DATA VISUALIZATION

Use:

- hazard severity
- hazard location
- affected area
- route exposure
- vessel exposure
- temporal progression where available

Visualizations:

- hazard map overlays
- severity indicators
- affected-area polygons
- timeline
- alert counters
- exposure summaries

Avoid making the interface visually sensational.

The design should be serious and operational.

---

# 20. DISASTER HAZARD MAP

Route:

`/disaster/map`

Reuse Leaflet.

Show:

- hazard zones
- vessels
- affected areas
- boundaries
- route exposure

Click a hazard:

Show:

- type
- severity
- location
- affected area
- related vessel/route information where supported by demo data
- DEMO status

---

# 21. DISASTER ALERTS

Route:

`/disaster/alerts`

Create a structured alert workspace.

Each alert should show:

- severity
- type
- area
- timestamp
- current status

Provide filtering by severity/type if the existing data supports it.

Do not invent alert feeds.

---

# 22. ROLE 4 — ENVIRONMENTAL ANALYST

Route:

`/environment/dashboard`

Operational question:

> "What is changing in the marine environment and where are the important environmental signals?"

This workspace should prioritize environmental patterns and spatial analysis.

---

# 23. ENVIRONMENT DASHBOARD

Recommended layout:

```text
┌──────────────────────────────────────────────────────────────┐
│ ENVIRONMENTAL STATUS                                        │
├──────────────────────┬───────────────────────┬───────────────┤
│ SST                  │ CHLOROPHYLL           │ OCEAN STATE   │
│ Trend                │ Concentration         │ Wave/Swell    │
├──────────────────────┴───────────────────────┴───────────────┤
│                                                             │
│ ENVIRONMENTAL MAP                                           │
│                                                             │
├──────────────────────────────────────┬──────────────────────┤
│ TRENDS                               │ EVIDENCE             │
└──────────────────────────────────────┴──────────────────────┘
```

---

# 24. ENVIRONMENT DATA VISUALIZATION

Prioritize:

- SST
- chlorophyll
- ocean state
- hazards
- spatial boundaries
- weather context

Use:

- time-series charts
- trend indicators
- map layers
- concentration visualization
- anomaly-style indicators only if the existing data supports them

Do not invent scientific anomaly calculations.

---

# 25. ENVIRONMENT ANALYSIS

Existing route:

`/environment/analysis`

Create:

- variable selector
- chart
- map
- evidence
- time/context controls

The chart and map should feel connected.

---

# 26. ENVIRONMENT EVIDENCE

Existing route:

`/environment/evidence`

Provide:

- source category
- observed variable
- measurement
- timestamp
- DEMO DATA indicator
- confidence where available

Make source attribution visually obvious.

---

# 27. ROLE-SPECIFIC COLOR ACCENTS

Keep the overall ORCA marine theme.

Use subtle role accents:

## Fisher

Existing Fisher accent.

## Operator

Operational cyan / blue.

## Researcher

Analytical violet/blue accent.

## Disaster

Controlled warning/orange accent.

## Environment

Marine green/teal accent.

Do NOT recolor the entire application for each role.

Role color should appear in:

- active navigation
- badges
- charts
- selected states
- subtle highlights

Maintain accessibility and contrast.

---

# 28. DATA SOURCE VISUALIZATION STANDARD

Across all roles, communicate the core ORCA data streams:

```text
OCEAN
WEATHER
PFZ / FISHERIES
VESSEL
HAZARDS
GIS / BOUNDARIES
```

Use the actual existing demo data.

Every visualization should answer:

> "What does this data mean for this role?"

Do not show graphs merely for decoration.

---

# 29. ASK ORCA INTEGRATION

Every role should have access to the existing ORCA conversational intelligence experience.

Do not clone the Fisher Ask ORCA page.

Reuse the shared conversational components.

The role context should change the suggested prompts.

Examples:

## Operator

"What vessels are currently exposed to the swell hazard?"

## Researcher

"What does the current chlorophyll and SST pattern indicate?"

## Disaster

"Which vessels are inside the affected hazard area?"

## Environment

"Show the areas with the strongest chlorophyll signal."

These are frontend/demo prompts.

Do not claim real NLP inference or live model responses.

---

# 30. MULTI-AGENT VISUALIZATION

Reuse the established ORCA agent visualization.

The agent stages may be displayed differently depending on role context, but preserve the established ORCA architecture.

The visual message should be:

```text
USER QUESTION
      ↓
MISSION / CONTEXT
      ↓
MARINE DATA
      ↓
SPECIALIST AGENTS
      ↓
EVIDENCE
      ↓
ORCA RESPONSE
```

Use purposeful animation.

No excessive effects.

Respect reduced motion.

---

# 31. ANIMATION STANDARD

Across all new role workspaces:

Use:

- chart entrance
- map layer transitions
- selected-vessel transitions
- hazard highlighting
- agent processing
- panel expansion
- navigation transitions
- subtle telemetry refresh

Avoid:

- excessive bouncing
- dramatic page transitions
- unnecessary continuous animation

Animations must communicate state or relationships.

---

# 32. RESPONSIVE REQUIREMENTS

## Desktop

Target:

- 1440px
- 1920px

Use the viewport efficiently.

Avoid large empty regions.

Use independent panel scrolling where appropriate.

## Tablet

Adapt the dashboard hierarchy.

## Mobile

Target:

`390px`

Priority should be role-specific.

Do not simply shrink the desktop dashboard.

No horizontal overflow.

Existing mobile bottom navigation must continue working.

---

# 33. COMPONENT REUSE

Prefer existing components:

- AppShell
- Header
- Sidebar
- BottomNav
- BaseMap
- DecisionCard
- AgentActivity
- AgentStep
- EvidencePanel
- DataFreshnessBadge
- UI primitives

Create reusable components when multiple roles need the same pattern.

Do NOT duplicate nearly identical components four times.

---

# 34. PERFORMANCE / CREDIT EFFICIENCY

Because implementation credits are limited:

- Reuse existing architecture.
- Avoid large dependency additions.
- Avoid unnecessary refactors.
- Avoid rewriting working files.
- Build shared visualization components where useful.
- Do not add backend infrastructure.
- Do not implement live API integrations.

Focus effort on visible frontend quality.

---

# 35. DEMO DATA RULE

All currently available data is deterministic/demo data.

Keep:

`DEMO DATA`

or equivalent freshness/source indicators visible where appropriate.

Never imply:

- live satellite feed
- live AIS
- live weather API
- live INCOIS/IMD connection
- real-time AI backend

unless such functionality already exists in the repository.

---

# 36. DO NOT BREAK EXISTING FISHER WORKSPACE

After implementation verify:

- `/fisher/dashboard`
- `/fisher/map`
- `/fisher/ask`
- `/fisher/mission`
- `/fisher/alerts`
- `/fisher/profile`

The new role workspaces must not regress existing functionality.

---

# 37. REQUIRED ROUTES TO VERIFY

Operator:

- `/operator/dashboard`
- `/operator/map`
- `/operator/missions`
- `/operator/alerts`
- `/operator/profile`

Researcher:

- `/researcher/dashboard`
- `/researcher/map`
- `/researcher/analysis`
- `/researcher/evidence`
- `/researcher/profile`

Disaster:

- `/disaster/dashboard`
- `/disaster/map`
- `/disaster/hazards`
- `/disaster/alerts`
- `/disaster/profile`

Environment:

- `/environment/dashboard`
- `/environment/map`
- `/environment/analysis`
- `/environment/evidence`
- `/environment/profile`

Existing routes must remain functional.

---

# 38. VALIDATION

Run:

```bash
tsc -b
```

Then:

```bash
npm run build
```

Verify:

- 0 TypeScript errors.
- 0 console errors.
- No horizontal overflow.
- No broken Leaflet maps.
- No broken navigation.
- No broken mobile bottom navigation.
- No Fisher regressions.
- PWA build still succeeds.

---

# 39. VISUAL VERIFICATION

Test every new dashboard at:

- 1440px
- 1920px
- 390px

Pay particular attention to:

- whitespace
- information density
- chart readability
- map sizing
- panel hierarchy
- header height
- role identity
- responsive stacking

The interface should feel like a professional marine intelligence product.

---

# 40. ACCEPTANCE CRITERIA

Phase 5 is successful when:

1. Operator has a genuinely operational fleet intelligence workspace.
2. Researcher has a genuinely analytical marine data workspace.
3. Disaster Authority has a genuinely hazard-focused situational workspace.
4. Environmental Analyst has a genuinely environmental intelligence workspace.
5. The four dashboards are visibly different in information hierarchy.
6. All dashboards still feel like one ORCA product.
7. Marine data is visualized rather than merely listed.
8. Maps provide meaningful spatial context.
9. Ask ORCA is accessible from every role.
10. Existing Fisher workflows remain intact.
11. Desktop space is used efficiently.
12. Mobile layouts work without horizontal scrolling.
13. Animations communicate state without becoming distracting.
14. Demo-data limitations remain transparent.

---

# 41. FINAL REPORT

After implementation, provide a concise report containing:

1. Files changed.
2. Shared components created/modified.
3. Operator workspace features.
4. Researcher workspace features.
5. Disaster workspace features.
6. Environment workspace features.
7. Data visualizations implemented.
8. Map functionality.
9. Ask ORCA integration.
10. Animation system.
11. Responsive behavior.
12. Routes tested.
13. 1440px verification.
14. 1920px verification.
15. 390px verification.
16. TypeScript result.
17. Production build result.
18. Console error result.
19. Fisher regression result.
20. Remaining issues.

Do not claim "complete" if significant visual or functional issues remain.
