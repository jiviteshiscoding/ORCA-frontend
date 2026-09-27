# ORCA — PHASE 4
# MISSION & ROUTE PLANNER + WHAT-IF SIMULATOR

## Status

Phase 4 builds directly on the completed Phase 1, Phase 2, Phase 3 and Phase 3.1 frontend.

The objective is to create an interactive **Mission & Route Planner** where ORCA can visualize how changes to mission parameters affect marine safety, route feasibility, fishing yield and the final decision.

This remains a **frontend/demo implementation** unless an existing backend already exists in the project.

Do not invent a live backend.

Use the established deterministic demo marine datasets and existing ORCA data structures.

---

# 1. SOURCE OF TRUTH

Follow:

- Phase 1 production frontend.
- Phase 2 Fisher Command Center and marine intelligence data.
- Phase 3 Ask ORCA conversational reasoning.
- Phase 3.1 UI/UX optimization.
- Existing project data models.
- Existing demo datasets.
- Existing ORCA terminology.

The existing ORCA marine intelligence concept remains the source of truth.

Do not silently replace existing values, terminology, routes or decision logic.

---

# 2. PRIMARY OBJECTIVE

Create:

`/fisher/mission`

as a polished interactive Mission & Route Planner.

The workspace must answer:

> "If I change my departure time, duration, route or operating distance, how does that change the mission?"

The user should be able to modify mission parameters and immediately see a visual consequence.

Core concept:

```text
MISSION PARAMETERS
        ↓
MARINE CONDITIONS
        ↓
ROUTE / GEOFENCE CHECK
        ↓
MULTI-AGENT EVALUATION
        ↓
DECISION
        ↓
EXPLAINABLE VISUALIZATION
```

This must feel like an intelligence workspace, not a basic form.

---

# 3. WORKSPACE STRUCTURE

Desktop layout:

```text
┌───────────────────────────────────────────────────────────────┐
│ ORCA APPLICATION HEADER                                      │
├───────────────────────────────┬───────────────────────────────┤
│                               │                               │
│ MISSION PARAMETERS            │ MISSION ASSESSMENT            │
│                               │                               │
│ Departure                     │ Decision                      │
│ Duration                      │ Confidence                    │
│ Distance                      │ Risk                          │
│ Destination / PFZ             │ Return constraint             │
│                               │                               │
│ Route controls                │ Key factors                   │
│                               │                               │
├───────────────────────────────┤                               │
│                               │                               │
│ INTERACTIVE MARINE MAP        │ WHAT CHANGED?                 │
│                               │                               │
│ Vessel                        │ Baseline vs scenario          │
│ PFZ                           │ comparison                    │
│ Route                         │                               │
│ Hazards                       │                               │
│ Geofences                     │                               │
├───────────────────────────────┴───────────────────────────────┤
│ Timeline / Mission Window                                     │
└───────────────────────────────────────────────────────────────┘
```

Use the viewport efficiently.

Avoid unnecessary page-level whitespace.

---

# 4. MISSION PARAMETERS

Create a structured mission control panel.

Parameters:

## Departure Time

Default:

`05:30 AM`

Allow changing the departure time.

Example values:

- 05:30 AM
- 07:00 AM
- 09:00 AM
- 10:00 AM

Do not hardcode the interface to only one scenario.

---

## Mission Duration

Default:

`5 Hours`

Allow changing mission duration.

Suggested demo options:

- 3 Hours
- 5 Hours
- 7 Hours
- 9 Hours

---

## Maximum Operating Distance

Default:

`25 NM`

Allow adjustment within a reasonable demo range.

The interface must clearly distinguish:

- planned distance
- maximum recommended distance
- restricted/geofenced areas

---

## Target Zone

Allow selecting the recommended PFZ zone.

Show:

- PFZ confidence
- expected yield
- chlorophyll
- SST

---

# 5. INTERACTIVE MAP

Reuse the existing Leaflet marine map implementation.

Show:

- Vessel marker.
- Home port.
- PFZ zone.
- Planned route.
- Restricted areas.
- EEZ boundaries where available.
- Hazard zones.
- Swell-risk zone.

Route must visually connect:

**Home Port → Planned Fishing Zone → Return**

The route should update when mission parameters change.

---

# 6. ROUTE VISUALIZATION

Use a visually clear route.

Example:

