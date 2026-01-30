## PopPerfect 💎

[![npm version](https://img.shields.io/npm/v/pop-perfect.svg?style=flat-square)](https://www.npmjs.com/package/pop-perfect)
[![minzipped size](https://img.shields.io/bundlephobia/minzip/pop-perfect?style=flat-square)](https://bundlephobia.com/package/pop-perfect)
[![license](https://img.shields.io/npm/l/pop-perfect?style=flat-square)](LICENSE)

> **Stop fighting the DOM. Start shipping UI.**
> The zero-dependency geometry engine that positions your tooltips, popups, and dropdowns perfectly. Every. Single. Time.

## Why? 🤔

You use `getBoundingClientRect()` to position elements. **You are breaking your mobile UI.**

Native positioning fails in these common scenarios:
- ❌ **Mobile Keyboards:** The virtual keyboard pushes the viewport, covering your popup.
- ❌ **Clipping:** Parent containers with `overflow: hidden` cut off your tooltips.
- ❌ **Edge Collisions:** Menus open off-screen on smaller devices.
- ❌ **Scroll Chaos:** Nested scrollable containers break coordinate calculations.

**PopPerfect** solves this. It combines `ResizeObserver`, **Visual Viewport API**, and **GPU-accelerated transforms** to guarantee perfect placement.

- **Universal:** First-class support for React, Vue, Svelte, Solid, Angular, and Vanilla.
- **Tiny:** ~1.8KB gzipped.
- **Smart:** Uses `requestAnimationFrame` to prevent main-thread blocking.

---

## Installation 📦

```bash
npm install pop-perfect
# or
pnpm add pop-perfect
# or
yarn add pop-perfect
```

---

## Usage 🚀

### React

Use the `usePopPosition` hook.

```jsx
import { usePopPosition } from 'pop-perfect/react'

const Tooltip = ({ triggerRef }) => {
    // Returns a ref to attach and styles to apply
    const { ref, style } = usePopPosition(triggerRef, {
        placement: 'top',
        offset: 10
    })

    return <div ref={ref} style={style}>I am perfect!</div>
}
```

### Vue 3

Use the `usePopPosition` composable.

```html
<script setup>
    import { ref } from 'vue'
    import { usePopPosition } from 'pop-perfect/vue'

    const trigger = ref(null)
    const { popupRef, style } = usePopPosition(trigger, { placement: 'bottom' })
</script>

<template>
    <button ref="trigger">Hover me</button>
    <div ref="popupRef" :style="style">
        Vue Magic ✨
    </div>
</template>

```

### Svelte

Use the `popPerfect` action.

```svelte
<script>
  import { popPerfect } from 'pop-perfect/svelte'
  let trigger;
</script>

<button bind:this={trigger}>Click me</button>

<div use:popPerfect={{ trigger, placement: 'right', flip: true }}>
  Svelte Action!
</div>

```

### SolidJS

Use the `popPerfect ` directive.

```tsx
iimport { createSignal } from 'solid-js';
import { popPerfect } from 'pop-perfect/solid';

// Typescript: declare module 'solid-js' { namespace JSX { interface Directives { popPerfect: any; } } }

function App() {
    const [trigger, setTrigger] = createSignal<HTMLElement>();
    const [show, setShow] = createSignal(false);

    return (
        <>
            <button ref={setTrigger} onClick={() => setShow(!show())}>Toggle</button>

            <Show when={show()}>
                <div use:popPerfect={{ trigger: trigger(), placement: 'bottom' }}>
                    Solid Reactivity ⚡️
                </div>
            </Show>
        </>
    );
}

```

### Angular (14+)

Use the standalone `PopPerfectDirective`.

```typescript
import { Component } from '@angular/core';
import { PopPerfectDirective } from 'pop-perfect/angular';

@Component({
    selector: 'app-dropdown',
    standalone: true,
    imports: [PopPerfectDirective],
    template: `
    <button #btn>Open</button>
    
    <div 
      *ngIf="isOpen"
      [popPerfect]="btn" 
      [popOptions]="{ placement: 'bottom-start', offset: 8 }"
    >
      Angular Power 🛡️
    </div>
  `
})
export class DropdownComponent {
    isOpen = true;
}

```

### Vanilla JS

```js
import { PopEngine } from 'pop-perfect'

const trigger = document.querySelector('#btn')
const popup = document.querySelector('#tooltip')

const engine = new PopEngine(trigger, popup, {
    placement: 'top',
    flip: true
})

// Later
// engine.destroy()
```

---

## Configuration ⚙️

You can customize the behavior of the positioning engine.

```js
// React example
usePopPosition(triggerRef, {
    placement: 'bottom-end',
    offset: 12,
    flip: true,
    strategy: 'fixed'
})
```
| Feature | **PopPerfect** 💎 | Native `getBoundingClientRect` | Heavy Libs (Popper/Floating) |
| :--- | :---: | :---: | :---: |
| **Size (Gzipped)** | **~1.8kb** | 0kb | ~6kb - 20kb |
| **Edge Cases** | **Handled (100+)** | You handle them manually 💀 | Handled |
| **Setup Time** | **30 seconds** | Hours of debugging | Moderate |
| **Performance** | **RAF Optimized** | Manual optimization needed | Good |
| **DX** | **Hook/Directive** | Imperative spaghetti | Configuration heavy |

---

## How it works 🧊

PopPerfect uses a **"Reactive Geometry"** architecture to keep performance high:

1.  **The Watcher:** It uses `ResizeObserver` on both the trigger and the popup. If content changes size, the position updates instantly.
2.  **Mobile Guard:** It listens to the `VisualViewport` API. When an iOS keyboard slides up, PopPerfect adjusts coordinates so your UI isn't buried.
3.  **The Math:** It calculates collisions with window edges. If `flip: true` is set, it detects if 'top' will be clipped and seamlessly switches to 'bottom'.
4.  **GPU Rendering:** Coordinates are applied using `transform: translate3d(...)`. This promotes the element to its own composite layer, ensuring **60 FPS** animations without layout thrashing.


## Support the project if you value your time ➡️➡️➡️
> "We eliminated the manual `getBoundingClientRect` math, saved your mobile users from keyboards covering their inputs, and absorbed the `VisualViewport` API nightmare. You saved dozens of hours not reinventing a positioning engine that would have broken inside nested scroll containers anyway. **Your donation** is a fair trade for pixel-perfect UI and weekends free from math debugging."
## License

MIT

## Keywords
`tooltip` `popover` `dropdown` `menu` `positioning` `floating` `anchor` `overlay` `react` `vue` `svelte` `solid` `angular` `typescript` `headless` `ui`

