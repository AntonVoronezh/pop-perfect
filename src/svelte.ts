import { PopEngine } from './core/engine';
import type { PopOptions } from './core/engine';

export function popPerfect(node: HTMLElement, params: { trigger: HTMLElement } & PopOptions) {
    let engine: PopEngine;

    const update = (newParams: typeof params) => {
        if (engine) engine.destroy();
        engine = new PopEngine(newParams.trigger, node, newParams);
    };

    update(params);

    return {
        update,
        destroy() {
            if (engine) engine.destroy();
        }
    };
}