```text
HOME PORT
   │
   └───────────────→ PFZ ZONE
                     │
                     └────────→ RETURN
```

On the map:

- Use clear route line.
- Vessel marker.
- Target marker.
- Direction arrows where practical.
- Distance indicator.
- Hazard intersections.

Do not clutter the map.

---

# 7. GEOFENCE VALIDATION

Create a visual route constraint system.

Check whether the planned mission:

- Exceeds maximum recommended distance.
- Enters a restricted area.
- Intersects a hazard zone.
- Exceeds mission time constraints.
- Conflicts with the recommended return window.

Display states:

### SAFE

Mission is within known constraints.

### CAUTION

Mission is technically possible but one or more factors require monitoring.

### RESTRICTED

Mission conflicts with a defined geofence or hard constraint.

These states should use the existing ORCA decision language.

Do not invent new decision terminology unnecessarily.

---

# 8. WHAT-IF SIMULATOR

This is the most important feature of Phase 4.

Create a visible:

**WHAT-IF SCENARIO**

control.

The user should be able to change:

- Departure time.
- Duration.
- Distance.
- Target zone.

Then compare:

**BASELINE**

against

**CURRENT SCENARIO**

---

# 9. SCENARIO COMPARISON

Example:

Baseline:

```text
Departure: 05:30 AM
Duration: 5 hours
Distance: 25 NM
Decision: GO WITH CAUTION
Confidence: 91%
```

Scenario:

```text
Departure: 10:00 AM
Duration: 5 hours
Distance: 25 NM
Decision: CAUTION
```

Show the differences visually.

Possible comparison metrics:

- Wave Height.
- Wind.
- PFZ Yield.
- Risk.
- Recommended return time.
- Confidence.
- Distance constraint.

Use:

- arrows
- delta values
- status changes
- compact charts
- timeline markers

Do not rely only on paragraphs.

---

# 10. MISSION TIMELINE

Create a visual mission timeline.

Example:

```text
05:30          09:30          10:00          11:30
  │──────────────│──────────────│──────────────│
  DEPART         OPTIMAL        RISK ↑         RETURN
```

The timeline should visualize:

- departure.
- optimal fishing window.
- changing risk.
- return deadline.
- current scenario.

When the user changes departure time, the timeline updates.

Use subtle animation.

---

# 11. DECISION ENGINE VISUALIZATION

Reuse the established decision model.

Display:

- Decision state.
- Confidence.
- Main factors.
- Recommended window.
- Return constraint.

Example:

```text
GO WITH CAUTION

91% CONFIDENCE

Recommended:
05:30 — 09:30

Return:
Before 11:30 AM
```

If the scenario changes, animate the affected values.

Do not create a fake AI response.

The frontend should clearly indicate demo/deterministic data where applicable.

---

# 12. FACTOR IMPACT VISUALIZATION

Show which factors changed because of the scenario.

Example:

```text
SEA SURFACE TEMPERATURE    ✓ STABLE

WAVE SWELL                 ↑ HIGHER RISK

PFZ YIELD                  ↓ LOWER

WIND                       → STABLE

RETURN CONSTRAINT          ⚠ TIGHTER
```

Use clear visual direction indicators.

The objective is to explain **why the decision changed**.

---

# 13. MULTI-AGENT RE-EVALUATION

Reuse the existing 7-agent system.

When a scenario is recalculated, show a lightweight processing animation:

```text
Mission Planner       ✓
Ocean Agent           ✓
Weather Agent         ●
PFZ / Fisheries       ○
Geo / Safety          ○
Evidence Check        ○
Decision Engine       ○
```

Do not make users wait several seconds unnecessarily.

For deterministic frontend demo behavior, use a short controlled sequence.

Respect reduced-motion preferences.

---

# 14. ASK ORCA INTEGRATION

Provide an obvious action:

**ASK ORCA ABOUT THIS SCENARIO**

Example generated contextual prompt:

> "What changes if I leave at 10:00 AM for five hours?"

Clicking should navigate to `/fisher/ask` with the scenario context available to the conversation UI.

Do not implement a backend unless one already exists.

Frontend can pass context using:

- route state
- query parameters
- existing application state

Use the cleanest approach compatible with the current project.

---

# 15. SAVE / RESET SCENARIO

Provide:

**RESET TO RECOMMENDED**

This restores the baseline:

