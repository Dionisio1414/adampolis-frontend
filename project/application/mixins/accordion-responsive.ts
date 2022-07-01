import { Component, mixins, Prop } from 'nuxt-property-decorator';

import mixinAccordion from './accordion';

import { EBreakpoints } from '../constants/breakpoints';

@Component({})
export default class MixinAccordionResponsive extends mixins(mixinAccordion) {
    @Prop()
    public toggleClass?: string;

    public breakpoint!: EBreakpoints;

    public disabled: boolean = true;

    public resizeListener: () => void = () => this.checkWindowSize();

    public checkWindowSize(): void {
        if (window.innerWidth >= this.breakpoint) {
            this.disabled = true;
        } else {
            this.disabled = false;
        }
    }

    public mounted(): void {
        this.checkWindowSize();
        window.addEventListener('resize', this.resizeListener);
    }

    public beforeDestroy(): void {
        window.removeEventListener('resize', this.resizeListener as () => {});
    }

    public toggle(): void {
        if (this.disabled) {
            return;
        }

        this.switchAccordion();
    }
}
