# Trezo Design System Guidelines

## Core Principles

1. **Clean & High Contrast**: Use white backgrounds with subtle borders (`slate-100` or `neutral-200`) and extremely soft shadows.
2. **Consistent Typography**: Use `font-semibold` (600) for all main Card titles. Keep tracking tight (`tracking-tighter` or `tracking-tight`).
3. **Capitalized Titles**: Titles should always use `capitalize`, not `uppercase` (save uppercase for small labels/tags).
4. **Lucide Icons**: Use Lucide-react icons instead of emojis for a cohesive, professional look.
5. **Generous Spacing**: Don't be afraid of white space. Use `p-6` or `p-8` for card interiors.
6. **Soft Geometry**: Use `rounded-2xl` (1rem/16px) for cards and `rounded-xl` (0.75rem/12px) for interactive elements.

---

## 🎨 Color Palette

- **Background**: `#FAFAFB` (Default page background)
- **Primary**: `#0F172A` (Slate 900) for main text and primary buttons.
- **Secondary**: `#F8FAFC` (Slate 50) for hover states and backgrounds.
- **Accent**: `#DDF906` (The Treasure Lime) for high-impact call-to-actions.
- **Borders**: `#F1F5F9` (Slate 100) or `#E2E8F0` (Slate 200).

---

## 📐 Layout Patterns

- **The Tiered Dashboard**:
  - **Tier 1 (Hero)**: Consolidated Balance & Performance Chart (Large/Prominent).
  - **Tier 2 (Metrics)**: Key Performance Indicators (Key Assets, Goal Gauges, Allocation).
  - **Tier 3 (Insights)**: Right-panel context (Sentiment, Activity, Notifications).
  - **Tier 4 (Details)**: Grid-based breakdowns (Total by Type, Wallet, etc.).

---

## ⌨️ Component Standards

### Cards (`components/ui/card.tsx`)

- Always use `rounded-2xl`.
- Background should be `white`.
- Border `slate-100`.
- Titles should be `font-semibold capitalized text-slate-900 tracking-tight`.

### Buttons (`components/ui/button.tsx`)

- Always use `rounded-xl`.
- Font weight should be `font-bold`.
- Default variant is dark (Slate 900).
- Size `default` is `h-11`.

### Inputs (`components/ui/input.tsx`)

- Always use `rounded-xl`.
- Subtle background or white.
- Border `slate-200`.

---

## 🖊️ Text Style Utility

- **Sub-headings/Labels**: Use `text-[10px] uppercase font-semibold tracking-widest text-slate-400`.
- **Large Amounts**: Use `text-3xl font-semibold text-slate-900 tracking-tighter`.
- **Body Text**: Use `text-sm text-slate-600`.

---

## 🏺 Aesthetics & Motion

- Use `grayscale hover:grayscale-0` for logos and external widgets to keep the UI clean until interacted with.
- Interactive cards should have `hover:shadow-md transition-all duration-300`.
- Images and icons should use `group-hover:scale-105 transition-transform duration-500`.
