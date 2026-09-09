---
title: "Designing Maintainable React Systems at Student Scale"
description: "Notes from a year of building production-leaning React apps: component boundaries, server components, and the discipline that makes code outlive the assignment."
date: "2026-02-08"
tags:
  - React
  - Architecture
  - Server Components
  - Engineering
draft: false
---

Most student projects die on contact with a second contributor. The first author understood the structure because they wrote it; the second author opens `index.tsx` and finds a 600-line file with three hook layers and no obvious entry point. Maintainability is not a property of code. It is a property of the **decisions you made before the file existed**.

These are the rules I have converged on after a year of building React apps that other people have had to maintain.

## Components earn their directory

The reflex is to make a folder for every component. That is wrong. A folder should exist when the component is non-trivial — meaning it has internal state, sub-components, types, and tests. A pure presentational component belongs in a flat file with its siblings.

Concretely: my project cards, post cards, and breadcrumbs all live as siblings of `components/`. The blog system lives under `components/blog/` because it has six interdependent pieces. The line I draw is whether deleting the folder would leave the rest of the app untouched. If yes, the folder earned its keep.

## Server components by default, client when measured

The App Router lets you opt in to the client. I treat that opt-in as a cost. Every `"use client"` directive expands the JavaScript bundle, sets up a hydration boundary, and forces the component to be re-rendered on the client. The default should always be a server component.

The exceptions I make:

1. **Interactive primitives** — theme toggles, mobile menus, anything that owns state and listens to events.
2. **Read-once libraries** — components that wrap a third-party client library like `framer-motion` or `react-markdown`.
3. **Form controls** — anything that uses `useFormState`, `useFormStatus`, or controlled inputs.

Everything else stays on the server. This rule alone has cut more kilobytes than any other single optimization I have made.

## Types at the boundary, not in the middle

A common pattern I see is to type everything twice — once at the API boundary, once for internal use, then mapping between them with a hand-rolled `toInternal` function. That mapping is the source of more bugs than anything else.

My current approach: **types live where data enters the app.** For a static site that means `lib/types.ts` and the frontmatter schemas in `lib/blog.ts`. Once data is inside the app, it stays typed by inference. I do not re-declare a project type as a component prop; I use the project's type directly and let TypeScript narrow it.

```ts
type Props = {
  post: BlogPostSummary
}

export function PostCard({ post }: Props) {
  return (
    <article>
      <time>{formatDate(post.date)}</time>
      <h3>{post.title}</h3>
      <p>{post.description}</p>
    </article>
  )
}
```

The prop type is a *narrowing* of the domain type, not a parallel definition. If the domain type changes, the component breaks loudly at the right place.

## State is a graph, not a tree

When I started, I reached for `useState` everywhere — and ended up with prop drilling, context storms, and state that lived in the wrong place. The mental model that fixed it for me is to think about state as a graph:

- **Local state** belongs to the component that owns it.
- **Shared state** belongs at the lowest common ancestor.
- **Global state** belongs in a small handful of well-defined contexts (theme, identity, network status).

If you cannot identify the lowest common ancestor, that is usually a sign that your component tree has the wrong shape. Refactor the tree; do not add more context.

## Tests only where they cost less than they save

I am not a tests-everywhere person. I write tests for:

- Pure utility functions with non-obvious behavior.
- Edge cases in markdown parsing and slug generation.
- Anything that talks to a network or filesystem.

I do not write tests for components that just render props. The visual layer is checked by eye, by the user, and by the next refactor. The cost of a component test is rarely worth the value.

## Closing thought

Maintainability is not a style. It is the accumulated effect of a thousand small decisions: where to put the file, whether to type the prop, whether to reach for `useState` or to lift the state up. None of them feel important in isolation. Together, they are the difference between code that survives its second author and code that gets rewritten.
