---
title: "Building ARVAANA: Engineering a Luxury Fragrance Platform for Bangladesh"
description: "How I architected ARVAANA — a Next.js 16 fragrance e-commerce platform with zero-FOUC dual themes, reactive multi-size pricing, and a WhatsApp concierge checkout designed for local emerging market realities."
date: "2026-09-18"
tags:
  - Projects
  - Architecture
  - Next.js
  - E-Commerce
  - Engineering
draft: false
---

In the global software ecosystem, the playbook for building an e-commerce store is considered solved: pick a Shopify template, wire up Stripe Elements, plug in a standard cart, and call it a day.

When I set out to engineer the digital storefront for [**ARVAANA**](https://arvaanabd.vercel.app/) — a Bangladeshi fragrance brand crafting pure, alcohol-free artisanal attars and luxury-inspired perfumes — that playbook was entirely wrong.

Building for Bangladesh's retail market means operating under entirely different constraints: 85%+ mobile traffic, low credit card penetration, high checkout abandonment caused by multi-step OTP delays, and a consumer culture rooted in conversational trust. 

Here is how I architected ARVAANA using Next.js 16, React Server Components, and a zero-friction WhatsApp concierge pipeline to build a performant, luxury commerce experience tailored for local reality.

---

## 1. The Market Paradox: Luxury vs. Accessibility

The fragrance market in Bangladesh suffers from an extreme polarity:
1. **Imported Designer Perfumes**: Bottles from European fashion houses retail between ৳12,000 and ৳30,000. For university students and young professionals, this is cost-prohibitive.
2. **Diluted Local Clones**: Cheap roadside alternatives often dilute fragrance oils with low-grade alcohol, evaporating within 45 minutes in Dhaka's intense tropical humidity.

ARVAANA bridged this gap by formulating pure, skin-safe perfume oils and concentrated *extrait de parfum* sprays tested for **10+ hours of longevity** in humid heat, packaged in accessible sizes ranging from ৳65 (pocket-friendly 3ML/6ML roll-ons) up to ৳750 (50ML luxury extrait bottles).

My technical objective was clear: the digital storefront had to look and feel like an elite European atelier, but load instantaneously on 3G cellular connections in Gazipur, Sylhet, and Chittagong with zero transactional friction.

---

## 2. Architecture: Static Catalog, Interactive Islands

E-commerce storefronts live or die by **Core Web Vitals** — specifically Largest Contentful Paint (LCP) and Cumulative Layout Shift (CLS). If product photography shifts during hydration, users bounce.

I built ARVAANA on the **Next.js App Router**:

- **Catalog & Product Pages are Pre-rendered (RSC)**: Product metadata, descriptions, notes, and pricing tables are compiled into static HTML. The initial document arrives from the edge fully populated with zero client-side fetching waterfalls.
- **Client Component Boundaries**: Interactivity is strictly isolated to islands:
  - `CartDrawer`: Manages slide-over drawer state, item quantities, and dynamic subtotals.
  - `ProductSizeSelector`: Manages reactive bottle volume switching inside cards.
  - `ThemeProvider`: Handles persistent color tokens between dark and light modes.
  - `AnnouncementBar`: Handles contextual promotional alerts with local dismiss state.

```
┌─────────────────────────────────────────────────────────────┐
│                 Next.js App Router (RSC)                    │
│                                                             │
│  ┌───────────────────────┐       ┌───────────────────────┐  │
│  │     Static Catalog    │       │     Static About      │  │
│  │  (Zero JS HTML Shell) │       │  (Editorial Content)  │  │
│  └───────────┬───────────┘       └───────────────────────┘  │
│              │                                              │
│  ┌───────────▼───────────────────────────────────────────┐  │
│  │              Interactive Client Islands               │  │
│  │   [CartContext]     [SizeSelector]    [ThemeScript]   │  │
│  └───────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

By decoupling catalog rendering from user state, the browser paints the complete catalog with rapid initial load times on mobile devices, even before React has finished hydrating.

---

## 3. The Zero-FOUC Dual Theme System

In fragrance design, aesthetic ambiance is everything. ARVAANA required two distinct visual identities:
- **Emerald Luxury (`emerald`)**: A deep obsidian emerald background (`#051811`) with luminous champagne gold accents (`#d4af37`), capturing the evening richness of Arabian oud and amber.
- **Pearl Minimalist (`white`)**: A crisp, clean porcelain layout (`#f8faf8`) with subtle slate borders, optimized for bright daylight reading.

The common failure with React theme providers (like generic `next-themes` setups) is the **Flash of Unstyled Content (FOUC)**: the browser renders the default theme, React mounts on the client, reads `localStorage`, and jarringly flips background colors half a second later.

To eliminate this completely, I wrote a synchronous inline script injected directly into the document `<head>` before the DOM parses:

```html
<script>
  (function() {
    try {
      var saved = localStorage.getItem('arvaana_theme');
      if (saved === 'white') {
        document.documentElement.setAttribute('data-theme', 'white');
        document.documentElement.classList.add('theme-white');
        document.documentElement.style.colorScheme = 'light';
      } else {
        document.documentElement.setAttribute('data-theme', 'emerald');
        document.documentElement.classList.remove('theme-white');
        document.documentElement.style.colorScheme = 'dark';
      }
    } catch (e) {}
  })();
</script>
```

Because this runs synchronously during the initial HTML streaming pass before stylesheets are computed, the browser engine applies the correct CSS variable tokens on the first frame. **Zero flicker, zero hydration mismatch warnings.**

---

## 4. Reactive Multi-Size Pricing Without Layout Shift

Unlike standard retail goods with a single price, artisanal fragrances are bought across multiple distinct volumes:
- **6ML**: Pocket roll-on attar (entry discovery)
- **15ML**: Compact everyday spray
- **30ML**: Daily signature bottle
- **50ML**: Premium concentrated extrait

Instead of forcing users to navigate to a new product page every time they want to compare prices, ARVAANA features an **in-card volume switcher**:

```tsx
interface SizeVariant {
  size: "6ML" | "15ML" | "30ML" | "50ML";
  price: number;
  originalPrice?: number;
}

export function VariantPills({ variants, selected, onSelect }: Props) {
  return (
    <div className="flex items-center gap-1.5 flex-wrap pt-1">
      {variants.map((v) => (
        <button
          key={v.size}
          type="button"
          onClick={() => onSelect(v)}
          className={`text-[10px] font-semibold px-2 py-1 rounded-md border transition-all ${
            selected.size === v.size
              ? "border-arvaana-gold bg-arvaana-gold/15 text-arvaana-gold"
              : "border-arvaana-border text-arvaana-neutral hover:border-arvaana-gold/40"
          }`}
        >
          {v.size}
        </button>
      ))}
    </div>
  );
}
```

When a user taps `15ML` or `50ML`, the price tag, strike-through discount (`-17%`), and cart payload update instantly in memory. Because the typography containers reserve fixed line heights, switching variants causes **0.00 CLS** layout movement.

---

## 5. The WhatsApp Concierge Checkout Pipeline

In Western e-commerce, checkout optimization usually means simplifying credit card fields. In Bangladesh, requiring credit card input or complex third-party gateway redirects is the fastest way to kill your conversion rate.

Most customers in Dhaka and across the districts prefer:
1. Ordering directly through **WhatsApp** (`+880 1609-902528`).
2. Confirming availability and fragrance recommendations directly with a specialist.
3. Paying upon doorstep delivery (Cash on Delivery) or sending money via **bKash** / **Nagad** personal numbers.

Rather than fighting user habits with an alien checkout form, I turned WhatsApp into our programmatic checkout backend:

```ts
export function generateWhatsAppOrderUrl(cart: CartItem[], customer?: CustomerDetails): string {
  const WHATSAPP_NUMBER = "8801609902528";
  
  const itemsText = cart
    .map(
      (item, idx) =>
        `${idx + 1}. *${item.name}* (${item.selectedSize})\n   Qty: ${item.quantity} × ৳${item.price} = ৳${item.quantity * item.price}`
    )
    .join("\n\n");

  const subtotal = cart.reduce((acc, i) => acc + i.price * i.quantity, 0);
  const delivery = subtotal > 1500 ? 0 : 70; // Free delivery over ৳1500
  const total = subtotal + delivery;

  const message = [
    `🌿 *NEW ORDER — ARVAANA FRAGRANCES*`,
    `--------------------------------`,
    itemsText,
    `--------------------------------`,
    `Subtotal: ৳${subtotal}`,
    `Delivery: ${delivery === 0 ? "FREE" : `৳${delivery}`}`,
    `*TOTAL PAYABLE: ৳${total}*`,
    customer?.address ? `\n📍 *Delivery Address:* ${customer.address}` : "",
    `\nPlease confirm availability and delivery schedule.`,
  ].filter(Boolean).join("\n");

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
```

When the customer taps **"Checkout on WhatsApp"**, their mobile device launches WhatsApp with an itemized, clean order manifest ready to send in one tap. The merchant receives the exact product SKU, volume size, and calculated total — eliminating manual back-and-forth errors while preserving the warmth of human conversation.

---

## 6. Technical SEO & Linked Schema Architecture

E-commerce discoverability requires deep semantic search visibility. On ARVAANA, I implemented a full JSON-LD `@graph` schema linking the commercial entity to the developer identity:

```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://arvaanabd.vercel.app/#organization",
      "name": "ARVAANA",
      "url": "https://arvaanabd.vercel.app",
      "sameAs": [
        "https://www.facebook.com/people/Arvaana/61582695181994/",
        "https://www.instagram.com/arvaanaofficial/"
      ],
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+880 1609-902528",
        "contactType": "Customer Support",
        "areaServed": "BD"
      }
    },
    {
      "@type": "WebSite",
      "@id": "https://arvaanabd.vercel.app/#website",
      "name": "ARVAANA Fragrances",
      "publisher": { "@id": "https://arvaanabd.vercel.app/#organization" },
      "creator": {
        "@type": "Person",
        "name": "Md Shourov",
        "url": "https://mdshourov.vercel.app/",
        "jobTitle": "Full Stack Web Developer"
      }
    }
  ]
}
```

This ensures search crawlers understand:
- The legal brand entity and contact phone.
- The geographic targeting (`areaServed: "BD"`).
- The cross-entity link directly to my portfolio ([`https://mdshourov.vercel.app/`](https://mdshourov.vercel.app/)), strengthening knowledge graph authority for both domains.

---

## Key Takeaways

1. **Design for market reality, not Silicon Valley conventions.** In Bangladesh, a well-formatted WhatsApp concierge link will outperform a five-step credit card modal every single time.
2. **FOUC is preventable with minimal code.** You don't need heavyweight client libraries to prevent dark mode flickering; an 8-line blocking script in `<head>` executes before the stylesheet tree evaluates.
3. **Respect user device constraints.** Delivering a luxury experience doesn't mean shipping 15MB video backgrounds. Sharp photography, precise typography, and 60fps micro-interactions create an elite aesthetic while maintaining sub-second load times.

Check out the live project at [**arvaanabd.vercel.app**](https://arvaanabd.vercel.app/)!
