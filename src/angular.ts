import {
    Directive,
    ElementRef,
    Input,
    OnDestroy,
    OnChanges,
    SimpleChanges,
    NgZone
} from '@angular/core';
import { PopEngine } from './core/engine';

import type { PopOptions } from './core/engine';

@Directive({
    selector: '[popPerfect]',
    standalone: true
})
export class PopPerfectDirective implements OnDestroy, OnChanges {
    @Input('popPerfect') trigger: HTMLElement | undefined;

    @Input() popOptions: PopOptions = {};

    private engine: PopEngine | null = null;

    constructor(
        private el: ElementRef<HTMLElement>,
        private ngZone: NgZone
    ) {}

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['trigger'] || changes['popOptions']) {
            this.init();
        }
    }

    private init(): void {
        this.destroy();

        if (!this.trigger || !this.el.nativeElement) return;

        this.ngZone.runOutsideAngular(() => {
            this.engine = new PopEngine(
                this.trigger!,
                this.el.nativeElement,
                this.popOptions
            );
        });
    }

    private destroy(): void {
        if (this.engine) {
            this.engine.destroy();
            this.engine = null;
        }
    }

    ngOnDestroy(): void {
        this.destroy();
    }
}