- 05:30 AM departure.
- 5-hour mission.
- 25 NM maximum distance.
- Recommended PFZ zone.

If appropriate, provide a lightweight:

**USE THIS MISSION**

action.

This can remain a frontend/demo state unless backend persistence already exists.

---

# 16. DATA VISUALIZATION REQUIREMENTS

Do not represent every value as a card.

Use a mixture of:

- timeline
- mini trend chart
- meters
- status pills
- map overlays
- route distance
- confidence meter
- factor comparison
- delta indicators

The purpose is to visually demonstrate:

**marine data → route impact → agent reasoning → decision**

---

# 17. ANIMATION REQUIREMENTS

Use purposeful animations.

Required opportunities:

### Route update

Animate route transition when parameters change.

### Timeline

Animate markers moving to the new scenario time.

### Decision

Smoothly transition the decision state.

### Confidence

Animate confidence meter changes.

### Agent reasoning

Use the established processing animation.

### Map

Smoothly pan/fit bounds when the route changes.

Avoid flashy animations.

Respect `prefers-reduced-motion`.

---

# 18. VISUAL DESIGN

Follow the ORCA design language:

- Deep marine navy.
- Cyan intelligence accents.
- Light operational workspace.
- Dark marine visualization panels where appropriate.
- Clean typography.
- Subtle borders.
- Controlled shadows.
- High information density.

The Mission Planner should feel more like a **navigation/intelligence console** than a generic dashboard.

---

# 19. RESPONSIVE DESIGN

## Desktop

Use a two-column operational workspace.

## Tablet

Stack map and controls intelligently.

## Mobile

Prioritize:

1. Mission parameters.
2. Decision.
3. Map.
4. Timeline.
5. Scenario comparison.
6. Agent reasoning.

Use the existing mobile navigation.

No horizontal overflow.

---

# 20. PERFORMANCE

Reuse:

- Existing Leaflet map.
- Existing marine data hooks.
- Existing decision components.
- Existing agent components.

Do not duplicate data sources.

Avoid unnecessary React re-renders.

Keep map interactions smooth.

Do not introduce a large visualization library unless genuinely necessary.

---

# 21. DO NOT CHANGE

Do NOT change:

- ORCA branding.
- Existing route structure.
- Existing demo datasets.
- Existing decision terminology.
- Existing marine data terminology.
- Existing 7-agent names.
- Phase 1 functionality.
- Phase 2 functionality.
- Phase 3 functionality.
- Phase 3.1 layout system.

Do not create fake real-time APIs.

Do not claim live data.

---

# 22. VALIDATION

Run:

```bash
tsc -b
```

and:

```bash
npm run build
```

Verify:

- 0 TypeScript errors.
- 0 console errors.
- No horizontal overflow.
- Leaflet works.
- Route updates work.
- Scenario controls work.
- Reset works.
- Decision visualization updates.
- Timeline updates.
- Agent animation works.
- Ask ORCA integration works.

Test:

- `/fisher/mission`
- `/fisher/dashboard`
- `/fisher/map`
- `/fisher/ask`

Also verify all existing routes.

Test at:

- 1440px.
- 1920px.
- Tablet.
- 390px.

---

# 23. ACCEPTANCE CRITERIA

Phase 4 is successful when a user can:

1. Open Mission Planner.
2. See the current vessel, route and PFZ on the map.
3. Change departure time.
4. Change mission duration.
5. Change operating distance.
6. See the route update.
7. See the mission timeline update.
8. See marine factor impacts.
9. See the decision/confidence update.
10. Understand why the scenario changed.
11. Reset to the recommended mission.
12. Send the scenario context to Ask ORCA.

The interface must make the consequences visually understandable without requiring the user to read a long explanation.

---

# 24. FINAL REPORT

At completion report:

1. Files changed.
2. Components created/modified.
3. Mission controls implemented.
4. Map functionality.
5. Route visualization.
6. Geofence validation.
7. What-if simulator.
8. Timeline visualization.
9. Decision visualization.
10. Multi-agent processing.
11. Ask ORCA integration.
12. Responsive behavior.
13. Routes tested.
14. 1440px verification.
15. 1920px verification.
16. 390px verification.
17. TypeScript result.
18. Production build result.
19. Console error result.
20. Remaining issues.

Do not claim "complete" if major UI or interaction issues remain.
