import { createEffect, onCleanup } from 'solid-js';
import { PopEngine } from './core/engine';
import type { PopOptions } from './core/engine';

declare module 'solid-js' {
    namespace JSX {
        interface Directives {
            popPerfect: PopPerfectProps;
        }
    }
}

type PopPerfectProps = {
    trigger: HTMLElement | undefined;
} & PopOptions;

export function popPerfect(el: HTMLElement, accessor: () => PopPerfectProps) {
    let engine: PopEngine | undefined;

        createEffect(() => {
        const props = accessor();

             if (engine) engine.destroy();

        if (props.trigger) {
            engine = new PopEngine(props.trigger, el, props);
        }
    });

    onCleanup(() => {
        if (engine) engine.destroy();
    });
}
