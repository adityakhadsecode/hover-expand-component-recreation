# hover-expand-component-recreation

> A production-grade recreation of the **Hover expand** interactive accordion showcase from [Skiper UI](https://skiper-ui.com/v1/preview/skiper35), built with **React**, **TypeScript**, **Tailwind CSS**, and **Framer Motion**.

---

## 📁 Project Structure

```
├── public/
│   └── images/                       # Showcase illustration assets
├── src/
│   ├── components/
│   │   ├── HoverExpand/
│   │   │   ├── HoverExpand.tsx       # Core interactive accordion component
│   │   │   ├── HoverExpand.types.ts  # TypeScript interfaces & prop types
│   │   │   ├── HoverExpand.data.ts   # 17 default showcase studio items
│   │   │   ├── HoverExpand.module.css# CSS module fallback (non-Tailwind)
│   │   │   └── index.ts              # Clean barrel exports
│   │   └── index.ts
│   ├── App.tsx                       # Demo application
│   ├── index.css                     # Design tokens & Tailwind entry
│   └── main.tsx                      # Application root entry
├── index.html                        # Vite HTML entry
├── package.json                      # Project dependencies & scripts
├── tailwind.config.js                # Tailwind configuration
├── tsconfig.json                     # TypeScript configuration
└── vite.config.ts                    # Vite bundler configuration
```

---

## 🚀 Quick Start

### 1. Install dependencies
```bash
npm install
```

### 2. Run the development server
```bash
npm run dev
```

### 3. Build for production
```bash
npm run build
```

---

## 💻 Component Usage

### Basic Usage

```tsx
import { HoverExpand } from "@/components/HoverExpand";

export default function Page() {
  return (
    <div className="h-screen w-screen bg-[#121212]">
      <HoverExpand />
    </div>
  );
}
```

### With Custom Items & External State

```tsx
import { HoverExpand, HoverExpandItem } from "@/components/HoverExpand";

const myProjects: HoverExpandItem[] = [
  {
    id: "proj-1",
    label: "Cyberpunk Studio",
    year: "2024",
    image: "/images/imgp3.png",
  },
  {
    id: "proj-2",
    label: "Aura Creative Lab",
    year: "2023—2024",
    image: "/images/illstration15.png",
  },
];

export default function Showcase() {
  return (
    <div className="h-screen w-full">
      <HoverExpand
        items={myProjects}
        defaultActiveIndex={0}
        expandedWidth="32rem"
        collapsedWidth="4.5rem"
        onActiveChange={(index, item) => {
          console.log(`Active item changed to: ${item.label} (${index})`);
        }}
      />
    </div>
  );
}
```

---

## ⚙️ Component Props API (`HoverExpandProps`)

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `items` | `HoverExpandItem[]` | `DEFAULT_HOVER_EXPAND_ITEMS` | Array of studio/project showcase items |
| `defaultActiveIndex` | `number` | `15` | Initially expanded item index |
| `activeIndex` | `number` | `undefined` | Controlled active index (optional) |
| `onActiveChange` | `(index: number, item: HoverExpandItem) => void` | `undefined` | Callback fired on hover/click selection |
| `className` | `string` | `""` | Additional CSS classes for outermost `<section>` |
| `expandedWidth` | `string` | `"28rem"` | Desktop width of expanded column |
| `collapsedWidth` | `string` | `"4rem"` | Desktop width of collapsed columns |
| `expandedHeightMobile`| `string` | `"500px"` | Mobile height of active card |
| `collapsedHeightMobile`| `string` | `"4rem"` | Mobile height of collapsed cards |

---

## 🎨 Design Tokens & Physics

- **Color Tokens**:
  - Background: `#121212` (dark mode primary)
  - Active text: `#F1F1F1`
  - Inactive text: `rgba(241, 241, 241, 0.3)`
  - Card borders: `border-white/30` (`rgba(255, 255, 255, 0.3)`)
- **Typography**:
  - Font family: `Inter, sans-serif`
  - Desktop label size: fluid `2vw` with `leading-[2.6vw]` and tracking `-0.03em`
  - Mobile label size: `1.25rem` (`text-xl`)
- **Animation Physics**:
  - Spring physics: `type: "spring", stiffness: 200, damping: 25`
  - Fade durations: `0.3s` for text labels, `0.4s easeOut` for image crossfade
- **Rotated Strip Technique**:
  - The label uses `origin-[0_50%] md:-rotate-90` and `w-[calc(100vh-2.6vw)]`. Rotating `-90deg` from bottom-left causes its horizontal width to span vertically upward along the card's height.
