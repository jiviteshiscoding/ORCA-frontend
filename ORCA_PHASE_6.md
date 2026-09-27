# ORCA --- PHASE 6

# MARINE DATA INTELLIGENCE + VISUALIZATION + ORCA NLP EXPERIENCE

## PROMPT TYPE

Frontend-only implementation prompt for Antigravity IDE.

**This Markdown file is the source of truth for Phase 6.**

Phase 6 must build on the completed Phases 1--5. Do not replace working
features or redesign the application from scratch.

------------------------------------------------------------------------

# 1. PHASE OBJECTIVE

Phase 6 is focused on making ORCA's core intelligence visually
understandable.

The application already has:

-   Fisher Command Center
-   Ask ORCA
-   Mission & Route Planner
-   What-If Simulator
-   Multiple role workspaces
-   Maps
-   Multi-agent reasoning
-   Evidence panels
-   Demo marine datasets

Now make the connection between:

> **MARINE DATA → DATA PROCESSING → MULTI-AGENT REASONING → NLP QUERY →
> VISUAL EVIDENCE → DECISION**

much more obvious.

The user should be able to understand not only **what ORCA recommends**,
but also:

1.  Which marine data was used.
2.  What the data means.
3.  Which agent analyzed it.
4.  How different variables interact.
5.  Why the final decision changed.
6.  What would happen if conditions changed.
7.  Ask ORCA questions naturally and receive structured, visual answers.

This remains **frontend-only**.

Do not require a production backend, live API credentials, or real-time
external services in this phase.

------------------------------------------------------------------------

# 2. SOURCE OF TRUTH

Preserve all completed functionality from:

-   Phase 2 --- Fisher Command Center
-   Phase 3 / 3.1 --- Ask ORCA
-   Phase 4 --- Mission & Route Planner + What-If Simulator
-   Phase 5 --- Multi-Role Workspaces

Existing implementation is authoritative.

Do not remove existing routes or working components.

Use existing deterministic demo data and existing hooks/data structures
wherever possible.

Clearly label simulated data as:

**DEMO SNAPSHOT**

Never present demo data as live operational data.

------------------------------------------------------------------------

# 3. PRIMARY DATA STREAMS

ORCA's frontend must visibly represent the existing marine information
streams.

## OCEAN

Visualize:

-   SST
-   Wave height
-   Swell
-   Ocean state
-   Currents where available

## WEATHER

Visualize:

-   Wind speed
-   Wind direction
-   Weather warnings
-   Marine weather state

## PFZ / FISHERIES

Visualize:

-   Chlorophyll
-   PFZ location
-   Fishing density
-   Yield probability
-   PFZ confidence

## VESSEL

Visualize:

-   Position
-   Speed
-   Heading
-   Status
-   Endurance
-   Mission state

## GEO / SAFETY

Visualize:

-   EEZ
-   Restricted areas
-   Geofences
-   Hazards
-   Route constraints

------------------------------------------------------------------------

# 4. DATA INTELLIGENCE CENTER

Create a reusable **Marine Intelligence Data View**.

This should not look like a generic admin table.

It should feel like an intelligence workstation.

Recommended layout:

``` text
┌──────────────────────────────────────────────────────────────┐
│ MARINE INTELLIGENCE                         DEMO SNAPSHOT     │
├──────────────────────────┬───────────────────────────────────┤
│ DATA STREAMS              │ PRIMARY VISUALIZATION             │
│                          │                                   │
│ Ocean                    │       Chart / Analysis            │
│ Weather                  │                                   │
│ PFZ / Fisheries          │                                   │
│ Vessel                   │                                   │
│ Geo / Safety             │                                   │
├──────────────────────────┴───────────────────────────────────┤
│ SOURCE / TIMESTAMP / CONFIDENCE / STATUS                     │
└──────────────────────────────────────────────────────────────┘
```

Allow users to select a data stream and update the main visualization.

------------------------------------------------------------------------

# 5. DATA STREAM SELECTOR

Create a reusable selector for:

-   Ocean
-   Weather
-   PFZ
-   Vessel
-   Geo / Safety

Each selection should update:

-   title
-   description
-   metrics
-   chart/map
-   source attribution
-   relevant agents

Do not reload the entire page.

Use smooth transitions.

------------------------------------------------------------------------

# 6. VISUALIZE DATA --- DO NOT JUST DISPLAY VALUES

Avoid excessive KPI cards.

For each dataset, provide at least one meaningful visualization.

### Ocean

Use:

-   SST trend
-   Wave/swell trend
-   marine condition indicator
-   map layer where appropriate

### Weather

Use:

-   wind speed trend
-   wind direction indicator
-   weather condition timeline
-   warning markers

### PFZ

Use:

-   PFZ polygon
-   chlorophyll value
-   yield probability
-   confidence indicator
-   hotspot visualization

### Vessel

Use:

-   vessel marker
-   route
-   speed/heading indicator
-   mission timeline

### Geo/Safety

Use:

-   restricted polygons
-   hazard zones
-   route intersection indicators
-   risk timeline

------------------------------------------------------------------------

# 7. TIME-SERIES VISUALIZATION

Create reusable chart components.

Potential components:

``` text
MarineTrendChart
WaveTrendChart
WindTrendChart
ChlorophyllTrendChart
RiskTimeline
MissionTimeline
```

Charts must support:

-   labels
-   units
-   readable axes
-   tooltips
-   source attribution
-   demo status
-   responsive resizing

Use the existing project chart library if one is already installed.

Do not introduce a large new charting dependency unless necessary.

------------------------------------------------------------------------

# 8. CHART DESIGN

Charts should follow the ORCA design language.

Avoid:

-   rainbow palettes
-   excessive gradients
-   3D charts
-   unnecessary legends
-   decorative chart effects
-   tiny unreadable labels

Prefer:

-   clean grid
-   clear units
-   compact legends
-   meaningful annotations
-   threshold lines
-   decision markers

Example:

``` text
Wave Height
2.5m ───────────────────── Risk Threshold
     │              ╭─────
1.5m │      ╭───────╯
     │──────╯
1.0m │
     └──────────────────────── Time
       05:30   09:30   10:00
```

The visualization should help explain the decision.

------------------------------------------------------------------------

# 9. DECISION-ALIGNED VISUALIZATION

Whenever a chart is connected to a decision, show the decision context.

For example:

``` text
WAVE HEIGHT

1.2 m
MODERATE

Recommended operating threshold
─────────────────────

05:30 ───── 09:30 OPTIMAL ───── 10:00 RISK INCREASE
```

The user should be able to see **why a threshold matters**.

------------------------------------------------------------------------

# 10. CORRELATION / CROSS-DATA VIEW

Create a reusable **Marine Condition Correlation** visualization.

Purpose:

Show how multiple data sources contribute to a single decision.

Example:

``` text
SST 28.5°C ────────────────┐
                           │
Chlorophyll 1.45 mg/m³ ────┤
                           ├──> PFZ CONFIDENCE 89%
Wave 1.2m ─────────────────┤
                           │
Wind 14 kts SW ────────────┘
```

This should visually communicate ORCA's core idea:

> Multiple independent marine signals are combined before making a
> decision.

Use subtle animated connection lines when appropriate.

------------------------------------------------------------------------

# 11. DATA → AGENT TRACE

Connect data streams to the multi-agent visualization.

Example:

``` text
OCEAN DATA ───────> Ocean Agent
WEATHER DATA ─────> Weather Agent
PFZ DATA ─────────> PFZ Agent
VESSEL DATA ──────> Mission Planner
GEO DATA ─────────> Geo / Safety Agent

                         ↓

                   Evidence Check

                         ↓

                   Decision Engine
```

When an agent is selected, highlight the data sources it used.

This must be a visual relationship, not merely text.

------------------------------------------------------------------------

# 12. ORCA NLP EXPERIENCE

Improve Ask ORCA into the primary natural-language interface for ORCA.

The user should be able to ask natural operational questions.

Examples:

### Fisher

> Can I fish tomorrow morning for five hours?

### Fisher

> What if I leave at 10 AM?

### Researcher

> How is the current SST affecting the PFZ?

### Safety Manager

> Which vessels are near the swell hazard?

### Environmental Analyst

> Where is chlorophyll concentration highest?

### Operations

> Which mission currently needs attention?

The frontend should recognize the intent and present the result in a
structured way.

------------------------------------------------------------------------

# 13. NLP INTENT VISUALIZATION

When ORCA processes a question, display:

``` text
USER QUERY
      ↓
INTENT DETECTION
      ↓
CONTEXT EXTRACTION
      ↓
RELEVANT DATA SOURCES
      ↓
MULTI-AGENT ANALYSIS
      ↓
EVIDENCE VALIDATION
      ↓
DECISION / ANSWER
```

For example:

