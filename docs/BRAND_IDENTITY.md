# Brand Identity Guidelines — MD SHOUROV

> **Identity:** Md. Shourov  
> **Brand Name:** Shourov  
> **Handle:** Shourov735  
> **Profession:** Software Engineer / Systems Engineering  
> **Portfolio:** [mdshourov.vercel.app](https://mdshourov.vercel.app/)

---

## 1. Overview & Brand Philosophy

The **Md. Shourov** brand identity is designed as an enduring personal engineering signature. It communicates:
- **Precision & Systems Thinking:** Clean orthogonal pathways, mathematical balance, and architectural discipline.
- **Problem Solving & Modularity:** Interlocking computational structures reflecting input $\rightarrow$ transformation $\rightarrow$ output.
- **Longevity & Maturity:** A restrained, timeless aesthetic suited for technical writing, open-source architecture, and long-term career growth.
- **Anti-Cliché Engineering:** Specifically rejecting generic developer clichés (such as `</>`, brackets, terminal boxes, chips, wires, neon glows, and cyberpunk motifs).

---

## 2. Geometric Construction & Mathematical Grid

The primary mark is a custom **Structural Geometric S** constructed on a strict **$512 \times 512$ coordinate grid** with **$C_2$ rotational point symmetry** around the exact center $(256, 256)$.

### Key Coordinate Metrics:
- **Canvas ViewBox:** `0 0 512 512`
- **Geometric Bounds:**
  - Horizontal ($X$): $104$ to $408$ (Width = $304\text{px}$)
  - Vertical ($Y$): $96$ to $416$ (Height = $320\text{px}$)
  - Aspect Ratio: $0.95$ (harmoniously proportioned for alongside typography)
- **Optical Stroke Weights:**
  - Outer horizontal beams: $52\text{px}$
  - Outer vertical columns: $56\text{px}$
  - Central transition waist: $80\text{px}$
- **Corner Chamfers:** $45^\circ$ precision chamfers ($40\text{px}$ to $60\text{px}$) that provide a clean architectural silhouette without fragile points.
- **Rotational Symmetry:** Every vertex $(X, Y)$ maps exactly to $(512 - X, 512 - Y)$, ensuring mathematical stability when inverted or rotated.

### SVG Path Data:
```xml
<svg viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M 396 148 L 396 96 L 168 96 L 104 160 L 104 236 L 164 296 L 332 296 L 352 316 L 352 344 L 332 364 L 116 364 L 116 416 L 344 416 L 408 352 L 408 276 L 348 216 L 180 216 L 160 196 L 160 168 L 180 148 Z" fill="currentColor"/>
</svg>
```

---

## 3. Brand Assets Suite

All standalone vector assets are maintained in `public/brand/`:

| File | Type | Description / Usage |
| :--- | :--- | :--- |
| `shourov-mark.svg` | Vector Symbol | Adaptive vector mark using `currentColor`. |
| `shourov-mark-dark.svg` | Vector Symbol | Dark mode optimized mark in vibrant mint/cyan (`#2dd4bf`). |
| `shourov-mark-light.svg` | Vector Symbol | Light mode optimized mark in deep teal (`#0f766e`). |
| `shourov-mark-black.svg` | Vector Symbol | 1-bit solid black on transparent for print, PDF resumes, and documents. |
| `shourov-mark-white.svg` | Vector Symbol | 1-bit solid white on transparent. |
| `shourov-logo.svg` | Horizontal Lockup | Adaptive `[ SYMBOL ] Shourov` lockup in `currentColor`. |
| `shourov-logo-dark.svg` | Horizontal Lockup | Dark theme lockup with `#2dd4bf` symbol and `#edf7f4` typography. |
| `shourov-logo-light.svg` | Horizontal Lockup | Light theme lockup with `#0f766e` symbol and `#10201d` typography. |
| `shourov-wordmark.svg` | Typographic Wordmark | Standalone `Shourov` in `currentColor`. |
| `shourov-wordmark-dark.svg` | Typographic Wordmark | Standalone wordmark in `#edf7f4`. |
| `shourov-wordmark-light.svg` | Typographic Wordmark | Standalone wordmark in `#10201d`. |

---

## 4. Color System & Design Tokens

The identity adheres to the portfolio's semantic design tokens. The mark is never rendered with artificial drop-shadows, outer glows, or heavy decorative backgrounds.

### Primary Color Tokens:
- **Dark Mode Primary:** `#2dd4bf` (Teal / Mint 400) — High legibility on dark surfaces (`#0d1515` / `#111b19`).
- **Dark Mode Text:** `#edf7f4`
- **Light Mode Primary:** `#0f766e` (Teal 700) — High contrast and crisp authority on light surfaces (`#f8faf9` / `#ffffff`).
- **Light Mode Text:** `#10201d`
- **Monochrome Dark:** `#000000` on pure white background.
- **Monochrome Light:** `#ffffff` on pure dark background.

---

## 5. Typography

- **Font Family:** Inter (`var(--font-sans)`) or system sans-serif.
- **Wordmark Text:** **Shourov**
- **Hierarchy:** `[ SYMBOL ] Shourov` (Do not make "Md." visually dominant in the primary brand lockup; "Md. Shourov" remains the legal/academic title in metadata and resume headings).
- **Weight:** Bold (`700`)
- **Tracking:** `-0.03em` (tight, modern, precise)
- **Vertical Alignment:** Optical center aligned with the cap-height of the wordmark.

---

## 6. Sizing, Scalability & Clearspace

The logo mark is designed to render with 100% clarity across all required digital displays:

| Size | Usage Context | Optical Notes |
| :--- | :--- | :--- |
| **16×16 px** | Standard browser tab favicon | Pixel-snapped; negative space channels remain distinctly open. |
| **24×24 px** | Compact UI bars, mobile menu indicators | Full geometry resolved. |
| **30–32 px** | Desktop and mobile header navigation | Primary website integration size. |
| **48–64 px** | Card headers, badge containers, documentation icons | Crisp chamfer details evident. |
| **128–180 px** | Apple Touch Icon, mobile home screen bookmarks | Full proportion balance. |
| **192–512 px** | PWA manifest, GitHub organization avatars, social profile headers | High-resolution architectural presentation. |

### Clearspace Rule:
Maintain a minimum clearspace around the mark equal to **$0.25 \times$** the mark's height ($H/4$) on all sides. No other typography, graphics, or boundary lines should encroach inside this buffer zone.

---

## 7. Favicon & Web Manifest Integration

- **Vector Favicon (`public/favicon.svg`):** Utilizes CSS `@media (prefers-color-scheme: dark)` to automatically adapt between light (`#0f766e`) and dark (`#2dd4bf`) browser chrome themes.
- **Multi-Size ICO (`public/favicon.ico`):** Contains embedded, lossless PNG streams for 16×16, 32×32, and 48×48 px.
- **Touch & PWA Icons:** `apple-touch-icon.png` (180px), `icon-192.png`, and `icon-512.png` render on a solid `#0d1515` squircle surface with the signature mint mark.
- **Webmanifest (`public/site.webmanifest`):** Synchronized with `theme_color: "#0f766e"` and `background_color: "#0d1515"`.

---

## 8. Prohibited Modifications

To preserve the credibility and integrity of the engineering identity:
1. **No Gradients:** Do not apply color gradients across the geometric mark.
2. **No Outer Glows or Drop Shadows:** The mark derives its strength from solid silhouette contrast, not fake depth.
3. **No Skewing or Distortion:** Never stretch, compress, or alter the aspect ratio.
4. **No Arbitrary Enclosure Boxes:** Do not place the mark inside arbitrary white rectangles or heavy dark cards when placed on transparent surfaces.
5. **No Generic Developer Clichés:** Never append brackets (`</>`), chips, or cursors to the mark.
6. **No Color Alterations:** Do not use colors outside the established brand palette (`#2dd4bf`, `#0f766e`, black, or white).
