import { ref, onMounted, onUnmounted, watch, Ref } from 'vue';
import { PopEngine } from './core/engine';
import type { PopOptions } from './core/engine';

export function usePopPosition(triggerRef: Ref<HTMLElement | null>, options: PopOptions = {}) {
    const popupRef = ref<HTMLElement | null>(null);
    let engine: PopEngine | null = null;

    const init = () => {
        if (engine) engine.destroy();
        if (triggerRef.value && popupRef.value) {
            engine = new PopEngine(triggerRef.value, popupRef.value, options);
        }
    };

    onMounted(init);

    watch([triggerRef, popupRef], init);

    onUnmounted(() => {
        if (engine) engine.destroy();
    });

    return {
        popupRef,
        style: { position: 'absolute', top: '0', left: '0' }
    };
}