``` text
QUERY
"Can I fish tomorrow for 5 hours?"

INTENT
Fishing Voyage Safety & Yield

PARAMETERS
Duration: 5 hours
Window: Tomorrow morning
Vessel: Sea Pearl

DATA REQUIRED
✓ Ocean
✓ Weather
✓ PFZ
✓ Vessel
✓ Geo/Safety
```

This makes the NLP process understandable during a presentation/demo.

------------------------------------------------------------------------

# 14. NATURAL LANGUAGE RESPONSE FORMAT

ORCA responses should not be giant paragraphs.

Use structured responses:

``` text
ANSWER

GO WITH CAUTION

Confidence: 91%

Recommended Window
05:30 AM — 09:30 AM

WHY?

✓ PFZ alignment is favorable
✓ SST is within target range
⚠ Swell increases later

CONSTRAINT
Return before 11:30 AM
```

Then provide expandable details.

This is more useful than a long chatbot response.

------------------------------------------------------------------------

# 15. CONTEXT-AWARE FOLLOW-UP QUESTIONS

After every important answer, generate relevant follow-up chips.

Examples:

``` text
Why caution?
What changes at 10 AM?
Show the PFZ on the map
Compare 5 AM vs 10 AM
Show supporting evidence
```

Follow-ups must depend on the current result.

Do not display the same generic chips everywhere.

------------------------------------------------------------------------

# 16. VISUAL ANSWERS INSIDE CHAT

Ask ORCA should be capable of returning visual answer blocks.

Examples:

### Weather question

Show:

-   wind card
-   trend chart
-   warning status

### PFZ question

Show:

-   PFZ map
-   yield probability
-   chlorophyll metric

### Route question

Show:

-   mini route map
-   distance
-   geofence status

### What-if question

Show:

-   baseline vs scenario
-   delta values
-   timeline
-   decision change

The chat should become an intelligence workspace rather than a simple
text chatbot.

------------------------------------------------------------------------

# 17. CHAT LAYOUT OPTIMIZATION

Fix the previous Ask ORCA problem where the interface appeared to waste
large amounts of screen space.

Desktop target:

``` text
┌──────────────────────────────────────────────────────────────┐
│ Compact ORCA Header                                          │
├───────────────┬───────────────────────────┬──────────────────┤
│ Conversation  │ Visual Answer / Evidence  │ Agent Trace      │
│               │                           │                  │
│ User Query    │ Chart / Map / Decision    │ Agents           │
│ ORCA Answer   │                           │ Evidence         │
│               │                           │                  │
├───────────────┴───────────────────────────┴──────────────────┤
│ Contextual Follow-ups + Composer                            │
└──────────────────────────────────────────────────────────────┘
```

Use the viewport efficiently.

Do not create large blank areas just because the conversation has few
messages.

------------------------------------------------------------------------

# 18. CHAT SCROLL BEHAVIOR

The conversation area should behave naturally.

Requirements:

-   Composer remains accessible.
-   Conversation scrolls independently when necessary.
-   Agent panel may scroll independently.
-   Visual answer panels should not create uncontrolled page height.
-   No nested-scroll nightmare.
-   On mobile, collapse secondary panels intelligently.

------------------------------------------------------------------------

# 19. MAP + CHAT CONNECTION

Ask ORCA should be able to visually connect answers to the map.

Example:

User:

> Show me the recommended fishing zone.

ORCA response:

``` text
PFZ Zone Alpha
92% Confidence
HIGH Yield
```

Then:

**\[SHOW ON MAP\]**

Clicking it should highlight the corresponding PFZ polygon.

Similarly:

**\[SHOW HAZARD\]**

should highlight the hazard zone.

------------------------------------------------------------------------

# 20. EVIDENCE EXPLORER

Improve the Evidence Panel.

Each evidence item should display:

``` text
SOURCE
INCOIS PFZ Advisory

PARAMETER
Chlorophyll

VALUE
1.45 mg/m³

CONTRIBUTION
Supports HIGH PFZ confidence

STATUS
DEMO SNAPSHOT

TIMESTAMP
06:00 Z
```

Allow expand/collapse.

Make evidence clearly connected to the final answer.

------------------------------------------------------------------------

# 21. DATA PROVENANCE

Create reusable:

`DataProvenancePanel`

Fields:

-   Source
-   Dataset
-   Parameter
-   Timestamp
-   Value
-   Unit
-   Confidence
-   Demo/Live status

Example:

``` text
SOURCE
INCOIS PFZ Dataset

STATUS
DEMO SNAPSHOT

UPDATED
06:00 Z

CONFIDENCE
92%
```

