export type Placement = 'top' | 'bottom' | 'left' | 'right';
export type PopOptions = {
    placement?: Placement;
    offset?: number;
    flip?: boolean;
    strategy?: 'absolute' | 'fixed';
};

export class PopEngine {
    private trigger: HTMLElement;
    private popup: HTMLElement;
    private options: Required<PopOptions>;
    private cleanupfns: Array<() => void> = [];
    private rafId: number | null = null;

    constructor(trigger: HTMLElement, popup: HTMLElement, options: PopOptions = {}) {
        this.trigger = trigger;
        this.popup = popup;
        this.options = {
            placement: 'bottom',
            offset: 10,
            flip: true,
            strategy: 'absolute',
            ...options
        };
        this.init();
    }

    private init() {
        Object.assign(this.popup.style, {
            position: this.options.strategy,
            top: '0',
            left: '0',
            width: 'max-content',
            margin: '0'
        });

        const ro = new ResizeObserver(() => this.scheduleUpdate());
        ro.observe(this.trigger);
        ro.observe(this.popup);
        this.cleanupfns.push(() => ro.disconnect());

        const handleScroll = () => this.scheduleUpdate();
        window.addEventListener('scroll', handleScroll, { capture: true, passive: true });
        window.addEventListener('resize', handleScroll, { passive: true });

        if (window.visualViewport) {
            window.visualViewport.addEventListener('resize', handleScroll);
            window.visualViewport.addEventListener('scroll', handleScroll);
        }

        this.cleanupfns.push(() => {
            window.removeEventListener('scroll', handleScroll, { capture: true });
            window.removeEventListener('resize', handleScroll);
        });

        this.scheduleUpdate();
    }

    private scheduleUpdate() {
        if (this.rafId) return;
        this.rafId = requestAnimationFrame(() => {
            this.updatePosition();
            this.rafId = null;
        });
    }

    private updatePosition() {
        if (!this.trigger || !this.popup) return;

        const tRect = this.trigger.getBoundingClientRect();
        const pRect = this.popup.getBoundingClientRect();
        const viewport = { w: window.innerWidth, h: window.innerHeight };

        let { placement, offset } = this.options;

          let top = 0;
        let left = 0;
        const scrollX = window.scrollX;
        const scrollY = window.scrollY;

          if (this.options.flip && placement === 'top' && tRect.top - pRect.height - offset < 0) {
            placement = 'bottom';
        }

        switch (placement) {
            case 'top':
                top = tRect.top + scrollY - pRect.height - offset;
                left = tRect.left + scrollX + (tRect.width - pRect.width) / 2;
                break;
            case 'bottom':
                top = tRect.bottom + scrollY + offset;
                left = tRect.left + scrollX + (tRect.width - pRect.width) / 2;
                break;
            case 'left':
                top = tRect.top + scrollY + (tRect.height - pRect.height) / 2;
                left = tRect.left + scrollX - pRect.width - offset;
                break;
            case 'right':
                top = tRect.top + scrollY + (tRect.height - pRect.height) / 2;
                left = tRect.right + scrollX + offset;
                break;
        }

           this.popup.style.transform = `translate3d(${Math.round(left)}px, ${Math.round(top)}px, 0)`;
    }

    public destroy() {
        this.cleanupfns.forEach(fn => fn());
        if (this.rafId) cancelAnimationFrame(this.rafId);
    }
}
