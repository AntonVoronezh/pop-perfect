import { useLayoutEffect, useRef, useState } from 'react';
import { PopEngine } from './core/engine';
import type { PopOptions } from './core/engine';

export function usePopPosition(
    triggerRef: React.RefObject<HTMLElement>,
    options?: PopOptions
) {
    const popupRef = useRef<HTMLDivElement>(null);

       useLayoutEffect(() => {
        if (!triggerRef.current || !popupRef.current) return;

        const engine = new PopEngine(triggerRef.current, popupRef.current, options);
        return () => engine.destroy();
    }, [triggerRef, options?.placement, options?.offset]);

    return {
        ref: popupRef,
        style: { position: 'absolute', top: 0, left: 0 } as React.CSSProperties
    };
}