Use this component across Research, Safety, Environmental, Operations
and Ask ORCA.

------------------------------------------------------------------------

# 22. WHAT-IF VISUALIZATION

Improve Phase 4 What-If Simulator visually.

A scenario comparison should clearly show:

``` text
BASELINE                 SCENARIO

05:30 AM                 10:00 AM
1.2m wave                2.2m wave
89% yield                62% yield
91% confidence           72% confidence

        ↓ CHANGE

Decision changes:
GO WITH CAUTION
        ↓
AVOID BEYOND 25 NM
```

Use delta indicators:

-   ↑
-   ↓
-   unchanged

Do not rely on color alone.

------------------------------------------------------------------------

# 23. GLOBAL INTELLIGENCE STATUS

Add a compact ORCA intelligence status indicator.

Example:

``` text
ORCA ENGINE
● READY

5 DATA STREAMS
7 AGENTS
DEMO SNAPSHOT
```

When processing:

``` text
ORCA ENGINE
◉ ANALYZING

7 AGENTS ACTIVE
```

When complete:

``` text
ORCA ENGINE
✓ ANALYSIS COMPLETE
```

Keep this subtle.

------------------------------------------------------------------------

# 24. ANIMATION

Animations must explain system activity.

Required:

### NLP Processing

``` text
Question
↓
Intent
↓
Data
↓
Agents
↓
Evidence
↓
Answer
```

Animate the progression.

### Data Selection

Smoothly transition charts when switching datasets.

### Agent Trace

Highlight the active agent.

### Map

Animate layer appearance.

### Decision

Reveal the final decision after the reasoning sequence.

### Charts

Use short reveal animations.

Respect reduced motion:

``` css
@media (prefers-reduced-motion: reduce)
```

Do not add continuous decorative animation.

------------------------------------------------------------------------

# 25. FRONTEND DATA ARCHITECTURE

Centralize the presentation data.

Prefer a structure similar to:

``` text
src/
├── data/
│   ├── ocean
│   ├── weather
│   ├── pfz
│   ├── vessels
│   └── hazards
│
├── hooks/
│   ├── useMarineData
│   ├── useScenario
│   └── useORCAQuery
│
├── components/
│   ├── intelligence/
│   ├── charts/
│   ├── provenance/
│   ├── chat/
│   ├── agents/
│   └── map/
```

Do not duplicate demo values throughout components.

------------------------------------------------------------------------

# 26. QUERY STATE

Create a frontend query state model.

Example:

``` ts
type ORCAQueryState = {
  query: string;
  intent: string;
  context: Record<string, unknown>;
  selectedSources: string[];
  activeAgents: string[];
  status: "idle" | "processing" | "complete";
  decision?: string;
  confidence?: number;
};
```

Adapt this to the existing project's architecture rather than blindly
replacing existing types.

------------------------------------------------------------------------

# 27. ERROR / EMPTY STATES

Design proper states for:

### No data

``` text
NO MARINE DATA AVAILABLE
This analysis cannot be completed from the current dataset.
```

### Stale data

``` text
DATA FRESHNESS WARNING
The available snapshot may not represent current conditions.
```

### Query not understood

``` text
I could not identify a clear marine operation from that question.

Try:
"Can I fish tomorrow morning?"
"Show current hazards"
"What if I leave at 10 AM?"
```

### Processing

Show agent activity instead of an empty spinner.

------------------------------------------------------------------------

# 28. PERFORMANCE

Avoid expensive rendering.

Requirements:

-   Charts render only when visible.
-   Maps should not remount unnecessarily.
-   Stable component keys.
-   Avoid unnecessary state propagation.
-   Memoize expensive derived data where appropriate.
-   Keep animations lightweight.
-   Do not load unnecessary large assets.

------------------------------------------------------------------------

# 29. ACCESSIBILITY

Maintain:

-   keyboard navigation
-   visible focus states
-   semantic controls
-   aria labels
-   readable contrast
-   status text in addition to color
-   reduced motion
-   accessible chart descriptions where practical

------------------------------------------------------------------------

# 30. RESPONSIVE DESIGN

## 1440px

Use the available workspace efficiently.

## 1920px

Expand the main intelligence area without making content excessively
wide.

## 390px

Use:

``` text
ORCA Header
↓
Query
↓
Answer
↓
Primary Visualization
↓
Decision
↓
Evidence
↓
Agent Trace
↓
Follow-ups
↓
Composer
```

Secondary panels can become expandable sections.

No horizontal overflow.

------------------------------------------------------------------------

