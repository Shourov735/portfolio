---
title: "Designing an API an AI Agent Can Actually Afford"
metaTitle: "Designing a Token-Budgeted Registry API"
description: "How I built Remocomp's three-tier discovery API so an AI agent can find, inspect and install a Remotion component for well under 300 tokens — and why the prop schema had to stay behind a second request."
date: "2026-10-13"
tags:
  - Projects
  - Architecture
  - AI Agents
  - AI
  - Cloudflare Workers
  - Lessons Learned
draft: false
---

I built [**Remocomp**](https://remocomp.shourov.workers.dev) because of a moment I kept repeating.

I would ask an AI agent to help me make a video with [Remotion](https://www.remotion.dev), and it would do something impressive and slightly wrong: it would write a bespoke React scene for every beat. A counter for this video. A summary card for that one. A transition that only makes sense between the two. Every file was new. Every file was a near-duplicate of something that already existed.

Two things were wrong with that output, and only one of them was obvious.

The obvious one is cost. Generating a bespoke scene per beat is the single largest recurring token expense in a Remotion pipeline, and it is paid again for every new video.

The less obvious one is **quality**. Almost none of that generated motion survives a real render. An agent reaching for CSS `transition` or `setInterval` writes something that looks correct in a browser preview and is wrong on the timeline, because Remotion renders one frame at a time and out of order. There is no clock. Motion has to be a pure function of the frame number, or it is not motion — it is a flicker that happens to be smooth when you scrub it by hand.

So I did not build a component library. Component libraries already exist and they solve this with black-box npm packages, which means version drift, a dependency tree you cannot audit, and an animation you are not allowed to edit. I built a **registry**: curated components that get copied into your repository, where `remotion` stays the only dependency and every spring constant is yours.

That part was straightforward. The part that turned out to be the actual engineering problem is this:

> **The consumer of this registry is not primarily a human. It is a language model with a context budget, and it fails in a completely different way than a human does.**

A human who gets an unhelpful response scrolls. An agent who gets an unhelpful response either guesses or gives up. Every field in a response is a tax on every future request in that session. Every field you leave out is a decision you have made on the model's behalf.

---

## 1. The three-tier contract

The agent surface is three endpoints, and the tiering is not a caching strategy. It is a promise about what the model is allowed to be carrying at each step.

```
Tier 1   GET /ai/search?q=title+card            "what could this be?"
Tier 2   GET /api/v1/components/kinetic-text    "how do I drive it?"
Tier 3   GET /r/kinetic-text.json               "what is it, in source?"
```

Alongside them sit `/ai/components.json` (the full paginated index, with an ETag so a polling agent can get a 304 instead of the whole catalogue), `/ai/scene-catalog.json` (what can be sequenced, and with which props), and `/llms.txt` (the same thing in prose, for a client that has just arrived and has no patience for JSON).

`/api/v1/search` is the fuller sibling of tier 1 and returns the same hits with more detail. For a first look, `/ai/search` is the cheaper one, and the difference is where the budget goes — which is the next section.

An agent that has been told this registry exists should be able to reach a working component in **three requests and one command**. That is the design target, and every field below exists to protect it.

```bash
npx remocomp find "title card"     # tier 1 — ranked, grouped by category
npx remocomp find counter --json    # the same payload, raw
npx remocomp add kinetic-text       # tier 3 — write the file
```

---

## 2. Tier 1 is a decision aid, not a catalogue

Measured against the live registry:

| Call | Bytes | ≈ Tokens |
| --- | --- | --- |
| `remocomp find "title card"` (4 hits) | 640 | **~160** |
| `remocomp find "scene"` (5 hits) | 796 | **~200** |
| `remocomp find "counter"` (1 hit) | 196 | ~50 |
| `GET /ai/search?q=title+card` (4 hits) | 1,565 | ~390 |
| `GET /api/v1/search?q=title+card&limit=5` | 5,318 | ~1,330 |
| `GET /api/v1/components/mental-model-card` → `propsSchema` alone | 2,416 | **~600** |

Read the last row next to the first. One component's prop schema costs about **four times more** than the entire result of a four-component search. That asymmetry is the entire design problem.

So tier 1 returns exactly this, and nothing else:

```json
[{ "slug": "kinetic-text", "name": "Kinetic Text",
   "category": "primitives", "summary": "Word-by-word spring reveal…",
   "fps": 30, "durationInFrames": 60,
   "bestFor": ["High-energy video intro hooks"],
   "avoidWhen": ["Dense multi-paragraph body text"],
   "install": "npx remocomp add kinetic-text" }]
```

Deliberately absent: `propsSchema`, `defaultProps`, dimensions, tags, and the source.

This is the decision I spent the most time on, and I got it wrong first. My original instinct was to make tier 1 complete — it felt dishonest to hide data. But a props schema describing a component the model may never install is pure speculation burning context, and with five candidates you can be speculating about five components at once.

The rule I now hold everywhere in this project: **an agent should never carry a schema it did not ask for.** Tier 1 tells the model enough to *choose*. Tier 2 exists for the one it chose.

Three smaller decisions fall out of the same principle:

- **Summaries are clipped, not truncated.** A summary is the first sentence of the description, cut at a word boundary when it does not fit, with a dangling conjunction stripped. `…for React video developers and autonomous` is worse than `…for React video developers.`
- **`bestFor` and `avoidWhen` are capped in the agent-facing list response.** The full lists live on tier 2. A four-item `bestFor` is a decision; a twelve-item one is a data dump.
- **`maxDuration` is expressed in seconds, not frames.** A "maximum 90" that means 3 seconds at 30 fps and 1.5 seconds at 60 fps is a unit bug waiting to happen, and it stays invisible until someone renders at a different frame rate.

---

## 3. The best decision: let it say no without spending a request

The part of tier 1 I did not anticipate is `avoidWhen`.

A search result normally tells you what something *is*. `bestFor` and `avoidWhen` tell you whether to *use* it:

> **Kinetic Text**
> **Best for:** High-energy video intro hooks · YouTube title cards · product announcement videos
> **Avoid when:** Dense multi-paragraph body text · static legal disclaimers

An agent that has been handed a dense legal disclaimer does not need the source code to work out that a word-by-word spring reveal is the wrong tool. It needs one sentence, and then it needs to be able to spend its next request somewhere else.

This is the cheapest rejection channel I have ever built and it costs two capped lines per component. The human equivalent is a good product page. The agent equivalent is a tool description.

I extended the same idea across the surface:

- **The generated AI prompt ends with an instruction.** The "Copy for AI" button emits a prompt built from the component's metadata, and its last line is: *"Do not rewrite the component. Change props only, unless a needed prop is missing."* The most common failure mode for a coding agent handed working code is deciding it should be improved.
- **The MCP `search_components` tool states its own limits.** Its description tells the model that props and defaults are not included and to call `get_component` before writing code. `get_component_source` warns that the response is large and should not be called speculatively.
- **Aspect ratios are opt-in, never inferred.** A component that declares none offers exactly one — its authored canvas — and the UI says so. Inventing a second ratio for a component nobody tested would claim a responsiveness the component may not have.

---

## 4. The scene contract: describing a video as data

The tiering above fixes the cost of *finding* a component. It does not fix the cost of *assembling* one, and assembly was the bigger bill: an explainer with six beats meant six bespoke scene files, written fresh every time.

So the registry has a fourth thing that is not a component — it is a shape.

```jsonc
{
  "version": "1.0.0",           // must match the contract version exactly
  "id": "race-condition-explainer",
  "title": "What a race condition actually is",
  "fps": 30, "width": 1080, "height": 1920,
  "scenes": [
    { "id": "analogy", "slug": "analogy-scene",
      "props": { "eyebrow": "THE MENTAL MODEL" },
      "note": "why this beat is here" },      // never rendered
    { "id": "recap", "slug": "takeaway-scene",
      "durationInFrames": 90,                  // optional; defaults to the component's own
      "props": { "bullets": ["Locks serialize access"] } }
  ]
}
```

The agent fetches `/ai/scene-catalog.json`, writes the spec, and POSTs it to `/api/v1/spec/validate`. The Worker resolves every slug against the live registry and returns each problem **with a JSON path**:

```
scenes[2].slug   No component with slug "nope". Call /ai/scene-catalog.json for valid slugs.
scenes[1].props  takeaway-scene has no prop "bullet". Known props: eyebrow, headline, bullets…
                 Must be one of "left", "right"; got "centre".
scenes[3].id     Duplicate scene id "recap".
```

The misspelled-prop row matters most. A JSON schema alone cannot tell you that `bullet` is a typo for `bullets` — both fail late, after the video is built, and the second one fails silently because the component just ignores input it does not recognise.

`version` is a literal, and a spec that does not match is **rejected rather than best-effort parsed**, because a silently misread scene list produces a video that renders successfully and is wrong — which is worse than an error.

Only `scenes` and `templates` may be sequenced. A `primitives` entry like `kinetic-text` is a building block, not a scene, and it is rejected with a message saying so. The same validation runs locally through `npx remocomp spec <file>`, which exits non-zero and prints every problem, so it drops straight into an agent loop or a pre-commit check.

---

## 5. One gate, three runtimes

An agent will happily install a component that does not render. So acceptance rules are not optional.

`@remocomp/gate` is a single module with 14 rules — 13 errors, one warning — that runs in three places with no code path between them:

| Surface | When | What it does |
| --- | --- | --- |
| Browser | On `/upload`, 250 ms debounce | Reports `line:column` as you type |
| Worker | On submission | Returns `422` with errors and warnings split |
| CI | Every push | Re-runs over the whole published catalogue |

The rules are not stylistic. `frame-driven` fails a component that uses *none* of `useCurrentFrame`, `useVideoConfig`, `spring`, `interpolate`, `measure`, or `measureSpring`. `no-css-keyframes`, `no-css-motion`, `no-timers`, `no-wall-clock` and `no-unseeded-random` reject the five ways an agent reliably produces motion that is not deterministic. `no-network` and `no-dom-access` reject a component that would try to fetch, or reach into the DOM, during a render. `import-allowlist` caps the import list at `remotion`, `@remotion/*` and `react`, so the "only dependency" promise is checked rather than asserted.

### Why acorn and not the TypeScript compiler

The obvious way to parse TypeScript in a quality gate is `ts.createSourceFile`. I could not. The TypeScript compiler API is about **1 MB gzipped on its own**, and it has to fit in a browser bundle *and* a Workers bundle *and* Node.

The gate parses with `acorn` plus its TypeScript plugin: **61 KB gzipped**, pure JavaScript, no Node built-ins, and it produces the same file locations an editor needs for lint markers. The same function runs unchanged in all three runtimes. That constraint — one parser, three hosts — turned out to be the single most valuable architectural decision in the repo, because it means the rule set cannot drift between surfaces. There is no server-only copy of the truth.

The upload page renders its rule catalogue by importing `GATE_RULES` straight out of the gate package, so the documentation of what is rejected cannot fall out of date with what is rejected.

---

## 6. Three things that broke

**A workflow that never ran.** The submission verification workflow shipped broken for months. `${{ ... }}` sat inside a YAML flow mapping, where the parser reads `${{` as a nested brace, so GitHub could not parse the file at all. GitHub does not run a workflow it cannot parse, and it reports that as a red run with zero jobs and no usable reason. Every push was red and the verification pipeline had never executed once. The fix is a test that `YAML.parseDocument`s every workflow in `.github/workflows` and asserts zero parse errors — because a broken workflow is invisible until you notice the *absence* of something.

**Search recall depended on where a component was stored.** Seed components live in the repository; published components live in D1 behind an FTS5 index. The in-memory path required *every* query word to match; FTS treated words as *alternatives*. So the query "compare two things" found a D1 component and silently returned nothing for the seed component that was exactly what you were looking for. A component's recall depended on its storage backend, which is invisible until an agent searches in plain language and gets nothing back. Both paths now use OR-with-coverage ranking.

**A component rendered blank and shipped.** A successful render proves the source compiles. It does not prove anything was drawn — a component that throws inside a Suspense boundary, or paints a flat fill, exits `0` and yields a poster nobody can use. Verification now samples frames `0`, the midpoint and the last frame, and measures the pixel spread of each, because a single midpoint misses content that only exists for part of the timeline.

There was a quieter one too. An undocumented component with no description and no prop schema was published through the maintainer CLI path and leaked into public discovery. A direct publish skips the reviewer desk, so the same publish checklist now runs on both paths — otherwise `meta.json` is just a way around the review rules.

---

## 7. The honest performance number

Mobile Lighthouse against a production build of the gallery, median of three runs:

| Category | Median |
| --- | --- |
| Performance | **80** |
| Accessibility | 100 |
| Best practices | 100 |
| SEO | 100 |

Performance misses its target, and the reason is specific. The gallery mounts a live Remotion player, and the cost of doing that is main-thread work no amount of caching removes. What was fixable, I fixed: a metric-matched font fallback (`size-adjust: 97.9%`) took Cumulative Layout Shift from **0.116 to 0.002** and Total Blocking Time from **590 ms to 410 ms**, which is most of the gap between 75 and 80. The rest is the player.

Closing the remaining gap means not rendering a live preview on the gallery, which *is* the gallery. I would rather report 80 with an accurate reason than 90 by removing the reason someone came to the site.

---

## 8. What I would tell my past self

The lesson I did not expect from this project is that **the prompt surface is architecture**.

I went in thinking I was building a registry with a good quality bar. What I actually built was an interface whose primary consumer reads it once per session, cannot ask a follow-up question, and pays for every field in proportion to how many requests it makes. Under those conditions, "should this field exist?" is a far sharper question than "is this field useful?", and the answer is frequently no.

The habits that came out of it:

- **A field is a liability until proven otherwise.** Defaults, dimensions, and full prop lists do not belong in a list response.
- **Give the model a way to say no.** `avoidWhen` is the highest-leverage string in the entire registry, and it is two lines long.
- **Put the constraint where the mistake happens.** "Change props only" at the end of the generated prompt beats a paragraph in your documentation.
- **Reject loudly.** A validation error carrying a JSON path costs far less than a render that silently produces the wrong video.

The registry is live at [remocomp.shourov.workers.dev](https://remocomp.shourov.workers.dev), the CLI is [`remocomp`](https://www.npmjs.com/package/remocomp) on npm, and the stdio MCP server is [`remocomp-mcp`](https://www.npmjs.com/package/remocomp-mcp). If you are building with an agent this week, try pointing it at a curated surface and measure what it stops reinventing.