# 31. DESIGN QUALITY

Do not make the result look like:

-   generic analytics software
-   an admin template
-   a basic chatbot
-   a wall of cards
-   a static college project
-   a collection of unrelated charts

The target experience is:

> **A modern AI-powered marine intelligence workstation.**

The visual hierarchy should communicate:

**QUESTION → DATA → REASONING → EVIDENCE → DECISION**

------------------------------------------------------------------------

# 32. DO NOT INTRODUCE FAKE AI CLAIMS

The frontend may simulate the ORCA reasoning process using deterministic
demo data.

Clearly distinguish:

-   Demo reasoning
-   Demo snapshot
-   Simulated agent processing

Do not claim that a real LLM, live satellite feed, AIS stream, or
external API is operating unless it actually exists in the project.

------------------------------------------------------------------------

# 33. IMPLEMENTATION ORDER

Implement sequentially.

### STEP 1

Audit existing Phase 1--5 data structures.

### STEP 2

Centralize marine presentation data.

### STEP 3

Create reusable chart components.

### STEP 4

Create data stream selector.

### STEP 5

Implement Ocean visualization.

### STEP 6

Implement Weather visualization.

### STEP 7

Implement PFZ visualization.

### STEP 8

Implement Vessel visualization.

### STEP 9

Implement Geo/Safety visualization.

### STEP 10

Create Data Provenance component.

### STEP 11

Improve Ask ORCA NLP query visualization.

### STEP 12

Add visual answer blocks.

### STEP 13

Connect visual answers to map layers.

### STEP 14

Improve What-If visualization.

### STEP 15

Connect data streams to agent trace.

### STEP 16

Optimize desktop layout.

### STEP 17

Optimize mobile layout.

### STEP 18

Add restrained animation.

### STEP 19

Run full build and route validation.

------------------------------------------------------------------------

# 34. ACCEPTANCE CRITERIA

Phase 6 is complete only when:

-   [ ] Existing Phase 1--5 functionality remains intact.
-   [ ] Ocean data has meaningful visualization.
-   [ ] Weather data has meaningful visualization.
-   [ ] PFZ data has meaningful visualization.
-   [ ] Vessel data has meaningful visualization.
-   [ ] Geo/Safety data has meaningful visualization.
-   [ ] Data sources are visually attributable.
-   [ ] Demo data is explicitly marked.
-   [ ] Time-series charts are readable and responsive.
-   [ ] Decision thresholds can be understood visually.
-   [ ] Multiple data streams can be shown contributing to a decision.
-   [ ] Data streams connect visually to relevant agents.
-   [ ] Ask ORCA supports structured natural-language query
    presentation.
-   [ ] ORCA answers can include charts/maps/decision blocks.
-   [ ] Follow-up questions are context-aware.
-   [ ] Chat can highlight relevant map layers.
-   [ ] Evidence is connected to decisions.
-   [ ] What-if comparisons clearly show deltas.
-   [ ] Processing states use meaningful agent animation.
-   [ ] No excessive blank areas exist.
-   [ ] 1440px layout uses the viewport effectively.
-   [ ] 1920px layout scales correctly.
-   [ ] 390px layout has no horizontal overflow.
-   [ ] Reduced-motion support works.
-   [ ] `tsc -b` passes.
-   [ ] `npm run build` passes.
-   [ ] No console errors during normal interactions.
-   [ ] Existing routes remain functional.

------------------------------------------------------------------------

# 35. FINAL QUALITY CHECK

Before declaring Phase 6 complete, manually test this complete flow:

``` text
Open ORCA
      ↓
Select a role
      ↓
Open Ask ORCA
      ↓
Ask:
"Can I go fishing tomorrow morning for five hours?"
      ↓
Intent detected
      ↓
Relevant data selected
      ↓
Agents process data
      ↓
Evidence displayed
      ↓
Decision generated
      ↓
Chart explains decision
      ↓
Map highlights relevant area
      ↓
Ask:
"What if I leave at 10 AM?"
      ↓
Scenario comparison appears
      ↓
Decision changes if demo rules require it
      ↓
Ask:
"Why?"
      ↓
Evidence + agent reasoning shown
```

The complete interaction should feel like one connected ORCA
intelligence system rather than separate pages.

------------------------------------------------------------------------

# 36. FINAL PRINCIPLE

Do not make ORCA merely **show more data**.

Make ORCA explain:

> **What the data says → what the agents understand → what evidence
> supports it → what decision follows → what changes if the situation
> changes.**

That is the core purpose of Phase 6.
